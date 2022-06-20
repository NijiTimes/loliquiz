<template>
  <div class="area" :style="{ animationDelay: delay[tag.type]+'ms' }">
    <div class="title">
      {{ tag.title}}
    </div>

    <div class="tangle" :style="{ borderRightColor: tag.color }"></div>
    <div class="tangle-up" :style="{ borderRightColor: tag.color }"></div>
        <div class="tag" :style="{ backgroundColor: tag.color }"></div>
  </div>
</template>

<script>
export default {
  name: "Tag",
  props: ["tag"],
  components: {},
  setup(props) {
    const delay = [0,500,1000]
    return {delay};
  },
};
</script>

<style lang="less" scoped>
.area {
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.5;
  transition: 0.5s all;
  //animation-delay: 1000ms;
  user-select: none;
  box-sizing: border-box;
  margin-bottom:20px ;
  position: relative;
  z-index: 1000;
  &:hover {
    opacity: 1;
  }
}
.tangle {
  width: 0px;
  height: 0px;
  border: 20px solid transparent;
  border-bottom: none;
  top:10px;
  position: relative;
  //left:10px;
}
.tangle-up{
  width: 0px;
  height: 0px;
  border: 20px solid transparent;
  border-top: none;
  position: absolute;
  left: 0px;
  top:0px;
}
.title {
  position: absolute;
  left: 60px;
  color: rgb(255, 255, 255);
text-shadow: 2px 2px 3px rgb(0, 0, 0);
  font-weight: bold;
    z-index: 1;
}
.tag {
  width: 100px;
  height: 40px;
  background: red;

}
</style>