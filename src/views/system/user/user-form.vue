<template>
  <el-row v-if="model">
    <el-row>
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

    <!-- <el-row>
      <el-col :span="12">
        <el-form-item label="用户性别">
          <el-select v-model="model.sex" placeholder="请选择性别">
            <el-option
              v-for="dict in dict.type.sys_user_sex"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="状态">
          <el-radio-group v-model="model.status">
            <el-radio
              v-for="dict in dict.type.sys_normal_disable"
              :key="dict.value"
              :label="dict.value"
              >{{ dict.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row> -->
    <!-- <el-row>
      <el-col :span="12">
        <el-form-item label="岗位">
          <el-select v-model="model.postIds" multiple placeholder="请选择岗位">
            <el-option
              v-for="item in postOptions"
              :key="item.postId"
              :label="item.postName"
              :value="item.postId"
              :disabled="item.status == 1"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="角色">
          <el-select v-model="model.roleIds" multiple placeholder="请选择角色">
            <el-option
              v-for="item in roleOptions"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
              :disabled="item.status == 1"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row> -->
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

    <!-- <el-form-item
      label="用户名"
      prop="username"
      :rules="{
        required: true,
        message: '请输入用户名',
        trigger: 'blur',
      }"
    >
      <el-input v-model="model.username" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item
      label="真实姓名"
      prop="nickName"
      :rules="{
        required: true,
        message: '请输入姓名',
        trigger: 'blur',
      }"
    >
      <el-input v-model="model.nickName" placeholder="请输入姓名"></el-input>
    </el-form-item>
    <el-form-item
      label="电话"
      prop="phoneNum"
      :rules="{
        pattern: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/,
        message: '请输入合法手机号/电话号',
        trigger: 'blur',
      }"
    >
      <el-input
        v-model="model.phoneNum"
        maxlength="11"
        show-word-limit
        placeholder="请输入电话"
      ></el-input>
    </el-form-item> -->
  </el-row>
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
