<template>
    <div id="taskInfContainer" v-if="chosenTask">
        <div id="mainBlock">
            <div id="closeCont">
                <div id="infLabel">Task:</div>
                <button id="closeButt" @click="closeInf">Close</button>
            </div>
            <div id="taskBlock" :style="{backgroundColor: chosenTask.subtasks.length > 0 ? '#F9F9F9' : '#ffffff'}">
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
        'task-error': ({operation, src, code}) => {
            if( typeof operation !== "string" || typeof code !== "number" || typeof src !== "string") return false;
            else return true;
        },
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
        async taskDelete() {
            let res = await this.chosenTask.deleteTask();
            if(res === 404) this.$emit('task-error', {operation: 'deleting', src: 'task', code: 404});
            else this.$emit('delete-task');
        },
    }
    
}
</script>

<style scoped>
</style>