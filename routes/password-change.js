let express = require('express');
let router = express.Router();
let bcrypt = require('bcrypt');

let { passwordValidation } = require('../module/validation/form-data-validation');

let Database = require('../module/db/mysql');
let database = new Database();

router.get('/password-change', async(req, res) => {
    res.render('PasswordChange');
})

router.post('/password-change', async(req, res) => {
    if(passwordValidation(req.body.newPassword, req)) {
        try {
            let result = await database.getPropertyById(`password`, req.session.passport.user.id);
            bcrypt.compare(req.body.oldPassword, result.password, async (err, compareRes) => {
                if(err) console.log(err);
                if(!compareRes) {
                    req.flash('error', 'Incorrect Password.');
                    res.redirect('/password-change');
                }
                if(compareRes){
                    try {
                        bcrypt.genSalt(11, (err, salt) => {
                            if(err) console.log(err);
                            bcrypt.hash(req.body.newPassword, salt, async (err, result) => {
                                await database.changeUserProp(`password`, result, req.session.passport.user.id);
                                res.redirect('/profile');
                            })
                        })
                    } catch(err) {
                        console.log(err);
                    }
                } 
            })
        } catch(err) {
            console.log(err);
        }
    } else {
        res.redirect('/password-change');
    }
    
})

module.exports = router;