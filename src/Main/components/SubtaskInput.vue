<template>
    <div id="inputContainer">
        <form @submit.prevent="addSubtask">
            <input id="subtaskInput" type="text" placeholder="Enter subtask..." name="subtasl" v-model="newSubtask" />
        </form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    props: {
        chosenTask: Object,
    },
    emits: {
        'subtask-error': (operation, src, code) => {
            if(typeof operation === 'string' && typeof src === 'string' && typeof code === 'string') return true;
            return false;
        }
    },
    data() {
        return {
            newSubtask: ""
        }
    },
    methods: {
        async addSubtask() {
            if(this.newSubtask === "") return
            try {
                await this.chosenTask.addSubtask(this.newSubtask);
                this.newSubtask = "";
            } catch(err) {
                this.$emit('subtask-error', {operation: 'adding', src: 'subtask', code: err.message});
            }
        }
    }
}
</script>

<style>

</style>