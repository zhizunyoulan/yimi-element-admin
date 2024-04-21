<template>
  <div class="yimi-main">
    <el-row>
      <el-col :span="2">
        <action01 />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Action01 from './samples/action-01.vue'
export default {
  pageInfo: {
    title: "操作样例",
    // permission: 'demo:operation:view'
  },
  components: {Action01},
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

