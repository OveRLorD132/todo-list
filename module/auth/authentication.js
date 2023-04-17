let bcrypt = require('bcrypt');
let Database = require('../db/mysql');

let database = new Database();

function registration(req) {
    return new Promise((resolve, reject) => {
        let user = req.body;
        if(req.body.username === '' || req.body.password === "" || req.body[`e-mail`] === "") reject(new Error('Forms cannot be empty!'))
        bcrypt.genSalt(11, (err, salt) => {
            if(err) reject(err);
            bcrypt.hash(user.password, salt, (err, hash) => {
                if(err) reject(err);
                let newUser = [user.username, user[`e-mail`], hash];
                database.addUser(newUser)
                    .then(() => {
                        database.getByUsername(user.username).then((result) => {
                            delete result.password;
                            resolve(result);
                        })
                    })
                    .catch((err) => {
                        reject(err);
                    })
            });
        })
    });
}

function logIn(username, password, done) {
    console.log(username);
    database.getByUsername(username)
        .then((user) => {
            bcrypt.compare(password, user.password, (err, res) => {
                console.log(res);
                if(err) return done(err);
                if(!res) return done(0, false);
                delete user.password;
                console.log(user);
                return done(0, user);
            });
        })
        .catch(err => {
            console.log(err);
            return done(0, false);
        });
}

module.exports = { registration, logIn };