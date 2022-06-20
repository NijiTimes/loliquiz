<template>
  <div class="bubble">
    <div class="left_triangle"></div>
    <div class="msg-bg">
    <span class="msg">{{ msg }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Bubble",
  props: ["msg"],
  components: {},
  setup(props) {
    return {};
  },
};
</script>

<style lang="less" scoped>
@bg-color:rgb(255, 255, 255);
.bubble {
  z-index: 100;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  opacity: 0.8;

}
.left_triangle {
  height: 0px;
  width: 0px;
  border-width: 8px;
  border-style: solid;
  border-color: transparent @bg-color transparent transparent;
  position: relative;
     //left:-16px;
     top:8px;
}
.msg-bg{
  width: 170px;
}
.msg {
  background-color: @bg-color;
  border-radius: 7px;
  padding: 10px 10px 10px 10px;
  word-wrap: break-word;
  word-break:break-all; 
  float: left;
}
</style>