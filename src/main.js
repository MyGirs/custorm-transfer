import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import customTransfer from 'custom-transfer'
// import 'custom-transfer/custom-transfer.css'
Vue.config.productionTip = false

// Vue.use(customTransfer)
Vue.use(ElementUI)
new Vue({
  render: h => h(App)
}).$mount('#app')
