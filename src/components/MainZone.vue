<template>
  <div class="zone">
    <div class="inner-area box" ref="playersArea" >
        <player
          v-for="(player) in players"
          :key="player.id"
          :areaWidth="areaWidth"
          :player="player"
          :num="players.length"
        />
    </div>
  </div>
</template>

<script>
import { ref, onUpdated, onMounted } from "vue";
import Player from "./inner/Player";
import { useStore } from "vuex";
export default {
  name: "MainZoen",
  props: {},
  components: {
    Player,
  },
  setup() {
    onUpdated(() => {
      areaWidth.value = playersArea.value.offsetWidth;
    });
    onMounted(() => {
      areaWidth.value = playersArea.value.offsetWidth;
    });
    var areaWidth = ref(0);
    const playersArea = ref(null);
    let store = useStore();
    return { areaWidth, players: store.state.players, playersArea };
  },
};
</script>

<style lang="less" scoped>
.zone {
  //background-color: yellow;
  height: 70%;
  padding: 40px 20px 5px 20px;
  box-sizing: border-box;
 // overflow: hidden;
  .inner-area {
    display: flex;
    //flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
  }
}


</style>