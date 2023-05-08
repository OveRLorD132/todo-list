<template>
    <div class="addButtonContainer" id="addTaskList">
        <img src="/images/add.png" class="addButton" @click="addTasks"/>
        <div class="addingContainer" :style="containerPosition" v-if="addingContIsVisible">
            <div v-if="tasksToAdd.length === 0" class="addLabel">There is no tasks to add.</div>
            <div class="taskAdd" v-for="(task, ind) in tasksToAdd">
                <div class="addLeft" :key="ind">
                    <div class="taskAddToday" @click="addTask(task, ind, 'Today')"><img src="/images/add-task.png" class="addTaskImage" /></div>
                    <div class="taskAddText">{{ task.text }}</div>
                </div>
                <div class="taskAddImportant" @click="addTask(task, ind, 'Important')"><img src="/images/imp_not_chosen.png" class="addTaskImage"/></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        chosenTask: null,
        allTasks: Array
    },
    emits: {
        'task-added': null,
        'task-error': (operation, src, code) => {
            if(typeof operation === 'string' && typeof src === 'string' && typeof code === 'string') return true;
            return false;
        }
    },  
    data() {
        return {
            addingContIsVisible: false,
            tasksToAdd: [],
        }
    }, 
    mounted() {
        document.addEventListener('click', this.hideAdd);
    },  
    methods: {
        addTasks() {
            this.addingContIsVisible = !this.addingContIsVisible;
            this.tasksToAdd = this.allTasks.filter((task) => {
                return task.type === "All tasks";
            })
        },
        async addTask(task, index, type) {
            try {
                await task.changeType(type);
                this.tasksToAdd.splice(index, 1);
                this.$emit('task-added');
            } catch(err) {
                this.$emit('task-error', {operation: 'adding', src: 'task', code: err.message});
            }
        },
        hideAdd(event) {
            if(this.addingContIsVisible) {
                let element = document.getElementById('addTaskList');
                if(!element.contains(event.target)) this.addingContIsVisible = false;
            }

        }
    },
    computed: {
        containerPosition() {
            let right = this.chosenTask ? '310px' : '0';
            return {
                'right': right
            }
        }
    }
}
</script>

<style>
.addLabel {
    margin: 10px 10px 10px 10px;
}

.taskAdd {
    margin-bottom: 3px;
    border-radius: 5px;
    padding: 5px 5px 5px 5px;
    background-color: #ffffff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.addLeft {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.addingContainer {
    padding: 3px 3px 3px 3px;
    overflow-y: scroll;
    overflow-x: hidden;
    position: fixed;
    width: 200px;
    max-height: 400px;
    background-color: #f2f3f4;
    box-shadow: 0px 0px 12px -2px rgba(112,112,112,1);
}

.taskAddText {
    word-break: break-all;
    margin-left: 10px;
}

.addTaskImage {
    cursor: pointer;
    margin-top: 5px;
    height: 20px;
    width: 20px;
}

.addButton {
    cursor: pointer;
    margin-right: 10px;
    height: 25px;
    width: 25px;
}

::-webkit-scrollbar {
    background-color: transparent;
    width: 10px;
}

::-webkit-scrollbar-thumb {
    background-color: #D4D4D4;
    border-radius: 10px;
}
</style>