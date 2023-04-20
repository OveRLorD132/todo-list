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
    console.log(req);
    database.changeType(req.body.task_id, req.body.type,).then(() => {
        res.send("Success.");
    }).catch((err) => {
        console.log(err);
        res.send("Error.");
    });
});

router.patch('/tasks/finished/task', (req, res) => {
    database.setFinished(req.body.task_id, req.body.isFinished).then(() => {
        res.send('Success.');
    }).catch((err) => {
        console.log(err);
        res.send('Error.');
    });
})

router.delete('/tasks/delete/task', (req, res) => {
    database.deleteLine(req.body.task_id).then(() => {
        console.log('Deleted');
        res.end('Success.');
    }).catch(err => {
        console.log(err);
        res.end(`This line doesn't exist.`);
    });

});

module.exports = router;