import axios from "axios";

import Subtask from "./Subtask";

class Task {
    constructor(obj) {
        for(let key in obj) {
            this[key] = obj[key];
        }
        if(this.type === "Important") this.taskPic = '/images/imp_chosen.png';
        else this.taskPic = '/images/imp_not_chosen.png';
    }
    async changeType(type) {
        try {
            await axios.patch('/tasks/update/type', {task_id: this.task_id, type: type})
            this.type = type;
            if(type === "Important") this.taskPic = '/images/imp_chosen.png';
            else this.taskPic = '/images/imp_not_chosen.png';
        } catch(err) {
            throw new Error(err.response.status);
        }
    }
    async finishTask() {
        try {
            await axios.patch('/tasks/finished/task', {task_id: this.task_id, isFinished: !this.isFinished});
            this.isFinished = !this.isFinished;
            if(this.subtasks) {
                for(let subtask of this.subtasks) {
                    subtask.isFinished = this.isFinished;
                }
            }
        } catch(err) {
            throw new Error(err.response.status);
        }
    }
    async deleteTask() {
        try {
            let res = await axios.delete('/tasks/delete/task', {data: this});
            return res.data;
        } catch(err) {
            throw new Error(err.response.status);
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
        try {
            this.uploadNote(this.note);
        } catch(err) {
            throw err;
        }
    }
    async editTask(text) {
        try {
            await axios.patch('/tasks/edit/task', {text: text, task_id: this.task_id});
            this.text = text;
        } catch(err) {
            throw new Error(err.response.status);
        }
    }
    async uploadNote(note) {
        try {
            await axios.patch('/tasks/upload/note', {newNote: note, task_id: this.task_id});
        } catch(err) {
            throw new Error(err.response.status);
        }
    }
    async loadSubtasks() {
        try {
            let subtasks = await axios.get('/tasks/load/subtasks', {params: {task_id: this.task_id}});
            this.subtasks = [];
            for(let subtask of subtasks.data) {
                this.subtasks.push(new Subtask(subtask));
            }
        } catch(err) {
            throw new Error(err.response.status);
        }
    }
    async addSubtask(subtask) {
        try {
            let newSubtask = await axios.post('/tasks/new/subtask', {task_id: this.task_id, subtask: subtask});
            this.subtasks.push(new Subtask(newSubtask.data));
        } catch(err) {
            throw new Error(err.response.status);
        }
    }
    deleteSubtask(index) {
        if(this.subtasks) this.subtasks.splice(index, 1);
    }
}

export default Task;