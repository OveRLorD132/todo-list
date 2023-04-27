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
        'subtask-completed': (index) => typeof index === "object",
        'subtask-delete': (index) => typeof index === "object",
    },  
    methods: {
        subtaskComplete() {
            this.$emit('subtask-completed', {index: this.index});
        },
        subtaskDelete() {
            this.$emit('subtask-delete', {index: this.index});
        }
    },
    computed: {
        subtaskStyle() {
            let backgroundColor = this.subtask.isFinished ? '#D1D1D1': '#E6E6E6'; 
            console.log(backgroundColor);
            return {
                'background-color': backgroundColor,
            }
        }
    }
}
</script>

<style>
</style>