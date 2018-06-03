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


function loadStories() {
  require('../stories');
}

configure(loadStories, module);
