<template>
    <LineComponent @user-profile="setProfile"></LineComponent>
    <FlashMessages></FlashMessages>
    <div id="mainContainer">
        <div id="formContainer">
            <div class="label"><h1>Password Change</h1></div>
            <form id="passForm" action="/password-change" method="post">
                <input type="password" name="oldPassword" placeholder="Enter your previous password..."/>
                <input type="password" name="newPassword" placeholder="Enter new password..."/>
                <input type="submit" value="Submit" :style="buttonStyle" @mouseover="changeColor" @mouseleave="restoreColor"/>
            </form>
        </div>
    </div>
</template>

<script>
import FlashMessages from '../components/FlashMessages.vue';
import LineComponent from '../components/LineComponent.vue';
export default {
    components: {
        LineComponent,
        FlashMessages,
    },
    data() {
        return {
            userProfile: "",
            buttonStyle: {backgroundColor: "#CACACA"},
        }
    },
    methods: {
        setProfile(obj) {
            this.userProfile = obj.user;
        },
        changeColor() {
            this.buttonStyle.backgroundColor = "#A4A4A4";
        },
        restoreColor() {
            this.buttonStyle.backgroundColor = "#CACACA"
        }
    }
}
</script>

<style>
.label {
    text-align: center;
}

#mainContainer {
    height: calc(100vh - 45px);
    width: 100%;
}

#formContainer {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

#passForm {
    width: 100%;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

input[type="password"] {
    margin-bottom: 15px;
    border: none;
    border-radius: 10px;
    width: 250px;
    height: 40px;
    background-color: #ffffff;
    padding: 10px 10px 10px 10px;
    font-family: 'ProximaNova-Light';
}

input[type="submit"] {
    cursor: pointer;
    border: none;
    font-family: 'ProximaNova-Light';
    border-radius: 10px;
    width: 270px;
    height: 50px;
}
</style>