<template>
  <el-form
    v-if="model"
    :model="model"
    label-position="right"
    label-width="100px"
  >
    <el-row>
      <el-col :span="12">
        <el-form-item label="登录名" prop="username" required>
          <el-input
            v-model="model.username"
            placeholder="请输入登录名"
            :disabled="useFor == 'edit'"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="真实姓名" prop="realName" required>
          <el-input
            v-model="model.realName"
            placeholder="请输入真实姓名"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row v-if="model.id == undefined">
      <el-col :span="12">
        <el-form-item label="用户密码" prop="password" required>
          <el-input v-model="model.password" type="password" show-password />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="请重复密码" prop="passwordRpt" required>
          <el-input v-model="model.passwordRpt" type="password" show-password />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="归属部门" prop="deptId">
          <el-cascader
            v-model="model.deptId"
            placeholder="请选择归属部门"
            :options="deptOptions"
            :props="{
              value: 'id',
              label: 'name',
              checkStrictly: true,
              emitPath: false
            }"
            clearable
            style="width: 100%"
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
            pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            message: '请输入合法手机号',
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
        <el-form-item label="邮箱" prop="email" :rules="{
            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: '请输入合法邮箱',
            trigger: 'blur',
          }">
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
