let express = require('express');
let router = express.Router();
let fs = require('fs');

let checkAuthentication = require('../module/auth/auth-check');

let formidable = require('formidable');

let { validateEmail, validateUsername, validateTelephone, validateCountry} = require('../module/validation/form-data-validation');

router.get('/profile', checkAuthentication, (req, res) => {
    res.render('Profile');
})

router.post('/profile/change/username', async(req, res, next) => {
    if(validateUsername(req.body.username, req)) {
        try {
            let prevName = req.user.username;
            await req.user.changeUserProperty('username', req.body.username);
            fs.access(`./public/images/profile/${prevName}.png`, (err) => {
                if(err) {
                    req.flash('success', 'You changed your username successfully.');
                    res.redirect('/profile');
                    return;
                }
                fs.rename(`./public/images/profile/${prevName}.png`, `./public/images/profile/${req.body.username}.png`, (err) =>{
                    if(err) next(err);
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
            await req.user.changeUserProperty(`e-mail`, req.body[`e-mail`]);
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
        filename: req.username,
    });
    form.parse(req, async(err, fields, files) => {
        if(err) console.log(err);
        let imgBuffer = Buffer.from(fields.image.split(',')[1],'base64'); 
        fs.writeFileSync(`./public/images/profile/${req.user.username}.png`, imgBuffer);
        req.flash('success', 'Upload successful.');
        res.send('Upload successful');
    })
})

router.post('/profile/change/country', async(req, res) => {
    if(validateCountry(req.body.country, req)) {
        try {
            await req.user.changeUserProperty('country', req.body.country);
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
            await req.user.changeUserProperty('telephone', req.body.telephone);
            req.flash('success', 'You changed your phone number successfully.');
        } catch(err) {
            console.log(err);
        } finally {
            res.redirect('/profile')
        }
    } else res.redirect('/profile');
})

module.exports = router;
