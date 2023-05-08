<template>
  <div id="line">
    <div id="mainLink"><a href="/tasks" name="Main Page">Main Page</a></div>
    <slot></slot>
    <div ref="links" id="profileLinks">
      <template v-if="userProfile">
        <div class="profileCont">
          <img class="profileImg" id="linePic" :src="profilePicSrc" @click="showLinks">
        </div>
      </template>
      <Transition name="show-links">
        <div class="linksCont" v-if="linksAreVisible">
        <div class="links">
          <img class="linksPic" :src="profilePicSrc">
          <div class="rightInfo">
            <div><h2 class="usernameLabel">{{ userProfile.username }}</h2></div>
            <div id="infoCont">
            <div>
              <div>E-mail:</div>
              <div id="emailInfo">{{ userProfile[`e-mail`] }}</div>
            </div>
            <div id="linksCont">
              <a href="/profile" name="My Profile" class="profileLinks">My Profile</a>
              <a href="/logout" name="Log Out" class="profileLinks">Log Out</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
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
            this.$emit('user-profile', {user: this.userProfile});
        }).then(() => {
          axios.get('/user/image').then((bool) => {
            if(bool.data) this.profilePicSrc = `/images/profile/${this.userProfile.username}.png`;
            else this.profilePicSrc = `/images/profile.png`;
            this.$emit('profile-image', {hasImg: bool.data});
            //this.imgSrc = `/images/profile/${this.userProfile.username}.png`
        })
        })
        document.addEventListener('click', this.hideLinks);
    },
    methods: {
      showLinks() {
        this.linksAreVisible = !this.linksAreVisible;
      },
      hideLinks(event) {
        if(this.linksAreVisible) {
          let element = document.getElementsByClassName('linksCont')[0];
          if(!element.contains(event.target) && event.target !== document.getElementById('linePic')) {
            this.linksAreVisible = false;
          }
        }
      }
    }
}
</script>

<style scoped>
#infoCont {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

#linksCont {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.usernameLabel {
  width: 100%;
  text-align: center;
  margin: 0;
  margin-bottom: 10px;
  padding: 0;
}

#emailInfo {
  margin-top: 5px;
}

.rightInfo {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
}

.linksPic {
  margin: 20px 20px 20px 20px;
  border-radius: 50%;
  width: 160px;
  height: 160px;
}

.separator {
  margin: 0;
  margin-left: -10px !important;
  padding: 0;
}

.profileLinks {
  margin-top: 5px;
  margin-bottom: 5px;
  color: #2C40C2;
}

.links {
  width: 300px;
  height: 200px;
  box-shadow: -8px 9px 19px -10px rgba(0,0,0,0.54);
  padding-right: 60px;
  display: flex;
  flex-direction: row;
  background-color: #ffffff;
}

.linksCont {
  right: 0;
  top: 45px;
  display: flex;
  justify-content: flex-end;
  position: fixed;

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
  transition: all 0.1s ease;
}

.show-links-leave-to,
.show-links-enter-from {
  opacity: 0;
}
</style>