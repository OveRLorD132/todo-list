let express = require('express');
let router = express.Router();

let Database = require('../module/db/mysql');

let database = new Database();

router.post('/tasks/new/task', (req, res) => {
    database.addToList(req.session.passport.user.id, req.body.text, req.body.type).then((task) => {
        res.send(task);
    });
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

router.patch('/tasks/update/type', (req, res) => {
    database.changeType(req.body.task_id, req.body.type,).then(() => {
        res.send("Success.");
    }).catch((err) => {
        console.log(err);
        res.send("Error.");
    });
});

module.exports = router;