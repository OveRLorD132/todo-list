<template>
  <div id="line">
    <div id="mainLink"><a href="/tasks" name="Main Page">Main Page</a></div>
    <div id="profileLinks">
      <template v-if="userProfile">
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
import axios from 'axios';
export default {
    data() {
        return {
            userProfile: "",
        }
    },
    mounted() {
        axios.get('/current/user/profile').then((profile) => {
            if(profile.data !== "User not logged in") this.userProfile = profile.data;
        })
    }
}
</script>

<style>
.loginLink {
  margin-right: 10px;
}
</style>