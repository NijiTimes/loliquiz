<template>
  <div class="area">
    <ul class="ans-area" v-if="!ans">
      <transition-group
        appear
        enter-active-class="animate__animated animate__fadeInRight"
        leave-active-class="animate__animated animate__fadeOutRight list-complete-leave-active"
      >
        <li class="option" v-for="option in options" :key="option.id">
          <span class="option-name">{{ option.id }}</span>
          <span class="option-content">{{ option.content }}</span>
        </li>
      </transition-group>
    </ul>
    <div class="ans-show" v-if="ans">
      <div class="title">正确答案</div>
      <div class="title maohao">:</div>
      <div class="option-area">
        <li class="option ans-option" v-for="option in ansOption" :key="option.id">
          <span class="option-name">{{ option.id }}</span>
          <span class="option-content">{{ option.content }}</span>
        </li>
      </div>
      <div class="ans-detail" v-if="ansDetail" @click="ShowAnsDetail">
        点击查看详细解答
      </div>
    </div>
  </div>
</template>

<script>
import { ref, toRef } from "vue";
import { useStore } from "vuex";
export default {
  name: "Options",
  props: {},
  components: {},
  setup() {
    let store = useStore();
    function ShowAnsDetail() {
      store.commit("SetImgShow", store.state.ansDetail);
    }
    let  options = toRef(store.state,'options');
    let ansDetail = toRef(store.state, "ansDetail");
    return {
      options,
      ShowAnsDetail,
      ansOption: toRef(store.state, "ansOption"),
      ans:toRef(store.state,'ans'),
      ansDetail,
    };
  },
};
</script>

<style lang="less" scoped>
.area {
  height: 100px;
  .ans-area {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }
}

.option {
  box-sizing: border-box;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
  height: 30px;
  margin: 10px;
  box-shadow: 2px 2px 4px 2px rgb(0 0 0 / 50%);
  width: 160px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  transition: 0.5s all;
  .option-name {
    border-right: 1px solid #444;
    box-sizing: border-box;
    width: 30px;
    margin-right: 5px;
  }
}


.ans-show {
  .ans-detail {
    position: absolute;
    bottom: -30px;
    //left:10px;
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

.list-complete-leave-active {
  position: relative;
}
</style>