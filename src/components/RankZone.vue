<template>
  <div class="zone">
    <div class="game-icon">
      <div class="line">
        <img src="LoliCafe2.png" alt="" />
        <img src="5th.png" alt="" />
      </div>
      <img src="QuizGame2.png" alt="" />
    </div>
    <div  class="area">
      <div class="left"></div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { toRef } from "vue";
export default {
  name: "RankZone",
  props: {},
  components: {},
  setup() {
    let store = useStore();
    return {
      ready: toRef(store.state, "ready"),
    };
  },
};
</script>

<style lang="less" scoped>
.zone {
  //background-color: blue;
  height: 20%;
  .game-icon {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>