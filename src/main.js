// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Home from 'components/index/Home'
import FullArticle from 'components/index/FullArticle'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home },
  { path: '/FullArticle/:id', component: FullArticle, name: 'FullArticle' }
]

const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

// const app = new Vue({
//   router
// }).$mount('#app')

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  template: '<App/>',
  components: { App }
}).$mount('#app')
