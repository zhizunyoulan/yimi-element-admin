<template>
  <section v-loading="loading" class="app-main">
    <transition
      v-if="!$route.meta.noCache"
      name="fade-transform"
      mode="out-in"
      :duration="50"
    >
      <keep-alive :include="includeArr.length == 0 ? '' : includeArr.join(',')">
        <router-view :key="key" />
      </keep-alive>
    </transition>
    <transition v-else name="fade-transform" mode="out-in" :duration="100">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "AppMain",
  data() {
    return {
      loading: false,
      includeArr: [],
    };
  },
  computed: {
    ...mapGetters("tagsView", ["visitedViews"]),
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.path;
    },
  },
  watch: {
    visitedViews(value) {
      let arr = [];
      value.map((item) =>
        arr.push(
          item.cpntName ||
            item.matched[item.matched.length - 1]?.components?.default?.name
        )
      );
      this.includeArr = arr;
    },
  },
};
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 0px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
    padding-left: 2px;
    padding-right: 2px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
