let express = require('express');
let router = express.Router();

let Tasks = require('../module/Tasks');

let Subtasks = require('../module/Subtasks');

router.get('/tasks/load/task', async(req, res) => {
    try {
        let tasks = await Tasks.prototype.loadTasks(req.user.id);
        res.status(200);
        res.send(tasks);
    } catch(err) {
        console.error(err);
        res.status(500);
    }
});

router.get('/tasks/load/subtasks', async(req, res) => {
    try {
        let subtasks = await Subtasks.prototype.loadSubtasks(req.query.task_id);
        res.status(200);
        res.send(subtasks);
    } catch(err) {
        console.error(err);
        res.status(500);
    }
});

router.post('/tasks/new/task', async(req, res) => {
    try {
        let task = await Tasks.prototype.addTask(req.user.id, req.body.text, req.body.type);
        res.status(200);
        res.send(task);
    } catch(err) {
        console.error(err);
        res.status(500)
    }
});

router.post('/tasks/new/subtask', async(req, res) => {
    try {
        let subtask = await Subtasks.prototype.addSubtask(req.body.task_id, req.body.subtask);
        res.status(200);
        res.send(subtask);
    } catch(err) {
        if(err.message === "Data missing.") res.status(404);
        else {
            console.error(err);
            res.status(500);
        }
        res.send('Error');
    }
});

router.patch('/tasks/update/type', async(req, res) => {
    try {
        await Tasks.prototype.changeType(req.body.type, req.body.task_id);
        res.status(200);
        res.send('OK');
    } catch(err) {
        if(err.message === "Data missing.") res.status(404);
        else {
            console.error(err);
            res.send(500);
        }
        res.send('Error');
    }
});

router.patch('/tasks/edit/task', async(req, res) => {
    try {
        await Tasks.prototype.editTask(req.body.text, req.body.task_id);
        res.status(200);
        res.send('OK');
    } catch(err) {
        if(err.message === "Data missing.") res.status(404)
        else {
            console.error(err);
            res.status(500);
        }
        res.send('Error');
    }
})

router.patch('/tasks/edit/subtask', async(req, res) => {
    try {
        await Subtasks.prototype.editSubtask(req.body.text, req.body.id);
        res.status(200);
        res.send('OK');
    } catch(err) {
        if(err.message === "Data missing.") res.status(404);
        else {
            console.error(err);
            res.status(500);
        }
        res.send('Error')
    }
})

router.patch('/tasks/finished/task', async(req, res) => {
    try {
        await Tasks.prototype.finishTask(req.body.isFinished, req.body.task_id);
        res.status(200);
        res.send('OK');
    } catch(err) { 
        console.log(err);
        if(err.message === "Data missing.") res.status(404);
        else {
            console.error(err)
            res.status(500);
        }
        res.send('Error');
    }
});

router.patch('/tasks/completed/subtask', async(req, res) => {
    try {
        await Subtasks.prototype.completeSubtask(req.body.task_id, req.body.bool);
        res.status(200);
        res.send('OK');
    } catch(err) {
        if(err.message === "Data missing.") res.status(404);
        else {
            console.error(err);
            res.status(500);
        }
        res.send('Error');
    }
})

router.patch('/tasks/upload/note', async(req, res) => {
    try {
        await Tasks.prototype.setNote(req.body.newNote, req.body.task_id);
        res.status(200);
        res.send('OK');
    } catch(err) {
        if(err.message === "Data missing.") res.status(404);
        else {
            console.error(err);
            res.send(500);
        }
        res.send('Error');
    }
})

router.delete('/tasks/delete/task', async(req, res) => {
    try {
        await Tasks.prototype.deleteTask(req.body.task_id);
        res.status(200);
        res.send('OK');
    } catch(err) { 
        if(err.message === "Data missing.") res.status(404);
        else {
            console.error(err);
            res.status(500);
        }
        res.send('Error');
    }
});

router.delete('/tasks/delete/subtask', async(req, res) => {
    try {
        await Subtasks.prototype.deleteSubtask(req.query.id);
        res.status(200);
        res.send('OK');
    } catch(err) {
        if(err.message === "Data missing.") res.status(404);
        else {
            console.error(err);
            res.status(500);
        }
        res.send('Error');
    }
});

module.exports = router;