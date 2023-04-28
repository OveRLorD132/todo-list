let express = require('express');
let router = express.Router();

let Database = require('../module/db/mysql');

let database = new Database();

router.get('/tasks/load/task', (req, res) => {
    database.loadFromList(req.session.passport.user.id)
        .then((tasks) => {
            res.send(tasks);
        })
        .catch((err) => {
            console.error(err);
        });
});

router.get('/tasks/load/subtasks', async(req, res) => {
    try {
        console.log(req);
        let subtasks = await database.getSubtasksById(req.query.task_id);
        res.send(subtasks);
    } catch(err) {
        console.log(err);
    }
});

router.post('/tasks/new/task', (req, res) => {
    database.addToList(req.session.passport.user.id, req.body.text, req.body.type).then((task) => {
        res.send(task);
    });
});

router.post('/tasks/new/subtask', async (req, res) => {
    try {
        let subtask = await database.insertSubtask(req.body.task_id, req.body.subtask);
        //subtask.user_id = req.session.passport.user.id;
        res.send(subtask);
    } catch(err) {
        console.error(err);
    }
});

router.patch('/tasks/update/type', (req, res) => {
    console.log(req);
    database.changeType(req.body.task_id, req.body.type,).then(() => {
        res.send("Success");
    }).catch((err) => {
        console.log(err);
        res.status(404);
        res.send("Error");
    });
});

router.patch('/tasks/finished/task', async (req, res) => {
    try {
        await database.setFinished(req.body.task_id, req.body.isFinished);
        await database.finishSubtasks(req.body.task_id, req.body.isFinished);
        res.send('Success');
    } catch(err) {
        res.status(404);
    }
    // database.setFinished(req.body.task_id, req.body.isFinished).then(() => {
    //     res.send('Success');
    // }).catch((err) => {
    //     console.log(err);
    //     res.status(404);
    //     res.send('Error.');
    // });
});

router.patch('/tasks/completed/subtask', async(req, res) => {
    try {
        await database.completeSubtask(req.body.task_id, req.body.bool);
        res.send('Success')
    } catch(err) {
        if(/Data missing\./.test(err)) res.status(404);
        console.log(err);
        res.send('Error');
    }
})

router.patch('/tasks/upload/note', async(req, res) => {
    try {
        await database.addNote(req.body.newNote, req.body.task_id);
    } catch(err) {
        console.log(err);
    }
})

router.delete('/tasks/delete/task', (req, res) => {
    database.deleteLine(req.body.task_id).then(() => {
        console.log('Deleted');
        res.end('Success');
    }).catch(err => {
        if(/Data missing\./.test(err)) res.status(404);
        res.send(err);
    });
});

router.delete('/tasks/delete/subtask', async(req, res) => {
    try {
        await database.deleteSubtask(req.query.id);
        res.send('Success');
    } catch(err) {
        console.log(err);
        if(/Data missing\./.test(err)) res.status(404);
        res.send("Error");
    }
});

module.exports = router;