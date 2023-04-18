<template>
    <div id="container">
        <div v-if="panelIsVisible" id="panelContainer">
            <div id="panel">
                <div @click="AddPanel"><img id="menuImg" src="/images/menu.png"></div>
                <div id="channels">
                    <div 
                    v-for="(channel, index) in channels"
                    :key="index"
                    @mouseover="changeColor(channel)"
                    @mouseleave="restoreColor(channel)"
                    class="channel">{{ channel }}</div>
                </div>
            </div>
        </div>
        <div id="tasksContainer">
            <div id="taskLabel">
                <div v-if="buttIsVisible" @click="AddPanel"><img id="menuImg" src="/images/menu.png"></div> 
                <div id="label"> Tasks</div>
            </div>
            <div id="mainContainer" :style="{ height: height + 'vh'}">
                <div id="form">
                    <form @submit.prevent="addTask" @click="onFormSelect">
                        <input v-model="newTask" type="text" name="task" placeholder="Add new task..." id="taskInput">
                        <div v-if="submitIsVisible" id="submitContainer">
                            <hr style="margin-top: 0; margin-bottom: 0.4vh; padding: 0; margin-right: -4vh; border-color: #ECECEC;">
                        <input type="submit" value="Enter">
                        </div>
                    </form>
                </div>
            </div>
            <div id="tasks">
                <div v-for="(task, ind) in tasks" :key="ind" class="task">{{ task }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            newTask: "",
            tasks: [],
            submitIsVisible: false,
            height: 6,
            panelIsVisible: false,
            buttIsVisible: true,
            channels: ['Today', 'Important', 'All tasks']
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
        },
        onFormSelect() {
            this.submitIsVisible = true;
            if(this.height !== 12) this.height += 6;
            console.log(this.submitIsVisible);
        },
        AddPanel() {
            if(!this.panelIsVisible) { 
                this.panelIsVisible = true;
                this.buttIsVisible = false;
            }
            else{
                this.panelIsVisible = false;
                this.buttIsVisible = true;
            }
        },
        changeColor(channel) {
            let element = event.target
            element.style.backgroundColor = '#EBEBEB'
        },
        restoreColor(channel) {
            let element = event.target
            element.style.backgroundColor = '#ffffff';
        }
    }
}
</script>

<style>

</style>