import { configure } from '@storybook/vue';

import Vue from 'vue';
import Vuex from 'vuex';
import vuescroll from 'vue-scroll'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import '../src/helpers/dateFormatFilter.js'


// Install Vue plugins.
Vue.use(Vuex);
Vue.use(VueMaterial)
Vue.use(vuescroll)


function loadStories() {
  require('../src/stories');
}

configure(loadStories, module);
