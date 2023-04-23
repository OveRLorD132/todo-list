<template>
    <div id="subtaskInput">
        <form @submit.prevent="addSubtask">
            <input type="text" placeholder="Enter subtask..." name="subtasl" v-model="newSubtask" />
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newSubtask: ""
        }
    },
    methods: {
        addSubtask() {
            this.$emit('new-subtask', this.newSubtask);
        }
    }
}
</script>

<style>

</style>