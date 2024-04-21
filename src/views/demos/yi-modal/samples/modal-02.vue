<template>
    <yi-modal text="抽屉查看" type="primary" modal-type="drawer" drawer-size="70%">
      <table01 style="margin: 20px;" />
    </yi-modal>
  </template>
  <script>
  import table01 from '../../yi-table/samples/table-01.vue'
  export default {
    components: {table01},
    data() {
      return {
      };
    },
  };
  </script>