<template>
    <div id="taskInfContainer" v-if="chosenTask">
        <slot></slot>
        <subtask-input @new-subtask="emitSubtask"/>
    </div>
</template>

<script>
import SubtaskInput from './SubtaskInput.vue';
export default {
    components: {
        SubtaskInput,
    },
    props: {
        chosenTask: Object,
    },
    methods: {
        emitSubtask(subtask) {
            this.$emit('new-subtask', subtask);
        }
    }
    
}
</script>

<style>

</style>