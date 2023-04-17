//let app = require('../../app')
let passport = require('./passport/passport-config');
let session = require('express-session');

function sessionMiddleware(app) {
    app.use(session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 60 * 60 * 1000}
    }));
    app.use(passport.initialize());
    app.use(passport.session());
}

module.exports = {sessionMiddleware, passport};
