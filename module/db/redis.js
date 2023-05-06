let Redis = require('ioredis');

class Cache {
    constructor() {
        this.redis = new Redis();
    }
    async cacheUserProfile(obj) {
        let res = await this.redis.hset(obj.username, obj);
        console.log(res);
        return res;
    }
    async getUserProfile(obj) {

    }
}

module.exports = Cache;