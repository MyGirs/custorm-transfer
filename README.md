# custom-transfer

## 介绍

基于 vue2+element-ui 自定义的穿梭框、切换左侧数据源保留右侧数据、可以对数据进行过滤

## 使用方式 npm

```
npm i custom-tramsfer -S

```

main.js

```js
import Vue from 'vue'
import App from './App.vue'
import customTransfer from 'custom-transfer'
import 'custom-transfer/custom-transfer.css'
Vue.use(customTransfer)
new Vue({
  el: '#app',
  render: h => h(App)
})
```

## 在线体验

https://mygirs.github.io/transfer-demo/index.html

## 源码地址

https://github.com/MyGirs/custorm-transfer

## Attributes

| 参数            | 说明                                                                               | 类型    | 默认值                                                       |
| --------------- | ---------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------ |
| sourceList      | 数据源                                                                             | Array   | []                                                           |
| leftButtonText  | 左边按钮文案                                                                       | String  | 到左边                                                       |
| rightButtonText | 右边按钮文案                                                                       | String  | 到右边                                                       |
| leftText        | 左边全选文案                                                                       | String  | 全选                                                         |
| rightText       | 右边全选文案                                                                       | String  | 全选                                                         |
| leftIcon        | 左边按钮 icon                                                                      | String  | el-icon-arrow-left                                           |
| rightIcon       | 右边按钮 icon                                                                      | String  | el-icon-arrow-right                                          |
| pageSize        | 分页显示数 isPaging=true 的时候有效                                                | Number  | 20                                                           |
| isPaging        | 是否分页                                                                           | Boolean | true                                                         |
| options         | 配置项 index 用于排序 name 展示名称 parent 对应的父级节点 id 唯一标识 这些参数必有 | Object  | { index: "index", name: "name", parent: "parent", id: "id" } |

## Methods

| 事件名称           | 说明             | 参数                      |
| ------------------ | ---------------- | ------------------------- |
| clearSelectedList  | 清空右侧数据     |                           |
| clearSelectedValue | 清除右侧勾选状态 |                           |
| getSelectedValue   | 获取右侧勾选数据 | 返回 selectedIdList Array |
| getSelectedList    | 获取右侧数据     | 返回 selectedList Array   |
