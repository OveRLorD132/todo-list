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
        return await database.loadTasks(user_id);
    } 
    async changeType(type, task_id) {
        try {
            await database.updateTaskProperty('type', type, task_id);
        } catch(err) {
            throw err;
        }
    }
    async setNote(note, task_id) {
        try {
            await database.updateTaskProperty('note', note, task_id);
        } catch(err) {
            throw(err);
        }
    }
    async finishTask(bool, task_id) {
        try { 
            await database.updateTaskProperty('isFinished', bool, task_id);
        } catch(err) {
            throw err;
        }
    }
    async deleteTask(task_id) {
        try {
            await database.deleteTask(task_id);
        } catch(err) {
            throw err;
        }
    }
}

module.exports = Tasks;