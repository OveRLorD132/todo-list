let express = require('express');
let router = express.Router();

let Database = require('../module/db/mysql');

let Tasks = require('../module/Tasks');

let database = new Database();

router.get('/tasks/load/task', async(req, res) => {
    try {
        let tasks = await Tasks.prototype.loadTasks(req.user.id);
        res.send(tasks);
    } catch(err) {
        console.error(err);
    }
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

router.post('/tasks/new/task', async(req, res) => {
    let task = await Tasks.prototype.addTask(req.user.id, req.body.text, req.body.type);
    res.send(task);
});

router.post('/tasks/new/subtask', async(req, res) => {
    try {
        let subtask = await database.insertSubtask(req.body.task_id, req.body.subtask);
        //subtask.user_id = req.session.passport.user.id;
        res.send(subtask);
    } catch(err) {
        console.error(err);
    }
});

router.patch('/tasks/update/type', async(req, res) => {
    try {
        await Tasks.prototype.changeType(req.body.type, req.body.task_id);
        res.send('Success');
    } catch(err) {
        if(err.message === "Data missing.") res.status(404);
        else {
            console.error(err);
            res.send(500);
        }
    }
});

router.patch('/tasks/finished/task', async(req, res) => {
    try {
        await Tasks.prototype.finishTask(req.body.isFinished, req.body.task_id);
        res.send('Success');
    } catch(err) { 
        if(err.message === "Data missing.") res.status(404);
        else {
            console.error(err)
            res.status(500);
        }
    }
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
        await Tasks.prototype.setNote(req.body.newNote, req.body.task_id);
    } catch(err) {
        if(err.message === "Data missing.") res.status(404);
        else {
            console.error(err);
            res.send(500);
        }
    }
})

router.delete('/tasks/delete/task', async(req, res) => {
    try {
        await Tasks.prototype.deleteTask(req.body.task_id);
        res.send("Success");
    } catch(err) { 
        if(err.message === "Data missing.") res.status(404);
        else {
            console.error(err);
            res.status(500);
        }
    }
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