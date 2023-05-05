<template>
    <div id="inputContainer">
        <form @submit.prevent="addSubtask">
            <input id="subtaskInput" type="text" placeholder="Enter subtask..." name="subtasl" v-model="newSubtask" />
        </form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    props: {
        chosenTask: Object,
    },
    data() {
        return {
            newSubtask: ""
        }
    },
    methods: {
        async addSubtask() {
            if(this.newSubtask === "") return
            try {
                let subtask = await axios.post('/tasks/new/subtask', {task_id: this.chosenTask.task_id, subtask: this.newSubtask});
                this.chosenTask.addSubtask(subtask.data);
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