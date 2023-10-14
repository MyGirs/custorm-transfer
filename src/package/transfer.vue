<template>
  <div class="transfer flex">
    <div class="transfer-left">
      <el-input v-model="keyWord" @input="handleInput" placeholder="请输入关键词"></el-input>
      <div class="transfer-left-main">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAll" class="mb_10">
          {{ leftText }}
        </el-checkbox>
        <el-checkbox-group v-model="checkedValue" @change="handleChecked">
          <el-checkbox v-for="(item, index) in currentData" :label="item[id]" :key="index">
            {{ item[name] }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <el-pagination v-if="isPaging" small layout="prev, pager, next" @current-change="handlerCurrent" :page-count="pageCount" :page-size="pageSize" :total="keyWord ? filterList.length : checkAllList.length"></el-pagination>
    </div>
    <div class="transfer-midder">
      <el-button type="primary" @click="deleteSelected" :disabled="!selectedValue.length" :icon="leftIcon">
        {{ leftButtonText }}
      </el-button>
      <el-button type="primary" :disabled="!checkedValue.length" @click="addSelected" :icon="rightIcon">
        {{ rightButtonText }}
      </el-button>
    </div>
    <div class="transfer-right">
      <div class="transfer-right-main">
        <el-checkbox :indeterminate="isIndeterminateSelected" v-model="selectedAll" @change="handleSelectedAll" class="mb_10">
          {{ rightText }}
        </el-checkbox>
        <el-checkbox-group v-model="selectedValue" @change="handleSelected">
          <el-checkbox v-for="item in selectedList" :label="item[id]" :key="item[id]">
            {{ item[name] }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'customTransfer',
  props: {
    sourceList: {
      type: Array,
      default: () => []
    },
    leftButtonText: {
      type: String,
      default: '到左边'
    },
    leftIcon: {
      type: String,
      default: 'el-icon-arrow-left'
    },
    leftText: {
      type: String,
      default: '全选'
    },
    rightIcon: {
      type: String,
      default: 'el-icon-arrow-right'
    },
    rightButtonText: {
      type: String,
      default: '到右边'
    },
    rightText: {
      type: String,
      default: '全选'
    },
    pageSize: {
      type: Number,
      default: 20
    },
    isPaging: {
      type: Boolean,
      default: true
    },
    options: {
      type: Object,
      default: () => {
        return { index: 'index', name: 'name', parent: 'parent', id: 'id' }
      }
    }
  },
  computed: {
    id() {
      return this.options.id
    },
    name() {
      return this.options.name
    }
  },
  watch: {
    sourceList: {
      handler(newVal) {
        let { parent, id } = this.options
        this.checkAllList = newVal.filter(item => !this.selectedList.some(items => items[parent] == item[parent] && items[id] === item[id]))
        this.handlerCurrent(1)
      },
      immediate: true
    }
  },
  data() {
    return {
      keyWord: '',
      checkAll: false,
      isIndeterminate: true,
      checkedValue: [],
      currentData: [],
      checkAllList: [],
      filterList: [],
      pageCount: 1,
      selectedAll: false,
      selectedValue: [],
      isIndeterminateSelected: true,
      selectedList: []
    }
  },

  methods: {
    throttle(fn, delay) {
      let timer = null
      return function () {
        let context = this
        let args = arguments
        if (!timer) {
          timer = setTimeout(function () {
            fn.apply(context, args)
            timer = null
          }, delay)
        }
      }
    },
    handleInput() {
      this.throttle(() => {
        this.filterList = this.checkAllList.filter(item => item.name.includes(this.keyWord))
        this.handlerCurrent(1)
      }, 500)()
    },
    handleCheckAll(val) {
      this.checkedValue = val ? this.currentData.map(item => item[this.id]) : []
      this.isIndeterminate = false
    },
    handleChecked(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.currentData.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.currentData.length
    },
    handlerCurrent(val) {
      if (this.isPaging) {
        this.pageCount = val
        this.checkedValue = []
        this.isIndeterminate = true
        this.checkAll = false
        if (this.keyWord) {
          this.currentData = this.filterList.slice((val - 1) * this.pageSize, val * this.pageSize)
        } else {
          this.currentData = this.checkAllList.slice((val - 1) * this.pageSize, val * this.pageSize)
        }
      } else {
        this.checkedValue = []
        this.isIndeterminate = true
        this.checkAll = false
        if (this.keyWord) {
          this.currentData = this.filterList
        } else {
          this.currentData = this.checkAllList
        }
      }
    },
    handleSelectedAll(val) {
      this.selectedValue = val ? this.selectedList.map(item => item[this.id]) : []
      this.isIndeterminateSelected = false
    },
    handleSelected(value) {
      let selectedCount = value.length
      this.selectedAll = selectedCount === this.selectedList.length
      this.isIndeterminateSelected = selectedCount > 0 && selectedCount < this.selectedList.length
    },
    addSelected() {
      this.currentData.forEach(item => {
        if (this.checkedValue.includes(item[this.id])) {
          this.selectedList.push(item)
        }
      })
      this.deleteList(this.checkedValue, this.filterList)
      this.deleteList(this.checkedValue, this.checkAllList)
      this.handlerCurrent(this.pageCount)
    },
    deleteSelected() {
      this.mergeToCheckList()
      this.deleteList(this.selectedValue, this.selectedList)
      this.handlerCurrent(this.pageCount)
      this.isIndeterminateSelected = true
    },
    deleteList(taget, list) {
      for (var i = 0; i < list.length; i++) {
        if (taget.includes(list[i][this.id])) {
          list.splice(i, 1)
          i--
        }
      }
      taget = []
    },
    mergeToCheckList(type) {
      let list = [], parentKey = ""
      let { parent, id, index } = this.options
      if(this.checkAllList && this.checkAllList.length > 0) {
        parentKey = this.checkAllList[0][parent]
      }else if(this.selectedList && this.selectedList.length>0) {
        parentKey = this.selectedList[0][parent]
      }
      
      if (type) {
        this.selectedList.forEach(item => {
          if (item[parent] == parentKey) {
            list.push(item)
          }
        })
      } else {
        this.selectedList.forEach(item => {
          if (this.selectedValue.includes(item[id]) && item[parent] == parentKey) {
            list.push(item)
          }
        })
      }

      this.filterList = this.filterList.concat(list).sort((a, b) => a[index] - b[index])
      this.checkAllList = this.checkAllList.concat(list).sort((a, b) => a[index] - b[index])
    },
    clearSelectedList() {
      this.mergeToCheckList('clear')
      this.handlerCurrent(this.pageCount)
      this.selectedList = []
      this.selectedValue = []
      this.isIndeterminateSelected = true
      this.selectedAll = false
    },
    clearSelectedValue() {
      this.selectedValue = []
      this.isIndeterminateSelected = true
      this.selectedAll = false
    },
    getSelectedValue() {
      let list = this.selectedList.filter(item => this.selectedValue.includes(item[this.id]))
      return list
    },
    getSelectedList() {
      return this.selectedList
    }
  }
}
</script>
<style scoped>
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  opacity: 0.2;
  /* background: fade(green, 60%); */
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  /* background: fade(green, 30%); */
}
.mb_10 {
  margin-bottom: 10px;
}
.flex {
  display: flex;
}
.transfer-midder {
  margin: auto 0;
  padding: 0px 20px;
}
.transfer-left,
.transfer-right {
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
}
.el-input {
  width: 240px;
  margin-bottom: 5px;
}
.el-checkbox {
  display: block;
}
.transfer-left-main,
.transfer-right-main {
  max-height: 300px;
  overflow-y: auto;
}
</style>
