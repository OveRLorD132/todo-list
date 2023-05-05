let Database = require('./db/mysql');

let database = new Database();

class Tasks {
    async addTask(user_id, task, type) {
        await database.addTask(user_id, task, type);
        let lastId = await database.selectLastInsert();
        console.log(lastId);
        let newTask = {
            task_id: lastId,
            text: task,
            type: type,
        }
        return newTask;
    }
    async loadTasks(user_id) {
        return await database.getByProperty('tasks', 'id', user_id);
    } 
    async changeType(type, task_id) {
        try {
            let res = await database.changeTableProperty('tasks', 'type', type, 'task_id', task_id);
            if(res.affectedRows === 0) throw new Error('Data missing.');
        } catch(err) {
            throw err;
        }
    }
    async setNote(note, task_id) {
        try {
            let res = await database.changeTableProperty('tasks', 'note', note, 'task_id', task_id);
            if(res.affectedRows === 0) throw new Error('Data missing.');
        } catch(err) {
            throw(err);
        }
    }
    async finishTask(bool, task_id) {
        try { 
            let res = await database.changeTableProperty('tasks', 'isFinished', bool, 'task_id', task_id);
            await database.changeTableProperty('subtasks', 'isFinished', bool, 'task_id', task_id);
            if(res.affectedRows === 0) throw new Error('Data missing.');
        } catch(err) {
            throw err;
        }
    }
    async deleteTask(task_id) {
        try {
            let res = await database.deleteFromTable('tasks', 'task_id', task_id);
            await database.deleteFromTable('subtasks', 'task_id', task_id);
            if(res.affectedRows === 0) throw new Error('Data missing.');
        } catch(err) {
            throw err;
        }
    }
    async editTask(text, task_id) {
        try {
            let res = await database.changeTableProperty('tasks', 'text', text, 'task_id', task_id)
            if(res.affectedRows === 0) throw new Error('Data missing.');
        } catch(err) {
            throw err;
        }
    }
}

module.exports = Tasks;