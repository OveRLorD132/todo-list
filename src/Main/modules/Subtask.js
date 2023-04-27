import axios from 'axios';

class Subtask {
    constructor(obj) {
        for(let key in obj) {
            this[key] = obj[key];
        }
    }
    async completeSubtask() {
        try {
            let bool = this.isFinished ? 0 : 1;
            let res = await axios.patch('/tasks/completed/subtask', {task_id: this.id, bool: bool});
            if(res.data === "Success") this.isFinished = bool;
            return "Success";
        } catch(err) {
            console.log(err);
            return 404;
        }
    }
    async deleteSubtask() {
        try {
            let res = await axios.delete(`/tasks/delete/subtask?id=${this.id}`);
            if(res.data === "Success") return "Success";
        } catch(err) {
            console.log(err);
            return 404;
        }
    }
}

export default Subtask;
