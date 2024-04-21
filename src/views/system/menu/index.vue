<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--菜单数据-->
      <el-col :span="16" :xs="0">
        <yi-table
          :api-config="apis.getMenuTree"
          :right-tools="['refresh']"
          :columns="[
            {
              label: '菜单名称',
              prop: 'name',
              $slot: 'name',
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
              $slot: 'pagePath',
            },

            {
              label: '操作',
              prop: 'opt',
              $slot: 'opt',
            },
          ]"
          default-expand-all
          highlight-current-row
          :paging="false"
          @query-success="
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
          <template #tool-bar="{ refresh, el }">
            <el-col :span="1.5">
              <!-- 添加 -->
              <yi-operation
                :api-config="apis.addMenu"
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
              </yi-operation>
            </el-col>

            <el-col :span="1.5">
              <el-button
                type="info"
                plain
                icon="el-icon-sort"
                size="mini"
                @click="el.toggleAllExpansion()"
                >展开/折叠</el-button
              >
            </el-col>
            <el-col :span="1.5">
              <yi-operation
                :api-config="apis.initMenu"
                text="菜单初始化"
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
                    :right-tools="[]"
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
              </yi-operation>
            </el-col>
          </template>

          <!-- 自定义列的插槽 -->
          <template #name="{ row }">
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
          <template #pagePath="{ row }">
            <span v-if="row.type == 'Directory'"> - </span>
            <el-tag v-else size="mini" type="info">{{ row.pagePath }}</el-tag>
          </template>
          <template #opt="{ row, refresh }">
            <yi-operation
              :api-config="apis.updateMenu"
              type="text"
              text="修改"
              size="mini"
              icon="el-icon-edit"
              :form-model="row"
              modal-title="修改菜单"
              dialog-width="700px"
              @on-submit-success="
                (formModel) => {
                  Object.assign(row, formModel);
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
            </yi-operation>

            <yi-operation
              title="删除"
              :api-config="apis.removeMenu(row.id)"
              type="text"
              text="删除"
              size="mini"
              icon="el-icon-delete"
              confirm-text="是否删除该菜单项？"
              @on-submit-success="
                () => {
                  refresh();
                }
              "
            />
            <yi-operation
              v-if="row.type == 'Directory'"
              title="新增子项"
              :api-config="apis.addMenu"
              type="text"
              text="新增子项"
              size="mini"
              icon="el-icon-circle-plus"
              :modal-title="row.name + ' - 新增子项'"
              :form-model="{parentId: row.id}"
              dialog-width="70%"
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
                  use-for="add"
                />
              </template>
            </yi-operation>
          </template>
        </yi-table>
      </el-col>
      <el-col :span="8" :xs="0">
        <yi-table
          ref="apiTable"
          :init="false"
          :api-config="apis.getMenuPageApis"
          :right-tools="[]"
          :columns="[
            {
              label: '操作名称',
              prop: 'name',
              $slot: 'name',
            },
            {
              label: '权限标识',
              prop: 'permissions',
              $slot: 'permissions',
            },
            {
              label: '所需角色',
              prop: 'roles',
              $slot: 'roles',
            },
          ]"
          :res-adapter="apiResAdapter"
        >
          <template #right-bar>
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
          <template #name="{ row }">
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
          <template #permissions="{ row }">
            <security-display :codes="row.permissions" />
          </template>
          <template #roles="{ row }">
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
        "type",
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
