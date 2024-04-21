<template>
  <div class="yimi-main">
    <el-row>
      <el-col :span="2">
        <modal01 />
      </el-col>
      <el-col :span="2">
        <modal02 />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Modal01 from './samples/modal-01.vue'
import Modal02 from './samples/modal-02.vue'
export default {
  pageInfo: {
    title: "弹窗样例",
    permission: 'demo:modal:view'
  },
  components: {Modal01, Modal02},
};
</script>
<style lang="scss">
.yimi-main {
  padding: 15px;
}
</style>
