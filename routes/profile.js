let express = require('express');
let router = express.Router();
let path = require('path');
let fs = require('fs');

let formidable = require('formidable');

let { validateEmail, validateUsername} = require('../module/validation/form-data-validation');

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
        res.send('Upload successful');
    })
})

module.exports = router;
