// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Home from 'components/index/Home'
import FullArticle from 'components/index/FullArticle'
import AllArticle from 'components/index/AllArticle'
import About from 'components/index/About'
import TagView from 'components/index/TagView'
import ChangeArticle from 'components/back/ChangeArticle'
import CreateArticle from 'components/back/CreateArticle'
import ViewArticles from 'components/back/ViewArticles'
import Login from 'components/back/Login'
import axios from 'axios'

Vue.use(VueRouter)
axios.defaults.withCredentials = true

const routes = [
  { path: '/', component: Home, name: 'index' },
  { path: '/articles/:tag', component: Home, name: 'articlesWithTag' },
  { path: '/fullArticle/:id', component: FullArticle, name: 'fullArticle' },
  { path: '/allArticle', component: AllArticle, name: 'allArticle' },
  { path: '/about', component: About, name: 'about' },
  { path: '/tagView', component: TagView, name: 'tagView' },

  { path: '/back/login', component: Login, name: 'login' },
  { path: '/back', redirect: '/back/viewArticles' },
  { path: '/back/viewArticles', component: ViewArticles, name: 'viewArticles' },
  { path: '/back/createArticle', component: CreateArticle, name: 'createArticle' },
  { path: '/back/changeArticle/:id', component: ChangeArticle, name: 'changeArticle' }
]

const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  template: '<App/>',
  components: { App }
})
