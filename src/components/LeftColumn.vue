<template>
  <div class="column">
    <div class="box inner">
      <manage-zone />
      <div class="line"></div>
      <rank-zone />
    </div>
  </div>
</template>

<script>
import ManageZone from "./ManageZone";
import RankZone from "./RankZone";
export default {
  name: "LeftColumn",
  props: {},
  components: {
    ManageZone,
    RankZone,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.column {
  width: 30%;
  box-sizing: border-box;
  padding: 40px;
  .inner{
    display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  }
  .line{
    height: 2px;
    width: 80%;
    background-color: #111;
  }
}
</style>