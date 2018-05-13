import './scss/style.scss'
import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import App from './App.vue'
import Home from './components/Home.vue';
import Editor from './components/Editor.vue';
import './helpers/dateFormatFilter.js'
import router from './router'


Vue.config.devtools = true
Vue.use(VueMaterial)

new Vue({
  el: '#app',
  render: h => h(App),
  router,
})
