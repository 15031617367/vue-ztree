// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import $ from "jquery"
// import "../plugins/jquery-1.4.4.min.js"
// import'../plugins/zTreeStyle.css'
import "../plugins/jquery.ztree.core.js"
import "../plugins/jquery.ztree.excheck.js"
import"../plugins/jquery.ztree.all.js"
import"../plugins/jquery.ztree.exedit.js"
import"../plugins/jquery.ztree.exhide"
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
