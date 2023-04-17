<template>
    <div id="tasks">
        <div v-for="(task, ind) in tasks" :key="ind" class="task">{{ task }}</div>
    </div>
    <form @submit.prevent="addTask">
        <input v-model="newTask" type="text" name="task" placeholder="Add new task..." id="taskInput">
        <input type="submit" value="Enter">
    </form>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            newTask: "",
            tasks: []
        }
    },
    created() {
        axios.get('/tasks/load/task')
            .then((tasks) => {
                for(let task of tasks.data) {
                    this.tasks.push(task.text);
                }
            });
    },
    methods: {
        addTask() {
            if(this.newTask !== "") {
                axios.post('/tasks/new/task', {task: this.newTask})
                    .then((response) => {
                        this.newTask = "";
                        console.log(response);
                        this.tasks.push(response.data);
                    });
            }
        }
    }
}
</script>

<style>

</style>