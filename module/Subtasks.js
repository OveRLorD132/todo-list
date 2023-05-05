let Database = require('../module/db/mysql');

let database = new Database();

class Subtasks {
    async addSubtask(task_id, text) {
        try {
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
            await database.changeTableProperty('subtasks', 'isFinished', bool, 'id', id);
        } catch(err) {
            throw err;
        }
    }
    async deleteSubtask(id) {
        try {
            await database.deleteFromTable('subtasks', 'id', id);
        } catch(err) {
            throw(err);
        }
    }
}

module.exports = Subtasks;