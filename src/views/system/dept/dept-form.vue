<template>
  <el-row v-if="model">
    <el-form-item
      label="部门名称"
      prop="name"
      label-width="110px"
      :rules="{
        required: true,
        message: '请输入部门名称',
        trigger: 'blur',
      }"
    >
      <el-input
        v-model="model.name"
        :disabled="useFor == 'display'"
        placeholder="请输入部门名称"
      ></el-input>
    </el-form-item>

    <el-form-item
      label="部门代码"
      prop="code"
      label-width="110px"
      :rules="{
        required: true,
        message: '请输入部门代码',
        trigger: 'blur',
      }"
    >
      <el-input
        v-model="model.code"
        :disabled="useFor != 'add'"
        placeholder="请输入部门代码"
      ></el-input>
    </el-form-item>
  </el-row>
</template>
<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => undefined,
    },
    useFor: {
      type: String,
      default: "add", // add edit display
    },
  },
  data() {
    return {
      model: undefined,
    };
  },
  watch: {
    model(model) {
      this.$emit("input", model);
    },
  },
  created() {
    this.model = this.value;
  },
};
</script>
