<template>
  <div class="app-container">
    <yi-table
      ref="pageApiTable"
      :api="apis.queryPageApis"
      :columns="[
        {
          label: '接口名称',
          prop: 'name',
          $slot: 'name',
        },
        {
          label: '所需权限',
          prop: 'permissions',
          $slot: 'permissions',
        },
        {
          label: '所需角色',
          prop: 'roles',
          $slot: 'roles',
        },
        {
          label: '类名',
          prop: 'className',
          width: 550,
        },
        {
          label: '方法名',
          prop: 'methodName',
        },
        {
          label: '所在页面',
          prop: 'pageApis',
          $slot: 'pageApis',
        },
      ]"
    >
      <template #search-bar="{ model, refresh }">
        <el-form :model="model" inline>
          <el-form-item label="接口名称">
            <el-input
              v-model="model.name"
              placeholder="请输入接口名称"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="refresh"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </template>
      <template #action-bar="{ refresh }">
        <yi-action
          :api="apis.syncPageApis"
          text="页面扫描"
          type="danger"
          size="mini"
          :plain="true"
          icon="el-icon-discover"
          modal-title="页面与操作"
          dialog-width="80%"
          :on-submit="
            (model, sendRequest) => {
              sendRequest({
                data: {
                  list: parsePagesToApis(),
                },
              });
            }
          "
          @on-submit-success="refresh"
        >
          <template #default>
            <yi-table
              row-key="path"
              :columns="[
                {
                  label: '页面路径',
                  prop: 'path',
                },
                {
                  label: '标题',
                  align: 'center',
                  prop: 'title',
                },
                {
                  label: '权限标识',
                  align: 'center',
                  prop: 'permission',
                },
                {
                  label: '接口',
                  headerAlign: 'center',
                  prop: 'apis',
                  $slot: 'apis',
                },
              ]"
              :tools="[]"
              default-expand-all
              :data="filterPages"
            >
              <template #apis="{ row }">
                <ul v-if="Array.isArray(row.apis)">
                  <li v-for="(api, index) in row.apis" :key="index">
                    <api-display :api="api" />
                  </li>
                </ul>
              </template>
            </yi-table>
          </template>
        </yi-action>
      </template>
      <template #name="{ row, value }">
        <span v-if="value">{{ value }}</span>
        <api-display
          v-else
          order-swap
          :api="{
            antPattern: row.antPattern,
            method: row.method,
          }"
        />
      </template>
      <template #permissions="{ row }">
        <security-display :codes="row.permissions" />
      </template>
      <template #roles="{ row }">
        <security-display :codes="row.roles" />
      </template>
      <template #pageApis="{ row }">
        <el-tag
          v-for="(pageApi, index) in row.pageApis"
          :key="index"
          size="mini"
          type="info"
          >{{ pageApi.pagePath }}</el-tag
        >
      </template>
    </yi-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { syncPageApis, queryPageApis } from "@/apis/system/api";
import ApiDisplay from "./api-display.vue";
import SecurityDisplay from "./security-display.vue";
export default {
  name: "ApiPage",
  apis: {
    syncPageApis,
    queryPageApis,
  },
  pageInfo: {
    title: "页面接口",
    permission: "system:page-api:view",
  },
  components: { ApiDisplay, SecurityDisplay },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("page", ["pages"]),
    filterPages() {
      return this.pages.filter((page) => Array.isArray(page.apis));
    },
  },
  methods: {
    parsePagesToApis() {
      let apis = [];
      this.pages.forEach((page) => {
        if (Array.isArray(page.apis)) {
          page.apis.forEach((api) => {
            let _api = {
              antPattern: api.antPattern,
              method: api.method,
            };
            _api.pagePath = page.path;
            apis.push(_api);
          });
        }
      });
      return apis;
    },
  },
};
</script>

<style lang="scss" scoped></style>
