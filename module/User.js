let Password = require('./Password');

let Users = require('./Users');


class User {
    constructor(obj) {
        for(let key in obj) {
            this[key] = obj[key];
        }
    }
    async changeUserProperty(property, newValue) {
        try {
            await Users.prototype.changeUserProperty(property, newValue, this.id);
            this[property] = newValue;
        } catch(err) {
            throw err;
        }
    }
    async getPassword() {
        try {
            return await Users.prototype.getPassword(this.id);
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
            await Users.prototype.changeUserProperty('password', hash, this.id);
        } catch(err) {
            throw err;
        }
    }
}

module.exports = User;