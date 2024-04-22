<template>
  <el-form
    v-if="model"
    :model="model"
    inline
    label-position="right"
    label-width="75px"
  >
    <el-row type="flex">
      <el-col :span="12">
        <el-form-item
          v-if="model.id == undefined"
          label="登录名"
          prop="username"
        >
          <el-input
            v-model="model.username"
            placeholder="请输入登录名"
            maxlength="30"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          v-if="model.id == undefined"
          label="用户密码"
          prop="password"
        >
          <el-input
            v-model="model.password"
            placeholder="请输入用户密码"
            type="password"
            maxlength="20"
            show-password
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="真实姓名" prop="realName">
          <el-input
            v-model="model.realName"
            placeholder="请输入真实姓名"
            maxlength="30"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="归属部门" prop="deptId">
          <el-cascader
            v-model="model.deptId"
            placeholder="请选择归属部门"
            :options="deptOptions"
            :props="{
              value: 'id',
              label: 'name',
              checkStrictly: true,
            }"
            :show-all-levels="false"
            filterable
          ></el-cascader>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item
          label="联系方式"
          prop="contactNumber"
          :rules="{
            pattern: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/,
            message: '请输入合法手机号/电话号',
            trigger: 'blur',
          }"
        >
          <el-input
            v-model="model.contactNumber"
            placeholder="请输入联系方式"
            maxlength="11"
            show-word-limit
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="model.email"
            placeholder="请输入邮箱"
            maxlength="50"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="备注">
          <el-input
            v-model="model.remark"
            type="textarea"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import EntityForm from "@/mixins/EntityForm";
export default {
  mixins: [EntityForm],
  props: {
    deptOptions: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
