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
    'yimi-http-client': httpClient
    // "yimi-operation-on-submit": () => {
    //   Message({
    //     type: "error",
    //     message: "演示环境， 不允许操作",
    //     duration: 1000,
    //   });
    // },
    // "yimi-table-model-merger": ({ data, params }, model) => {
    //   Object.assign(data, model);
    // },
    // "yimi-table-pageinfo-merger": (
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
<style></style>
