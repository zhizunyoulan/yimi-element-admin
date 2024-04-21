<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="true"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="menuItem in menu"
          :key="menuItem.path"
          :item="menuItem"
          :base-path="menuItem.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/layouts/vue-element-admin/styles/variables.scss";

export default {
  name: "Sidebar",
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters("app", ["sidebar"]),
    ...mapGetters(["menu"]),
    // rootMenu: function () {
    //   return this.$rootMenu;
    // },
    // menus: function () {
    //   const router = this.$router;
    //   let menus = [];
    //   router.options.routes.forEach((item) => {
    //     if (item.meta && item.meta.isMenu) {
    //       menus.push(item);
    //     } else if (item.path == "/" && Array.isArray(item.children)) {
    //       menus = menus.concat(item.children);
    //     } else if (item.component && item.component.name == "VeaLayout") {
    //       menus.push(item);
    //     }
    //   });
    //   return menus;
    // },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
  created() {
  },
  methods: {
  },
};
</script>
