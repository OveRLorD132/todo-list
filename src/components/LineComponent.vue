<template>
  <div id="line">
    <div id="mainLink"><a href="/tasks" name="Main Page">Main Page</a></div>
    <slot></slot>
    <div id="profileLinks">
      <template v-if="userProfile">
        <div class="profileCont">
          <img class="profileImg" :src="profilePicSrc" @click="showLinks">
          <Transition name="show-links">
            <div class="links" v-if="linksAreVisible">
              <a href="/profile" name="My Profile" class="profileLinks">My Profile</a>
              <hr class="separator">
              <a href="/logout" name="Log Out" class="profileLinks">Log Out</a>
            </div>
          </Transition>

        </div>

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
            profilePicSrc: "/images/profile.png",
            linksAreVisible: false,
        }
    },
    mounted() {
        axios.get('/current/user/profile').then((profile) => {
            if(profile.data !== "User not logged in") this.userProfile = new User(profile.data);
            console.log(this.userProfile);
            this.$emit('user-profile', {user: this.userProfile});
        }).then(() => {
          axios.get('/user/image').then((bool) => {
            if(bool.data) this.profilePicSrc = `/images/profile/${this.userProfile.username}.png`;
            else this.profilePicSrc = `/images/profile.png`;
            this.$emit('profile-image', {hasImg: bool.data});
            //this.imgSrc = `/images/profile/${this.userProfile.username}.png`
        })
        })

    },
    methods: {
      showLinks() {
        this.linksAreVisible = !this.linksAreVisible;
      }
    }
}
</script>

<style scoped>
.separator {
  margin: 0;
  margin-left: -10px !important;
  padding: 0;
}

.profileLinks {
  margin: 10px 10px 10px 10px;
  font-size: large;
  color: #2C40C2;
}

.links {
  border: 0.5px solid;
  border-top: none;
  border-right: none;
  text-align: left;
  width: 100%;
  position: fixed;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding-left: 10px;
  margin-top: 1px;
  padding-right: 40px;
}

.profileImg {
  margin-top: 2px;
  background-color: #ffffff;
  cursor: pointer;
  border-radius: 50%;
  width: 40px;
  height: 40px;
}

.profileCont {
  text-align: right;
  width: 200px;
  height: 100%;
  border-radius: 50%;
}

.logoutLink {
  margin-right: 10px;
}

.loginLink {
  margin-right: 10px;
}

.show-links-enter-active, 
.show-links-leave-active {
  transition: all 0.5s ease;
}

.show-links-leave-to,
.show-links-enter-from {
  opacity: 0;
}
</style>