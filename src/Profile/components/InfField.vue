<template>
    <div>
        <div class="leftCont">
            <div class="infoLabel"> {{ labelText }}
                <template v-if="!changeIsVisible"> {{ property.value }}</template>
            </div>
            <form method="post" :action="`/profile/change/${property.name}`" v-if="changeIsVisible">
                <input type="text" :name="property.name" v-model="property.value">
            </form>
        </div>
        <div class="changeLabel"><button @click="showForm" class="changeButt">{{ changeButtText }}</button></div>
    </div>
    
</template>

<script>
export default {
    props: {
        property: Object,
    },
    data() {
        return {
            changeIsVisible: false,
            changeButtText: "Change",
            formText: "",
            labelText: `Your ${this.property.name} :`
        }
    },
    mounted() {
        if(!this.property.value) {
            this.changeButtText = "Add";
            this.labelText = `You haven't added your ${this.property.name} yet.`
        } else {
            this.labelText = `Your ${this.property.name} :` 
        }
    },
    methods: {
        showForm() {
            this.changeIsVisible = !this.changeIsVisible;
            if(this.changeButtText === "Change" || this.changeButtText === "Add") {
                this.changeButtText = "Close";
                return;
            } else if(this.property.value) {
                this.changeButtText = "Change";
                return;
            } else {
                this.changeButtText = "Add";
            }
        }
    },
    watch: {
        property(newVal) {
            console.log(newVal)
            if(!newVal.value) {
                this.changeButtText = "Add";
                this.labelText = `You haven't added your ${newVal.name} yet.`
            } else {
                this.changeButtText = "Change";
                this.labelText = `Your ${newVal.name} :` 
            }
        }
    }
}
</script>

<style scoped>
.leftCont {
    align-items: center;
    display: flex;
    flex-direction: row;
}
.infField {
    margin: 10px 10px 10px 30px;
    justify-content: space-between;
    margin-right: 10px;
}

input[type="text"] {
    font-family: 'ProximaNova-Light';
    margin-left: 5px;
    padding-left: 10px;
    background-color: #f2f3f4;
    width: 200px;
    height: 30px;
    outline: none;
    border: none;
    border-radius: 10px;
}

.changeButt {
    cursor: pointer;
    margin-left: 10px;
    font-family: 'ProximaNova-Light';
    width: 65px;
    height: 25px;
    border: none;
    border-radius: 5px;
    background-color: #D7F7F7;
}

.infoLabel {
    display: flex;
    align-items: center;
    height: 32px;
}
</style>