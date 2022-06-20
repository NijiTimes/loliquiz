<template>
  <div class="area">
    <div class="img-area">
      <img @click="ShowImg" :src="quiz.imgSrc" />
    </div>
    <div class="content">
      <div class="text">{{ quiz.text }}</div>
    </div>
    <div v-if="quiz.ans_type == 3" class="ans-options">
      <options />
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
import { toRef, toRefs } from "vue";
import Options from "./Options";
export default {
  name: "ImgQuiz",
  props: {},
  components: { Options },
  setup() {
    let store = useStore();
    let ansDetail = toRef(store.state, "ansDetail");
    let quiz = toRef(store.state, "quiz");
    function ShowAnsDetail() {
      store.commit("SetImgShow", store.state.ansDetail);
    }
    function ShowImg() {
      store.commit("SetImgShow", quiz.value.imgSrc);
    }
    console.log(store.state.quiz);

    return {
      quiz,
      ansDetail,
      ans: toRef(store.state, "ans"),
      title: toRef(store.state, "title"),
      ShowImg,
      ShowAnsDetail,
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
  .img-area {
    width: 240px;
    height: 200px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      max-width: 100%;
      max-height: 100%;
      height: auto;
      cursor: pointer;
    }
  }
  .content {
    height: 100px;
    transition: 0.5s all;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    position: relative;
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
}
</style>