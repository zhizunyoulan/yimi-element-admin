<template>
  <div>
    <yi-table
      ref="t1"
      :init="false"
      :api-config="{
        url: '/demo/test-score',
        method: 'post',
        headers: {
          'contentType': 'multipart/form-data'
        }
      }"
      :columns="columns"
      :data="data"
      show-summary
      :model-merger="
        ({ data, params }, model) => {
          console.info(data, params, model);
          params.age = model.name;
        }
      "
    >
      <!-- <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="年龄">
              <span>{{ props.row.age }}</span>
            </el-form-item>
            <el-form-item label="性别">
              <span>{{ props.row.sex }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column> -->
      <template #search-form="{ model, refresh }">
        <el-form-item label="姓名">
          <el-input v-model="model.name"></el-input>
        </el-form-item>

        <el-form-item label="姓名">
          <el-button type="primary" @click="refresh">查询</el-button>
        </el-form-item>
      </template>

      <template #name-header="{ column }">
        <el-link type="warning">{{ column.label }}</el-link>
      </template>
      <template #name="{ value }">
        <el-link type="warning">{{ value }}</el-link>
      </template>
    </yi-table>
  </div>
</template>
<script>
export default {
  
  data() {
    return {
      columns: [
        {
          label: "姓名",
          prop: "name",
          sortable: true,
          $slot: "name",
        },
        {
          label: "其他信息",
          children: [
            {
              label: "年龄",
              prop: "age",
              align: "center",
              headerAlign: "right",
              render: (h, { value }) => {
                return h(
                  "el-tag",
                  {
                    props: {
                      type: value >= 18 ? "warning" : "success",
                    },
                  },
                  value
                );
              },
            },
            {
              label: "性别",
              prop: "sex",
              formatter: (row, column, cellValue) => {
                return cellValue == 0 ? "女" : "男";
              },
            },
            {
              label: "成绩",
              prop: "score",
              children: [
                {
                  label: "语文",
                  prop: "yuwen",
                  // formatter: (row, column, cellValue) => {
                  //   return cellValue >= 60
                  //     ? cellValue + ":及格"
                  //     : cellValue + ":不及格";
                  // },
                },
                {
                  label: "数学",
                  prop: "shuxue",
                  formatter: (row, column, cellValue) => {
                    return cellValue >= 60
                      ? cellValue + ":及格"
                      : cellValue + ":不及格";
                  },
                },
              ],
            },
          ],
        },
      ],
      data: {
        rows: [
          {
            id: 1,
            name: "blue",
            age: 20,
            sex: 1,
            children: [
              {
                id: 3,
                name: "yimi",
                age: 3,
                sex: 0,
                yuwen: 100,
                shuxue: 100,
              },
            ],
            yuwen: 60,
            shuxue: 80,
          },
          {
            id: 2,
            name: "red",
            age: 18,
            sex: 0,
            yuwen: 85,
            shuxue: 80,
          },
        ],
      },
    };
  },
  methods: {
    queryTable() {
      this.$refs.t1.search2();
    },
  },
};
</script>
