import axios from "axios";

class User {
    constructor(obj) {
        for(let key in obj) {
            this[key] = obj[key];
        }
    }
    async changeNick(nick) {
        await axios.patch('/profile/change/nickname',{nickname: nick});
    }
}

export default User;