<template>
  <div class="yimi-main">
    <el-row>
      <el-col :span="2">
        <modal-trigger01 />
      </el-col>
      <el-col :span="2">
        <modal-trigger02 />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import ModalTrigger01 from './samples/modal-trigger-01.vue'
import ModalTrigger02 from './samples/modal-trigger-02.vue'
export default {
  pageInfo: {
    title: "弹窗样例",
    permission: 'demo:modal:view'
  },
  components: {ModalTrigger01, ModalTrigger02},
};
</script>
<style lang="scss">
.yimi-main {
  padding: 15px;
}
</style>
