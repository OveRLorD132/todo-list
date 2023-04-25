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
                <task-component v-for="(task, ind) in tasks" :key="ind" @click="showInfo(task)" :class="taskClass"
                    :task="task" :index="ind" @toggle-finishing="toggleFinishing"
                    @task-deleted="handleDeleting" @important="toImportant"
                />
            </div>
            <div v-if="finishedTasks.length > 0"
            @click="showFinishedTasks"
            id="finishedTasksContainer">
                <div id="finishedTasksLabel">
                    <div> Finished Tasks</div>
                    <div>{{ finishedTasks.length }}</div>
                </div>
            </div>
            <template v-if="finishedTasksIsVisible">
                <task-component v-for="(task, index) in finishedTasks" :key="index" :task="task" @click="showInfo(task)"
                    :class="taskClass" :index="index" @task-deleted="handleDeleting" @toggle-finishing="toggleFinishing"
                    @important="toImportant"
                />
            </template>
        </div>
        <task-info :chosenTask="chosenTask" @new-subtask="newSubtask" @subtask-completed="handleCompleting"
          @subtask-delete="subtaskDelete"
        >
            <task-component :task="chosenTask" :class="taskInfClass"
                @task-deleted="handleDeleting" @toggle-finishing="toggleFinishing"
            />
        </task-info>
    </div>
</template>

<script>
import ErrorComponent from './components/ErrorComponent.vue';
import Panel from './components/Panel.vue';
import FormCompoment from './components/FormCompoment.vue';
import TaskComponent from './components/TaskComponent.vue';
import VueAnimations from './VueAnimations';
import TaskInfo from './components/TaskInfo.vue';
import axios from 'axios';
import Subtask from './modules/Subtask';
import Task from './modules/Task';
console.log(Task);
export default {
    mixins: [VueAnimations],
    components: {
        ErrorComponent,
        Panel,
        FormCompoment,
        TaskComponent,
        TaskInfo,
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
            taskClass: 'task',
            taskInfClass: 'taskInf'
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
            this.chosenTask = task;
            if(!this.chosenTask.subtasks) await this.loadSubtasks(task);
            task.isChosen = true;
            console.log(task);
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
        handleDeleting(response) {
            if(response.task === this.chosenTask) this.chosenTask = "";
            if(response.task.isFinished) this.finishedTasks.splice(response.index, 1);
            else this.tasks.splice(response.index, 1);
        },
        addTask(newTask) {
            this.allTasks.push(newTask);
            this.tasks.push(newTask);
        },
        toggleFinishing(response) {
            if(response.task.isFinished) {
                this.tasks.splice(response.index, 1);
                this.finishedTasks.push(response.task);
                return;
            } else if(!response.task.isFinished) {
                console.log('not finished');
                this.finishedTasks.splice(response.index, 1);
                this.fasks.push(response.task);
                return;
            }
        },
        toImportant(response) {
            if(response.task.isFinished) this.finishedTasks[response.index].type = response.task.type;
            else this.tasks[response.index].type = response.task.type; 
            this.showTasks(this.allTasks);
        },
        newSubtask(newSubtask) {
            if(this.chosenTask.subtasks) this.chosenTask.subtasks.push(newSubtask);
            else this.chosenTask.subtasks = [newSubtask];
        },
        async loadSubtasks(task) {
            try {
                if(!task.subtasks) task.subtasks = [];
                let subtasks = await axios.get('/tasks/load/subtasks', {params: {task_id: task.task_id}});
                for(let subtask of subtasks.data) {
                    subtask = new Subtask(subtask);
                    task.subtasks.push(subtask);
                }
                console.log(task);
            } catch (err){
                console.error(err);
            }
        },
        async handleCompleting(obj) {
            let index = obj.index;
            let subtask = this.chosenTask.subtasks[index];
            await subtask.completeSubtask();
        },
        async subtaskDelete(obj) {
            let index = obj.index;
            let subtask = this.chosenTask.subtasks[index];
            await subtask.deleteSubtask();
            this.chosenTask.subtasks.splice(index, 1);
        }
    },
    watch: {
            searchTasks(newReq) {
                if(newReq !== "") {
                    this.tasks = this.tasks.filter(task => {
                        if(task.isFinished) return;
                        return task.text.toLowerCase().indexOf(newReq.toLowerCase()) !== -1;
                    });
                    this.finishedTasks = this.finishedTasks.filter(task => {
                        if(!task.isFinished) return;
                        return task.text.toLowerCase().indexOf(newReq.toLowerCase()) !== -1;
                    });
                } 
                else this.showTasks(this.allTasks);
            }
        }  
}

</script>

<style>

</style>