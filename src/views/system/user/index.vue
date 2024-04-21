<template>
  <!-- 用户管理 -->
  <div class="app-container">
    <el-row :gutter="20">
      <!--部门数据-->
      <el-col :span="5" :xs="0">
        <yi-control-panel
          :on-change="
            (context) => {
              filterDeptTree(context.deptName);
            }
          "
        >
          <template #header="{ context, change }">
            <el-input
              v-model="context.deptName"
              placeholder="请输入部门名称"
              clearable
              size="small"
              prefix-icon="el-icon-search"
              style="margin-bottom: 20px"
              @change="change"
            />
          </template>

          <template #default>
            <el-tree
              ref="deptTree"
              :data="deptOptions"
              :props="{
                children: 'children',
                label: 'name',
              }"
              :expand-on-click-node="false"
              :filter-node-method="
                (value, data) => {
                  if (!value) return true;
                  return data.name.indexOf(value) !== -1;
                }
              "
              node-key="id"
              default-expand-all
              highlight-current
              @node-click="
                ({ id }) => {
                  let currentKey = $refs.deptTree.getCurrentKey();
                  let targetDeptId = undefined;
                  if (currentKey == chosenDeptKey) {
                    $refs.deptTree.setCurrentKey(null);
                    chosenDeptKey = undefined;
                  } else {
                    targetDeptId = id;
                    chosenDeptKey = currentKey;
                  }
                  $refs.userTable.refresh({
                    params: { deptId: targetDeptId },
                  });
                }
              "
            />
          </template>
        </yi-control-panel>
      </el-col>
      <el-col :span="19" :xs="24">
        <yi-table
          ref="userTable"
          :api="apis.queryUser"
          :model-merger="
            ({ data, params }, model) => {
              if (Array.isArray(model.createTime)) {
                params.createTimeStart = model.createTime[0];
                params.createTimeEnd = model.createTime[1];
              }
              params.realName = model.realName;
              params.contactNumber = model.contactNumber;
            }
          "
          :columns="[
            {
              label: '登录名',
              prop: 'username',
              width: 100,
            },
            {
              label: '用户名称',
              prop: 'realName',
            },
            {
              label: '部门',
              prop: 'deptId',
              formatter: (row, column, cellValue) => {
                return getDeptNameById(cellValue);
              },
            },
            {
              label: '联系方式',
              prop: 'contactNumber',
            },
            {
              label: '账号状态',
              prop: 'status',
              align: 'center',
              formatter: (row, column, cellValue) => {
                return cellValue == 0 ? '无效' : '有效';
              },
              render: (h, { value }) => {
                //在此演示 render 在formatter之后执行， 拿到的value是formatter处理后的
                return h(
                  'el-tag',
                  {
                    props: {
                      type: value == '无效' ? 'warning' : 'success',
                    },
                  },
                  value
                );
              },
            },
            {
              label: '创建时间',
              prop: 'createTime',
            },
            {
              label: '操作',
              prop: 'opt',
              $slot: 'opt',
            },
          ]"
          :res-adapter="
            ({ data }) => {
              return data;
            }
          "
        >
          <template #search-bar="{ model, refresh }">
            <el-form :model="model" inline>
              <el-form-item label="用户名称">
                <el-input
                  v-model="model.realName"
                  size="mini"
                  clearable
                  placeholder="输入用户名称"
                ></el-input>
              </el-form-item>
              <el-form-item label="联系方式">
                <el-input
                  v-model="model.contactNumber"
                  size="mini"
                  clearable
                  placeholder="输入联系方式"
                ></el-input>
              </el-form-item>

              <el-form-item label="创建时间">
                <el-date-picker
                  v-model="model.createTime"
                  style="width: 240px"
                  value-format="yyyy-MM-dd"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" size="mini" @click="refresh"
                  >查询</el-button
                >
              </el-form-item>
            </el-form>
          </template>
          <template #action-bar="{ refresh }">
            <el-col :span="1.5">
              <yi-action
                :api="apis.addUser"
                plain
                text="添加"
                type="primary"
                icon="el-icon-plus"
                modal-title="添加"
                dialog-width="650px"
                @on-submit-success="
                  () => {
                    refresh();
                  }
                "
              >
                <template #default="scope">
                  <user-form
                    v-model="scope.model"
                    :dept-options="deptOptions"
                  />
                </template>
              </yi-action>
            </el-col>
          </template>

          <template #status="{ row }">
            <el-tag v-if="row.status == 0" type="danger" class="el-icon-close"
              >禁用</el-tag
            >
            <el-tag v-else type="success" class="el-icon-check">正常</el-tag>
          </template>
          <template #opt="{ row, refresh }">
            <!-- 编辑 -->
            <yi-action
              title="修改用户"
              :api="apis.updateUser"
              type="text"
              text="编辑"
              size="mini"
              icon="el-icon-edit"
              :model="row"
              modal-title="修改用户"
              dialog-width="650px"
              @on-submit-success="
                (res, formModel) => {
                  Object.assign(row, formModel);
                }
              "
            >
              <template #default="scope">
                <user-form
                  v-model="scope.model"
                  :dept-options="deptOptions"
                  use-for="edit"
                />
              </template>
            </yi-action>

            <yi-action
              title="删除用户"
              :api="apis.removeUser(row.id)"
              type="text"
              text="删除"
              size="mini"
              icon="el-icon-delete"
              modal-title="删除用户"
              confirm-text="是否删除该用户？"
              @on-submit-success="
                () => {
                  refresh();
                }
              "
            />
          </template>
        </yi-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import request from "@/utils/request";
import { getDepartmentTree } from "@/apis/system/dept";
import { queryUser, addUser, updateUser, removeUser } from "@/apis/system/user";
import UserForm from "./user-form.vue";
import {
  OptionsMaker,
  findTargetRecursively,
  mapRecursively,
} from "@/utils/recursive";
export default {
  name: "UserPage",
  apis: {
    getDepartmentTree,
    queryUser,
    addUser,
    updateUser,
    removeUser,
  },
  pageInfo: {
    title: "用户管理",
    permission: "system:user:view",
  },
  components: { UserForm },
  data() {
    return {
      // 部门树选项
      deptOptions: undefined,
      chosenDeptKey: undefined,
    };
  },
  methods: {
    filterDeptTree(deptName) {
      if (typeof deptName == "undefined") {
        request(getDepartmentTree).then((response) => {
          let deptOptions = new OptionsMaker("id:id", "name:name").make(
            response?.data?.rows
          );

          // 递归修改部门options，children为空数组时，去除children字段
          this.deptOptions = mapRecursively.apply(deptOptions, [
            ({ id, name, children }) => {
              let option;
              if (Array.isArray(children) && children.length == 0) {
                option = { id, name };
              } else {
                option = { id, name, children };
              }
              return option;
            },
          ]);
        });
      } else {
        this.$refs.deptTree.filter(deptName);
      }
    },
    getDeptNameById(id) {
      return findTargetRecursively(
        {
          children: this.deptOptions,
        },
        "children",
        "id",
        id
      )?.name;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
