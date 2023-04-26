<template>
    <div v-if="panelIsVisible" id="panelContainer">
    <div id="panel">
        <div @click="AddPanel"><img id="menuImg" src="/images/menu.png"></div>
        <div id="channels">
            <div 
            v-for="(channel, index) in channels"
            :key="index"
            @mouseover="changeColor(channel)"
            @mouseleave="restoreColor(channel)"
            :style="{backgroundColor: currChannel === channel ? '#E0EDF4' : 'transparent' }"
            @click="changeChannel(channel)"
            class="channel">{{ channel }}</div>
        </div>
    </div>
</div>
</template>

<script>

export default {
    data() {
        return {
            panelIsVisible: false,
            channels: ["Today", "Important", "All tasks"],
        }
    },
    props: {
        currChannel: {
            type: String,
            default: "",
        },
    },
    methods: {
        changeChannel(channel) {
            this.$emit('change-channel', channel);
        },
        changeColor(channel) {
            if(channel !== this.currChannel) {
                let element = event.target
                element.style.backgroundColor = '#EEF4F9'
            }
        },
        restoreColor(channel) {
            if(channel !== this.currChannel) {
                let element = event.target
                element.style.backgroundColor = '#ffffff';
            }
        },
        AddPanel() {
            this.panelIsVisible = !this.panelIsVisible;
            this.$emit('toggle-button');
        },
    }
}
</script>

<style>

</style>