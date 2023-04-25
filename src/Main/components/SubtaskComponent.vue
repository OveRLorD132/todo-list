<template>
    <div class="subtask" :style="subtaskStyle">
        <div class="subtaskLeft">
            <div class="completeButt" @click="subtaskComplete">
                <img class="sComplete" src="/images/s-complete.png" />
            </div>
            <div class="subtaskText">{{subtask.text}}</div>
        </div>
        <div class="subtaskDelete" @click="subtaskDelete">
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
        chosenTask: Object || String,
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
            let backgroundColor = this.subtask.isFinished ? '#B5E9E8': 'transparent'; 
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