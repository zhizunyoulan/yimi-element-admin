# yimi-element-admin

<p>
    Yimi Element Admin是一个Vue 2.x的快速开发框架，基于Element
    UI，预开发了后台管理系统常用的一些功能页面，能为各种后台管理系统的开发提供极大的便利。
</p>
<p>
    另外，该项目的基础框架代码来自`VueElementAdmin`，在此表示感谢！
</p>

[文档地址](http://yimi.uublue.com)

> 另外，配套的后端项目，[yimi-spring](https://gitee.com/uublue/yimi-spring)，正在开发中。



## 功能简介
1. 页面包括：用户管理、部门管理、接口管理、菜单管理、角色管理；
2. 接口管理，能一键统计前端每个页面用到的api接口，并与后端进行同步，进而统计出每个页面包含哪些操作，以及其需要的权限`permission`和角色`role`；
3. 菜单管理，能基于`Vue-Router`的配置，一键同步到后端，形成菜单树，配合接口管理统计出的页面接口数据，能知道每个菜单里包含的接口；另外，每个菜单和操作的`可见用户`情况，可在此功能进行查看；
4. 角色管理，能基于菜单和操作等`资源`，给角色分配权限；
5. 用户管理，能直接分配角色`role`，也能基于菜单和操作等`资源`，给用户分配权限`permission`和角色`role`。



---

<p>
    <a target="_blank" style="color: #409eff" href="https://www.npmjs.com/package/@uublue/yimi-element">Yimi Element</a>是一个基于Element
    UI的增强组件库，封装了多种通用、易用的组件。
</p>

## 组件简介

### 表格组件 `Table`

高度集成的表格组件

#### 特性

- 完全保留ElTable的功能
- 能从接口获取数据并渲染，也能直接通过prop传data，格式为数组或`{rows: [], total, summary}`
- 多种列渲染方式（formatter、render、插槽），插槽能控制列的标题或数据单元格
- 自动分页，支持前端分页和后端分页；自动计算合计行
- default(默认）插槽，保留el-table默认插槽的功能，可以插入el-table-column
- search-bar(搜索栏）插槽，有表单自动验证的功能
- action-bar(操作栏）插槽，用于放置操作按钮
- tools(工具）插槽，用于放置简易的工具
- append 插槽，保留el-table的append插槽
- pagination(分页）插槽，可以替换默认的分页
- 可通过`provide/inject`注入（一般在App.vue全局注入），替换内置的默认逻辑：默认axios对象，默认`tools`，`model-merger`、`page-merger`、`sort-merger`、`res-adapter`、`on-query-fail`
- 接口查询到的数据可以格式化后再渲染：res-adapter函数
- 合理的缺省设计

#### 简单用法
##### 代码
```html
<!-- api属性传入接口配置项，columns属性传入表格列的配置 -->
<!-- 如果不配置api属性，也可以通过data属性直接传入表格数据 -->
<yi-table
    :api="{
        url: '/user',
        method: 'get',
    }"
    :columns="[
        {
            label: '姓名',
            prop: 'name',
        },
        {
            label: '年龄',
            prop: 'age',
            align: 'center',
        },
        {
            label: '性别',
            prop: 'gender',
            align: 'center',
        },
        {
            label: '分数',
            prop: 'score',
            align: 'center',
        }
    ]"
    :page-sizes="[5, 10]"
>
    <template #search-bar="{ model, refresh }">
        <!-- 发送请求时，表单可以被找到并验证 -->
        <!-- 表单的model直接绑定作用域插槽暴露的内置model -->
        <el-form :model="model" size="mini" inline label-position="left">
            <el-form-item label="姓名">
                <!-- 表单数据绑定在内置model上，修改表单数据会修改内置model，发送请求时就会带上表单数据 -->
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item>
                <!-- 按钮的点击事件，直接调用作用域插槽暴露出来的refresh方法，触发表格再次请求数据并刷新 -->
                <el-button type="primary" @click="refresh">查询</el-button>
            </el-form-item>
        </el-form>
    </template>
</yi-table>
```

##### 接口返回数据

```javascript
{
	rows: [
	  {
          id: 1,
          name: "乔治",
          age: 17,
          gender: 1,
          score: 95
	  },
	  {
          id: 2,
          name: "海伦",
          age: 18,
          gender: 0,
          score: 98
	  },
	  {
          id: 3,
          name: "杰西卡",
          age: 19,
          gender: 0,
          score: 95
	  },
	  {
          id: 4,
          name: "约翰",
          age: 17,
          gender: 1,
          score: 90
	  },
	  {
          id: 5,
          name: "埃里克",
          age: 18,
          gender: 1,
          score: 55
	  }
	],
	summary: {score: 1200},
	total: 20
}

```

##### 效果图
<img src="https://yimi-assets-public.oss-cn-beijing.aliyuncs.com/yimi-element/table-01.png"  >


### 操作组件 `Action`

需要调用后端操作接口（增、删、改，查）时，一般是通过点击一个触发器（比如一个button、link，或tag），弹出一个模态框，输入一些数据（或者无数据输入），然后构造请求数据并发送给接口，再根据请求的结果做相应的后处理，该组件就是对以上过程的封装。

#### 特性

- 触发器(button、link、tag)和模态窗（dialog或drawer）的功能完全保留
- 使用默认插槽时，点击触发器会先出现模态框，再在模态框中触发请求发送
- 不使用默认插槽时，点击触发器，如果配置了`confirm-text`会先弹框等待确认，再决定是否发送请求，否则直接发送请求
- 多点控制最终发送的请求数据：api函数 （用于构造基础api配置项）、model-merger（从内置model数据合并）、page-merger(从分页参数合并)、sort-merger（从排序参数合并），onSubmit函数 （可以替换内置的提交处理）
- 内置model数据的存续可以配置：always、submit、never
- 发送请求前，会对默认插槽中找到的第一个form表单进行验证（无表单则不验证），验证不通过，会抛出事件
- 可通过`provide/inject`注入（一般在App.vue全局注入），替换内置的默认逻辑：默认axios对象、默认`model-merger`（从内置model构造请求数据）、`on-submit-fail`
- 合理的缺省设计


#### 用法
##### 代码
```html
<yi-action
    text="新增用户"
    :api="{
        url: '/user',
        method: 'post',
    }"
>
    <!-- 默认插槽中，放的是模态窗体中的内容，如果未使用此插槽，则不会弹出模态窗 -->
    <template #default="{ model }">
        <el-row>
            <el-col>
            <!-- 此时，表单位于其他组件的插槽内，发送请求时，仍然可以被找到并验证 -->
            <!-- 表单的model直接绑定默认作用域插槽暴露的内置model -->
            <el-form :model="model" inline>
                <el-form-item prop="name" required label="姓名">
                <!-- 表单数据也绑定在该model上，修改表单数据会修改内置model，发送请求时就会带上表单数据 -->
                    <el-input v-model="model.name" />
                </el-form-item>
            </el-form>
            </el-col>
        </el-row>
    </template>
</yi-action>
```
##### 效果图
<img src="https://yimi-assets-public.oss-cn-beijing.aliyuncs.com/yimi-element/action-01.png"  >

### 其它组件
还有`模态窗`、`下载器`、`多选框组`、`开关面板`、`控制面板`等组件

## 交流方式

> QQ群: `956379914`

<img src="https://yimi-assets-public.oss-cn-beijing.aliyuncs.com/yimi-element/qqqun_1.png" width="220" height="220" >

> Email: `uublue@126.com`
