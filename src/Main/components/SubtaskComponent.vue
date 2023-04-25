<template>
    <div class="subtask">
        <div class="subtaskLeft">
            <div class="subtaskText">{{subtask.text}}</div>
            <div class="completeButt" @click="subtaskComplete"> Compl</div>
        </div>
        <div class="subtaskDelete" @click="subtaskDelete">
            Delete
        </div>
        </div>
</template>

<script>
export default {
    props: {
        subtask: Object,
        index: Number
    },
    emits: {
        'subtask-completed': (index) => typeof index === "object",
        'subtask-delete': (index) => typeof index === "object",
    },  
    methods: {
        subtaskComplete() {
            this.$emit('subtask-completed', {index: this.index});
        },
        subtaskDelete() {
            this.$emit('subtask-delete', {index: this.index});
        }
    }
}
</script>

<style>

</style>