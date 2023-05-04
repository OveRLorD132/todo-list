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
    successFlash: true,
    failureFlash: true,
}), (req, res) => {});

router.post('/registration', async (req, res, next) => {
    try {
        let id = await registration(req.body);
        req.logIn({id: id}, (err) => {
            if(err) return next(err);
            req.flash('success', 'Registration successful.');
            res.send('Success');
        })
    } catch(err) {
        if(/username/.test(err)) req.flash('error', 'This username is already in use.');
        else if(/e\-mail/.test(err)) req.flash('error', 'This e-mail us already in use.');
        else {
            console.error(err);
            req.flash('error', `Server error. Something's wrong.`);
        }
        res.send('Failure');
    }
});

module.exports = router;