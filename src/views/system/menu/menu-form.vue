<template>
  <el-form
    v-if="model"
    :model="model"
    label-position="right"
    label-width="85px"
  >
    <el-row>
      <el-col :span="12">
        <el-form-item label="上级菜单" prop="parentId">
          <el-cascader
            v-model="model.parentId"
            placeholder="请选择上级菜单"
            :options="parentMenuOptions"
            :props="{
              emitPath: false,
              checkStrictly: true,
            }"
            :disabled="useFor == 'addSub'"
            clearable
            filterable
            style="width: 100%"
          ></el-cascader>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="菜单名称" prop="name" required>
          <el-input
            v-model="model.name"
            placeholder="请输入菜单名称"
            maxlength="30"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="菜单类型" prop="type" required>
          <el-select
            v-model="model.type"
            :disabled="typeof model.id != 'undefined'"
            placeholder="请选择菜单类型"
            style="width: 100%"
          >
            <el-option label="目录" value="Directory"> </el-option>
            <el-option label="页面" value="Page"> </el-option>
            <el-option label="外部链接" value="ExternalLink"> </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="图标" prop="icon">
          <el-input
            v-model="model.icon"
            placeholder="请输入图标"
            maxlength="50"
            clearable
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row v-if="model.type == 'Page'">
      <el-col :span="12">
        <el-form-item label="页面路径" prop="pagePath" required>
          <el-cascader
            v-model="model.pagePath"
            placeholder="请输入页面路径"
            :options="pageOptions"
            :props="{
              emitPath: false,
            }"
            :show-all-levels="false"
            filterable
            style="width: 100%"
            @change="onPagePathChange"
          >
            <template #default="{ data }">
              <el-row type="flex" justify="space-between">
                <el-col style="text-align: left">
                  <span>{{ data.value }} </span>
                </el-col>
                <el-col style="text-align: right">
                  <el-tag v-if="data.pageTitle" type="info" size="mini">{{
                    data.pageTitle
                  }}</el-tag>
                </el-col>
              </el-row>
            </template>
          </el-cascader>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="页面标题" prop="title" required>
          <el-input
            v-model="model.title"
            placeholder="请输入菜单标题"
            maxlength="30"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item
          v-if="model.type != 'ExternalLink'"
          label="请求路径"
          prop="path"
          required
        >
          <el-input v-model="model.path" placeholder="请输入请求路径" />
        </el-form-item>
        <el-form-item
          v-else-if="model.type == 'ExternalLink'"
          label="网络地址"
          prop="url"
          required
        >
          <el-input v-model="model.url" placeholder="请输入网址" />
        </el-form-item>
      </el-col>

      <el-col v-if="model.type != 'Directory'" :span="12">
        <el-form-item label="权限标识" prop="permission">
          <el-input
            v-model="model.permission"
            :disabled="model.type == 'Page'"
            placeholder="请输入权限标识"
            maxlength="20"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="排序号" required>
          <el-input
            v-model="model.sequence"
            type="number"
            :min="0"
            placeholder="请输入排序号"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import EntityForm from "@/mixins/EntityForm";
import {
  filterRecursively,
  mapRecursively,
  OptionsMaker,
} from "@/utils/recursive";
import { pathTree, pages } from "@/utils/page";
export default {
  mixins: [EntityForm],
  props: {
    menuOptions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    let pageOptions = new OptionsMaker("path", "path").make(pathTree, []);
    pageOptions = mapRecursively.apply(pageOptions, [
      (option) => {
        let page = pages.find((page) => page.path == option.value);
        if (page) {
          option.pageTitle = page.title;
        }
        return option;
      },
    ]);
    return {
      pageOptions,
    };
  },
  computed: {
    parentMenuOptions() {
      let options = filterRecursively.apply(this.menuOptions, [
        (menuItem) => menuItem.type == "Directory",
      ]);

      return mapRecursively.apply(options, [
        ({ value, label, type, children }) => {
          let option;
          if (Array.isArray(children) && children.length == 0) {
            option = { value, label, type };
          } else {
            option = { value, label, type, children };
          }
          option.disabled = value == this.model.id;
          return option;
        },
      ]);
    },
  },
  created() {},
  methods: {
    onPagePathChange(pagePath) {
      let page = pages.find((page) => page.path == pagePath);
      this.model.permission = page?.permission;
    },
  },
};
</script>
