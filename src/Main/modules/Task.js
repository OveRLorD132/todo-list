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
        if(res.data === "Success") this.type = type;
        if(res.status = 404) return new Error();
    }
    async finishTask() {
        try {
            await axios.patch('/tasks/finished/task', {task_id: this.task_id, isFinished: !this.isFinished});
            this.isFinished = !this.isFinished;
            for(let subtask of this.subtasks) {
                subtask.isFinished = this.isFinished;
            }
            return "Success";
        } catch(err) {
            console.log(err);
            return 404;
        }
    }
    async deleteTask() {
        try {
            let res = await axios.delete('/tasks/delete/task', {data: this});
            return res.data;
        } catch(err) {
            return err.response.status
        }
    }
    changePic() {
        if(this.type !== "Important") this.taskPic = '/images/imp_chosen.png'; 
    }
    restorePic() {
        if(this.type !== "Important") this.taskPic = '/images/imp_not_chosen.png';
    }
    setNote(newNote) {
        if(newNote === this.note) return;
        this.note = newNote;
        this.uploadNote(this.note);
    }
    async uploadNote(note) {
        try {
            console.log(this.task_id);
            let res = await axios.patch('/tasks/upload/note', {newNote: note, task_id: this.task_id});
        } catch(err) {
            console.log(err);
        }
    }
}

export default Task;