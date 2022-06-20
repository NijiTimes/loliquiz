<template>
  <audio controls name="welcome" hidden controlsList="nodownload" volume="0.5">
    <source src="welcome.mp3" />
  </audio>
  <div class="area">
    <transition-group
      appear
      enter-active-class="animate__animated animate__fadeInRight"
      leave-active-class="animate__animated animate__fadeOutRight list-complete-leave-active"
      tag="ul"
    >
    <li v-for="(info,index) in infos" :key="index" class="welcome box">{{info}}</li>
    </transition-group>
  </div>
</template>

<script>
import { toRef} from '@vue/runtime-core';
import { useStore } from "vuex";
import 'animate.css';
export default {
  name: "",
  props: {},
  components: {},
  setup() {
    let store = useStore();
    let infos = toRef(store.state,'welcome_infos');
    return {infos};
  },
};
</script>

<style lang="less" scoped>
.area {
  position: fixed;
  width: 400px;
 // height: 100%;
  //background-color: #bfa;
  z-index: 100;
  right: 0;
  top:10%;
}
.welcome {
  opacity: 1!important;
  height: 60px;
  font-size: 25px;
  line-height: 60px;
  text-align: center;
  border-radius: 5px;
  margin: 30px 0 30px;
  transition: 0.5s all;
}
.list-complete-leave-active {
  position: absolute;
}
</style>