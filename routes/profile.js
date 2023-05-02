let express = require('express');
let router = express.Router();
let path = require('path');
let fs = require('fs');

let formidable = require('formidable');

let { validateEmail, validateUsername, validateTelephone, validateCountry} = require('../module/validation/form-data-validation');

let Database = require('../module/db/mysql');
let database = new Database();

console.log(database)

router.get('/profile', (req, res) => {
    res.render('Profile');
})

router.post('/profile/change/username', async(req, res, next) => {
    if(validateUsername(req.body.username, req)) {
        try {
            await database.changeUserProp("username", req.body.username, req.session.passport.user.id);
            fs.access(`./public/images/profile/${req.session.passport.user.username}.png`, (err) => {
                if(err) {
                    req.session.passport.user.username = req.body.username;
                    req.flash('success', 'You changed your username successfully.');
                    res.redirect('/profile');
                    return;
                }
                fs.rename(`./public/images/profile/${req.session.passport.user.username}.png`, `./public/images/profile/${req.body.username}.png`, (err) =>{
                    if(err) next(err);
                    req.session.passport.user.username = req.body.username;
                    req.flash('success', 'You changed your username successfully.');
                    res.redirect('/profile');
                })
            })
        } catch(err) {
            console.log(err);
            if(/username/.test(err)) req.flash('error', 'This username is already in use.');
            else console.log(err);
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
            req.flash('success', 'You changed your e-mail succesfully');
        } catch(err) {
            console.log(err);
            if(/e-mail/.test(err)) req.flash('error', 'This e-mail is already in use.');
            else console.log(err);
        } finally {
            res.redirect('/profile');
        }
    } else res.redirect('/profile');
})

router.post('/profile/change/picture', async(req, res) => {
    let form = formidable({
        multiples: true,
        maxFileSize: 80 * 1024 * 1024,
        uploadDir: '../public/images/profile',
        filename: req.session.passport.user.username,
    });
    form.parse(req, async(err, fields, files) => {
        if(err) console.log(err);
        let imgBuffer = Buffer.from(fields.image.split(',')[1],'base64'); 
        fs.writeFileSync(`./public/images/profile/${req.session.passport.user.username}.png`, imgBuffer);
        req.flash('success', 'Upload successful.');
        res.send('Upload successful');
    })
})

router.post('/profile/change/country', async(req, res) => {
    if(validateCountry(req.body.country, req)) {
        try {
            await database.changeUserProp('country', req.body.country, req.session.passport.user.id);
            req.session.passport.user.country = req.body.country;
            req.flash('success', 'You changed country successfully.');
        } catch(err) {
            console.log(err);
        } finally {
            res.redirect('/profile');
        }
    } else res.redirect('/profile');
})

router.post('/profile/change/telephone', async(req, res) => {
    if(validateTelephone(req.body.telephone, req)) {
        try {
            await database.changeUserProp('telephone', req.body.country, req.session.passport.user.id);
            req.session.passport.user.telephone = req.body.telephone;
            req.flash('success', 'You changed your phone number successfully.');
        } catch(err) {
            console.log(err);
        } finally {
            res.redirect('/profile')
        }
    } else res.redirect('/profile');
})

module.exports = router;
