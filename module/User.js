let Database = require('./db/mysql');

let Password = require('./Password');

let database = new Database();

class User {
    constructor(obj) {
        for(let key in obj) {
            this[key] = obj[key];
        }
    }
    async changeUserProperty(property, newValue) {
        try {
            await database.changeUserProp(property, newValue, this.id);
            this[property] = newValue;
            console.log(this);
        } catch(err) {
            throw err;
        }
    }
    async getPassword() {
        try {
            return await database.getPropertyById('password', this.id);
        } catch(err) {
            throw err;
        }
    } 
    async changePassword(oldPassword, newPassword) {
        try {
            let result = await this.getPassword();   
            let match = await Password.prototype.comparePassword(oldPassword, result.password);
            if(!match) throw new Error('Incorrect password.');
            let hash = await Password.prototype.hash(newPassword);
            await database.changeUserProp('password', hash, this.id);
        } catch(err) {
            throw err;
        }
    }
}

module.exports = User;