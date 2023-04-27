let mysql = require('mysql2');

class Database {
    constructor() {
        this.db = mysql.createConnection({
            host: 'localhost',
            user: "root",
            password: "password",
            database: 'todo-list'
        });
    }
    async addUser(user) {
        return new Promise((resolve, reject) => {
            this.db.query("INSERT INTO users (username, `e-mail`, password) VALUES (?, ?, ?)", user, (err) => {
                if(err) {
                    if(/username/.test(err)) reject(new Error('This username is already in use.'));
                    reject(new Error('This email is already in use'));
                }
                resolve();
            });
        });
    }
    async getByUsername(name) {
        return new Promise((resolve, reject) => {
            this.db.query(`SELECT * FROM users WHERE username = ?`, [name], (err, user) => {
                if(err) reject(err);
                if(user.length === 0) reject(new Error(`User doesn't exist.`));
                resolve(user[0]);
            });
        });
    }
    async getById(id) {
        return new Promise((resolve, reject) => {
            this.db.query(`SELECT id, username, e-mail FROM users WHERE id = ?`, [id], (err, user) => {
                if(err) reject(err);
                if(user.length === 0) reject(new Error(`This user doesn't exist.`));
                resolve(user[0]);
            });
        });
    }
    async addToList(id, task, type) {
        return new Promise((resolve, reject) => {
            this.db.query(`INSERT INTO tasks (id, text, type) VALUES (?, ?, ?)`, [id, task, type], async (err) => {
                if(err) reject(err);
                try {
                    let lastId = await this.selectLastInsert();
                    let task = await this.getTaskById(lastId);
                    resolve(task);
                } catch(err) {
                    reject(err);
                }
            });
        })
    }
    async getTaskById(id) {
        return new Promise((resolve, reject) => {
            this.db.query(`SELECT * FROM tasks WHERE task_id = ?`, [id], (err, task) => {
                if(err) reject(err);
                resolve(task[0]);
            });
        });
    }
    async loadFromList(id) {
        return new Promise((resolve, reject) => {
            this.db.query(`SELECT * FROM tasks WHERE id = ?`, [id], (err, tasks) => {
                if(err) reject(err);
                resolve(tasks);
            });
        });
    }
    async changeType(id, type) {
        return new Promise((resolve, reject) => {
            this.db.query(`UPDATE tasks SET type = ? WHERE task_id = ?`, [type, id], (err, res) => {
                if(err) reject(err);
                if(res.affectedRows === 0) reject(new Error("Data missing."));
                resolve();
            });
        });
    }
    async deleteLine(id) {
        return new Promise((resolve, reject) => {
            this.db.query(`DELETE FROM tasks WHERE task_id = ?`, [id], (err, res) => {
                if(err) reject(err);
                if(res.affectedRows === 0) reject(new Error("Data missing."));
                this.clearSubtasks(id);
                resolve();
            });
        });
    }
    async setFinished(id, bool) {
        console.log(bool);
        return new Promise((resolve, reject) => {
            this.db.query(`UPDATE tasks SET isFinished = ? WHERE task_id = ?`, [bool ,id], (err, res) => {
                if(err) reject(err);
                if(res.affectedRows === 0) reject(new Error("Data missing."));
                resolve();
            })
        });
    }
    async insertSubtask(task_id, text) {
        return new Promise((resolve, reject) => {
            this.db.query(`INSERT INTO subtasks SET task_id = ?, text = ?`, [task_id, text], async (err) => {
                if(err) reject(err);
                try {
                    let lastId = await this.selectLastInsert();
                    console.log(lastId);
                    let subtask = await this.getSubtask(lastId)
                    console.log(subtask);
                    //let subtask = await this.getSubtasksById(task_id);
                    resolve(subtask);
                } catch (err) {
                    reject(err);
                }
            });
        });
    }
    async getSubtasksById(task_id) {
        return new Promise((resolve, reject) => {
            this.db.query(`SELECT * FROM subtasks WHERE task_id = ?`, [task_id], (err, result) => {
                if(err) reject(err);
                resolve(result);
            });
        });
    }
    async selectLastInsert() {
        return new Promise((resolve, reject) => {
            this.db.query(`SELECT LAST_INSERT_ID()`, (err, lastId) => {
                if(err) reject(err);
                resolve(lastId[0][`LAST_INSERT_ID()`]);
            });
        });
    }
    async getSubtask(id) {
        console.log(id);
        return new Promise((resolve, reject) => {
            this.db.query(`SELECT * FROM subtasks WHERE id = ?`, [id], (err, subtask) => {
                if(err) reject(err);
                resolve(subtask[0]);
            });
        });
    }
    async completeSubtask(id, bool) {
        return new Promise((resolve, reject) => {
            this.db.query(`UPDATE subtasks SET isFinished = ? WHERE id = ?`, [bool, id], (err, res) => {
                if(err) reject(err);
                if(res.affectedRows === 0) reject(new Error("Data missing."));
                resolve();
            });
        });
    }
    async deleteSubtask(id) {
        return new Promise((resolve, reject) => {
            this.db.query(`DELETE FROM subtasks WHERE id = ?`, [id], (err, res) => {
                if(err) reject(err);
                if(res.affectedRows === 0) reject(new Error("Data missing."));
                resolve();
            });
        });
    }
    async clearSubtasks(task_id) {
        return new Promise((resolve, reject) => {
            this.db.query(`DELETE FROM subtasks WHERE task_id = ?`, [task_id], (err) => {
                if(err) reject(err);
                resolve();
            })
        })
    }
    async addNote(note, id) {
        return new Promise((resolve, reject) => {
            this.db.query(`UPDATE tasks SET note = ? WHERE task_id = ?`, [note, id], (err) => {
                if(err) reject(err);
                resolve();
            })
        })
    }
}


module.exports = Database;