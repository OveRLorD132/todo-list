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
            await axios.patch('/tasks/completed/subtask', {task_id: this.id, bool: bool});
            this.isFinished = bool;
        } catch(err) {
            throw new Error(err.response.status);
        }
    }
    async deleteSubtask() {
        try {
            await axios.delete(`/tasks/delete/subtask?id=${this.id}`);
        } catch(err) {
            throw new Error(err.response.status);
        }
    }
}

export default Subtask;
