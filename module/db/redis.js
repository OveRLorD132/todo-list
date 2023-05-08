let Redis = require('ioredis');

class Cache {
    constructor() {
        this.redis = new Redis();
    }
    async cacheUserProfile(obj) {
        console.log(obj);
        let res = await this.redis.hset(obj.id, obj);
        return res;
    }
    async changeCachedProperty(id, property, newValue) {
        try {
            await this.redis.hset(id, property, newValue);
        } catch(err) {
            throw err;
        }
    }
    async getUserProfile(id) {
        let res = await this.redis.hgetall(id);
        return res;
    }
    async cacheTaskId(task_id) {
        await this.redis.sadd('task_ids', task_id);
    }
    async getTaskId(task_id) {
        let result = await this.redis.sismember('task_ids', task_id);
        if(result) return task_id;
        return null;
    }
    async deleteCachedId(task_id){
        await this.redis.srem('task_ids', task_id);
    }
}

module.exports = Cache;