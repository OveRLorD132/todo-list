let bcrypt = require('bcrypt');

class Password {
    async hash(password) {
        try { 
            let salt = await bcrypt.genSalt(11);
            let hash = await bcrypt.hash(password, salt);
            return hash;
        } catch(err) {
            throw err;
        }
    }
    async comparePassword(password, hash) {
        try {
            let match = bcrypt.compare(password, hash);
            return match;
        } catch(err) {
            throw err;
        }
    }
}

module.exports = Password;