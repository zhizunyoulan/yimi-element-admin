<template>
  <!-- 预览文件 -->
  <div class="app-container home">
    <el-row :gutter="20">
      <el-col :sm="24" :lg="12" style="padding-left: 20px">
        <h2>Yimi Element Admin</h2>
        <p>
          Yimi Element Admin是一个Vue 2.x的快速开发框架，基于Element UI，封装了多种通用、易用的增强组件，预开发了后台管理系统常用的一些功能页面，能为各种后台管理系统的开发提供极大的便利。
        </p>
        <p>
          另外，该项目也学习了其他一些开源项目中的优秀设计，在此向以下项目表示感谢！
        </p>
        <el-tag type="info" size="mini">VueElementAdmin</el-tag>
        <el-tag type="info" size="mini">RuoYi-Vue</el-tag>
        <p>
          更多内容将陆续加入！
        </p>
        <p>
          <b>当前版本:</b> <span>v{{ version }}</span>
        </p>
        <p>
          <el-tag type="danger">&yen;免费开源</el-tag>
        </p>
        
      </el-col>

      
    </el-row>
    <el-divider />

    <el-row :gutter="20">
      <el-col :xs="12" :sm="12" :md="6" :lg="5">
        <el-card class="update-log">
          <div slot="header" class="clearfix">
            <span>微信公众号</span>
          </div>
          <div class="body">
            <img
              src="@/assets/yimi/qrcode_for_gh_8fce87671431_344.jpg"
              alt="donate"
              width="100%"
            />
            <span style="display: inline-block; height: 30px; line-height: 30px">您的关注，将会给与我更多动力</span>
          </div>
        </el-card>
      
      </el-col>
    
    </el-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'


export default {
  name: "Dashboard",
  data() {
    return {
      // 版本号
      version: "0.1.0"
    };
  },
  created() {
    this.initBaseInfos();
  },
  methods: {
    ...mapActions('baseInfo', [
      'initBaseInfos'
    ]),
  }
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

