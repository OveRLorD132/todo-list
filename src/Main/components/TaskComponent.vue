<template>
    <div>
        <div class="leftContainer">
            <div class="finished" @click.stop="finishTask(task, index)">
                <img class="doneImg" src="/images/done.png">
            </div>
            <div class="taskText">{{ task.text }}</div>
        </div>
        <div class="buttons">
            <div @click.stop="toImportant(task)"
            @mouseover.stop="changePic(task)"
            @mouseleave.stop="restorePic(task)"
            class="toImportantButt"><img id="impImg" :src="task.taskPic"></div>
            <div @click.stop="deleteElem(task, index)" v-show="buttVisible"
                id="deleteButt"><img id="deleteImg" src="/images/delete.png">
            </div>
            <template v-if="task === chosenTask && task.subtasks">
                <subtask-component v-for="(subtask, index) in task.subtasks" 
                    :subtask="subtask" :chosen-task="chosenTask" :index="index"
                    >
                </subtask-component>
            </template>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import SubtaskComponent from './SubtaskComponent.vue';
export default {
    components: {
        SubtaskComponent,
    },
    props: {
        task: Object,
        index: Number,
        buttVisible: {Boolean, default: true},
        chosenTask: Object,
    },
    
    methods: {
        async toImportant(task) {
            this.$emit('important', {task: task});
        },
        async deleteElem(task, index) {
            let res = await task.deleteTask();
            if(res.data === "Success.") this.$emit('task-deleted', {task: task, index: index})
        },
        async finishTask(task, index) {
            await task.finishTask();
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