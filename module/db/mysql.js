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
    addToList(id, task) {
        this.db.query(`INSERT INTO tasks (id, text) VALUES (?, ?)`, [id, task], (err) => {
            if(err) throw new Error();
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
}


module.exports = Database;