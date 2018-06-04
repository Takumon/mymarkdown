import { configure } from '@storybook/vue';

import Vue from 'vue';
import Vuex from 'vuex';
import vuescroll from 'vue-scroll'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import '../plugins/filters.js'

// Install Vue plugins.
Vue.use(Vuex);
Vue.use(VueMaterial)
Vue.use(vuescroll)


// コンポーネントを同階層にストーリを配置
const req = require.context('../stories', true, /\.story\.js$/)

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module);
