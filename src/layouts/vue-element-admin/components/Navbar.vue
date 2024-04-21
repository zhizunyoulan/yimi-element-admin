<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device!=='mobile'"></template>

      <User />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "../components/Breadcrumb";
import Hamburger from "../components/Hamburger";
// import ErrorLog from "../components/ErrorLog";
// import Screenfull from '@/components/Screenfull'
// import SizeSelect from "../components/SizeSelect";
// import Search from "../components/HeaderSearch";
import User from "./User";

export default {
  name: "Navbar",
  components: {
    Breadcrumb,
    Hamburger,
    // ErrorLog,
    // Screenfull,
    // SizeSelect,
    // Search,
    User,
  },
  computed: {
    ...mapGetters('app',[
      "sidebar",
      // 'avatar',
      "device",
    ]),
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {},
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
  }
}
</style>
