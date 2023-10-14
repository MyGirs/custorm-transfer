<template>
  <div id="app">
    <ul>
      <li @click="handleMenu(0)">切换数据1</li>
      <li @click="handleMenu(1)">切换数据2</li>
      <li @click="handleMenu(2)">切换数据3</li>
      <li @click="handleMenu(3)">切换数据4</li>
    </ul>
    <customTransfer ref="transfer" :sourceList="list" :isPaging="true" />
    <el-button @click="clearSelectedValue">清空右侧勾选数据</el-button>
    <el-button @click="clearSelectedList">清空右侧选中数据</el-button>
    <el-button @click="getSelectedValue">获取右侧勾选数据</el-button>
    <el-button @click="getSelectedList">获取右侧数据</el-button>
  </div>
</template>

<script>
import customTransfer from './package/transfer.vue'
export default {
  name: 'App',
  components: {
    customTransfer
  },
  data() {
    return {
      list: []
    }
  },
  mounted() {
    this.handleMenu(0)
  },
  methods: {
    handleMenu(type) {
      let types = [
        { name: '数据-1_', id: 'a' },
        { name: '数据-2_', id: 'b' },
        { name: '数据-3_', id: 'c' },
        { name: '数据-4_', id: 'd' }
      ]
      this.list = []
      let item = types[type]
      if (item.id === 'd') return

      for (let i = 0; i < 40; i++) {
        this.list.push({
          name: item.name + i,
          id: item.id + i,
          parent: item.id,
          index: i
        })
      }
    },
    clearSelectedValue() {
      this.$refs['transfer'].clearSelectedValue()
    },
    clearSelectedList() {
      this.$refs['transfer'].clearSelectedList()
    },
    getSelectedValue() {
      console.log(this.$refs['transfer'].getSelectedValue())
      this.$refs['transfer'].getSelectedValue()
    },
    getSelectedList() {
      console.log(this.$refs['transfer'].getSelectedList())
      this.$refs['transfer'].getSelectedList()
    }
  }
}
</script>

<style></style>
