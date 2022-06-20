<template>
  <div class="big-bubble">
    <div class="left_triangle"></div>
    <div class="msg-bg">
    <span class="msg">{{ msg }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "BigBubble",
  props: ["msg"],
  components: {},
  setup(props) {
    return {};
  },
};
</script>

<style lang="less" scoped>
@bg-color:rgb(255, 255, 255);
.big-bubble {
  z-index: 100;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  opacity: 0.8;

}
.left_triangle {
  height: 0px;
  width: 0px;
  border-width: 10px;
  border-style: solid;
  border-color: transparent @bg-color transparent transparent;
  position: relative;
  box-sizing: border-box;
  margin-bottom: 10px;
  //   left:-16px;
  //   top:3px;
}
.msg-bg{
  width: 240px;
}
.msg {
  background-color: @bg-color;
  border-radius: 7px;
  padding: 10px 10px 10px 10px;
  word-wrap: break-word;
  font-size: 24px;
  font-weight: bold;
  word-break:break-all;
  float: left;
}
</style>