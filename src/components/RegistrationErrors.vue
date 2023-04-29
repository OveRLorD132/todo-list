<template>
    <div class="errorContainer" v-if="error">
        <div class="errorTxt">{{ error }}</div>
    </div>
</template>

<script>
export default {
    props: {
        error: ""
    },
    data() {

    }
}
</script>

<style>
.errorContainer {
    width: 300px;
    height: 35px;
    background-color: #A62121;
}
</style>