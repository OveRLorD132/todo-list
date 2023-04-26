<template>
    <div class="errorMessage" v-if="error">
        <div class="errorContainer">
            <div class="main">
                <div><h3>ERROR</h3></div>
                <div class="errorText"><h4>{{ errorText }}</h4></div>
                <div class="errorSecondLine" v-if="errorSecondLine"><h5>{{ errorSecondLine }}</h5></div>
            </div>
            <div class="buttonsCont">
                <button class="OKButt" @click="hideErrorMessage">OK</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            errorText: "",
            errorSecondLine: "",
        }
    },
    created() {
        this.errorValidation(this.error);
    },
    props: {
        error: null,
    },
    methods: {
        hideErrorMessage() {
            this.$emit('hide-error-message');
        },
        errorValidation(error) {
            if(error.src === "task" && error.code === 404){ 
                this.errorText = `This task doesn't exist. Try reloading page.`
            }
            this.errorSecondLine = `Error while ${error.operation} ${error.src}.\nServer responded with code: ${error.code}`;
        },
    },
    watch: {
        error(newValue) {
            if(newValue === "") {
                this.errorText = "";
                this.errorSecondLine = "";
                return;
            }
            this.errorValidation(newValue);
        }
    }
}
</script>

<style>
    
</style>