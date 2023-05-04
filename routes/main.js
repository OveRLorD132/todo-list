let express = require('express');
let router = express.Router();
let authCheck = require('../module/auth/auth-check');

router.get('/', (req, res) => {
    res.redirect('/tasks');
});

router.get('/main', (req, res) => {
    res.redirect('/tasks');
});

router.get('/tasks', authCheck, (req, res) => {
    console.log(req);
    res.render('Main');
});

module.exports = router;