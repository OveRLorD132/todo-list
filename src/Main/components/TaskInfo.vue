<template>
    <div id="taskInfContainer" v-if="chosenTask">
        <div id="mainBlock">
            <div id="closeCont">
                <div id="infLabel">Task:</div>
                <button id="closeButt" @click="closeInf">Close</button>
            </div>
            <div id="taskBlock">
                <slot></slot>
                <template v-if="chosenTask.subtasks">
                    <subtask-component v-for="(subtask, index) of chosenTask.subtasks" :key="index" :subtask="subtask"
                      :index="index" @subtask-completed="emitCompleted" @subtask-delete="emitDelete" :chosen-task="chosenTask"
                    />
                </template>
            </div>
            <subtask-input @new-subtask="emitSubtask" :chosen-task="chosenTask"/>
        </div>
        <div id="buttContainer"><button id="deleteTaskButt" @click="taskDelete">Delete</button></div>
    </div>
        
</template>

<script>
import SubtaskComponent from './SubtaskComponent.vue';
import SubtaskInput from './SubtaskInput.vue';
export default {
    components: {
    SubtaskInput,
    SubtaskComponent
},
    props: {
        chosenTask: null,
    },
    emits: {
        "new-subtask": (subtask) => typeof subtask === "object" && subtask !== null,
        'subtask-completed': (index) => typeof index === "object",
        "subtask-delete": (index) => typeof index === "object",
        'close-inf': null,
    },
    methods: {
        emitSubtask(subtask) {
            this.$emit('new-subtask', subtask);
        },
        emitCompleted(index) {
            this.$emit('subtask-completed', {index: index.index});
        },
        emitDelete(index) {
            this.$emit('subtask-delete', {index: index.index});
        },
        closeInf() {
            this.$emit('close-inf');
        },
        taskDelete() {
            this.chosenTask.deleteTask();
            this.$emit('delete-task');
        }
    }
    
}
</script>

<style scoped>
</style>