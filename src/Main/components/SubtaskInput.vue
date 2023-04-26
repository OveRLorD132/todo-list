<template>
    <div id="inputContainer">
        <form @submit.prevent="addSubtask">
            <input id="subtaskInput" type="text" placeholder="Enter subtask..." name="subtasl" v-model="newSubtask" />
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import Subtask from '../modules/Subtask';
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
            if(this.newSubtask === "") return
            try {
                let subtask = await axios.post('/tasks/new/subtask', {task_id: this.chosenTask.task_id, subtask: this.newSubtask});
                subtask = new Subtask(subtask.data);
                console.log(subtask);
                this.$emit('new-subtask', subtask);
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