<template>
  <LineComponent></LineComponent>
  <FlashMessages></FlashMessages>
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
import LineComponent from '../components/LineComponent.vue';
import FlashMessages from '../components/FlashMessages.vue';
import axios from 'axios';
export default {
  components: {
    LineComponent,
    FlashMessages,
  },
    data() {
        return {
            buttStyle: {backgroundColor: "#CACACA"},
        }
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

</style>