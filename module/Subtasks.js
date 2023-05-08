let Database = require('../module/db/mysql');

let Cache = require('./db/redis');

let database = new Database();

let cache = new Cache();

class Subtasks {
    async addSubtask(task_id, text) {
        try {
            let task = await cache.getTaskId(task_id);
            if(!task) {
                task = await database.getByProperty('tasks', 'task_id', task_id);
                if(task.length > 0)await cache.cacheTaskId(task_id);
            }
            if(task.length === 0) throw new Error('Data missing.');
            let id = await database.addSubtask(task_id, text);
            return {
                id: id,
                text: text,
                task_id: task_id
            }
        } catch(err) {
            throw err;
        }
    }
    async loadSubtasks(task_id) {
        try {
            return await database.getByProperty('subtasks', 'task_id', task_id);
        } catch(err) {
            throw err;
        }
    }
    async completeSubtask(id, bool) {
        try {
            let res = await database.changeTableProperty('subtasks', 'isFinished', bool, 'id', id);
            if(res.affectedRows === 0) throw new Error('Data missing.');
        } catch(err) {
            throw err;
        }
    }
    async deleteSubtask(id) {
        try {
            let res = await database.deleteFromTable('subtasks', 'id', id);
            if(res.affectedRows === 0) throw new Error('Data missing.');
        } catch(err) {
            throw(err);
        }
    }
    async editSubtask(text, id) {
        try {
            let res = await database.changeTableProperty('subtasks', 'text', text, 'id', id);
            if(res.affectedRows === 0) throw new Error('Data missing.');
        } catch(err) {
            throw err;
        }
    }
}

module.exports = Subtasks;