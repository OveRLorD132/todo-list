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
                <task v-for="(task, ind) in filteredTasks" :key="ind" @click="showInfo(task)" :class="taskClass"
                    :task="task" :index="ind" @toggle-finishing="toggleFinishing"
                    @task-deleted="handleDeleting" @important="toImportant"
                />
            </div>
            <div v-if="filteredFinishedTasks.length > 0"
            @click="showFinishedTasks"
            id="finishedTasksContainer">
                <div id="finishedTasksLabel">
                    <div> Finished Tasks</div>
                    <div>{{ filteredFinishedTasks.length }}</div>
                </div>
            </div>
            <template v-if="finishedTasksIsVisible">
                <task v-for="(task, index) in filteredFinishedTasks" :key="index" :task="task" @click="showInfo(task)"
                    :class="taskClass" :index="index" @task-deleted="handleDeleting" @toggle-finishing="toggleFinishing"
                    @important="toImportant"
                />
            </template>
        </div>
        <task-info :chosenTask="chosenTask" @new-subtask="newSubtask" @subtask-completed="handleCompleting"
          @subtask-delete="subtaskDelete"
        >
            <task :task="chosenTask" :class="taskInfClass"
                @task-deleted="handleDeleting" @toggle-finishing="toggleFinishing"
            />
        </task-info>
    </div>
</template>

<script>
import ErrorComponent from './components/ErrorComponent.vue';
import Panel from './components/Panel.vue';
import FormCompoment from './components/FormCompoment.vue';
import Task from './components/Task.vue';
import VueAnimations from './VueAnimations';
import TaskInfo from './components/TaskInfo.vue';
import axios from 'axios';
export default {
    mixins: [VueAnimations],
    components: {
        ErrorComponent,
        Panel,
        FormCompoment,
        Task,
        TaskInfo,
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
            filteredFinishedTasks: [],
            searchTasks: "",
            taskClass: 'task',
            taskInfClass: 'taskInf'
        }
    },
    async created() {
        axios.get('/tasks/load/task').then((tasks) => {
            this.allTasks = Array.from(tasks.data);
            for(let task of this.allTasks) {
                if(task.isFinished) this.finishedTasks.push(task);
            }
            tasks = tasks.data;
            this.showTasks(tasks);
            this.filteredTasks = this.tasks;
            console.log(this.finishedTasks);
            console.log(this.allTasks);
            this.filteredFinishedTasks = this.finishedTasks; 
        });
    },
    methods: {
        changeChannel(channel) {
            if(channel !== this.currChannel){
                this.currChannel = channel;
                this.showTasks(this.allTasks);
                if(this.filteredTasks.indexOf(this.chosenTask) === -1 && this.filteredFinishedTasks.indexOf(this.chosenTask) === -1){
                this.chosenTask = "";
                }
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
            this.filteredFinishedTasks = this.finishedTasks;
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
            if(response.task.isFinished) this.filteredFinishedTasks.splice(response.index, 1);
            else this.filteredTasks.splice(response.index, 1);
        },
        addTask(newTask) {
            this.allTasks.push(newTask);
            this.tasks.push(newTask);
        },
        toggleFinishing(response) {
            if(response.task.isFinished) {
                this.tasks.splice(response.index, 1);
                this.filteredFinishedTasks.push(response.task);
                return;
            } else if(!response.task.isFinished) {
                console.log('not finished');
                this.finishedTasks.splice(response.index, 1);
                this.filteredTasks.push(response.task);
                return;
            }
        },
        toImportant(response) {
            if(response.task.isFinished) this.filteredFinishedTasks[response.index].type = response.task.type;
            else this.filteredTasks[response.index].type = response.task.type; 
            this.showTasks(this.allTasks);
        },
        newSubtask(newSubtask) {
            if(this.chosenTask.subtasks) this.chosenTask.subtasks.push(newSubtask);
            else this.chosenTask.subtasks = [newSubtask];
            console.log(this.chosenTask);
        },
        async loadSubtasks(task) {
            try {
                let subtasks = await axios.get('/tasks/load/subtasks', {params: {task_id: task.task_id}});
                task.subtasks = [...subtasks.data];
            } catch (err){
                console.error(err);
            }
        },
        async handleCompleting(obj) {
            let index = obj.index;
            let subtask = this.chosenTask.subtasks[index];
            let bool = subtask.isFinished ? 0 : 1;
            let res = await axios.patch('/tasks/completed/subtask', {task_id: subtask.id, bool: bool});
            if(res.data === "Success") subtask.isFinished = bool;
        },
        async subtaskDelete(obj) {
            let index = obj.index;
            let subtask = this.chosenTask.subtasks[index];
            let res = await axios.delete(`/tasks/delete/subtask?id=${subtask.id}`)
            if(res.data === "Success") this.chosenTask.subtasks.splice(index, 1);
        }
    },
    watch: {
            searchTasks(newReq) {
                if(newReq !== "") {
                    this.filteredTasks = this.tasks.filter(task => {
                        if(task.isFinished) return;
                        return task.text.toLowerCase().indexOf(newReq.toLowerCase()) !== -1;
                    });
                    this.filteredFinishedTasks = this.finishedTasks.filter(task => {
                        if(!task.isFinished) return;
                        return task.text.toLowerCase().indexOf(newReq.toLowerCase()) !== -1;
                    });
                } 
                else {
                    this.filteredFinishedTasks = this.finishedTasks;
                    this.filteredTasks = this.tasks;
                }
            }
        }  
}

</script>

<style>

</style>