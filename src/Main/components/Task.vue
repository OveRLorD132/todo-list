<template>
    <div>
        <div class="leftContainer">
            <div class="finished" @click.stop="finishTask(task, index)">
                <img class="doneImg" src="/images/done.png">
            </div>
            <div class="taskText">{{ task.text }}</div>
        </div>
        <div class="buttons">
            <div @click.stop="toImportant(task, index)"
            @mouseover.stop="changePic(task)"
            @mouseleave.stop="restorePic(task)"
            class="toImportantButt"><img id="impImg" :src="task.picSrc"></div>
            <div @click.stop="deleteElem(task, index)"
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
        index: Number,
    },
    methods: {
        toImportant(task, index) {
            let type;
            if(task.type === "Important") type = "Today";
            else type = "Important";
            axios.patch('/tasks/update/type', {task_id: task.task_id, type: type}).then((response) => {
                task.type = type;
                if(response.data === "Success.") this.$emit('important', {task: task, index: index});
            });
        },
        deleteElem(task, index) {
            axios.delete('/tasks/delete/task', { data: task}).then((response) => {
                if(response.data === "Success.") this.$emit('task-deleted', {task: task, index: index});
            });
        },
        finishTask(task, index) {
            let isFinished = 1;
            if(task.isFinished) isFinished = 0;
            axios.patch('/tasks/finished/task', {task_id: task.task_id, isFinished: isFinished}).then(response => {
                if(response.data === "Success.") {
                    task.isFinished = isFinished;
                    this.$emit('toggle-finishing', {task: task, index: index});
                }
            });
        },
        changePic(task) {
            if(task.type === "Important") return;
            task.picSrc = '/images/imp_chosen.png';
            return;
        },
        restorePic(task) {
            if(task.type === "Important") return;
            task.picSrc = "/images/imp_not_chosen.png";
            return;
        }
    }
}
</script>

<style>

</style>