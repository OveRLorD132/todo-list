<template>
    <div class="task">
        <div class="leftContainer">
            <div class="finished" @click.stop="finishTask(task)">
                <img class="doneImg" src="/images/done.png">
            </div>
            <div class="taskText">{{ task.text }}</div>
        </div>
        <div class="buttons">
            <div @click.stop="toImportant(task)"
            @mouseover="changePic(task)"
            @mouseleave="changePic(task)"
            class="toImportantButt"><img id="impImg" :src="task.picSrc"></div>
            <div @click.stop="deleteElem(task)"
                id="deleteButt"><img id="deleteImg" src="/images/delete.png">
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    props: {
        task: Object,
        allTasks: {type: Array, required: true},
        finishedTasks: {type: Array, required: true},
        showTasks: {type: Function, required: true},
    },
    data() {
        return {
            
        }
    },
    methods: {
        toImportant(task) {
            let type;
            if(task.type === "Important") type = "Today";
            else type = "Important";
            axios.patch('/tasks/update/type', {task_id: task.task_id, type: type}).then((response) => {
                if(response.data === "Success.") { 
                    task.type = type;
                    this.showTasks(this.allTasks);
                }
            });
        },
        deleteElem(task) {
            axios.delete('/tasks/delete/task', { data: task}).then((response) => {
                console.log(response);
                for(let ind in this.tasks) {
                    if(this.tasks[ind].task_id === task.task_id) {
                        this.tasks.splice(ind, 1);
                        break;
                    }
                }
            });
        },
        finishTask(task) {
            let isFinished = 1;
            if(task.isFinished) isFinished = 0;
            axios.patch('/tasks/finished/task', {task_id: task.task_id, isFinished: isFinished}).then(response => {
                if(response.data === "Success.") {
                    task.isFinished = isFinished;
                    if(isFinished) this.finishedTasks.push(task);
                    if(!isFinished) {
                        for(let t in this.finishedTasks) {
                            if(this.finishedTasks[t].task_id === task.task_id) this.finishedTasks.splice(t, 1);
                            break;
                        }
                    }
                    this.showTasks(this.allTasks);
                }
            });
        },
        changePic(task) {
            if(task.type === "Important") return;
            if(task.picSrc === "/images/imp_not_chosen.png"){
                task.picSrc = '/images/imp_chosen.png';
                return;
            }
            task.picSrc = "/images/imp_not_chosen.png";
            return;
        },
    }
}
</script>

<style>

</style>