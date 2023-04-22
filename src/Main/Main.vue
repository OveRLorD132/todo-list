<template>
    <div class="errorMessage" v-if="errorMessageIsVisible">
        <div class="errorContainer">
            <div class="errorText">ERROR: Something's wrong</div>
            <button class="OKButt" @click="hideErrorMessage">OK</button>
        </div>
    </div>
    <div id="line">
        <div id="searchCont"><form @submit.prevent>
            <input type="text" name="search" v-model="searchTasks" id="search">
        </form>
        <div id="errorButt"><button @click="showErrorMessage">Error</button></div>
    </div>
    </div>
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
                    :style="{backgroundColor: currChannel === channel ? '#BCF4E7' : 'transparent' }"
                    @click="changeChannel"
                    class="channel">{{ channel }}</div>
                </div>
            </div>
        </div>
        <div id="tasksContainer">
            <div id="taskLabel">
                <div v-if="buttIsVisible" @click="AddPanel"><img id="menuImg" src="/images/menu.png"></div> 
                <div id="label"> Tasks</div>
            </div>
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
            <div class="taskInf">
                <div class="finished" @click.stop="finishTask(chosenTask)">
                    <img class="doneImg" src="/images/done.png">
                </div>
                <div class="taskText">{{ chosenTask.text }}</div>
                <div class="buttons">
                    <div @click.stop="toImportant(chosenTask)"
                    @mouseover="changePic(chosenTask)"
                    @mouseleave="restorePic(chosenTask)"
                    class="toImportantButt">
                        <img id="impImg" :src="chosenTask.picSrc">
                    </div>
                </div>
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
            allTasks: [],
            tasks: [],
            filteredTasks: [],
            submitIsVisible: false,
            height: 55,
            panelIsVisible: false,
            buttIsVisible: true,
            chosenTask: null,
            channels: ['Today', 'Important', 'All tasks'],
            currChannel: 'Today',
            finishedTasks: [],
            finishedTasksIsVisible: false,
            searchTasks: "",
            errorMessageIsVisible: false,
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
        addTask() {
            if(this.newTask !== "") {
                console.log(this.currChannel);
                axios.post('/tasks/new/task', {text: this.newTask, type: this.currChannel}).then((response) => {
                    this.newTask = "";
                    if(response.data.type !== "Important") response.data.picSrc = '/images/imp_not_chosen.png';
                    else if(response.data.type === "Important") response.data.picSrc = "/images/imp_chosen.png";
                    if(response.data.isFinished) this.finishedTasks.push(response.data);
                    else this.tasks.push(response.data);
                    this.allTasks.push(response.data);
                    console.log(this.allTasks);
                }).catch((err) => (console.log(err)))
            }
        },
        onFormSelect() {
            this.submitIsVisible = true;
            if(this.height !== 110) this.height += 55;
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
            if(channel !== this.currChannel) {
                let element = event.target
                element.style.backgroundColor = '#EBEBEB'
            }
        },
        restoreColor(channel) {
            if(channel !== this.currChannel) {
                let element = event.target
                element.style.backgroundColor = '#ffffff';
            }
        },
        hideSubmit() {
            this.submitIsVisible = false;
            if(this.height > 55) this.height -= 55;
        },
        changeChannel(channel) {
            //console.log(channel.srcElement.innerHTML);
            let elemChannel = channel.srcElement.innerHTML;
            if(elemChannel !== this.currChannel){
                this.currChannel = elemChannel;
                this.showTasks(this.allTasks);
                this.hideSubmit();
            }
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
        showTasks(tasks) {
            this.tasks = tasks.filter(task => {
                console.log(task);
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
            if(task)
            if(task.type !== "Important") task.picSrc = '/images/imp_chosen.png'
        },
        restorePic(task) {
            if(task.type !== "Important") task.picSrc = "/images/imp_not_chosen.png";
        },
        showFinishedTasks() {
            console.log(this.finishedTasksIsVisible)
            if(this.finishedTasksIsVisible === true) {
                this.finishedTasksIsVisible = false;
                return;
            }
            if(this.finishedTasksIsVisible === false) {
                this.finishedTasksIsVisible = true;
                return;
            }
        },
        showErrorMessage() {
            this.errorMessageIsVisible = true;
        },
        hideErrorMessage() {
            this.errorMessageIsVisible = false;
        }
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