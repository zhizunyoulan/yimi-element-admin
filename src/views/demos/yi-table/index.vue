<template>
  <el-tabs tab-position="left" class="yimi-main">
    <el-tab-pane label="基础表格">
      <table01 />
    </el-tab-pane>
    <el-tab-pane label="展开行"> 
      <table02 />
    </el-tab-pane>
    <el-tab-pane label="树形表格"> 
      <table03 />
    </el-tab-pane>
    <el-tab-pane label="合并表头"> 
      <table04 />
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import table01 from "./samples/table-01.vue";
import table02 from "./samples/table-02.vue";
import table03 from "./samples/table-03.vue";
import table04 from "./samples/table-04.vue";
export default {
  components: {
    table01,
    table02,
    table03,
    table04,
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss">
.yimi-main {
  .el-tabs__content {
    padding: 15px;
  }
}
</style>
