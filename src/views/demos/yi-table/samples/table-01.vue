<template>
  <yi-table
    :api="{
      url: '/demo/scores',
    }"
    :columns="columns"
    :page-sizes="[10, 20, 30, 50, 100]"
  >
    <template #opt>
      <el-button type="text">修改</el-button>
    </template>
  </yi-table>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        {
          label: "姓名",
          prop: "name",
        },
        {
          label: "年龄",
          prop: "age",
          align: "center",
        },
        {
          label: "性别",
          prop: "gender",
          align: "center",
          formatter: (row, column, value) => {
            return value == 0 ? "女" : value == 1 ? "男" : "";
          },
        },
        {
          label: "分数",
          prop: "score",
          align: "center",
          render: (h, { value }) => {
            return h(
              "el-tag",
              {
                props: {
                  type: value < 60 ? "danger" : value > 80 ? "success" : "info",
                },
              },
              value
            );
          },
        },
        {
          label: "操作",
          prop: "opt",
          $slot: "opt",
        },
      ],
    };
  },
};
</script>
