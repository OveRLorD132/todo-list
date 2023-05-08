<template>
    <ImageUpload :upload-is-visible="uploadIsVisible" @close-upload="onCloseUpload"></ImageUpload>
    <FlashMessages></FlashMessages>
    <LineComponent @user-profile="setProfile" @profile-image="setProfileImage"></LineComponent>
    <div id="blocksContainer">
        <div id="firstBlock">
            <div id="profilePicContainer">
                <img id="profilePic" :src="generalProfilePic" :alt="profilePic">
                <div id="picLabel">
                    Here's your profile pic. You can upload another <button class="uploadButt" @click="showUpload">Upload</button>
                </div>
            </div>
            <hr class="separator">
            <InfField id="usernameContainer" class="infField" :property="{name: `username`, value: userProfile.username}"></InfField>
        </div>
        <div id="secondBlock">
            <InfField id="emailContainer" class="infField" :property="{name: `e-mail`, value: userProfile[`e-mail`]}"></InfField>
            <hr class="separator">
            <div id="idContainer" class="infField">
                <div id="idInfo">Your ID: {{ userProfile.id }}</div>
                <div id="idLabel"><h4 class="labelHeader">Your id is unique. It cannot be changed.</h4></div>
            </div>
            <hr class="separator">
            <div id="passwordContainer" class="infField">
                <div>Password: </div>
                <div id="passwordLabel"><h4 class="labelHeader">Your password is hidden. But you can change it 
                    <a class="Link" href="/password-change">here.</a>
                </h4></div>
            </div>
            <hr class="separator">
            <InfField class="infField" id="countryContainer" :property="{name:'country', value: userProfile.country}"></InfField>
            <hr class="separator">
            <InfField class="infField" :property="{name: 'telephone', value: userProfile.telephone}"></InfField>
        </div>
    </div>
</template>

<script>
import ImageUpload from './components/ImageUpload.vue';
import InfField from './components/InfField.vue';
import FlashMessages from '../components/FlashMessages.vue';
import LineComponent from '../components/LineComponent.vue';
export default {
    components: {
        LineComponent,
        FlashMessages,
        InfField,
        ImageUpload,
    },
    data() {
        return {
            profilePic: "",
            generalProfilePic: "",
            userProfile: "",
            uploadIsVisible: false,
        }
    },
    methods: {
        setProfile(obj) {
            this.userProfile = obj.user;
            this.username = obj.user.username;
        },
        showUpload() {
            this.uploadIsVisible = true;
        },
        setProfileImage(obj) {
            if(obj.hasImg) this.generalProfilePic = `/images/profile/${this.userProfile.username}.png`;
            else this.generalProfilePic = `/images/profile.png`;
        },
        onCloseUpload() {
            this.uploadIsVisible = false;
        }
    }
}
</script>

<style>
.infField {
    align-items: center;
    display: flex;
    flex-direction: row;
    margin-left: 30px;
    margin-top: 15px;
    margin-bottom: 15px;
}

.uploadButt {
    cursor: pointer;
    margin-left: 10px;
    font-family: 'ProximaNova-Light';
    width: 65px;
    height: 25px;
    border: none;
    border-radius: 5px;
    background-color: #D7F7F7;
}

.separator {
    color: #424242;
    margin: 0;
    padding: 0;
}

#idLabel {
    margin-left: 10px;
}

.labelHeader {
    margin: 0;
    padding: 0;
}

#passwordLabel {
    margin-left: 10px;
}

.Link {
    color: #2C40C2;
}

#profilePicContainer {
    display: flex;
    flex-direction: row;
}

#profilePic {
    margin-left: 15px;
    margin-top: 15px;
    margin-bottom: 15px;
    border-radius: 50%;
    width: 230px;
    height: 230px;
}

#picLabel {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-left: 20px;
}

#blocksContainer {
    padding-left: 150px;
    padding-right: 150px;
    display: flex;
    align-items: center;
    flex-direction: column;
    height: calc(100vh - 45px);
}

#firstBlock {
    width: 100%;
    border-radius: 10px;
    background-color: #ffffff;
    margin-top: 30px;
}

#secondBlock {
    margin-top: 40px;
    width: 100%;
    background-color: #ffffff;
    border-radius: 10px;
}

</style>