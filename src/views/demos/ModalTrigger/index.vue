<template>
  <div>
    <el-row>
      <el-col :span="1">
        <yi-modal-trigger trigger="link" text="点击" type="warning">
          <h1>Hello!</h1>
        </yi-modal-trigger>
      </el-col>
      <el-col :span="1.5">
        <yi-modal-trigger text="点击" type="warning">
          <h1>Hello!</h1>
        </yi-modal-trigger>
      </el-col>
      <el-col :span="1">
        <yi-modal-trigger text="点击" type="warning" size="mini">
          <h1>Hello!</h1>
        </yi-modal-trigger>
      </el-col>
      <el-col :span="1">
        <yi-modal-trigger
          text="点击"
          type="warning"
          size="mini"
          modal-title="标题"
        >
          <h1>Hello!</h1>
        </yi-modal-trigger>
      </el-col>
      <el-col :span="1">
        <yi-modal-trigger
          text="点击"
          :on-open="
            ({ stopLoading }) => {
              stopLoading();
            }
          "
          type="warning"
          size="mini"
          modal-title="标题"
        >
          <h1>Hello!</h1>
        </yi-modal-trigger>
      </el-col>
      <el-col :span="1">
        <yi-modal-trigger
          text="点击"
          :on-open="
            ({ startLoading, stopLoading }) => {
              startLoading();
              setTimeout(() => {
                stopLoading();
              }, 1000);
            }
          "
          type="warning"
          size="mini"
          modal-title="标题"
        >
          <h1>Hello!</h1>
        </yi-modal-trigger>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {};
</script>
<style scoped></style>
