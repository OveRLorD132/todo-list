<template>
    <error-component :error-message-is-visible="errorMessageIsVisible" @hide-error-message="hideErrorMessage"></error-component>
    <div id="line">
        <div id="searchCont"><form @submit.prevent>
            <input type="text" name="search" v-model="searchTasks" id="search">
        </form>
            <div id="errorButt"><button @click="showErrorMessage">Error</button></div>
        </div>
    </div>
    <div id="container">
        <panel @toggle-button="toggleButton" 
        :curr-channel="currChannel" 
        ref="panel" :change-channel="changeChannel">
        </panel>
        <div id="tasksContainer">
            <div id="taskLabel">
                <div v-if="buttIsVisible" @click="AddPanel"><img id="menuImg" src="/images/menu.png"></div> 
                <div id="label"> Tasks</div>
            </div>
            <form-compoment :all-tasks="allTasks" :tasks="tasks"
            :curr-channel="currChannel" ref="form">
            </form-compoment>
            <div id="tasks">
                <div 
                v-for="(task, ind) in filteredTasks" :key="ind" class="task"
                @click="showInfo(task)">
                    <div class="leftContainer">
                        <div class="finished" @click.stop="finishTask(task)">
                            <img class="doneImg" src="/images/done.png">
                        </div>
                        <div class="taskText">{{ task.text }}</div>
                    </div>
                    <div class="buttons">
                        <div @click.stop="toImportant(task)"
                        @mouseover="changePic(task)"
                        @mouseleave="restorePic(task)"
                        class="toImportantButt"><img id="impImg" :src="task.picSrc"></div>
                        <div @click.stop="deleteElem(task)"
                        id="deleteButt"><img id="deleteImg" src="/images/delete.png"></div>
                    </div>
                </div>
            </div>
            <div v-if="finishedTasks.length > 0"
            @click="showFinishedTasks"
            id="finishedTasksContainer">
                <div id="finishedTasksLabel">
                    <div> Finished Tasks</div>
                    <div>{{ finishedTasks.length }}</div>
                </div>
            </div>
            <div id="finishedTasksList" v-if="finishedTasksIsVisible">
                <div v-for="(task, index) in finishedTasks" :key="index"
                class="task"
                @click="showInfo(task)">
                <div class="leftContainer">
                        <div class="finished" @click.stop="finishTask(task)">
                            <img class="doneImg" src="/images/done.png">
                        </div>
                        <div class="taskText">{{ task.text }}</div>
                    </div>
                    <div class="buttons">
                        <div @click.stop="toImportant(task)"
                        @mouseover="changePic(task)"
                        @mouseleave="restorePic(task)"
                        class="toImportantButt"><img id="impImg" :src="task.picSrc"></div>
                        <div @click.stop="deleteElem(task)"
                        id="deleteButt"><img id="deleteImg" src="/images/delete.png"></div>
                    </div>
                </div>
            </div>
        </div>
        <div id="taskInfContainer" v-if="chosenTask">
            <task :task="chosenTask" :finished-tasks="finishedTasks"
            :all-tasks="allTasks" :show-tasks="showTasks">
            </task>
        </div>
    </div>
</template>

<script>
import ErrorComponent from './components/ErrorComponent.vue';
import Panel from './components/Panel.vue';
import FormCompoment from './components/FormCompoment.vue';
import Task from './components/Task.vue';
import VueAnimations from './VueAnimations';
import axios from 'axios';
export default {
    mixins: [VueAnimations],
    components: {
        ErrorComponent,
        Panel,
        FormCompoment,
        Task
    },
    data() {
        return {
            allTasks: [],
            tasks: [],
            filteredTasks: [],
            buttIsVisible: true,
            chosenTask: null,
            currChannel: 'Today',
            finishedTasks: [],
            finishedTasksIsVisible: false,
            searchTasks: "",
        }
    },
    created() {
        axios.get('/tasks/load/task').then((tasks) => {
            this.allTasks = Array.from(tasks.data);
            for(let task of this.allTasks) {
                if(task.isFinished) this.finishedTasks.push(task);
            }
            tasks = tasks.data;
            this.showTasks(tasks);
            this.filteredTasks = this.tasks;
        });
    },
    methods: {
        changeChannel(channel) {
            //console.log(channel.srcElement.innerHTML);
            let elemChannel = channel.srcElement.innerHTML;
            if(elemChannel !== this.currChannel){
                this.currChannel = elemChannel;
                this.showTasks(this.allTasks);
                this.$refs.form.hideSubmit();
            }
        },
        showTasks(tasks) {
            this.tasks = tasks.filter(task => {
                if(task.type !== "Important") task.picSrc = "/images/imp_not_chosen.png";
                else if(task.type === "Important") task.picSrc = "/images/imp_chosen.png";
                if(task.isFinished) return false;
                if(this.currChannel !== "All tasks") return task.type == this.currChannel;
                return task;
            });
            this.finishedTasks = tasks.filter(task => {
                if(!task.isFinished) return false;
                if(this.currChannel !== "All tasks") return task.type == this.currChannel;
                return task;
            });
            this.filteredTasks = this.tasks;
            this.searchTasks = "";
        },
        showInfo(task) {
            this.chosenTask = task;
            task.isChosen = true;
        },
        showFinishedTasks() {
            this.finishedTasksIsVisible = !this.finishedTasksIsVisible;
        },
        hideErrorMessage() {
            this.errorMessageIsVisible = false;
        },
        toggleButton() {
            this.buttIsVisible = !this.buttIsVisible;
        },
        AddPanel() {
            this.$refs.panel.AddPanel();
        },
        toImportant(task) {
            let type;
            if(task.type === "Important") type = "Today";
            else type = "Important";
            axios.patch('/tasks/update/type', {task_id: task.task_id, type: type}).then((response) => {
                if(response.data === "Success.") { 
                    task.type = type;
                    this.showTasks(this.allTasks);
                }
            });
        },
        deleteElem(task) {
            axios.delete('/tasks/delete/task', { data: task}).then((response) => {
                console.log(response);
                for(let ind in this.tasks) {
                    if(this.tasks[ind].task_id === task.task_id) {
                        this.tasks.splice(ind, 1);
                        break;
                    }
                }
            });
        },
        finishTask(task) {
            let isFinished = 1;
            if(task.isFinished) isFinished = 0;
            axios.patch('/tasks/finished/task', {task_id: task.task_id, isFinished: isFinished}).then(response => {
                if(response.data === "Success.") {
                    task.isFinished = isFinished;
                    if(isFinished) this.finishedTasks.push(task);
                    if(!isFinished) {
                        for(let t in this.finishedTasks) {
                            if(this.finishedTasks[t].task_id === task.task_id) this.finishedTasks.splice(t, 1);
                            break;
                        }
                    }
                    this.showTasks(this.allTasks);
                }
            });
        },
        changePic(task) {
            if(task.type === "Important") return;
            if(task.picSrc === "/images/imp_not_chosen.png"){
                task.picSrc = '/images/imp_chosen.png';
                return;
            }
            task.picSrc = "/images/imp_not_chosen.png";
            return;
        },
    },
    watch: {
            searchTasks(newReq) {
                console.log(newReq)
                if(newReq !== "") this.filteredTasks = this.tasks.filter(task => {
                    //console.log(task.text.toLowerCase().indexOf(newReq.toLowerCase()));
                    return task.text.toLowerCase().indexOf(newReq.toLowerCase()) !== -1;
                });
                else this.filteredTasks = this.tasks;
            }
        }  
}

</script>

<style>

</style>