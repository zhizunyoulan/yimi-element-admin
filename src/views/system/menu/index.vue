<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--菜单数据-->
      <el-col :span="16" :xs="0">
        <yi-table
          :api="apis.getMenuTree"
          :tools="['refresh']"
          :columns="[
            {
              label: '菜单名称',
              prop: 'name',
            },
            {
              label: '请求地址',
              prop: 'url',
              'show-overflow-tooltip': true,
              formatter: (row, column, cellValue) => {
                if (row.type == 'Directory') {
                  return '-';
                } else {
                  return cellValue;
                }
              },
            },
            {
              label: '菜单类型',
              prop: 'type',
              width: 80,
              formatter: (row, column, cellValue) => {
                if (cellValue == 'Directory') {
                  return '目录';
                } else if (cellValue == 'Page') {
                  return '页面';
                } else if (cellValue == 'ExLink') {
                  return '外部链接';
                }
              },
            },
            {
              label: '权限标识',
              'show-overflow-tooltip': true,
              prop: 'permission',
            },
            {
              label: '对应页面',
              headerAlign: 'center',
              prop: 'pagePath',
            },

            {
              label: '操作',
              prop: 'opt',
            },
          ]"
          default-expand-all
          highlight-current-row
          :paged="false"
          @on-query-success="
            (res) => {
              setMenuOptions(res);
            }
          "
          @current-change="
            (currentRow) => {
              if (currentRow.type == 'Page') {
                selectedMenu = currentRow;
              } else {
                selectedMenu = undefined;
              }
              refreshApiTable();
            }
          "
        >
          <template #action-bar="{ refresh, el }">
            <el-row>
              <!-- 新增 -->
              <yi-action
                :api="apis.addMenu"
                text="新增"
                type="primary"
                size="mini"
                :plain="true"
                icon="el-icon-plus"
                modal-title="添加菜单"
                dialog-width="700px"
                @on-submit-success="refresh"
              >
                <template #default="scope">
                  <menu-form
                    v-model="scope.model"
                    :menu-options="menuOptions"
                    use-for="add"
                  />
                </template>
              </yi-action>

              <!-- 展开/折叠 -->
              <el-button
                type="info"
                plain
                icon="el-icon-sort"
                size="mini"
                @click="el.toggleAllExpansion()"
                >展开/折叠</el-button
              >

              <!-- 同步菜单 -->
              <yi-action
                :api="apis.initMenu"
                text="同步菜单"
                type="danger"
                size="mini"
                :plain="true"
                icon="el-icon-discover"
                modal-title="菜单初始化"
                dialog-width="80%"
                :on-submit="
                  (model, sendRequest) => {
                    sendRequest({
                      data: {
                        list: initialMenu,
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
                        label: '菜单名',
                        prop: 'name',
                        $slot: 'name',
                      },
                      {
                        label: '路由地址',
                        prop: 'url',
                      },
                      {
                        label: '权限标识',
                        prop: 'permission',
                      },
                      {
                        label: '对应页面',
                        headerAlign: 'center',
                        $slot: 'pagePath',
                      },
                    ]"
                    :tools="[]"
                    default-expand-all
                    :data="initialMenu"
                  >
                    <template #name="{ row }">
                      <i
                        v-if="row.meta && row.meta.icon"
                        :class="row.meta.icon"
                      />
                      <span>{{ row.name }}</span>
                    </template>
                    <template #pagePath="{ row }">
                      <i
                        v-if="row.type == 'Directory'"
                        class="el-icon-folder-opened"
                      />
                      <el-tag v-else size="mini" type="info">{{
                        row.pagePath
                      }}</el-tag>
                    </template>
                  </yi-table>
                </template>
              </yi-action>
            </el-row>
          </template>

          <!-- 自定义列的插槽 -->
          <template #~name="{ row }">
            <template v-if="row.type == 'Directory'">
              <i v-if="row.icon" :class="row.icon" />
              <span>{{ row.name }}</span>
            </template>
            <template v-else>
              <i v-if="row.icon" :class="row.icon" />
              <span>{{ row.name }}</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="可见用户"
                placement="top"
              >
                <el-link
                  class="el-icon-view"
                  type="primary"
                  :underline="false"
                  style="position: absolute; right: 3px; top: calc(50% - 6px)"
                />
              </el-tooltip>
            </template>
          </template>
          <template #~pagePath="{ row }">
            <span v-if="row.type == 'Directory'"> - </span>
            <el-tag v-else size="mini" type="info">{{ row.pagePath }}</el-tag>
          </template>
          <template #~opt="{ row, refresh }">
            <yi-action
              :api="apis.updateMenu"
              type="text"
              text="修改"
              size="mini"
              icon="el-icon-edit"
              :model="row"
              modal-title="修改菜单"
              dialog-width="700px"
              @on-submit-success="
                (res, model) => {
                  Object.assign(row, model);
                }
              "
            >
              <template #default="scope">
                <menu-form
                  v-model="scope.model"
                  :menu-options="menuOptions"
                  use-for="edit"
                />
              </template>
            </yi-action>

            <yi-action
              title="删除"
              :api="apis.removeMenu(row.id)"
              type="text"
              text="删除"
              size="mini"
              icon="el-icon-delete"
              confirm-text="是否删除该菜单项及其子项？"
              @on-submit-success="
                (res) => {
                  $message({
                    message: '删除了' + res.data + '个菜单',
                    type: res.data > 0 ? 'success' : 'error'
                  })
                  refresh();
                }
              "
            />
            <yi-action
              v-if="row.type == 'Directory'"
              title="新增子项"
              :api="apis.addMenu"
              type="text"
              text="新增子项"
              size="mini"
              icon="el-icon-circle-plus"
              :modal-title="row.name + ' - 新增子项'"
              :model="{ parentId: row.id }"
              dialog-width="700px"
              @on-submit-success="
                () => {
                  refresh();
                }
              "
            >
              <template #default="scope">
                <menu-form
                  v-model="scope.model"
                  :menu-options="menuOptions"
                  use-for="addSub"
                />
              </template>
            </yi-action>
          </template>
        </yi-table>
      </el-col>
      <el-col :span="8" :xs="0">
        <yi-table
          ref="apiTable"
          :init="false"
          :api="apis.getMenuPageApis"
          :tools="[]"
          :columns="[
            {
              label: '操作名称',
              prop: 'name',
            },
            {
              label: '权限标识',
              prop: 'permissions',
            },
            {
              label: '所需角色',
              prop: 'roles',
            },
          ]"
          :res-adapter="apiResAdapter"
        >
          <template #tools>
            <el-tooltip
              class="item"
              effect="dark"
              content="刷新"
              placement="top"
            >
              <el-button
                size="mini"
                circle
                icon="el-icon-refresh"
                @click="refreshApiTable"
              />
            </el-tooltip>
          </template>

          <template #~name="{ row }">
            <el-popover placement="left" width="180" trigger="hover">
              <api-display
                :api="{
                  antPattern: row.antPattern,
                  method: row.method,
                }"
              />
              <el-link slot="reference" type="info" size="mini">{{
                row.name
              }}</el-link>
            </el-popover>
            <el-tooltip
              class="item"
              effect="dark"
              content="可见用户"
              placement="top"
            >
              <el-link
                class="el-icon-view"
                type="primary"
                :underline="false"
                style="position: absolute; right: 3px; top: calc(50% - 6px)"
              />
            </el-tooltip>
          </template>
          <template #~permissions="{ row }">
            <security-display :codes="row.permissions" />
          </template>
          <template #~roles="{ row }">
            <security-display :codes="row.roles" />
          </template>
        </yi-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import MenuForm from "./menu-form.vue";
import ApiDisplay from "../api/api-display.vue";
import SecurityDisplay from "../api/security-display.vue";
import { OptionsMaker } from "@/utils/recursive";
import {
  initMenu,
  getMenuTree,
  addMenu,
  updateMenu,
  removeMenu,
  getMenuPageApis,
} from "@/apis/system/menu";
export default {
  name: "MenuPage",
  apis: {
    initMenu,
    getMenuTree,
    addMenu,
    updateMenu,
    removeMenu,
    getMenuPageApis,
  },
  pageInfo: {
    title: "菜单管理",
    permission: "system:menu:view",
  },
  components: { MenuForm, ApiDisplay, SecurityDisplay },
  data() {
    return {
      initialMenu: [],
      menuOptions: [],
      selectedMenu: undefined,
    };
  },
  created() {
    this.initMenu().then((menu) => {
      this.initialMenu = menu;
    });
  },
  methods: {
    ...mapActions("page", ["initMenu"]),
    setMenuOptions(res) {
      let menuOptions = new OptionsMaker("id", "name").make(res.data?.rows, [
        "type"
      ]);
      this.menuOptions = menuOptions || [];
    },
    refreshApiTable() {
      if (this.selectedMenu) {
        this.$refs.apiTable.refresh({
          params: { pagePath: this.selectedMenu.pagePath },
        });
      } else {
        this.$refs.apiTable.clear();
      }
    },
    apiResAdapter(res) {
      return {
        rows: (res.data?.rows || []).map((row) => {
          return {
            name: row.name,
            antPattern: row.api?.antPattern,
            method: row.api?.method,
            permissions: row.api.permissions,
            roles: row.api.roles,
          };
        }),
      };
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
