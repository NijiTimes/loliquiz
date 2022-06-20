<template>
  <div class="bg-view" :class="animav">
    <div class="bg" :class="anima"></div>
  </div>
  <audio
    controls
    name="bg-mp3"
    hidden
    loop
    controlsList="nodownload"
    volume="0.2"
  >
    <source src="Hue.mp3" />
  </audio>
  <audio controls name="bingo" hidden controlsList="nodownload">
    <source src="bingo.mp3" />
  </audio>
  <audio controls name="wrong" hidden controlsList="nodownload">
    <source src="wrong.mp3" />
  </audio>
  <audio controls name="PopQuiz" hidden controlsList="nodownload">
    <source src="PopQuiz.mp3" />
  </audio>
  <audio controls name="NewQuiz" hidden controlsList="nodownload" volume="0.5">
    <source src="NewQuiz.mp3" />
  </audio>
  <audio
    controls
    name="UpdataAns"
    hidden
    controlsList="nodownload"
    volume="0.5"
  >
    <source src="UpdataAns.mp3" />
  </audio>
  <audio controls name="ansstart" hidden controlsList="nodownload" volume="0.5">
    <source src="ansstart.mp3" />
  </audio>
  <audio controls name="TimeUp" hidden controlsList="nodownload" volume="0.6">
    <source src="TimeUp.mp3" />
  </audio>
  <audio controls name="middle" hidden controlsList="nodownload" volume="0.5">
    <source src="middle.mp3" />
  </audio>
</template>

<script>
import { watch, toRef, ref, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  name: "Back",
  props: {},
  components: {},
  setup() {
    let store = useStore();
    let user = toRef(store.state, "user");
    let ready = toRef(store.state, "ready");
    let anima = ref("");
    let animav = ref("");
    let timer;
    let dot = 0;
    let mp3;
    onMounted(() => {
      mp3 = document.getElementsByName("bg-mp3")[0];
    });
    watch(user, () => {
      if(ready.value)return;
      mp3.play();
      anima.value = "bg-run";
      animav.value = "bgv1";
      timer = setInterval(() => {
        let _str = "等待中"
        for(let i=0;i<dot;i++)_str+=".";
        dot = dot>2?0:dot+1
        store.commit("SetTitle",_str)
      },870)
      setTimeout(() => {
        if(ready.value)return;
        animav.value = "bgv2";
      }, 30000);
      setTimeout(() => {
        if(ready.value)return;
        animav.value = "bgv3";
      }, 56580);
      setInterval(() => {
        if(ready.value)return;
        mp3.currentTime = 0;
        animav.value = "bgv1";
        setTimeout(() => {
          if(ready.value)return;
          animav.value = "bgv2";
        }, 30000);
        setTimeout(() => {
          if(ready.value)return;
          animav.value = "bgv3";
        }, 56580);
      }, 121000);
    });
    watch(ready,() => {
      mp3.pause()
      anima.value = "";
      animav.value = "";
      store.commit("SetTitle","准备完毕")
      clearInterval(timer);
    })
    return {
      anima,
      animav,
    };
  },
};
</script>

<style lang="less" scoped>
.bg-view {
  position: fixed;
  z-index: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  // animation: bg2 0.87s linear infinite;
}
.bg-run::before {
  animation: bg 121s linear infinite;
}
.bg::before {
  background-image: url(https://gartic.io/static/images/new/textura.png);
  content: "";
  width: 200%;
  display: block;
  position: absolute;
  z-index: 0;
  left: 50%;
  top: 50%;
  height: 200%;
  // -webkit-transform: translate(-50%, -50%) rotate(345deg);
  // -moz-transform: translate(-50%, -50%) rotate(345deg);
  // -ms-transform: translate(-50%, -50%) rotate(345deg);
  // -o-transform: translate(-50%, -50%) rotate(345deg);
  transform: translate(-50%, -50%) rotate(345deg);
}

.bgv1 {
  animation: bg2 1.74s linear infinite;
}

.bgv2 {
  animation: bg2 0.87s linear infinite;
}
.bgv3 {
  animation: bg3 0.87s linear infinite;
}

@keyframes bg {
  47% {
    background-position: 50% 100%;
  }
  70% {
    background-position: 200% 300%;
  }
  100% {
    background-position: 600% 600%;
  }
}

@keyframes bg2 {
  // 90% {
  //   transform: scale(1, 1);
  // }
  0% {
    transform: scale(0.995, 0.995);
  }
  10% {
    transform: scale(1, 1);
  }
}
@keyframes bg3 {
  // 90% {
  //   transform: scale(1, 1);
  // }
  0% {
    transform: scale(0.99, 0.99);
  }
  10% {
    transform: scale(1, 1);
  }
}
</style>