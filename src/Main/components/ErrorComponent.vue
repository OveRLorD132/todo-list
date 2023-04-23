<template>
    <div class="errorMessage" v-if="errorMessageIsVisible">
        <div class="errorContainer">
            <div class="errorText">ERROR: Something's wrong</div>
            <button class="OKButt" @click="hideErrorMessage">OK</button>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        errorMessageIsVisible: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        hideErrorMessage() {
            this.$emit('hide-error-message');
        },
    }
}
</script>

<style>
    
</style>