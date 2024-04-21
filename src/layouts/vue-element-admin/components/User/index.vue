<template>
  <div class="avatar-container hover-effect">
    <div class="avatar-wrapper">
      <el-dropdown style="height: 36px">
        <el-avatar class="username" size="medium">依</el-avatar>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            icon="el-icon-edit-outline"
            @click.native="
              () => {
                changeSetting({
                  key: 'showSettings',
                  value: true,
                });
              }
            "
          >
            主题设置
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- <el-avatar class="username" size="medium">{{ username }}</el-avatar> -->
      <el-avatar
        icon="el-icon-switch-button"
        size="medium"
        class="logout"
        @click.native="openLogout"
      ></el-avatar>
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import { mapState, mapActions } from "vuex";
export default {
  name: "User",
  data() {
    return {
      username: Cookies.get("name"),
      name: Cookies.get("name"),
    };
  },
  computed: {
    ...mapState({
      showSettings: (state) => state.settings.showSettings,
    }),
  },

  methods: {
    ...mapActions("settings", ["changeSetting"]),
    logout() {
      Cookies.set("username", "");
      Cookies.remove("username");
      document.location.reload();
    },
    openLogout() {
      this.$confirm("是否退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("user/logout").then(() => {
            location.href = "/index";
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.info_pass {
  width: 200px;
  height: 34px;
  padding: 4px 0 0 16px;
  top: 5px;
  left: 5px;
  letter-spacing: 0;
}

.info_pass p {
  height: 10px;
  line-height: 30px;
  color: #666;
}

.avatar-container {
  margin-right: 30px;

  .avatar-wrapper {
    margin-top: 5px;
    position: relative;

    .el-avatar.username {
      background: #e6a23c;
      margin-right: 5px;
      cursor: pointer;
      font-size: 8px;
    }

    .el-avatar.logout {
      background: #f56c6c;
      cursor: pointer;
    }

    .user-avatar {
      cursor: pointer;
      width: 40px;
      height: 40px;
      border-radius: 10px;
    }

    .el-icon-caret-bottom {
      cursor: pointer;
      position: absolute;
      right: -20px;
      top: 25px;
      font-size: 12px;
    }
  }
}
</style>
