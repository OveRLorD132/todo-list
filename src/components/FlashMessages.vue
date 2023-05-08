<template>
    <Transition name="message-show">
        <div v-if="flashMess" class="flashMessage">
            <div :class="messageClass"><h4>{{ flashMess }}</h4></div>
        </div>
    </Transition>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            flashMess: "",
            messageClass: "",
        }
    },
    mounted() {
        axios.get('/flash-messages').then((messages) => {
            if(messages.data.error) {
              this.flashMess = messages.data.error[0];
              this.messageClass = 'errorMessage';
            } else if(messages.data.success) {
              this.flashMess = messages.data.success[0];
              this.messageClass = 'successMessage';
            }
        })
    },
    created() {
      setTimeout(() => {
        this.flashMess = "";
      }, 5000);
    },
}
</script>

<style>
.flashMessage {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  position: absolute;
}

.successMessage {
  text-align: center;
  border-left: 4px solid #47ce64;
  margin-top: 60px;
  justify-items: center;
  flex-direction: column;
  justify-content: center;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  width: 200px;
  height: 50px;
}

.errorMessage {
  text-align: center;
  border-left: 4px solid #CF2929;
  justify-items: center;
  flex-direction: column;
  justify-content: center;
  margin-top: 60px;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  width: 200px;
  height: 50px;
}

.message-show-enter-active {
  transition: all 0.3s ease;
}

.message-show-leave-active {
  transition: all 0.3s ease;
}

.message-show-enter-from {
  transform: translateX(20px);
  opacity: 0;
}

.message-show-leave-to {
  transform: translateX(-20px);
  opacity: 0;

}
</style>