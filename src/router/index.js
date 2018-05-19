import Vue from 'vue'
import store from '../store'
import Router from 'vue-router'
import Login from '../components/Login.vue';
import Editor from '../components/Editor.vue';

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
        path: '/login',
        component: Login
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
    if (user) {
      store.dispatch('setLoginUser', user).then((() => {
        next()
      }))
    } else if (requiresAuth) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    } else {
      next()
    }
  });
})

export default router