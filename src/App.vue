<template>
  <back/>
  <main-area/>
  <login />
  <welcome />
  <show-img/>
</template>

<script>

import Login from "./components/Login";
import Welcome from "./components/Welcome";
import Back from './components/Back';
import MainArea from './components/MainArea'
import ShowImg from "./components/ShowImg"

export default {
  name: "App",
  components: {
    Login,
    Welcome,
    Back,
    MainArea,
    ShowImg
  },
};
</script>

<style lang="less">
.column {
  height: 100%;
  z-index: 1;
  flex: none;
}
.zone {
  width: 100%;
}
.box {
  background: #eee;
  height: 100%;
  box-sizing: border-box;
  //border: solid 2px #555;
  border-radius: 20px;
  box-shadow: 2px 2px 4px 2px rgb(0 0 0 / 50%);
  //background-color: rgb(188, 252, 175);
}

#app {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: rgb(101, 214, 248);
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 1750px) {
  #app {
    overflow-y: hidden;
  }
}
@media (max-height: 900px) {
  #app {
    overflow-x: hidden;
  }
}


.board {
  //background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
  background-color: rgb(101, 214, 248);
  opacity: 1;
  background-size: 400%;
  border-radius: 10px;
  padding: 5px;
  //z-index: 1;
  box-sizing: border-box;
  position: relative;

  .inner {
    height: 100%;
    width: 100%;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 20px;
    font-size: 20px;
  }
}


@keyframes roll {
    100%{
        transform: rotateZ(360deg);
    }
}

@keyframes state1 {
  0% {
    background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
    background-size: 400%;
  }
  100% {
    background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
    background-size: 400%;
    background-position: -400% 0;
  }
}
@keyframes state2 {
  0% {
    filter: brightness(0.97);
    background-color: rgb(200, 200, 200);
  }
  100% {
    background-color: rgb(0, 255, 0);
    filter: brightness(1.5);
  }
}
@keyframes state3 {
  0% {
    filter: brightness(0.97);
    background-color: rgb(200, 200, 200);
  }
  100% {
    background-color: red;
    filter: brightness(1.5);
  }
}

@keyframes state4 {
  0% {
    filter: brightness(0.97);
    background-color: rgb(200, 200, 200);
  }
  100% {
    background-color: yellow;
    filter: brightness(1.5);
  }
}
</style>
