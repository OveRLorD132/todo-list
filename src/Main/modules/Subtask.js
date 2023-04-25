import axios from 'axios';

class Subtask {
    constructor(obj) {
        for(let key in obj) {
            this[key] = obj[key];
        }
    }
    async completeSubtask() {
        let bool = this.isFinished ? 0 : 1;
        let res = await axios.patch('/tasks/completed/subtask', {task_id: this.task_id, bool: bool});
        if(res.data === "Success") this.isFinished = bool;
    }
    async deleteSubtask() {
        let res = await axios.delete(`/tasks/delete/subtask?id=${this.id}`);
    }
}

export default Subtask;
