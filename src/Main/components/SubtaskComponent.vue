<template>
    <div class="subtask">
        <div class="subtaskLeft">
            <div class="subtaskText">{{subtask.text}}</div>
            <div class="completeButt" @click="completeSubtask"> Compl</div>
        </div>
        <div class="subtaskDelete" @click="deleteSubtask">
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
        'subtask-completed': (index) => typeof index === "Object",
        'subtask-delete': (index) => typeof index === "Object",
    },  
    methods: {
        completeSubtask() {
            this.$emit('subtask-completed', {index: this.index});
        },
        deleteSubtask() {
            this.$emit('subtask-delete', {index: this.index});
        }
    }
}
</script>

<style>

</style>