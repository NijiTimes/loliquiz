<template>
  <div class="area">
    <div class="content">
      <div class="text">{{ quiz.text }}</div>
    </div>
    <div v-if="quiz.ans_type ==3" class="ans-options">
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
import { toRef } from "vue";
import Options from './Options';
export default {
  name: "Word",
  props: {},
  components: {Options},
  setup() {
    let store = useStore();
    let ansDetail = toRef(store.state, "ansDetail");
    function ShowAnsDetail() {
      store.commit("SetImgShow", store.state.ansDetail);
    }
    return {
      ansDetail,
      ShowAnsDetail,
      quiz: toRef(store.state, "quiz"),
      ans: toRef(store.state, "ans"),
      title: toRef(store.state, "title"),
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
  .title {
    font-weight: bold;
    font-size: 40px;
    // background-color: red;
    height: 10%;
  }
  .text,
  .title {
    box-sizing: border-box;
    margin: 20px;
    text-align: center;
  }
  .content {
    height: 80%;
    //background-color: green;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
     transition: 0.5s all;
    .text {
        transition: 0.5s all;
      position: relative;
      font-size: 22px;
    }
  }
  .ans-options{
        position: absolute;
    bottom: 10%;
    width: 100%;
  }
  .ans {
    position: absolute;
    bottom: 0%;
    width: 100%;
    //background-color: green;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    .title {
      width: 80px;
      line-height: 40px;
      margin: 0;
    }
    .maohao {
      width: 20px;
    }
    .text {
      z-index: 0;
      //width: 160px;
      height: 100px;
      max-width: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
      .inner {
        font-size: 30px;
        word-wrap: break-word;
        word-break: break-all;
      }
    }
    .ans-detail {
      position: absolute;
      bottom: -10px;
      font-size: 16px;
      color: #666;
      user-select: none;
      cursor: pointer;
    }
  }
}
</style>