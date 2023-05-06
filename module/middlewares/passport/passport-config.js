let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;

let User = require('../../User');

let { logIn } = require('../../auth/authentication');

let Database = require('../../db/mysql');

let Cache = require('../../db/redis');

let cache = new Cache();

let database = new Database();

passport.use(new LocalStrategy((username, password, done) => {
    logIn(username, password, done);
}));

passport.serializeUser((user, done) => {
    console.log(user);
    done(0, user.id);
});

passport.deserializeUser(async (id, done) => {
    if(id) {
        let user = await database.getById(id);
        let res = cache.cacheUserProfile(user);
        done(0, new User(user));
    } else done(0, {});
});

module.exports = passport;