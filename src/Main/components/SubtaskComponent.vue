<template>
     <div class="subtask show-elem-enter show-elem-leave-to" :style="subtaskStyle">
         <div class="subtaskLeft" key="left">
             <div class="completeButt" @click="subtaskComplete">
                 <img class="sComplete" src="/images/s-complete.png" />
           </div>
           <div class="subtaskText" :style="{textDecoration: subtask.isFinished ? 'line-through' : 'none'}">{{subtask.text}}</div>
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

<style>
</style>