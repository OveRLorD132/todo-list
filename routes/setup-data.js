let express = require('express');
let router = express.Router();

let fs = require('fs');

router.get('/flash-messages', async(req, res) => {
    res.json(req.flash());
})

router.get('/current/user/profile', async(req, res) => {
    if(req.user) res.send(req.user);
    else res.send('User not logged in');
})

router.get('/user/image', (req, res) => {
    let path = `./public/images/profile/${req.user.username}.png`;
    fs.access(path, (err) => {
        if(err) res.send(false);
        else res.send(true)
    })
})

module.exports = router;