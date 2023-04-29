let express = require('express');
let router = express.Router();
let path = require('path');

let Database = require('../module/db/mysql');
let database = new Database();

console.log(database)

router.get('/profile', (req, res) => {
    res.render('Profile');
})

router.post('/profile/change/username', async(req, res) => {
    if(validateUsername(req.body.username, req)) {
        try {
            let res = await database.changeUserProp("username", req.body.username, req.session.passport.user.id);
            req.session.passport.user.username = req.body.username;
        } catch(err) {
            console.log(err);
            if(/username/.test(err)) req.flash('error', 'This username is already in use.');
            else console.log(err);
        } finally {
            res.redirect('/profile');
        }
    }
    else res.redirect('/profile');
})

router.post('/profile/change/e-mail', async(req, res) => {
    if(validateEmail(req.body[`e-mail`], req)) {
        try {
            database.changeUserProp(`e-mail`, req.body[`e-mail`], req.session.passport.user.id);
            req.session.passport.user[`e-mail`] = req.body[`e-mail`];
        } catch(err) {
            console.log(err);
            if(/e-mail/.test(err)) req.flash('error', 'This e-mail is already in use.');
            else console.log(err);
        } finally {
            res.redirect('/profile');
        }
    } else res.redirect('/profile');
})

module.exports = router;

function validateUsername(username, req) {
    if(username.length < 8) {
        req.flash('error', 'Username must be at least 8 symbols.');
        console.log(req);
        return false;
    } else if(username.length > 20) {
        req.flash('error', 'Username is too long.');
        return false;
    }
    return true;
}

function validateEmail(email, req) {
    if(email.length > 200) {
        req.flash('error', `E-mail couldn't be so long.`);
        return false; 
    } else if(!/.+@.+/.test(email)) {
        req.flash('error', `Incorrect format.`);
        return false;
    }
    return true;
}