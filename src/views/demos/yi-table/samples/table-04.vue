<template>
  <yi-table
    :api="{
      url: '/demo/score-details',
    }"
    :columns="columns"
    show-summary
  >
    <template #search-bar="{ model, refresh }">
      <el-form :model="model" inline>
        <el-form-item label="姓名">
          <el-input v-model="model.name"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="refresh">查询</el-button>
        </el-form-item>
      </el-form>
    </template>
    <template #name="{ value }">
      <el-link type="warning" :underline="false">{{ value }}</el-link>
    </template>
  </yi-table>
</template>
<script>
export default {
  name: "EasyTableSample",
  data() {
    return {
      columns: [
        {
          label: "姓名",
          prop: "name",
          $slot: "name",
        },
        {
          label: "班级",
          prop: "class",
        },
        {
          label: "性别",
          prop: "gender",
          formatter: (row, column, value) => {
            return value == 0 ? "女" : "男";
          },
        },
        {
          label: "年龄",
          prop: "age",
          align: "center",
        },
        {
          label: "总分排名",
          headerAlign: "center",
          prop: "rank",
        },
        {
          label: "成绩",
          headerAlign: "center",
          children: [
            {
              label: "总分",
              sortable: true,
              prop: "total",
            },
            {
              label: "理科",
              headerAlign: "center",
              children: [
                {
                  label: "数学",
                  prop: "shuxue",
                  sortable: true,
                  render: this.scoreRender,
                },
                {
                  label: "物理",
                  prop: "wuli",
                  sortable: true,
                  render: this.scoreRender,
                },
                {
                  label: "化学",
                  prop: "huaxue",
                  sortable: true,
                  render: this.scoreRender,
                },
                {
                  label: "生物",
                  prop: "shengwu",
                  sortable: true,
                  render: this.scoreRender,
                },
              ],
            },
            {
              label: "文科",
              headerAlign: "center",
              children: [
                {
                  label: "语文",
                  prop: "yuwen",
                  sortable: true,
                  render: this.scoreRender,
                },
                {
                  label: "英语",
                  prop: "english",
                  sortable: true,
                  render: this.scoreRender,
                },
                {
                  label: "历史",
                  prop: "lishi",
                  sortable: true,
                  render: this.scoreRender,
                },
                {
                  label: "政治",
                  prop: "zhengzhi",
                  sortable: true,
                  render: this.scoreRender,
                },
              ],
            },
          ],
        },
      ],
    };
  },
  methods: {
    scoreRender(h, { value }) {
      return h(
        "span",
        {
          style: {
            color: value < 60 ? "#F56C6C" : value < 70 ? "#E6A23C" : "#909399",
          },
        },
        value
      );
    },
  },
};
</script>
