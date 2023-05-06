<template>
    <div>
        <div class="mainTask" :class="classProp">
            <div class="leftContainer">
                <div class="finished" @click.stop="finishTask(task, index)">
                    <img class="doneImg" src="/images/done.png">
                </div>
                <div class="edit" @click.stop="showEditForm">
                    <img class="editImg" src="/images/edit.png">
                </div>
                <div class="taskText" :style="{textDecoration: task.isFinished ? 'line-through' : 'none'}" v-if="!isEditing">
                    {{ task.text }}
                </div>
                <div class="editingFormContainer" v-if="isEditing">
                    <form @submit.prevent="editTask" class="editForm">
                        <input type="text" v-model="taskTextEdit" class="editInput"/>
                    </form>
                </div>
            </div>
            <div class="buttons">
                <div @click.stop="toImportant(task)"
                @mouseover.stop="changePic(task)"
                @mouseleave.stop="restorePic(task)"
                class="toImportantButt"><img id="impImg" :src="task.taskPic"></div>
                <div @click.stop="deleteElem(task, index)" v-show="buttVisible"
                    id="deleteButt"><img id="deleteImg" src="/images/delete.png">
            </div>
            </div>
        </div>
        <div v-if="task === chosenTask && task.subtasks">
            <transition-group name="subtasks-list">
                <subtask-component v-for="(subtask, index) in task.subtasks" 
                    :subtask="subtask" :chosen-task="chosenTask" :index="index" :key="subtask.id"
                    @subtask-error="errorEmit"
                    >
                </subtask-component>
            </transition-group>
        </div>
    </div>
</template>

<script>
import SubtaskComponent from './SubtaskComponent.vue';
export default {
    components: {
        SubtaskComponent,
    },
    props: {
        buttDisable: Boolean,
        task: Object,
        index: Number,
        buttVisible: {Boolean, default: true},
        chosenTask: null,
        classProp: String,
    },
    emits: {
        'task-error': ({operation, src, code}) => {
            if( typeof operation !== "string" || typeof code !== "string" || typeof src !== "string") return false;
            else return true;
        },
        'important': null, //event to update view on page
        'task-deleted': (obj) => typeof obj === "object",
        'toggle-finishing': (obj) => typeof obj === "object",
    },
    data() {
        return {
            isDisabled: false,
            isEditing: false,
            taskTextEdit: this.task.text,
        }
    },
    methods: {
        async toImportant(task) {
            try {
                let type = task.type;
                if(type === "Important") await task.changeType("Today");
                else await task.changeType("Important");
                this.$emit('important');
            } catch(err) {
                this.$emit('task-error',{operation: 'changing type of', src: 'task', code: err.message});
            }
        },
        async deleteElem(task, index) {
            try {
                await task.deleteTask();
                this.$emit('task-deleted', {task: task, index: index})
            } catch(err) {
                this.$emit('task-error', {operation: 'deleting', src: 'task', code: err.message});
            }
        },
        async finishTask(task, index) {
            if(this.isDisabled) return;
            this.isDisabled = true;
            try {
                await task.finishTask();
                this.$emit('toggle-finishing', {task: task, index: index});
            } catch(err) {
                this.$emit('task-error', {operation: 'finishing', src: 'task', code: err.message});
            }
        },
        showEditForm() {
            this.isEditing = !this.isEditing;
        },
        async editTask() {
            try {
                if(this.taskTextEdit !== "" && this.taskTextEdit !== this.task.text) await this.task.editTask(this.taskTextEdit);
                this.isEditing = false;
            } catch(err) {
                this.$emit('task-error', {operation: 'editing', src: 'task', code: err.message});
            }
        },
        changePic(task) {
            task.changePic();
        },
        restorePic(task) {
            task.restorePic();
        },
        emitCompleted(obj) {
            this.$emit('subtask-completed', {index: obj.index});    
        },
        errorEmit(obj) {
            this.$emit('task-error', obj);
        }
    },
    watch: {
        buttDisabled(newVal, oldval) {
            console.log(oldval);
            this.isDisabled = newVal;
        } 
    }
}
</script>

<style>
.subtasks-list-leave-active {
    transition: all 0.3s ease;
}
.subtasks-list-enter-active {
    transition: all 0.3s ease;
}

.subtasks-list-enter-from {
    opacity: 0;
    transform: translateY(20px);
}

.subtasks-list-leave-to {
    opacity: 0;
    transform: translateX(20px);
}

.editInput {
    margin: 0 !important;
    padding: 0 !important;
    height: 100% !important;
    background-color: transparent !important;
}

.editImg {
    cursor: pointer;
    width: 20px;
    height: 20px;
    margin-right: 20px;
}

.editForm {
    display: flex;
    flex-direction: row;
}

.editButton {
    margin-right: 10px;
    background-color: #D7F7F7;
}

.editButtons {
    cursor: pointer;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 10px;
    padding-right: 10px;
    border: none;
    border-radius: 5px;
}

.editingFormContainer {
    align-items: center;
    display: flex;
    flex-direction: row;
}
</style>