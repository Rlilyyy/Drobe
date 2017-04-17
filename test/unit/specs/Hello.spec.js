import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from 'src/components/index/Home'
import About from 'src/components/index/About'
import AllArticle from 'src/components/index/AllArticle'
import FullArticle from 'src/components/index/FullArticle'
import TagView from 'src/components/index/TagView'
import ChangeArticle from 'src/components/back/ChangeArticle'
import CreateArticle from 'src/components/back/CreateArticle'
import Login from 'src/components/back/Login'
import ViewArticles from 'src/components/back/ViewArticles'

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

Vue.use(VueRouter)

describe('App.vue', () => {
  it('should have component About', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(About)
    })

    expect(vm).to.not.be.null;
  })

  it('should have component AllArticle', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(AllArticle)
    })

    expect(vm).to.not.be.null;
  })

  it('should have component FullArticle', () => {
    const vm = new Vue({
      router,
      el: document.createElement('div'),
      render: (h) => h(FullArticle)
    })

    expect(vm).to.not.be.null;
  })

  it('should have component Home', () => {
    const vm = new Vue({
      router,
      el: document.createElement('div'),
      render: (h) => h(Home)
    })

    expect(vm).to.not.be.null;
  })

  it('should have component TagView', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(TagView)
    })

    expect(vm).to.not.be.null;
  })

  it('should have component ChangeArticle', () => {
    const vm = new Vue({
      router,
      el: document.createElement('div'),
      render: (h) => h(ChangeArticle)
    })

    expect(vm).to.not.be.null;
  })

  it('should have component CreateArticle', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(CreateArticle)
    })

    expect(vm).to.not.be.null;
  })

  it('should have component Login', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Login)
    })

    expect(vm).to.not.be.null;
  })

  it('should have component ViewArticles', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(ViewArticles)
    })

    expect(vm).to.not.be.null;
  })
})
