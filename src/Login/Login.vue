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
  <Transition name="error-show">
    <div v-if="error" class="errorMessage">
      <div class="errorText"><h4>{{ error }}</h4></div>
    </div>
  </Transition>
  <div id="mainContainer">
    <div id="loginLabel"><h1>Log In</h1></div>
    <form id="loginForm" action="/login" method="post">
      <input type="text" name="username" placeholder="Enter login...">
      <input type="password" name="password" placeholder="Enter password...">
      <input type="submit" value="Login" @mouseover="changeColor" @mouseleave="restoreColor" :style="buttStyle">
    </form>
  </div>

</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            userProfile: "",
            error: "",
            buttStyle: {backgroundColor: "#CACACA"},
        }
    },
    mounted() {
      axios.get('/current/user/profile').then((profile) => {
        if(profile.data !== "User not logged in") this.userProfile = profile.data;
      })
      axios.get('/login/errors').then((errors) => {
        if(errors.data.error) this.error = errors.data.error[0];
      })
    },
    created() {
      setTimeout(() => {
        this.error = "";
      }, 5000);
    },
    methods: {
      changeColor() {
        this.buttStyle.backgroundColor = "#A4A4A4";
      },
      restoreColor() {
        this.buttStyle.backgroundColor = "#CACACA"
      }
    }
}
</script>

<style>
.loginLink {
  margin-right: 10px;
}

.errorMessage {
  display: flex;
  justify-content: center;
  width: 100%;
  position: fixed;
}

.errorText {
  border-right:4px solid #CF2929; 
  border-left: 4px solid #CF2929;
  display: flex;
  justify-content: center;
  justify-self: center;
  align-items: center;
  background-color: #ffffff;
  width: 200px;
  height: 50px;
}

#mainContainer {
  min-height: calc(100vh - 45px);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#loginForm {
    display: flex;
    flex-direction: column;
}
input[type="password"],
input[type="text"] {
  font-family: 'ProximaNova-Light';
  padding-top: 3px;
  padding-bottom: 3px;
  padding-left: 10px;
  border: none;
  border-radius: 10px;
  margin-bottom: 10px;
  width: 250px;
  height: 44px;
}

input[type="submit"] {
  font-family: 'ProximaNova-Light';
  font-size: 1.3rem;
  border: none;
  background-color: CACACA;
  margin-top: 10px;
  border-radius: 10px;
  height: 40px;
  cursor: pointer;
}

.error-show-enter-active {
  transition: all 0.3s ease;
}

.error-show-leave-active {
  transition: all 0.3s ease;
}

.error-show-enter-from {
  transform: translateY(-20px);
  opacity: 0;
}

.error-show-leave-to {
  transform: translateY(-20px);
  opacity: 0;

}

</style>