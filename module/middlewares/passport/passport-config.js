let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;

let { logIn } = require('../../auth/authentication');

let Database = require('../../db/mysql');

let database = new Database();

passport.use(new LocalStrategy((username, password, done) => {
    logIn(username, password, done);
}));

passport.serializeUser((user, done) => {
    done(0, user);
});

passport.deserializeUser((user, done) => {
    done(0, user);
});

console.log(passport);
module.exports = passport;