//let app = require('../../app')
let passport = require('./passport/passport-config');
let session = require('express-session');
let flash = require('connect-flash');

function sessionMiddleware(app) {
    app.use(session({
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 60 * 60 * 1000}
    }));
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
}

module.exports = {sessionMiddleware, passport};
