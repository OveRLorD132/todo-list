<template>
    <div class="errorWindow" v-if="error">
        <div class="errorContainer">
            <div class="main">
                <div class="errorLabel"><h3>ERROR</h3></div>
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
            if(error.code === '404'){ 
                if(error.src === "task" || error.src === "subtask") this.errorText = `This ${error.src} doesn't exist. Try reloading page.`;
            } else if(error.code === '500') {
                this.errorText = `Something's wrong. Internal server error.`;
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
    .errorSecondLine {
        text-align: left;
    }
    .errorLabel {
        text-align: center;
    }
</style>