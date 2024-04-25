<template>
  <div class="app-container">
    <yi-table
      :api="apis.getDepartmentTree"
      :right-tools="['refresh']"
      :columns="[
        {
          label: '部门名称',
          prop: 'name',
        },
        {
          label: '部门代码',
          prop: 'code',
        },
        {
          label: '操作',
          prop: 'opt',
          width: '360px',
        },
      ]"
      default-expand-all
    >
      <template #search-bar="{ model, refresh }">
        <el-form inline :model="model" size="mini">
          <el-form-item label="部门名称">
            <el-input
              v-model="model.name"
              placeholder="请输入部门名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="部门代码">
            <el-input
              v-model="model.code"
              placeholder="请输入部门代码"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" size="mini" @click="refresh"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </template>

      <template #action-bar="{ refresh, el }">
        <el-row>
          <!-- 添加 -->
          <yi-action
            :api="apis.addDepartment"
            text="添加"
            type="primary"
            size="mini"
            :plain="true"
            icon="el-icon-plus"
            modal-title="添加部门"
            dialog-width="500px"
            @on-submit-success="refresh"
          >
            <template #default="scope">
              <dept-form v-model="scope.model" use-for="add" />
            </template>
          </yi-action>

          <el-button
            type="info"
            plain
            icon="el-icon-sort"
            size="mini"
            @click="el.toggleAllExpansion()"
            >展开/折叠</el-button
          >
        </el-row>
      </template>

      <template #~opt="{ row, refresh }">
        <yi-action
          :api="apis.updateDepartment"
          type="text"
          text="修改"
          size="mini"
          icon="el-icon-edit"
          :model="row"
          modal-title="修改部门"
          dialog-width="500px"
          @on-submit-success="
            (res, model) => {
              Object.assign(row, model);
            }
          "
        >
          <template #default="scope">
            <dept-form v-model="scope.model" use-for="edit" />
          </template>
        </yi-action>

        <yi-action
              title="删除部门"
              :api="apis.removeDepartment(row.id)"
              type="text"
              text="删除"
              size="mini"
              icon="el-icon-delete"
              modal-title="删除部门"
              confirm-text="是否删除该部门？"
              @on-submit-success="
                () => {
                  refresh();
                }
              "
            />
      </template>
    </yi-table>
  </div>
</template>

<script>
import DeptForm from "./dept-form.vue";
import {
  getDepartmentTree,
  addDepartment,
  updateDepartment,
  removeDepartment
} from "@/apis/system/dept";
export default {
  name: "DeptPage",
  apis: {
    getDepartmentTree,
    addDepartment,
    updateDepartment,
    removeDepartment
  },
  pageInfo: {
    title: "部门管理",
    permission: "system:department:view",
  },
  components: { DeptForm },
  data() {
    return {};
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
