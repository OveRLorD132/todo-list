<template>
  <line-component></line-component>
  <FormError></FormError>
  <div id="formContainer">
    <div id="registrationLabel"><h1>Registration</h1></div>
    <form @submit.prevent="submitRegistration" id="registrationForm">
        <div class="inputLine">
            <div class="errorContainer" v-if="usernameError">
                <img class="errPic" src="/images/error.png">
                <div class="errorTxt">{{ usernameError }}</div>
            </div>
            <input type="text" v-model="username" placeholder="Enter username..."> 
        </div>
        <div class="inputLine">
            <div class="errorContainer" v-if="emailError">
                <img class="errPic" src="/images/error.png">
                <div class="errorTxt">{{ emailError }}</div>
            </div>
            <input type="text" v-model="email" placeholder="Enter e-mail...">
        </div>
        <div class="inputLine">
            <div class="errorContainer" v-if="passwordError">
                <img class="errPic" src="/images/error.png">
                <div class="errorTxt">{{ passwordError }}</div>
            </div>
            <input type="password" v-model="password" placeholder="Enter password...">
        </div>
        <input type="submit" Value="Submit" @mouseover="changeColor" @mouseleave="restoreColor" :style="submitStyle">
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import FormError from '../components/FormError.vue';
import LineComponent from '../components/LineComponent.vue';
export default {
    components: {
    LineComponent,
    FormError,
},
    data() {
        return {
            usernameError: "",
            emailError: "",
            passwordError: "",
            username: "",
            email: "",
            password: "",
            submitStyle: {backgroundColor: "#CACACA"},

        }
    },
    methods: {
      async submitRegistration() {
        this.usernameError = "";
        this.passwordError = "";
        this.emailError = "";
        if(this.validateUsername(this.username) && this.validateEmail(this.email) && this.validatePassword(this.password)) {
            let res = await axios.post('/registration', {username: this.username, email: this.email, password: this.password});
            if(res.data === "Success") window.location.href = '/';
            else location.reload();
        }
        return;
      },
      validateUsername(username) {
        if(username.length < 8) {
            this.usernameError = "Username must be at least 8 symbols.";
            return false;
        }
        if(username.length >= 25) {
            this.usernameError = "Username could maximum be 25 symbols.";
            return false
        }
        return true;
      },
      validateEmail(email) {
        if(email.length > 100) {
            this.emailError = "Your e-mail is too long."
            return false;
        }
        if(!/.+@.+/.test(email)) {
            this.emailError = "Invalid format."
            return false;
        }
        return true;
      },
      validatePassword(password) {
        if(password.length < 8) {
            this.passwordError = "Your password may be at least 8 symbols."
            return false;
        }
        return true;
      },
      changeColor() {
        this.submitStyle.backgroundColor = "#A4A4A4";
      },
      restoreColor() {
        this.submitStyle.backgroundColor = "#CACACA"
      }
    },
    watch: {
        usernameError(newVal) {
            if(newVal !== "") {
                setTimeout(() => {
                    this.usernameError = "";
                }, 20000)
            }
        },
        emailError(newVal) {
            if(newVal !== "") {
                setTimeout(() => {
                    this.emailError = "";
                }, 20000)
            }
        },
        passwordError(newVal) {
            if(newVal !== ""){
                setTimeout(() => {
                    this.passwordError = "";
                }, 20000)
            }
        }
    }
}
</script>

<style>
.errPic {
    width: 20px;
    height: 20px;
}

.errorContainer {
    justify-content: flex-start;
    margin-bottom: 10px;
    align-items: center;
    display: flex;
}

.errorTxt {
    font-size: 0.8rem;
    padding-left: 5px;
    align-items: center;
    display: flex;
    color: #A62121;
}

.inputLine {
    display: flex;
    flex-direction: column;
}

#registrationForm {
    flex-direction: column;
    display: flex;
    align-content: center;
}

#formContainer {
    align-items: center;
    flex-direction: column;
    display: flex;
    justify-content: center;
    width: 100%;
    height: calc(100vh - 45px);
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
  width: 260px;
  font-family: 'ProximaNova-Light';
  font-size: 1.3rem;
  border: none;
  background-color: CACACA;
  margin-top: 10px;
  border-radius: 10px;
  height: 40px;
  cursor: pointer;
}
</style>