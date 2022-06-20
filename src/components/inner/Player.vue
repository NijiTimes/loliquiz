<template>
  <audio controls name="PopQuiz" hidden controlsList="nodownload">
    <source src="PopQuiz.mp3" />
  </audio>
  <div
    class="player-area"
    :style="{
      marginLeft: margin + 'px',
      marginRight: margin + 'px',
      width: width + 'px',
      height: height + 'px',
    }"
  >
    <bubble v-if="player.msg!=null" :msg="player.msg"/>
    <img class="player-img" :src="player.imgSrc" alt="" />
    <div class="player-uid">{{player.uid}}</div>
    <div class="player-name">{{ player.name }}</div>
    <div class="player-board board"     :style="{
      backgroundColor: player.color,
      animation:player.anima,
    }">
      <div class="inner">
        {{player.board}}
      </div>
    </div>
    <check v-if="isAdmin" :player="player"/>
  </div>
</template>

<script>
import {toRef, ref, watch, computed} from "vue";
import Bubble from "./Bubble"
import Check from "./Check"
import {useStore} from 'vuex'
export default {
  name: "Player",
  props: ["areaWidth", "player", "num"],
  components: {Bubble,Check},
  setup(props) {
    const widthMax = 300;
    const widthMin = 230;
    const toMargin = [0,0,100,50,0,0];
    const tonm = [
      { n: 1, m: 1 },
      { n: 1, m: 1 },
      { n: 2, m: 1 },
      { n: 3, m: 1 },
      { n: 2, m: 2 },
      { n: 3, m: 2 },
      { n: 3, m: 2 },
      { n: 4, m: 2 },
      { n: 4, m: 2 },
      { n: 3, m: 3 },
      { n: 4, m: 4 },
      { n: 4, m: 4 },
      { n: 4, m: 4 }
    ];
    let store = useStore();
    let margin = ref(0);
    let width = ref(230);
    let isAdmin = toRef(store.state, "isAdmin");
    let height = computed(() => {
      return Math.round((width.value / 230) * 150);
    });
    watch(
      () => props.num,
      () => {
        if (props.num <= 12) {
          let tmpn = tonm[props.num].n;
          if(tmpn<5 ){
            width.value = widthMax;
           if(props.areaWidth>1200) margin.value = toMargin[tmpn];else margin.value = 0;
          }
          
        } else width.value = widthMin,margin.value = 0;
      },
      { immediate: true }
    );
    return { margin, width, height ,isAdmin};
  },
};
</script>

<style lang="less" scoped>
.player-area {
  width: 230px;
  height: 150px;
  flex: none;
  position: relative;
  //transition: all 1s;
  img {
    right: 60%;
    top: -70px;
    
  }
}
.bubble{
  top:-40px;
  right:12%;
}
.player-board,
.player-img,
.player-name,
.player-uid {
  position: absolute;
  overflow: hidden;
}
.player-name {
  width: 120px;
  height: 30px;
  //border: 2px solid #444;
  border-radius: 3px;
  //border: 1px solid rgb(227, 113, 255);
  top: -15px;
  left: 40%;
  z-index: 1;
  font-size: 16px;
  text-align: center;
  line-height: 30px;
  z-index: 1;
  background-color: #7afc85;
  color: #fff;
  text-shadow: 1px 1px 3px black;
}
.player-uid {
  width: 50px;
  height: 24px;
  //border: 2px solid #444;
  border-radius: 1px;
  top: 5px;
  left: 17%;
  z-index: 1;
  font-size: 16px;
  text-align: center;
  line-height: 24px;
  z-index: 2;
  background-color: #41defa80;
  color: #fff;
  text-shadow: 1px 1px 3px black;
}
.player-board {
  width: 100%;
  height: 100%;
  .inner{
    word-wrap: break-word;
    word-break: break-all;
    max-width: 100%;
  }
}

@keyframes sun {
  100% {
    background-position: -400% 0;
  }
}
</style>