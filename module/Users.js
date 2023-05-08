let Database = require('./db/mysql');

let Cache = require('./db/redis');

let cache = new Cache();

let database = new Database();

class Users {
    async changeUserProperty(property, propValue, id) {
        try {
            let res = await database.changeTableProperty('users', property, propValue, 'id', id);
            cache.changeCachedProperty(id, property, propValue);
            return res;
        } catch(err) {
            throw err;
        }
    }
    async getPassword(id) {
        try {
            return await database.getTableProperty('users', 'password', 'id', id)
        } catch(err) {
            throw err;
        }
    }
    async getUserProfile(id) {
        try {
            let profile = await cache.getUserProfile(id);
            if(Object.keys(profile).length === 0) {
                profile = await database.getByProperty('users', 'id',  id);
                await cache.cacheUserProfile(profile[0]);
            }
            return profile;
        } catch(err) {
            throw err;
        }
    }
}

module.exports = Users;