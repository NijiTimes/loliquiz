<template>
  <div class="board">
    <div class="inner">
      <transition-group
        appear
        enter-active-class="animate__animated animate__fadeInRight"
        leave-active-class="animate__animated animate__fadeOutRight list-complete-leave-active"
      >
        <div class="title">{{ rankInfo.title }}</div>
        <div class="tips">
          <div class="rank">排名</div>
          <div class="img">头像</div>
          <div class="name">ID</div>
          <div class="score">分数</div>
          <div class="times">题数</div>
        </div>
      </transition-group>

      <div class="rank-area">
        <transition-group
          appear
          enter-active-class="animate__animated animate__fadeInRight"
          leave-active-class="animate__animated animate__fadeOutRight list-complete-leave-active"
          tag="ul"
        >
          <li
            class="line"
            v-for="(player, index) in rankInfo.rank"
            :key="player.id"
          >
            {{ index + 1 }}<img :src="player.imgSrc" />
            <div class="name">
              <div class="uid">[{{ player.uid }}]</div>
              <div class="name">{{ player.name }}</div>
            </div>
            <div class="score">{{ player.score }}</div>
            <div class="times">{{ player.times }}</div>
          </li>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { toRef } from "vue";
export default {
  name: "RankBoard",
  props: {},
  components: {},
  setup() {
    let store = useStore();
    let rankInfo = toRef(store.state, "rankInfo");
    // let rankInfo = {
    //   title: "积分榜",
    //   rank: [
    //     {
    //       id: 1213,
    //       uid: "0012",
    //       score: 510,
    //       imgSrc:
    //         "https://msavatar1.nexon.net/Character/AOKGFKIHAAHHBMAJNGFINFFKOKFNDGJDAJABENAMNINLANLIPOKMMKDHMIDKEPKDOPBFIOGPJELLKJNPOPNKCLJJNBDKICMIMKPAMDFIBOMPEGFCNAMDKFFLPDBCNLEHFEDDDEJICIAINHPOANFAGOBGJBKNAIJLGPFMJBPMIHICHAHAEDHBGLPNPCFGGIAONJIONLOOHBGFLNGPHEMLPILKJGNEPOLDHIAMEMEKBCHACIFCFBLADKKCJOHOBJJE.png",
    //       times: 5,
    //       name: "Asdsd",
    //     },
    //     {
    //       id: 1213,
    //       uid: "0012",
    //       score: 510,
    //       imgSrc:
    //         "https://msavatar1.nexon.net/Character/AOKGFKIHAAHHBMAJNGFINFFKOKFNDGJDAJABENAMNINLANLIPOKMMKDHMIDKEPKDOPBFIOGPJELLKJNPOPNKCLJJNBDKICMIMKPAMDFIBOMPEGFCNAMDKFFLPDBCNLEHFEDDDEJICIAINHPOANFAGOBGJBKNAIJLGPFMJBPMIHICHAHAEDHBGLPNPCFGGIAONJIONLOOHBGFLNGPHEMLPILKJGNEPOLDHIAMEMEKBCHACIFCFBLADKKCJOHOBJJE.png",
    //       times: 5,
    //       name: "Asdasdasd",
    //     },
    //     {
    //       id: 1213,
    //       uid: "0012",
    //       score: 510,
    //       imgSrc:
    //         "https://msavatar1.nexon.net/Character/AOKGFKIHAAHHBMAJNGFINFFKOKFNDGJDAJABENAMNINLANLIPOKMMKDHMIDKEPKDOPBFIOGPJELLKJNPOPNKCLJJNBDKICMIMKPAMDFIBOMPEGFCNAMDKFFLPDBCNLEHFEDDDEJICIAINHPOANFAGOBGJBKNAIJLGPFMJBPMIHICHAHAEDHBGLPNPCFGGIAONJIONLOOHBGFLNGPHEMLPILKJGNEPOLDHIAMEMEKBCHACIFCFBLADKKCJOHOBJJE.png",
    //       times: 5,
    //       name: "Asdasdasd",
    //     },
    //     {
    //       id: 1213,
    //       uid: "0012",
    //       score: 510,
    //       imgSrc:
    //         "https://msavatar1.nexon.net/Character/AOKGFKIHAAHHBMAJNGFINFFKOKFNDGJDAJABENAMNINLANLIPOKMMKDHMIDKEPKDOPBFIOGPJELLKJNPOPNKCLJJNBDKICMIMKPAMDFIBOMPEGFCNAMDKFFLPDBCNLEHFEDDDEJICIAINHPOANFAGOBGJBKNAIJLGPFMJBPMIHICHAHAEDHBGLPNPCFGGIAONJIONLOOHBGFLNGPHEMLPILKJGNEPOLDHIAMEMEKBCHACIFCFBLADKKCJOHOBJJE.png",
    //       times: 5,
    //       name: "Asdasdasd",
    //     },
    //     {
    //       id: 1213,
    //       uid: "0012",
    //       score: 510,
    //       imgSrc:
    //         "https://msavatar1.nexon.net/Character/AOKGFKIHAAHHBMAJNGFINFFKOKFNDGJDAJABENAMNINLANLIPOKMMKDHMIDKEPKDOPBFIOGPJELLKJNPOPNKCLJJNBDKICMIMKPAMDFIBOMPEGFCNAMDKFFLPDBCNLEHFEDDDEJICIAINHPOANFAGOBGJBKNAIJLGPFMJBPMIHICHAHAEDHBGLPNPCFGGIAONJIONLOOHBGFLNGPHEMLPILKJGNEPOLDHIAMEMEKBCHACIFCFBLADKKCJOHOBJJE.png",
    //       times: 5,
    //       name: "Asdasdasd",
    //     },
    //   ],
    // };
    return {
      rankInfo,
    };
  },
};
</script>

<style lang="less" scoped>
.board {
  height: 75%;
}

.inner {
  flex-direction: column;
  justify-content: flex-start;
}
.tips {
  height: 25px;
  width: 90%;
  //background-color: red;
  top: 68px;
  position: absolute;
  box-sizing: border-box;
  border-bottom: 1px solid #777;
  display: flex;
  .img {
    margin-left: 30px;
  }
  .name {
    margin-left: 85px;
  }
  .score {
    margin-left: 66px;
  }
  .times {
    margin-left: 15px;
  }
}
.title {
  flex: none;
  font-weight: bold;
  font-size: 40px;
  position: relative;
  top: -15px;
  box-sizing: border-box;
  margin: 0px;
  text-align: center;
}
.rank-area {
  flex: none;
  height: 85%;
  width: 100%;
  position: relative;
  top: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.line {
  height: 80px;
  width: 400px;

  display: flex;
  justify-content: space-evenly;
  align-items: center;
  img {
    height: 80px;
    width: 80px;
  }
  .name {
    width: 110px;
    flex: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  .score {
    width: 35px;
    flex: none;
  }
  .times {
    width: 15px;
    flex: none;
    margin-left: 10px;
  }
}

.list-complete-leave-active {
  position: absolute;
}
.list-complete-leave-active-relative {
  position: relative;
}
</style>