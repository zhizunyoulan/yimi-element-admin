<template>
  <!-- 用户管理 -->
  <div class="app-container">
    <el-row :gutter="20">
      <!--部门数据-->
      <el-col :span="5" :xs="0">
        <yi-control-panel
          :on-init="
            (context) => {
              // 给定响应式字段
              $set(context, 'deptOptions', undefined);
            }
          "
          :on-change="
            (context) => {
              if (typeof context.deptName == 'undefined') {
                deptTreeQuery().then((response) => {
                  context.deptOptions = [
                    {
                      id: -1,
                      name: '全部',
                      children: response.data.rows,
                    },
                  ];
                });
              } else {
                $refs.deptTree.filter(context.deptName);
              }
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

          <template #default="{ context }">
            <el-tree
              ref="deptTree"
              :data="context.deptOptions"
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
                  $refs.userTable.refresh({
                    params: { deptId: id != -1 ? id : undefined },
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
          :api-config="
            ({ params }) => {
              if (Array.isArray(params.createTime)) {
                params.createTimeBegin = params.createTime[0];
                params.createTimeEnd = params.createTime[1];
                delete params.createTime;
              }
              return {
                url: '/user',
                method: 'post',
              };
            }
          "
          show-summary
          :columns="[
            {
              label: '用户名',
              prop: 'username',
            },
            {
              label: '昵称',
              prop: 'nickName',
              align: 'center',
            },
            {
              label: '部门',
              prop: 'deptId',
              formatter: (row, column, cellValue) => {
                return getDeptNameById(cellValue)
              },
            },
            {
              label: '手机号码',
              prop: 'phone',
            },
            {
              label: '账号状态',
              prop: 'status',
              align: 'center',
              formatter: (row, column, cellValue) => {
                return cellValue == 0 ? '无效' : '有效';
              },
              render: (h, { value }) => {//在此演示 render 在formatter之后执行， 拿到的value是formatter处理后的
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
          <template #search-form="{ model, refresh }">
            <el-form-item label="用户昵称">
              <el-input
                v-model="model.nickName"
                size="mini"
                clearable
                placeholder="输入用户昵称"
              ></el-input>
            </el-form-item>
            <el-form-item label="手机号码">
              <el-input
                v-model="model.phone"
                size="mini"
                clearable
                placeholder="输入手机号码"
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
          </template>
          <template #tool-bar="{ refresh }">
            <el-col :span="1.5">
              <yi-operation
                ref="userRegister"
                :api-config="
                  () => {
                    return {
                      url: '/user',
                      method: 'POST',
                    };
                  }
                "
                plain
                text="添加"
                type="primary"
                icon="el-icon-plus"
                modal-title="添加"
                dialog-width="500px"
                @on-submit-success="
                  () => {
                    refresh();
                  }
                "
              >
                <template #default="scope">
                  <user-form v-model="scope.model" />
                </template>
              </yi-operation>
            </el-col>
          </template>

          <template #status="{ row }">
            <el-tag v-if="row.status == 0" type="danger" class="el-icon-close"
              >禁用</el-tag
            >
            <el-tag v-else type="success" class="el-icon-check">正常</el-tag>
          </template>
          <template #opt="{ row }">
            <!-- 编辑 -->
            <yi-operation
              title="修改用户"
              :api-config="{
                url: '/user',
                method: 'PUT',
              }"
              type="text"
              text="修改"
              size="mini"
              icon="el-icon-edit"
              :form-model="row"
              modal-title="修改"
              dialog-width="500px"
              @on-submit-success="
                (formModel) => {
                  Object.assign(row, formModel);
                }
              "
            >
              <template #default="scope">
                <user-form v-model="scope.model" use-for="edit" />
              </template>
            </yi-operation>
          </template>
        </yi-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { deptTreeQuery } from "@/api/system/dept";
import UserForm from "./user-form.vue";
import { mapState, } from "vuex";
import { findTargetRecursively } from "@/utils/index";
export default {
  name: "UserPage",
  components: { UserForm },
  data() {
    return {
      // 部门树选项
      deptOptions: undefined,
    };
  },
  computed: {
    ...mapState('baseInfo', ['depts']),
  },
  methods: {
    
    /** 查询部门下拉树结构 */
    deptTreeQuery,
    getDeptNameById(id) {
      return findTargetRecursively({
            children: this.depts
        },'children', 'id', id)?.name
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
