<template>
  <div class="area">
    <div class="circle">
      <div class="word">{{ timeLeft }}s</div>
      <div class="left-box">
        <div
          class="left"
          :style="{ transform: 'rotate(' + rotateL + 'deg)' }"
        ></div>
      </div>
      <div class="right-box">
        <div
          class="right"
          :style="{ transform: 'rotate(' + rotateR + 'deg)' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { onMounted, watch } from '@vue/runtime-core';

export default {
  name: "CircleRing",
  props: ["time"],
  components: {},
  setup(props) {
    let timeLeft = computed(() => {
      return Math.floor(props.time.left / 10);
    });
    let rotateR = computed(() => {
      let p = props.time.left / props.time.tot;
       if (p < 0.5) return 180;
      return Math.round((1 - p) * 360);
    });
    let rotateL = computed(() => {
      let p = props.time.left / props.time.tot;
      if (p > 0.5) return 0;
      return Math.round((0.5 - p) * 360);
    });
    let timer;
    watch(() => props.time.goon,() => {
      if(!props.time.goon){
        clearInterval(timer);
      }else{
              timer = setInterval(() => {
        props.time.left-=1;
        if(props.time.left <= 0){
          props.time.over();
          clearInterval(timer);
        }
      },100);
      }
    })
    onMounted(() => {
      timer = setInterval(() => {
        props.time.left-=1;
        if(props.time.left <= 0){
          props.time.over();
          clearInterval(timer);
        }
      },100);
    })

    return {
      timeLeft,
      rotateR,
      rotateL,
    };
  },
};
</script>

<style lang="less" scoped>
@width : 80px;
@w-width:@width - 14px;
@r-width:@width*0.5;

@color-c:#ddd;
@color-r:rgb(37, 211, 255);
.area{
    //background: chartreuse;
    margin:0 20px;
    position: relative;
    top: -10px;
    right:0px;
    opacity: 0.5;
}
.circle {
  width: @width;
  height: @width;
  background: @color-c;
  border-radius: 50%;
  margin-top: 10px;
  position: relative;
}
.word {
  width: @w-width;
  height: @w-width;
  line-height: @w-width;
  color: rgb(37, 211, 255);
  font-weight: bold;
  background: #fff;
  text-align: center;
  font-size: 22px;
  top: calc((@width - @w-width) * 0.5);
  left: calc((@width - @w-width) * 0.5);
  position: absolute;
  z-index: 99;
  border-radius: 50%;
}
.left-box,
.right-box {
  width: @r-width;
  height: @width;
  float: left;
  overflow: hidden;
  position: relative;
}
.right {
  width:@r-width;
  height: @width;
  position: absolute;
  top: 0;
  right: 0;
  background: @color-r;
  border-radius: 0 @r-width @r-width 0;
  transform: rotate(0deg);
  transform-origin: left center;
  //animation: rotateR 10s linear infinite;
}
.left {
  width: @r-width;
  height: @width;
  position: absolute;
  top: 0;
  left: 0;
  background: @color-r;
  border-radius: @r-width 0 0 @r-width;
  transform: rotate((0deg));
  transform-origin: right center;
  //animation: rotateL 10s linear infinite;
  //animation-delay: 5s;
}

</style>