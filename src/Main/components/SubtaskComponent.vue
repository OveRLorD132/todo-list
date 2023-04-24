<template>
    <div class="subtask">
        <div class="subtaskLeft">
            <div class="subtaskText">{{subtask.text}}</div>
            <div class="completeButt" @click="completeSubtask"> Compl</div>
        </div>
        <div class="subtaskDelete">

        </div>
        </div>
</template>

<script>
export default {
    props: {
        subtask: Object,
        index: Number
    },
    methods: {
        completeSubtask() {
            this.$emit('subtask-completed', this.index);
        }
    }
}
</script>

<style>

</style>