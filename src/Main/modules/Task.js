import axios from "axios";

class Task {
    constructor(obj) {
        for(let key in obj) {
            this[key] = obj[key];
        }
        if(this.type === "Important") this.taskPic = '/images/imp_chosen.png';
        else this.taskPic = '/images/imp_not_chosen.png';
    }
    async changeType(type) {
        if(type === "Important") this.taskPic = '/images/imp_chosen.png';
        else this.taskPic = '/images/imp_not_chosen.png';
        let res = await axios.patch('/tasks/update/type', {task_id: this.task_id, type: type})
        if(res.data === "Success.") this.type = type;
        console.log(this);
    }
    async finishTask() {
        let res = await axios.patch('/tasks/finished/task', {task_id: this.task_id, isFinished: !this.isFinished});
        if(res.data === "Success.") this.isFinished = !this.isFinished;
        console.log(this);
    }
    async deleteTask() {
        let res = await axios.delete('/tasks/delete/task', {data: this});
        return res;
    }
    changePic() {
        if(this.type !== "Important") this.taskPic = '/images/imp_chosen.png'; 
    }
    restorePic() {
        if(this.type !== "Important") this.taskPic = '/images/imp_not_chosen.png';
    }
}

export default Task;