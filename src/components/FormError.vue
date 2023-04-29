<template>
    <Transition name="error-show">
        <div v-if="error" class="errorMessage">
            <div class="errorText"><h4>{{ error }}</h4></div>
        </div>
    </Transition>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            error: "",
        }
    },
    mounted() {
        axios.get('/login/errors').then((errors) => {
            if(errors.data.error) this.error = errors.data.error[0];
        })
    },
    created() {
      setTimeout(() => {
        this.error = "";
      }, 5000);
    },
}
</script>

<style>
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