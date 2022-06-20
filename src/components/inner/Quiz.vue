<template>
  <div class="board">
    <div class="tags">
      <transition-group
        appear
        enter-active-class="animate__animated animate__fadeInRight"
        leave-active-class="animate__animated animate__fadeOutRight list-complete-leave-active"
      >
        <tag v-for="(tag, index) in tags" :key="index" :tag="tag" />
      </transition-group>
    </div>
    <div class="timers">
      <transition-group
        appear
        enter-active-class="animate__animated animate__fadeInRight"
        leave-active-class="animate__animated animate__fadeOutRight list-complete-leave-active-relative"
      >
        <circle-ring v-for="(timer, index) in timers" :key="index" :time="timer" />
      </transition-group>
    </div>
    <div class="inner">
      <div class="title">{{title}}</div>
      <word v-if="quiz.quiz_type == 0"/>
      <img-quiz v-if="quiz.quiz_type == 1"/>
      <music-quiz v-if="quiz.quiz_type == 2"/>
    </div>
  </div>
</template>

<script>
import Tag from "./Tag";
import CircleRing from "./CircleRing";
import Word from "../quiz/Word";
import ImgQuiz from "../quiz/ImgQuiz"
import { useStore } from "vuex";
import { toRef } from '@vue/reactivity';
import MusicQuiz from "../quiz/MusicQuiz"
import 'animate.css';
export default {
  name: "Quiz",
  props: {},
  components: { Tag, CircleRing, Word,ImgQuiz,MusicQuiz},
  setup() {
    let store = useStore();
    let timers = toRef(store.state,'timers');
    return {
      tags: store.state.tags,
      timers,
      title:toRef(store.state,"title"),
      quiz:toRef(store.state,'quiz')
    };
  },
};
</script>

<style lang="less" scoped>
.board {
  height: 75%;
  .tags {
    position: absolute;
    left: -80px;
    top: 25px;
  }
  .timers {
    position: absolute;
    right: 0px;
    top: 20px;
  }
  .ppp {
    background-color: rgb(247, 244, 81);
  }
}

.inner{
  flex-direction: column;
  justify-content: flex-start;
}

.title {
    flex:none;
    font-weight: bold;
    font-size: 40px;
    // background-color: red;
    box-sizing: border-box;
    margin: 10px;
    text-align: center;
  }
.list-complete-leave-active {
  position: absolute;
}
.list-complete-leave-active-relative {
  position: relative;
}
</style>