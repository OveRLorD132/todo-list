let express = require('express');
const { passport } = require('../module/middlewares/express-middlewares');
let { registration } = require('../module/auth/authentication');
let router = express.Router(); 

router.get('/login', (req, res) => {
    res.render('Login');
});

router.get('/registration', (req, res) => {
    res.render('Registration');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}), (req, res) => {console.log(req)});

router.post('/registration', (req, res, next) => {
    console.log(req);
    registration(req)
        .then((user) => {
            console.log(user);
            req.logIn(user, (err) => {
                if(err) return next(err);
                return res.render('Login');
            });
        })
        .catch((err) => {
            console.log(err);
            return res.render('Registration');
        });
});

module.exports = router;