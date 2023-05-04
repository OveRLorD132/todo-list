let express = require('express');
let router = express.Router();
let bcrypt = require('bcrypt');

let { passwordValidation } = require('../module/validation/form-data-validation');

let checkAuthentication = require('../module/auth/auth-check');

let Database = require('../module/db/mysql');
let database = new Database();

let Password = require('../module/Password');
const { compileClientWithDependenciesTracked } = require('jade');

router.get('/password-change', checkAuthentication, async(req, res) => {
    res.render('PasswordChange');
})

router.post('/password-change', async(req, res) => {
    if(passwordValidation(req.body.newPassword, req)) {
        try { 
            await req.user.changePassword(req.body.oldPassword, req.body.newPassword);
            res.redirect('/profile');
        } catch(err) {
            if(err.message === "Incorrect password.") req.flash('error', err.message);
            else console.error(err);
            res.redirect('/password-change');
        }
    }
})

module.exports = router;