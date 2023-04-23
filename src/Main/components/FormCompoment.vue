<template>
    <div id="mainContainer" :style="{ height: height + 'px'}">
        <div id="form">
            <form @submit.prevent="addTask" @click="onFormSelect">
                <input v-model="newTask" type="text" name="task" placeholder="Add new task..." id="taskInput">
                <div v-if="submitIsVisible" id="submitContainer">
                    <hr style="margin-top: 0; margin-bottom: 0.4vh; padding: 0; margin-right: -5vh; border-color: #f7f7f7;">
                    <input type="submit" value="Enter">
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { getTransitionRawChildren } from 'vue';
export default {
    data() {
        return {
            newTask: "",
            height: 55,
            submitIsVisible: false,
        }
    },
    props: {
        currChannel: String,
    },
    methods: {
        addTask() {
            if(this.newTask !== "") {
                axios.post('/tasks/new/task', {text: this.newTask, type: this.currChannel}).then((response) => {
                    this.newTask = "";
                    if(response.data.type !== "Important") response.data.picSrc = '/images/imp_not_chosen.png';
                    else if(response.data.type === "Important") response.data.picSrc = "/images/imp_chosen.png";
                    this.$emit('newTask', response.data);
                }).catch((err) => (console.log(err)))
            }
        },
        onFormSelect() {
            this.submitIsVisible = true;
            if(this.height !== 110) this.height += 55;
        },
        hideSubmit() {
            this.submitIsVisible = false;
            if(this.height > 55) this.height -= 55;
        },
    }
}
</script>

<style>

</style>