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

router.get('/logout', (req, res) => {
    console.log(req);
    if(req.session.passport && req.session.passport.user) {
        req.logOut((err) => {
            if(err) console.log(err);
        })
    }
    res.redirect('/login');

})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
}), (req, res) => {});

router.post('/registration', (req, res, next) => {
    registration(req).then((user) => {
        req.logIn(user, (err) => {
            if(err) return next(err);
            res.send('Success');
        });
    }).catch((err) => {
        if(/username/.test(err)) req.flash('error', 'This username is already in use.')
        else req.flash('error', 'This email is already in use.');
        console.log()
        res.send('Failure');
    });
});

module.exports = router;