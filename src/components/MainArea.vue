<template>
  <div class="main-area" :style="{ transform: 'scale(' + scale + ')' }">
    <left-column />
    <right-column />
  </div>
</template>

<script>
import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";
import { onMounted, onUnmounted,ref } from "vue";
export default {
  name: "MainArea",
  props: {},
  components: {
    LeftColumn,
    RightColumn,
  },
  setup() {
    const getScollHeight = () => {
      let _h =  document.body.clientHeight/969;
      let _w = document.body.clientWidth/1920;
      //console.log(document.body.clientHeight+'+'+document.body.clientWidth);
      return _h<_w?_h:_w;
    };
    const scale = ref(getScollHeight());
    const windowResize = () => {
      scale.value = getScollHeight();
    };

    onMounted(() => {
      window.addEventListener("resize", windowResize);
    });
    onUnmounted(() => {
      window.removeEventListener("resize", windowResize);
    });
    return {
      scale,
    };
  },
};
</script>

<style lang="less" scoped>
.main-area {
  height: 970px;
  width: 1800px;
  display: flex;
  transform: scale(0.5);
  flex:none;
}

</style>