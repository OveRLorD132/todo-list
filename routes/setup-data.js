let express = require('express');
let router = express.Router();

let fs = require('fs');

router.get('/flash-messages', async(req, res) => {
    res.json(req.flash());
})

router.get('/current/user/profile', async(req, res) => {
    if(req.session.passport) res.send(req.session.passport.user);
    else res.send('User not logged in');
})

router.get('/user/image', (req, res) => {
    console.log(req);
    let path = `./public/images/profile/${req.session.passport.user.username}.png`;
    console.log(path);
    fs.access(path, (err) => {
        if(err) res.send(false);
        else res.send(true)
    })
})

module.exports = router;