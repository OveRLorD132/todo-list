<template>
    <div id="subtaskInput">
        <form @submit.prevent="addSubtask">
            <input type="text" placeholder="Enter subtask..." name="subtasl" v-model="newSubtask" />
        </form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    props: {
        chosenTask: Object,
    },
    emits: {
        "new-subtask": (subtask) => typeof subtask === "object" && subtask !== null,
    },
    data() {
        return {
            newSubtask: ""
        }
    },
    methods: {
        async addSubtask() {
            try {
                let subtask = await axios.post('/tasks/new/subtask', {task_id: this.chosenTask.task_id, subtask: this.newSubtask});
                this.$emit('new-subtask', subtask.data);
                this.newSubtask = "";
            } catch(err) {
                console.error(err);
            }
        }
    }
}
</script>

<style>

</style>