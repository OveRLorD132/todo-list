<template>
     <div class="subtask show-elem-enter show-elem-leave-to" :style="subtaskStyle">
         <div class="subtaskLeft" key="left">
             <div class="completeButt" @click="subtaskComplete">
                 <img class="sComplete" src="/images/s-complete.png" />
            </div>
            <div class="edit" @click="showEdit">
                <img src="/images/edit.png" class="editImg"/>
            </div>
           <div class="subtaskText" :style="{textDecoration: subtask.isFinished ? 'line-through' : 'none'}" v-if="!isEditing">
            {{subtask.text}}
            </div>
            <form @submit.prevent="editSubtask" v-if="isEditing">
                <input type="text" v-model="subtaskEditText" class="editInput"/>
            </form>
        </div>
        <div class="subtaskDelete" key="right" @click="subtaskDelete">
            <img class="sDelete" src="/images/s-delete.png"/>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isEditing: false,
            subtaskEditText: this.subtask.text,
        }
    },
    props: {
        chosenTask: null,
        subtask: Object,
        index: Number
    },
    emits: {
        'subtask-error': (operation, src, code) => {
            if(typeof operation !== "string" || typeof src !== 'string' || typeof code !== "string") return false;
            return true;
        },
    },  
    methods: {
        async subtaskComplete() {
            try {
                await this.subtask.completeSubtask();
            } catch(err) {
                this.$emit('subtask-error', {operation: 'completing', src: 'subtask', code: err.message}); 
            }
        },
        async subtaskDelete() {
            try {
                await this.subtask.deleteSubtask();
                this.chosenTask.deleteSubtask(this.subtask);
                //this.$emit('subtask-delete', {index: this.index});
            } catch(err) {
                this.$emit('subtask-error', {operation: 'deleting', src: 'subtask', code: err.message});
            }
        },
        showEdit() {
            this.isEditing = !this.isEditing;
        },
        async editSubtask() {
            try {
                if(this.subtaskEditText !== "" && this.subtaskEditText !== this.subtask.text) {
                    await this.subtask.editSubtask(this.subtaskEditText)
                }
                this.isEditing = !this.isEditing;
            } catch(err) {
                this.$emit('subtask-error', {operation: 'editing', src: 'subtask', code: err.message});
            }
        }
    },
    computed: {
        subtaskStyle() {
            let backgroundColor = this.subtask.isFinished ? '#D1D1D1': '#E6E6E6'; 
            return {
                'background-color': backgroundColor,
            }
        }
    }
}
</script>

<style scoped>
.editImg {
    margin-right: 10px;
    margin-top: 5px;
}
</style>