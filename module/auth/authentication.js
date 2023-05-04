let bcrypt = require('bcrypt');
let Database = require('../db/mysql');

let Password = require('../Password');

let database = new Database();

async function registration(user) {
    return new Promise(async (resolve, reject) => {
        try {
            user.password = await Password.prototype.hash(user.password);
            await database.addUser(user);
            resolve(database.selectLastInsert())
        } catch(err) {
            reject(err);
        }
    });
}

async function logIn(username, password, done) {
    try {
        let user = await database.getByUsername(username);
        try {
            let match = await Password.prototype.comparePassword(password, user.password);
            if(!match) return done(0, false, {message: 'Incorrect password.'});
            if(match){
                delete user.password;
                return done(0, user);
            }
        } catch(err) {
            return done(err);
        }
    } catch(err) {
        return done(0, false, {message: `This user doesn't exist`});
    }
}

module.exports = { registration, logIn };