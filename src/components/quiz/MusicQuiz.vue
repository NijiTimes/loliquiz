<template>
  <audio controls id="QuizMusic" hidden controlsList="nodownload" volume="0.6">
    <source src="" />
  </audio>
  <div class="area">
    <transition
      appear
      enter-active-class="animate__animated animate__fadeInRight"
    >
      <div class="music-icon">
        <img
          :style="{ animation: anima }"
          src="https://img.qwq.nz/images/2022/01/17/54bbfd1873fa2522f067e15d116fcc66.png"
        />
      </div>
    </transition>
    <div class="content">
      <div class="text">
        {{ quiz.text }}
      </div>
    </div>
    <div v-if="quiz.ans_type == 3" class="ans-options">
      <options/>
    </div>
    <div class="ans" v-else-if="ans">
      <div class="title">正确答案</div>
      <div class="title maohao">:</div>
      <div class="text">
        <div class="inner">{{ ans }}</div>
      </div>
      <div class="ans-detail" v-if="ansDetail" @click="ShowAnsDetail">
        点击查看详细解答
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { toRef, watch, onMounted, ref, computed } from "vue";
import Options from './Options';
export default {
  name: "MusicQuiz",
  props: {},
  components: {Options},
  setup() {
    let store = useStore();
    let audio;
    let anima = ref("");
    let goon = toRef(store.state, "musicGoon");
    let ansDetail = toRef(store.state, "ansDetail");

    function ShowAnsDetail() {
      store.commit("SetImgShow", store.state.ansDetail);
    }
    onMounted(() => {
      audio = document.getElementById("QuizMusic");
      audio.addEventListener(
        "ended",
        function () {
          anima.value = "";
          store.commit("SetMusicGoon", false);
        },
        false
      );
    });

    watch(goon, (a) => {
      if (a) {
        audio.play();
        anima.value = "roll 5s infinite linear";
      } else {
        audio.pause();
        anima.value = "";
      }
    });
    return {
      quiz: toRef(store.state, "quiz"),
      ans: toRef(store.state, "ans"),
      anima,
      ShowAnsDetail,
      ansDetail,
    };
  },
};
</script>

<style lang="less" scoped>
.area {
  //background-color: aqua;
  flex: none;
  height: 85%;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .text {
    box-sizing: border-box;
    margin: 10px;
    text-align: center;
  }
}

img {
  width: 140px;
  height: auto;
}
.iconfont {
  font-size: 100px;
}
.music-icon {
  width: 200px;
  height: 160px;
  animation-delay: 2s;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content {
  height: 140px;
  //flex:1 1 ;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
 transition: 0.5s all;
  .text {
      transition: 0.5s all;
    position: relative;
    top: 0%;
    font-size: 22px;
  }
}
.ans {
  .ans-detail {
    position: absolute;
    bottom: -10px;
    font-size: 16px;
    color: #666;
    user-select: none;
    cursor: pointer;
  }
  //position: absolute;
  //bottom: -5%;
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  .title {
    width: 80px;
    line-height: 40px;
    margin: 0;

    font-weight: bold;
    font-size: 40px;
  }
  .maohao {
    width: 20px;
  }
  .text {
    z-index: 0;
    //width: 160px;
    height: 100%;
    max-width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0);
    .inner {
      font-size: 30px;
      word-wrap: break-word;
      word-break: break-all;
      background-color: rgba(0, 0, 0, 0);
    }
  }
}
</style>