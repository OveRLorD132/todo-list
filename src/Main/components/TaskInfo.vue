<template>
    <div id="taskInfContainer" v-if="chosenTask">
        <slot></slot>
        <template v-if="chosenTask.subtasks">
            <subtask-component v-for="(subtask, index) of chosenTask.subtasks" :key="index" :subtask="subtask"
             :index="index" @subtask-completed="emitCompleted"
            />
        </template>
        <subtask-input @new-subtask="emitSubtask" :chosen-task="chosenTask"/>
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
        chosenTask: Object,
    },
    emits: {
        "new-subtask": (subtask) => typeof subtask === "object" && subtask !== null,
        'subtask-completed': null,
    },
    methods: {
        emitSubtask(subtask) {
            this.$emit('new-subtask', subtask);
        },
        emitCompleted(index) {
            this.$emit('subtask-completed', {index: index});
        }
    }
    
}
</script>

<style>

</style>