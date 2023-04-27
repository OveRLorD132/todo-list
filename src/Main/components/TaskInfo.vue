<template>
    <div id="taskInfContainer" v-if="chosenTask">
        <div id="mainBlock">
            <div id="closeCont">
                <div id="infLabel">Task:</div>
                <button id="closeButt" @click="closeInf">Close</button>
            </div>
            <div id="taskBlock" :style="{backgroundColor: chosenTask.subtasks.length > 0 ? '#F9F9F9' : '#ffffff'}">
                <slot></slot>
                <template v-if="chosenTask.subtasks">
                    <transition-group name="subtasks">
                        <subtask-component v-for="(subtask, index) of chosenTask.subtasks" :key="subtask.id" 
                          :subtask="subtask" :index="index"
                          @subtask-delete="emitDelete" :chosen-task="chosenTask" @subtask-error="errorEmitting"
                        />
                    </transition-group>
                    
                </template>
            </div>
            <subtask-input @new-subtask="emitSubtask" :chosen-task="chosenTask"/>
            <div id="noteCont">
                <form @submit.prevent="submitNote">
                    <input id="noteInput" type="text" placeholder="Enter your note..." v-model="newNote">
                </form>
            </div>
        </div>
        <div id="buttContainer"><button id="deleteTaskButt" @click="taskDelete">Delete</button></div>
    </div>
        
</template>

<script>
import SubtaskComponent from './SubtaskComponent.vue';
import SubtaskInput from './SubtaskInput.vue';
export default {
    components: {
    SubtaskInput,
    SubtaskComponent
    },
    props: {
        chosenTask: null,
    },
    emits: {
        'task-error': ({operation, src, code}) => {
            if( typeof operation !== "string" || typeof code !== "number" || typeof src !== "string") return false;
            return true;
        },
        "new-subtask": (subtask) => typeof subtask === "object" && subtask !== null,
        "subtask-delete": (index) => typeof index === "object",
        'close-inf': null,
    },
    data() {
        return {
            newNote: this.chosenTask ? this.chosenTask.note ? this.chosenTask.note : null : null,
        }
    },
    mounted() {
        window.addEventListener('beforeunload', this.uploadNote);
    },
    beforeUnmount() {
        window.removeEventListener('beforeunload', this.uploadNote);
    },
    methods: {
        emitSubtask(subtask) {
            this.$emit('new-subtask', subtask);
        },
        emitDelete(index) {
            this.$emit('subtask-delete', {index: index.index});
        },
        closeInf() {
            this.$emit('close-inf');
        },
        async taskDelete() {
            let res = await this.chosenTask.deleteTask();
            if(res === 404) this.$emit('task-error', {operation: 'deleting', src: 'task', code: 404});
            else this.$emit('delete-task');
            console.log(res);
        },
        errorEmitting(obj) {
            this.$emit('task-error', obj);
        },
        uploadNote(event) {
            event.preventDefault();
            if(this.newNote === this.chosenTask.note) return;
            this.chosenTask.setNote(this.newNote, "leave");
            event.returnValue = "";
        }
    }, 
    watch: {
        chosenTask(newValue, oldValue) {
            if(oldValue) oldValue.setNote(this.newNote);
            this.newNote = newValue.note;
        }
    }
    
}
</script>

<style>
.subtasks-enter-active,
.subtasks-leave-active {
    transition: all 0.3s ease;
}

.subtasks-enter-from {
    opacity: 0;
    transform: translateY(20px);
}

.subtasks-leave-to {
    opacity: 0;
    transform: translateX(20px);
}
#noteInput {
    background-color: #F9F9F9;
}
</style>