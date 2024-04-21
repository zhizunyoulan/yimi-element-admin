<template>
  <el-row type="flex" justify="space-between">
    <el-col v-if="orderSwap" :span="18">
      <span>{{ api.antPattern }}</span>
    </el-col>
    <el-col :span="6">
      <el-tag
        v-if="'GET' == api.method.toUpperCase()"
        size="mini"
        type="primary"
        >{{ api.method.toUpperCase() }}</el-tag
      >
      <el-tag
        v-else-if="'POST' == api.method.toUpperCase()"
        size="mini"
        type="success"
        >{{ api.method.toUpperCase() }}</el-tag
      >
      <el-tag
        v-else-if="'PUT' == api.method.toUpperCase()"
        size="mini"
        type="warning"
        >{{ api.method.toUpperCase() }}</el-tag
      >
      <el-tag
        v-else-if="'DELETE' == api.method.toUpperCase()"
        size="mini"
        type="danger"
        >{{ api.method.toUpperCase() }}</el-tag
      >
    </el-col>
    <el-col v-if="!orderSwap" :span="18">
      <span>{{ api.antPattern }}</span>
    </el-col>
  </el-row>
</template>
<script>
export default {
    name: 'ApiDisplay',
  props: {
    api: {
      type: Object,
      required: true,
    },
    orderSwap: {
      type: Boolean,
      default: false
    }
  },
};
</script>
