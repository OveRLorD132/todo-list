let express = require('express');
let Database = require('../module/db/mysql');

let router = express.Router();
let database = new Database();

router.get('/login/errors', async(req, res) => {
    res.send(req.flash());
})

router.get('/current/user/profile', async(req, res) => {
    if(req.session.passport) res.send(req.session.passport.user);
    else res.send('User not logged in');
})

module.exports = router;