<template>
    <div>
        <div class="mainTask" :class="classProp">
            <div class="leftContainer">
                <div class="finished" @click.stop="finishTask(task, index)">
                    <img class="doneImg" src="/images/done.png">
                </div>
                <div class="taskText" :style="{textDecoration: task.isFinished ? 'line-through' : 'none'}">{{ task.text }}</div>
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
                    @subtask-delete="emitDelete" @subtask-error="errorEmit"
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
            if( typeof operation !== "string" || typeof code !== "number" || typeof src !== "string") return false;
            else return true;
        },
        'important': null, //event to update view on page
        'task-deleted': (obj) => typeof obj === "object",
        'toggle-finishing': (obj) => typeof obj === "object",
        'subtask-delete': (index) => typeof index === "object",
    },
    data() {
        return {
            isDisabled: false,
        }
    },
    created() {
        //console.log(this.classProp);
    },
    methods: {
        async toImportant(task) {
            try {
                let type = task.type;
                if(type === "Important") await task.changeType("Today");
                else await task.changeType("Important");
                this.$emit('important');
            } catch(err) {
                console.log(err);
                this.$emit('task-error',{operation: 'changing type of', src: 'task', code: 404});
            }
        },
        async deleteElem(task, index) {
            let res = await task.deleteTask();
            if(res === 404) this.$emit('task-error', {operation: 'deleting', src: "task", code: res})
            if(res === "Success") this.$emit('task-deleted', {task: task, index: index})
            
        },
        async finishTask(task, index) {
            console.log(this.isDisabled);
            if(this.isDisabled) return;
            this.isDisabled = true;
            //setTimeout(() => {console.log(this.isDisabled)}, 1000);
            let res = await task.finishTask();
            if(res === 404) this.$emit('task-error', {operation: 'finishing', src: "task", code: res})
            if(res === "Success")this.$emit('toggle-finishing', {task: task, index: index});
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
        emitDelete(obj) {
            this.$emit('subtask-delete', {index: obj.index});
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
</style>