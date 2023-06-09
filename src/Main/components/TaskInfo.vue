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
                          :chosen-task="chosenTask" @subtask-error="errorEmitting"
                        />
                    </transition-group>
                    
                </template>
            </div>
            <subtask-input :chosen-task="chosenTask" @subtask-error="errorEmitting"/>
        </div>
        <div id="buttContainer">
            <div id="noteCont">
                <div id="noteLabel">Note:</div>
                <form @submit.prevent="submitNote">
                    <input id="noteInput" type="text" placeholder="Enter your note..." v-model="newNote">
                </form>
            </div>
            <button id="deleteTaskButt" @click="taskDelete">Delete</button>
        </div>
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
            if( typeof operation !== "string" || typeof code !== "string" || typeof src !== "string") return false;
            return true;
        },
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
            this.chosenTask.setNote(this.newNote);
            event.returnValue = "";
        },
        submitNote() {
            this.chosenTask.setNote(this.newNote);
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

#noteCont {
    text-align: left;
    margin-bottom: 15px;
    margin-right: 10px;
}

#noteLabel {
    margin-top: 20px;
    margin-left: 20px;
}

#taskBlock {
    max-height: 450px;
    overflow-y: scroll;
    overflow-x: hidden;
}

</style>