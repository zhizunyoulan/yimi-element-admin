<template>
  <!-- 预览文件 -->
  <div class="app-container home">
    <el-row :gutter="20">
      <el-col :sm="12" :lg="12" style="padding-left: 20px">
        <a
          target="_blank"
          style="color: #409eff"
          href="https://gitee.com/uublue/yimi-element-admin"
        >
          <h2>Yimi Element Admin<i class="el-icon-link" /></h2>
        </a>
        <p>
          Yimi Element Admin是一个Vue 2.x的快速开发框架，基于Element
          UI，预开发了后台管理系统常用的一些功能页面，能为各种后台管理系统的开发提供极大的便利。
        </p>
        <p>
          另外，该项目的基础框架代码来自<el-tag type="info" size="mini">VueElementAdmin</el-tag>，在此表示感谢！
        </p>
        <p>更多内容将陆续加入！</p>
        <p><b>当前版本:</b> <span>v0.1.1</span></p>
        <p>
          <el-tag type="danger">&yen;免费开源</el-tag>
        </p>
        <p>
          <el-button
            size="mini"
            icon="el-icon-s-home"
            plain
            @click="openPage('http://yimi.uublue.com')"
            >文档</el-button
          >
        </p>
      </el-col>

      <el-col :sm="12" :lg="12" style="padding-left: 20px">
        <a
          target="_blank"
          style="color: #409eff"
          href="https://www.npmjs.com/package/@uublue/yimi-element"
        >
          <h2>Yimi Element<i class="el-icon-link" /></h2>
        </a>
        <p>
          Yimi Element是一个基于Element
          UI的组件增强库，封装了多种通用、易用的增强组件。
        </p>

        <p>更多组件将陆续加入！</p>
        <p><b>当前版本:</b> <span>v0.2.7</span></p>
        <p>
          <el-tag type="danger">&yen;免费使用</el-tag>
        </p>
      </el-col>
    </el-row>
    <el-divider />

    <el-row :gutter="20">
      <el-col :xs="10" :sm="10" :md="6" :lg="5">
        <el-card class="update-log">
          <div slot="header" class="clearfix">
            <span>QQ交流群: </span><el-tag type="info" size="mini">956379914</el-tag>
          </div>
          <div class="body">
            <img
              src="https://yimi-assets-public.oss-cn-beijing.aliyuncs.com/yimi-element/qqqun_1.png"
              width="100%"
            />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  methods: {
    openPage(href) {
      window.open(href, "_blank");
    },
  },
};
</script>
<style scoped>
.home {
  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }
  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }
  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  h4 {
    margin-top: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;

    b {
      font-weight: 700;
    }
  }

  .update-log {
    ol {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 40px;
    }
  }
}
</style>
