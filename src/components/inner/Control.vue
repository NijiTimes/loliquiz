<template>
  <div class="area box">
    <div class="line">
      <div class="btn" @click="start">开始游戏</div>
      <div class="btn" @click="restart">重置游戏</div>
      <div class="btn" @click="next">下一题</div>
    </div>
    <div class="line">
      <div class="btn" @click="check">判定</div>
      <div class="btn yes" @click="yes">正确</div>
      <div class="btn no" @click="no">错误</div>
    </div>
    <div class="line line-l">
      <div class="left">
        <div class="btn" @click="ready">准备开始</div>
        <div class="btn" @click="musicPlay">播放音乐</div>
        <div class="btn" @click="ShowScore">展示积分</div>
        <div class="info1">{{ playerInfo.player}}/{{ playerInfo.all }}</div>
        <div class="info2">{{quiz.id+1}}/{{quizNum}}</div>
      </div>
      <div class="right">
        <div class="quiz-info"></div>
        <div class="ans">
          {{ ans }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toRef } from "vue";
import socket from "../../socket";
import { useStore } from "vuex";
export default {
  name: "Control",
  props: {},
  components: {},
  setup() {
    let store = useStore();
    let ans = toRef(store.state, "ansAdmin");
    function start() {
      socket.emit("StartGame");
    }
    function restart() {
      socket.emit("RestartGame");
    }
    function next() {
      socket.emit("NextQuiz");
    }
    function check() {
      store.dispatch("sendAnsCheck");
    }
    function ready() {
      socket.emit("Ready");
    }
    function yes() {
      if (store.state.anser == "" || store.state.anser == "ALL") return;
      socket.emit("CheckAns", [{ id: store.state.anser, p: true }]);
    }
    function no() {
      if (store.state.anser == "" || store.state.anser == "ALL") return;
      socket.emit("CheckAns", [{ id: store.state.anser, p: false }]);
    }
    function musicPlay() {
      socket.emit("MusicReplay");
    }
    function ShowScore() {
      socket.emit("ShowScore");
    }
    return {
      start,
      restart,
      check,
      ready,
      yes,
      no,
      next,
      musicPlay,
      ShowScore,
      ans,
      playerInfo: store.state.playerNum,
      quiz:toRef(store.state,'quiz'),
      quizNum:store.state.quizNum
    };
  },
};
</script>

<style lang="less" scoped>
.area {
  width: 500px;
  height: 80%;
  padding: 10px;
  .line {
    height: 45px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
  .line-l {
    height: 120px;
  }
}
.btn {
  width: 80px;
  height: 35px;
  box-sizing: border-box;
  border-radius: 10px;
  line-height: 35px;
  text-align: center;
  cursor: pointer;
  user-select: none;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 1), inset 0px -1px 2px rgba(0, 0, 0, 1),
    inset 0px 2px 4px rgba(255, 255, 255, 0.5);
  transition: 0.1s all;
  background-color: #ddd;
  &:active {
    bottom: -1px;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 1),
      inset 0px -1px 2px rgba(0, 0, 0, 1),
      inset 0px 1px 2px rgba(255, 255, 255, 0.5);
  }
}
.yes {
  background-color: rgb(0, 255, 0);
}
.no {
  background-color: red;
}

.left {
  width: 80px;
  height: 100%;
  position: relative;
}
.info1,.info2 {
  position: absolute;
  
  bottom: -5px;
}
.info1{
  left: -15px;
}
.info2{
  right:-20px;
}
.right {
  width: 220px;
  height: 100%;
  box-sizing: border-box;
  border: 1px solid #333;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>