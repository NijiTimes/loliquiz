<template>
  <div class="area box">
   <chat-inner :chats="chats"/>
    <div class="input-space">
      <form action="" v-on:submit.prevent="UpChat">
        <input type="text" class="text" v-model="message" />
        <button class="iconfont icon-liaotian-yuan-xianxing"></button>
      </form>
    </div>
  </div>
</template>

<script>

import { ref} from "vue";
import ChatInner from "./ChatInner"
import {useStore} from 'vuex'
export default {
  name: "Chat",
  props: {},
  components: {ChatInner},
  setup() {
    let store = useStore();
    let message = ref("");
    function UpChat(a, b, c) {
     // chats.push({ from: "ppdp", content: message.value });
      store.dispatch("sendMessage",message.value )
      message.value = "";
    }
    return {
      message,
      UpChat,
      chats:store.state.messages
    };
  },
};
</script>

<style lang="less" scoped>
.area {
  width: 500px;
  height: 80%;
  padding: 20px;

  .input-space {
    margin-top: 10px;
   
    .text {
      height: 26px;
      width: 85%;
      font-size: 20px;
       vertical-align: -webkit-baseline-middle;
    }
    .iconfont {
      font-size: 25px;
      position: relative;
      vertical-align: -webkit-baseline-middle;
    }
  }
}
</style>