let express = require('express');
let router = express.Router();

let Database = require('../module/db/mysql');

let database = new Database();

router.post('/tasks/new/task', (req, res) => {
    database.addToList(req.session.passport.user.id, req.body.task);
    res.send(req.body.task);
});

router.get('/tasks/load/task', (req, res) => {
    database.loadFromList(req.session.passport.user.id)
        .then((tasks) => {
            res.send(tasks);
        })
        .catch((err) => {
            console.error(err);
        });
});

module.exports = router;