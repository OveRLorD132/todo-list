<template>
  <div id="line">
    <div id="mainLink"><a href="/tasks" name="Main Page">Main Page</a></div>
    <div id="profileLinks">
      <template v-if="userProfile">
        <a href="/logout" name="Log Out" class="logoutLink">Log Out</a>
        <a href="/profile" name="My Profile">My Profile</a>
      </template>
      <template v-if="!userProfile">
        <a href="/login" name="Login" class="loginLink">Log In</a>
        <a href="/registration" name="Registration">Registration</a>
      </template>
    </div>
  </div>
</template>

<script>
import User from '../modules/User';
import axios from 'axios';
export default {
    data() {
        return {
            userProfile: "",
        }
    },
    mounted() {
        axios.get('/current/user/profile').then((profile) => {
            if(profile.data !== "User not logged in") this.userProfile = new User(profile.data);
            console.log(this.userProfile);
            this.$emit('user-profile', {user: this.userProfile});
        })
    }
}
</script>

<style>
.logoutLink {
  margin-right: 10px;
}

.loginLink {
  margin-right: 10px;
}
</style>