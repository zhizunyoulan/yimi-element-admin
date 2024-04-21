<template>
  <el-row v-if="model">
    <el-row>
      <el-col :span="12">
        <el-form-item label="操作名称" prop="name">
          <el-input
            v-model="model.name"
            placeholder="请输入操作名称"
            maxlength="30"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="所在页面" prop="parentId">
          <el-cascader
            v-model="model.parentId"
            placeholder="请选择所在页面"
            :options="menuOptions"
            :props="{
              value: 'id',
              label: 'name',
            }"
            filterable
          ></el-cascader>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="操作类型" prop="type">
          <el-select v-model="model.type" placeholder="请选择操作类型">
            <el-option label="R" value="查询"> </el-option>
            <el-option label="C" value="新增"> </el-option>
            <el-option label="U" value="修改"> </el-option>
            <el-option label="D" value="删除"> </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="图标" prop="icon">
          <el-input
            v-model="model.icon"
            placeholder="请输入图标"
            maxlength="50"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item v-if="model.id == undefined" label="组件路径" prop="path">
          <el-input
            v-model="model.path"
            placeholder="请输入组件路径"
            maxlength="30"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          v-if="model.id == undefined"
          label="权限标识"
          prop="permission"
        >
          <el-input
            v-model="model.permission"
            placeholder="请输入权限标识"
            maxlength="20"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="排序号">
          <el-input
            v-model="model.sequence"
            type="number"
            placeholder="请输入排序号"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-row>
</template>
<script>
import EntityForm from "@/mixins/EntityForm";
export default {
  mixins: [EntityForm],
};
</script>
