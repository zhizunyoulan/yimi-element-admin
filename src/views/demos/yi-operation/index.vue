<template>
  <div class="yimi-main">
    <el-row>
      <el-col :span="2">
        <operation01 />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Operation01 from './samples/operation-01.vue'
export default {
  pageInfo: {
    title: "操作样例",
    // permission: 'demo:operation:view'
  },
  components: {Operation01},
  data() {
    return {
    };
  },
};
</script>
<style lang="scss">
.yimi-main {
  padding: 15px;
}
</style>

