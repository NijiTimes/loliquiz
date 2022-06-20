<template>
  <div class="area">
    <div class="kick" @click="kick">x</div>
    <div class="check">
      <div class="btn" :class="{'right':result == '1'}" @click="right">对</div>
      <div class="btn" :class="{'wrong':result == '2'}" @click="wrong">错</div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import {ref,toRef} from 'vue'
export default {
  name: "Check",
  props: ["player"],
  components: {},
  setup(props) {
    let store = useStore();
    let result = toRef(props.player,'result');
    function kick() {
      store.dispatch("kickPlayer", props.player.id);
    }
    function right(){
      store.commit("SetAnsCheckResult",{id:props.player.id,result:1});
    }
    function wrong(){
     store.commit("SetAnsCheckResult",{id:props.player.id,result:2});
    }
    return { kick,result,right,wrong };
  },
};
</script>

<style lang="less" scoped>
.area {
  position: absolute;
  z-index: 100;
  height: 100%;
  top:0;
  right:0;
  .kick,
  .check {
    position: absolute;
  }
  .kick {
    top: 0;
    right: 0;
    width: 20px;
    height: 20px;
    background-color: red;
    line-height: 20px;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
    user-select: none;
  }
  .check {
    //position: absolute;
    right: 20px;
    display: flex;
    flex-direction:column ;
    justify-content: space-evenly;
    height: 100%;
    //background-color: red;
  }
  .btn {
    cursor: pointer;
    user-select: none;
    //margin: 50px;
    background-color: grey;
    width: 50px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 10px;
    opacity: 0.7;
  }
  .btn.right {
    background-color: rgb(0, 255, 0);
  }
  .btn.wrong {
    background-color: red;
  }
}
</style>