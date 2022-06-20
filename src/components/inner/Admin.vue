<template>
  <div class="area">
    <div class="dsk">
      <big-bubble v-if="m.msg != null" :msg="m.msg" />
      <img
        src="https://msavatar1.nexon.net/Character/OGNOGDMDKHNIDEJFNIFBEIFBDCHMALFLMJFODNKGGFGGGGOPCCHBILBACEMKPAAFBMILMPGPKOOPMBNEBFCAKPCIIMHLEPJFCIKBIOOKFLBLLHBPHCAAEAJIPALEALLKGHPILLIKIAOBMADNNKLGNIDEGFDDLHMMCBOCBLLBMLNEOLFIAKHMPAPBDJNDPLCJMDHBGNKBJNJMPGPCJFIMJJIICPMGDPEECGIPFGFIOCAIIDGBDIEIOPFAEDABMIDC.png"
      />
      <div class="name">主持人 刀哥</div>
    </div>
    <div class="info board">
      <div class="inner">{{info}}</div>
    </div>
  </div>
</template>

<script>
import BigBubble from "./BigBubble";
import { useStore } from "vuex";
import {toRef} from 'vue'
export default {
  name: "Admin",
  props: {},
  components: { BigBubble },
  setup() {
    let store = useStore();
    return {
      m: store.state.admin_msg,
      info:toRef(store.state,'board')
    };
  },
};
</script>

<style lang="less" scoped>
.area {
  height: 28%;
  display: flex;
  justify-content: space-evenly;
  box-sizing: border-box;
  //background-color: green;
  align-items: flex-end;
  overflow: hidden;
  .dsk {
    position: relative;
    width: 180px;
    margin-right: -10%;
    margin-left:-5%;
    margin-bottom:-1%;
    .big-bubble {
      position: absolute;
      bottom: 50px;
      left: 100px;
    }
    img {
      height: 180px;
      transform: rotateY(180deg);
      position: absolute;
      bottom: -30px;
      left:-20px;
    }
    .name {
      width: 120px;
      height: 30px;
      border-radius: 5px;
      font-size: 16px;
      text-align: center;
      line-height: 30px;
      color: rgb(255, 255, 255);
      text-shadow: 2px 2px 3px rgb(0, 0, 0);
      font-weight: bold;
      position: absolute;
      bottom: 10px;
      left: 10px;
    }
  }
  .info {
    width: 50%;
    height: 75%;
    box-sizing: border-box;
    margin-bottom: 5%;
    .inner{
      padding: 10px 10px 10px 15px;
    }
  }
}
</style>