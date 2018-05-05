import './scss/style.scss'
import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VueRouter from 'vue-router'
import App from './App.vue'
import Home from './components/Home.vue';
import Editor from './components/Editor.vue';


Vue.config.devtools = true
Vue.use(VueMaterial)
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
        path: '/login',
        component: Home
    },
    {
        path: '/editor',
        component: Editor,
        meta: { requiresAuth: true }
    }
  ],
});

router.beforeEach((to, from, next) => {
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  firebase.auth().onAuthStateChanged(user => {
    if (requiresAuth && !user) {
      return next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    }

    return next();
  });
})

new Vue({
  el: '#app',
  render: h => h(App),
  router,
})
