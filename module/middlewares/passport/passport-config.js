let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;

let User = require('../../User');

let Users = require('../../Users');

let { logIn } = require('../../auth/authentication');


passport.use(new LocalStrategy((username, password, done) => {
    logIn(username, password, done);
}));

passport.serializeUser((user, done) => {
    done(0, user.id);
});

passport.deserializeUser(async (id, done) => {
    if(id) {
        let user = await Users.prototype.getUserProfile(id);
        done(0, new User(user));
    } else done(0, {});
});

module.exports = passport;