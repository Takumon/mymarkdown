import './scss/style.scss'
import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import App from './App.vue'
import './helpers/dateFormatFilter.js'
import router from './router'
import store from './store'


Vue.config.devtools = true
Vue.use(VueMaterial)

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
