<template>
    <div>
        <div class="infoLabel">Your {{ property.name }} : 
            <template v-if="!changeIsVisible"> {{ property.value }}</template>
        </div>
        <form method="post" :action="`/profile/change/${property.name}`" v-if="changeIsVisible">
            <input type="text" :name="property.name" v-model="property.value">
        </form>
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
        }
    },
    methods: {
        showForm() {
            this.changeIsVisible = !this.changeIsVisible;
            if(this.changeButtText === "Change") {
                this.changeButtText = "Close";
                return;
            } else {
                this.changeButtText = "Change";
                return;
            }
        }
    }
}
</script>

<style>


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
</style>