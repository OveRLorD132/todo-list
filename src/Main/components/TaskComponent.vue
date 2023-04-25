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
            class="toImportantButt"><img id="impImg" :src="task.taskPic"></div>
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
        async deleteElem(task, index) {
            let res = await task.deleteTask();
            if(res.data === "Success.") this.$emit('task-deleted', {task: task, index: index})
        },
        async finishTask(task, index) {
            await task.finishTask();
            console.log(task);
            this.$emit('toggle-finishing', {task: task, index: index});
        },
        changePic(task) {
            task.changePic();
        },
        restorePic(task) {
            task.restorePic();
        }
    }
}
</script>

<style>

</style>