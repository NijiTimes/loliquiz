<template>
  <div class="column">
    <main-zone />
    <chat-zone />
  </div>
</template>

<script>
import MainZone from "./MainZone";
import ChatZone from "./ChatZone";
export default {
  name: "RightColumn",
  props: {},
  components: {
    MainZone,
    ChatZone,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.column {
  width: 70%;
}
</style>