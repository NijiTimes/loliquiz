<template>
  <div class="area box">
    <div class="input-area" @click="activeInput">
      <div class="light" :style="{
      backgroundColor: light.color,
      animation:light.anima,
    }"></div>
      <div
        class="content"
        contenteditable="true"
        spellcheck="false"
        ref="textArea"
        name="AnsBoard"
        @keyup.enter="UpAns"
      ></div>
      <div class="cancel-btn" @click.stop="cancel"></div>
      <div class="up-btn" @click.stop="UpAns"></div>
    </div>
    <div class="line"></div>
    <div class="btn" :class="btn" @click="PopQuiz"></div>
  </div>
</template>

<script>
import { ref, toRef } from "vue";
import { useStore } from "vuex";
export default {
  name: "PopQuiz",
  props: {},
  components: {},
  setup() {
    let store = useStore();
    let message = ref(null);
    let textArea = ref(null);
    function UpAns() {
      if (
        store.state.anser == "ALL" ||
        store.state.anser == store.state.user.id
      ) {
        store.dispatch("sendAns", textArea.value.innerText);
        textArea.value.innerHTML = "";
      }
    }
    function cancel() {
      textArea.value.innerHTML = "";
    }
    function activeInput() {
      textArea.value.focus();
    }
    function PopQuiz() {
      store.dispatch("popQuiz");
    }
    return {
      message,
      UpAns,
      activeInput,
      cancel,
      textArea,
      PopQuiz,
      btn: toRef(store.state, "btn"),
      light: toRef(store.state,'light'),
    };
  },
};
</script>

<style lang="less" scoped>
.area {
  width: 500px;
  height: 80%;
  padding: 20px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  .input-area {
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    //background: #bfa;
    cursor: text;
    position: relative;
    .content {
      position: relative;
      top: -10px;
      width: 100%;
      flex: none;
      background: transparent; //  背景透明
      border: none; // 边框不显示
      outline: none;
      box-shadow: none;
      resize: none;
      text-align: center;
      line-height: 22px;
      font-size: 22px;
      &::-webkit-scrollbar {
        display: none;
      }
    }

    .light {
      width: 70%;
      height: 6px;
      border-radius: 6px;
      background-color: aqua;
      position: absolute;
      top:0px;
      box-shadow: 0px 0px 3px 1px rgb(0 0 0 / 50%);
    }

    .cancel-btn,
    .up-btn {
      width: 80px;
      height: 35px;
      position: absolute;
      box-sizing: border-box;
      border-radius: 20px;
      bottom: 0px;
      line-height: 35px;
      text-align: center;
      cursor: pointer;
      user-select: none;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 1),
        inset 0px -1px 2px rgba(0, 0, 0, 1),
        inset 0px 2px 4px rgba(255, 255, 255, 0.5);
      transition: 0.1s all;
      &:active {
        bottom: -1px;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 1),
          inset 0px -1px 2px rgba(0, 0, 0, 1),
          inset 0px 1px 2px rgba(255, 255, 255, 0.5);
      }
    }
    .cancel-btn {
      left: 10%;
      background-color: rgb(255, 35, 35);
      text-shadow: 2px 2px 3px rgb(0, 0, 0);
      color: #fff;
      &::before {
        content: "清除";
      }
    }
    .up-btn {
      right: 10%;
      color: #111;
      text-shadow: 2px 2px 3px rgb(255, 255, 255);
      background-color: rgb(79, 255, 35);
      &::before {
        content: "提交";
      }
    }
  }

  .line {
    height: 70%;
    width: 2px;
    background: #666;
  }
  .btn {
    height: 140px;
    width: 140px;
    background: #ff2424;
    line-height: 140px;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    color: #fff;
    text-shadow: 2px 2px 3px rgb(0, 0, 0);
    border-radius: 50%;
    box-shadow: 0px 10px 15px rgba(0, 0, 0, 1),
      inset 0px -8px 10px rgba(0, 0, 0, 1),
      inset 0px 10px 8px rgba(255, 255, 255, 0.5);
    cursor: pointer;
    user-select: none;
    position: relative;
    transition: 0.1s all;
    &::before {
      content: "抢答";
    }
    &:active {
      top: 3px;
      box-shadow: 0px 5px 8px rgba(0, 0, 0, 1),
        inset 0px -5px 7px rgba(0, 0, 0, 1),
        inset 0px 7px 6px rgba(255, 255, 255, 0.5);
    }
  }
  .btn-cant,
  .btn-cold,
  .btn-noneed {
    background: #707070;
    &:active {
      top: 0px;
      box-shadow: 0px 10px 15px rgba(0, 0, 0, 1),
        inset 0px -8px 10px rgba(0, 0, 0, 1),
        inset 0px 10px 8px rgba(255, 255, 255, 0.5);
    }
  }
  .btn-cant {
    &::before {
      content: "不可用";
    }
  }
  .btn-cold {
    &::before {
      content: "冷却中";
    }
  }
  .btn-noneed{
       &::before {
      content: "无需抢答";
    }
  }
}
</style>