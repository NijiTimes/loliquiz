<template>
  <div class="zone">
    <rank-board v-if="rankInfo.title"/>
    <quiz v-else />
    <admin/>
  </div>
</template>

<script>
import Quiz from "./inner/Quiz";
import Admin from './inner/Admin';
import RankBoard from './inner/RankBoard';
import {useStore} from 'vuex'
export default {
  name: "ManageZone",
  props: {},
  components: { Quiz,Admin,RankBoard,},
  setup() {
    let store = useStore();
    return {
      rankInfo:store.state.rankInfo,
    };
  },
};
</script>

<style lang="less" scoped>
.zone {
  //background-color: #bfa;
  height: 80%;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  //overflow: hidden;
 
}
</style>