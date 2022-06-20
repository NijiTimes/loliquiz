<template>
  <audio controls name="bubble" hidden controlsList="nodownload" volume="0.35">
    <source src="bubble.mp3" />
  </audio>
  <div class="chat-space" name="chat-space">
    <ul>
      <li
        v-for="(c, index) in chats"
        :key="index"
        :style="{ color: colors[c.type] }"
      >
        <div class="from">{{ prename[c.type] }}{{ c.from }}</div>
        <div class="maohao">:</div>
        <div class="content">
          {{ c.message }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { onMounted, onUpdated, watch } from "vue";
export default {
  name: "",
  props: ["chats"],
  components: {},
  setup(props) {
    let colors = ["#FFF", "#000", "#777"];
    colors[40] = "red";
    let prename = [];
    let se;
    console.log(se);
    prename[2] = "[内鬼]";
    prename[40] = "[管理员]";
    onMounted(() => {
      se = document.getElementsByName("bubble")[0];
    });
    onUpdated(() => {
      var div = document.getElementsByName("chat-space")[0];
      div.scrollTop = div.scrollHeight;
    });
    watch(
      () => props.chats.length,
      () => {
        se.play();
      }
    );
    return {
      chats: props.chats,
      colors,
      prename,
    };
  },
};
</script>

<style lang="less" scoped>
.chat-space {
  font-size: 16px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  height: 82%;

  li {
    // margin-top: 5px;

    display: flex;
    line-height: 20px;
    text-align: left;
    div {
      flex: none;
    }
    .from {
      width: 100px;
      height: 20px;
      //background-color: springgreen;
      font-size: 16px;
      white-space: nowrap;
      overflow: hidden;
      text-align:right;
      span {
        margin: 0px -10px;
      }
    }
    .maohao {
      width: 10px;
      color: #000 !important ;
      text-align:center;
      //background-color: slategrey;
    }
    .content {
      width: 340px;
      word-wrap: break-word;
      //background-color: steelblue;
    }
  }
}
</style>