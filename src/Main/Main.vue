<template>
    <error-component :error="error" @hide-error-message="hideErrorMessage"></error-component>
    <FlashMessages></FlashMessages>
    <LineComponent>
        <div id="searchCont">
            <form @submit.prevent>
                <input type="text" name="search" v-model="searchTasks" id="search">
            </form>
        </div>
    </LineComponent>
    <div id="container">
        <panel @toggle-button="toggleButton" 
            :curr-channel="currChannel" 
            ref="panel" @change-channel="changeChannel"
        />
        <div id="tasksContainer">
            <div id="taskLabel">
                <div v-if="buttIsVisible" @click="AddPanel"><img id="menuImg" src="/images/menu.png"></div> 
                <div id="label"> Tasks</div>
            </div>
            <form-compoment @new-task="addTask"
            :curr-channel="currChannel" ref="form">
            </form-compoment>
            <div id="tasks">
                <transition-group name="tasks-show">
                    <task-component v-for="(task, ind) in tasks" :key="task.task_id" @click="showInfo(task)" classProp="task"
                        :task="task" :index="ind" @toggle-finishing="toggleFinishing"
                        @task-deleted="handleDeleting" @important="toImportant" :chosen-task="chosenTask"
                        @task-error="errorHandling"
                    />
                </transition-group>
            </div>
            <div v-if="finishedTasks.length > 0"
            @click="showFinishedTasks"
            id="finishedTasksContainer">
                <div id="finishedTasksLabel">
                    <div>Finished Tasks: </div>
                    <div id="finLen"> {{ finishedTasks.length }}</div>
                </div>
            </div>
            <transition-group name="tasks-show">
                <div class="finishedTasksContainer" v-if="finishedTasksIsVisible">
                    <task-component v-for="(task, index) in finishedTasks" :key="task.task_id" :task="task" @click="showInfo(task)"
                        classProp="finishedTask" :index="index" @task-deleted="handleDeleting" @toggle-finishing="toggleFinishing"
                        @important="toImportant" :chosen-task="chosenTask"
                        @task-error="errorHandling" 
                    />
                </div>
            </transition-group>  
        </div>
        <task-info :chosenTask="chosenTask"
          @close-inf="closeInf" @delete-task="chosenTaskDelete"
          @task-error="errorHandling"
        >
            <task-component :task="chosenTask" classProp="taskInf" :buttVisible="false"
                @task-deleted="handleDeleting" @toggle-finishing="toggleFinishing" @task-error="errorHandling"
            />
        </task-info>
    </div>
</template>

<script>
import FlashMessages from '../components/FlashMessages.vue';
import LineComponent from '../components/LineComponent.vue';
import ErrorComponent from './components/ErrorComponent.vue';
import Panel from './components/Panel.vue';
import FormCompoment from './components/FormCompoment.vue';
import TaskComponent from './components/TaskComponent.vue';
import TaskInfo from './components/TaskInfo.vue';
import axios from 'axios';
import Task from './modules/Task';
console.log(Task);
export default {
    components: {
        LineComponent,
        ErrorComponent,
        Panel,
        FormCompoment,
        TaskComponent,
        TaskInfo,
        FlashMessages
    },
    props: {
        buttDisabled: Boolean,
    },
    data() {
        return {
            allTasks: [],
            tasks: [],
            buttIsVisible: true,
            chosenTask: null,
            currChannel: 'Today',
            finishedTasks: [],
            finishedTasksIsVisible: false,
            searchTasks: "",
            error: "",
            panelIsVisible: false,
            buttIsVisible: true,
            isDisabled: true,
        }
    },
    async created() {
        axios.get('/tasks/load/task').then((tasks) => {
            for(let task of tasks.data) {
                task = new Task(task);
                if(task.isFinished) this.finishedTasks.push(task);
                this.allTasks.push(task);
            }
            this.showTasks(this.allTasks);
        });
    },
    methods: {
        changeChannel(channel) {
            if(channel !== this.currChannel){
                this.currChannel = channel;
                this.showTasks(this.allTasks);
                if(this.tasks.indexOf(this.chosenTask) === -1 && this.finishedTasks.indexOf(this.chosenTask) === -1){
                this.chosenTask = "";
                }
                this.$refs.form.hideSubmit();
            }
        },
        showTasks(tasks) {
            this.tasks = tasks.filter(task => {
                if(task.isFinished) return false;
                if(this.currChannel !== "All tasks") return task.type == this.currChannel;
                return task;
            });
            this.finishedTasks = tasks.filter(task => {
                if(!task.isFinished) return false;
                if(this.currChannel !== "All tasks") return task.type == this.currChannel;
                return task;
            });
            this.searchTasks = "";
        },
        async showInfo(task) {
            if(!task.subtasks) await task.loadSubtasks();
            this.chosenTask = task;
        },
        showFinishedTasks() {
            this.finishedTasksIsVisible = !this.finishedTasksIsVisible;
        },
        hideErrorMessage() {
            this.error = "";
        },
        toggleButton() {
            this.buttIsVisible = !this.buttIsVisible;
        },
        AddPanel() {
            this.$refs.panel.AddPanel();
        },
        handleDeleting(response) {
            if(response.task === this.chosenTask) this.chosenTask = "";
            if(response.task.isFinished) this.finishedTasks.splice(response.index, 1);
            else this.tasks.splice(response.index, 1);
            this.allTasks.splice(this.allTasks.indexOf(response.task), 1);
        },
        chosenTaskDelete() {
            for(let i = 0; i < this.allTasks.length; i++) {
                if(this.allTasks[i] === this.chosenTask) this.allTasks.splice(i, 1);
                this.showTasks(this.allTasks);
            }
            this.chosenTask = "";
        },
        addTask(newTask) {
            this.allTasks.push(newTask);
            this.tasks.push(newTask);
        },
        toggleFinishing(response) {
            if(response.task.isFinished) {
                this.tasks.splice(response.index, 1);
                this.finishedTasks.push(response.task);
                console.log(this.allTasks);
                return;
            } else if(!response.task.isFinished) {
                console.log('not finished');
                this.finishedTasks.splice(response.index, 1);
                this.tasks.push(response.task);
                console.log(this.allTasks);
                return;
            }
            this.isDisabled = false;
        },
        errorHandling(err) {
            console.log(err);
            this.error = err;
        },
        closeInf() {
            this.chosenTask = "";
        },
        async toImportant() {
            console.log(this.allTasks)
            this.showTasks(this.allTasks);
        },
    },
    watch: {
            searchTasks(newReq) {
                if(newReq !== "") {
                    this.tasks = this.allTasks.filter(task => {
                        if(task.isFinished) return;
                        return task.text.toLowerCase().indexOf(newReq.toLowerCase()) !== -1;
                    });
                    this.finishedTasks = this.allTasks.filter(task => {
                        if(!task.isFinished) return;
                        return task.text.toLowerCase().indexOf(newReq.toLowerCase()) !== -1;
                    });
                } 
                else this.showTasks(this.allTasks);
            },
        }  
}

</script>

<style>
#profileLinks {
    display: flex;
    flex-direction: row;
}

.logoutLink {
    margin-right: 10px;
}

.finishedTasksContainer {
    margin-bottom: 20px;
}

#tasksContainer {
    overflow-y: scroll;
    overflow-x: hidden;
}
.tasks-show-enter-active {
    transition: all 0.5s ease-out;
}
.tasks-show-leave-active {
    transition: all 0.3s linear;
}

.tasks-show-enter-from {
    opacity: 0;
    transform: translateY(-20px);
}
.tasks-show-leave-to {
    opacity: 0;
    transform: translateX(10px);
}
</style>