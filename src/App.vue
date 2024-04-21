<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
// import { Message } from "element-ui";
import httpClient from '@/utils/request'
export default {
  name: "App",
  provide: {
    'yimi-table-axios': httpClient,
    'yimi-action-axios': httpClient,
    // "yimi-on-action-submit": () => {
    //   Message({
    //     type: "error",
    //     message: "演示环境， 不允许操作",
    //     duration: 1000,
    //   });
    // },
    // "yimi-table-model-merger": ({ data, params }, model) => {
    //   Object.assign(data, model);
    // },
    // "yimi-table-page-merger": (
    //   { data, params },
    //   { pageSize, currentPage }
    // ) => {
    //   Object.assign(data, {
    //     pageNum: currentPage,
    //     pageSize: pageSize,
    //     start: currentPage * pageSize - pageSize,
    //     end: currentPage * pageSize,
    //   });
    // },
    // "yimi-table-sort-merger": ({ data, params }, { prop, order }) => {
    //   if (prop && (order == "descending" || order == "ascending")) {
    //     if (order == "descending") {
    //       order = "desc";
    //     } else {
    //       order = "asc";
    //     }
    //     Object.assign(data, {
    //       sortBy: prop,
    //       order,
    //     });
    //   }
    // },
  },
};
</script>
<style>
/* element ui的tree组件，highlight-current = true时，非当前节点取消focus的背景颜色 */
  .el-tree.el-tree--highlight-current .el-tree-node:not(.is-current):focus > .el-tree-node__content {
    background-color: inherit !important;
  }
</style>
