<template>
  <div v-if="imgShowSrc" class="bg-area" @click="close">
    <div class="img-area">
          <img
        :src="imgShowSrc"
      />
    </div>

  </div>
</template>

<script>
import { useStore } from "vuex";
import { toRef } from "vue";
export default {
  name: "ShowImg",
  props: {},
  components: {},
  setup() {
    let store = useStore();
    function close() {
      store.commit("SetImgShow","");
    }
    return { close,imgShowSrc:toRef(store.state,'imgShowSrc')};
  },
};
</script>

<style lang="less" scoped>
.bg-area {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 9999;
  display: flex;
  align-content: center;
  justify-content: center;
  .img-area {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      max-width: auto;
      max-height: 100%;
      cursor: pointer;
    }
  }
}
</style>