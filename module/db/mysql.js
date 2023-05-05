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
            this.db.query("INSERT INTO users (username, `e-mail`, password) VALUES (?, ?, ?)", [user.username, user.email, user.password], (err, res) => {
                if(err) {
                    if(/username/.test(err)) reject(new Error('This username is already in use.'));
                    reject(new Error('This email is already in use'));
                }
                resolve(res.insertId);
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
    async getByProperty(table, property, value) {
        return new Promise((resolve, reject) => {
            this.db.query(`SELECT * FROM \`${table}\` WHERE \`${property}\` = ?`, [value], (err, result) => {
                if(err) reject(err);
                resolve(result);
            })
        })
    }
    async changeTableProperty(table, property, value, findProp, findPropValue) {
        return new Promise((resolve, reject) => {
            this.db.query(`UPDATE \`${table}\` SET \`${property}\` = ? WHERE \`${findProp}\` = ?` , [value, findPropValue], (err, res) => {
                if(err) reject(err);
                resolve(res);
            })
        })
    }
    async deleteFromTable(table, findProperty, findPropertyValue) {
        return new Promise((resolve, reject) => {
            this.db.query(`DELETE FROM \`${table}\` WHERE \`${findProperty}\` = ?`, [findPropertyValue], (err, res) => {
                if(err) reject(err);
                resolve(res);
            })
        })
    }
    async getById(id) {
        return new Promise((resolve, reject) => {
            this.db.query(`SELECT * FROM users WHERE id = ?`, [id], (err, user) => {
                if(err) reject(err);
                if(user.length === 0) reject(new Error(`This user doesn't exist.`));
                delete user[0].password;
                resolve(user[0]);
            });
        });
    }
    async getPropertyById(property, id) {
        console.log(arguments);
        return new Promise((resolve, reject) => {
            this.db.query(`SELECT \`${property}\` FROM users WHERE id = ?`, [id], (err, res) => {
                if(err) reject(err);
                resolve(res[0]);
            })
        })
    }
    async changeUserProp(property, newValue, id) {
        console.log(property)
        return new Promise((resolve, reject) => {
            this.db.query(`UPDATE users SET \`${property}\` = ? WHERE id = ?`, [newValue, id], (err) => {
                if(err) reject(err);
                resolve();
            })
        })
    }
    async addTask(user_id, task, type) {
        return new Promise((resolve, reject) => {
            this.db.query(`INSERT INTO tasks (id, text, type) VALUES (?, ?, ?)`, [user_id, task, type], (err, res) => {
                if(err) reject(err);
                resolve(res.insertId);
            })
        })
    }
    async addSubtask(task_id, text) {
        return new Promise((resolve, reject) => {
            this.db.query(`INSERT INTO subtasks (task_id, text) VALUES (?, ?)`, [task_id, text], (err, res) => {
                if(err) reject(err)
                resolve(res.insertId);
            })
        })
    }
    async loadTasks(id) {
        return new Promise((resolve, reject) => {
            this.db.query(`SELECT * FROM tasks WHERE id = ?`, [id], (err, tasks) => {
                if(err) reject(err);
                resolve(tasks);
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
}

module.exports = Database;