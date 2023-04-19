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
    addUser(user) {
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
    getByUsername(name) {
        return new Promise((resolve, reject) => {
            this.db.query(`SELECT * FROM users WHERE username = ?`, [name], (err, user) => {
                if(err) reject(err);
                if(user.length === 0) reject(new Error(`User doesn't exist.`));
                resolve(user[0]);
            });
        });
    }
    getById(id) {
        return new Promise((resolve, reject) => {
            this.db.query(`SELECT id, username, e-mail FROM users WHERE id = ?`, [id], (err, user) => {
                if(err) reject(err);
                if(user.length === 0) reject(new Error(`This user doesn't exist.`));
                resolve(user[0]);
            });
        });
    }
    addToList(id, task, type) {
        return new Promise((resolve, reject) => {
            this.db.query(`INSERT INTO tasks (id, text, type) VALUES (?, ?, ?)`, [id, task, type], (err) => {
                if(err) reject(err);
                this.db.query(`SELECT LAST_INSERT_ID()`, (err, lastId) => {
                    if(err) reject(err);
                    console.log(lastId);
                    this.getTaskById(lastId[0][`LAST_INSERT_ID()`]).then((task) => {
                        console.log(task);
                        resolve(task);
                    })
                    .catch((err) => (reject(err)));
                });
            });
        })
    }
    getTaskById(id) {
        return new Promise((resolve, reject) => {
            this.db.query(`SELECT * FROM tasks WHERE task_id = ?`, [id], (err, task) => {
                if(err) reject(err);
                resolve(task[0]);
            });
        });
    }
    loadFromList(id) {
        return new Promise((resolve, reject) => {
            this.db.query(`SELECT * FROM tasks WHERE id = ?`, [id], (err, tasks) => {
                if(err) reject(err);
                resolve(tasks);
            });
        });
    }
    changeType(id, type) {
        return new Promise((resolve, reject) => {
            this.db.query(`UPDATE tasks SET type = ? WHERE task_id = ?`, [type, id], (err) => {
                if(err) reject(err);
                resolve();
            });
        });
    }
}


module.exports = Database;