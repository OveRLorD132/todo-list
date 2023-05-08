<template>
    <LineComponent></LineComponent>
</template>

<script>
import LineComponent from '../components/LineComponent.vue';
export default {
    components: {
        LineComponent,
    },  
    data() {
        return {
            message: 'hihi'
        }
    }
}
</script>

<style>
.serverErrorContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: calc(100vh - 45px);
}
</style>