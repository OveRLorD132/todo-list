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
            if(typeof operation !== "string" || typeof src !== 'string' || typeof code !== "number") return false;
            return true;
        },
        'subtask-delete': (index) => typeof index === "object",
    },  
    methods: {
        async subtaskComplete() {
            let res = await this.subtask.completeSubtask();
            if(res === 404) this.$emit('subtask-error', {operation: "completing", src: 'subtask', code: 404});
        },
        async subtaskDelete() {
            let res = await this.subtask.deleteSubtask();
            if(res === 404) this.$emit("subtask-error", {operation: "deleting", src: "subtask", code: 404});
            if(res === "Success") this.$emit('subtask-delete', {index: this.index});
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