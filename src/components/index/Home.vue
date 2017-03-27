<template>
  <div class="home">
    <div class="main">
      <div class="item" v-for="item in items">
        <h2 class='title'>{{ item.title }}</h2>
        <div id="wrapper" v-html="marked(item.content)"></div>
        <router-link :to="{ name: 'FullArticle', params: { id: item._id }}"><div class="shadow">阅读全文……</div></router-link>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import marked from 'marked'
import hljs from 'highlight.js'
require('highlight.js/styles/atom-one-dark.css')
require('../../css/markdown.css')

marked.setOptions({
  highlight: function (code, lang, callback) {
    return hljs.highlightAuto(code).value
  }
})

export default {
  name: 'Home',

  created () {
    this.getAllArticles()
  },

  data () {
    return {
      items: []
    }
  },

  methods: {
    getAllArticles () {
      axios.get('http://localhost:3000/getArticles').then(response => {
        response.data.pop()
        this.items = response.data
      })
    },

    marked
  }
}
</script>

<style scoped>
  .home {
    float: left;
    width: 100%;
    color: #3c3c3c;
    text-align: left;

    .main {
      margin-left: 300px;
      height: 100%;

      .item {
        height: 450px;
        margin: 30px 50px;
        border-radius: 20px;
        background-color: #fff;
        box-shadow: 0 10px 15px rgba(0, 0, 0, .1);
        padding: 20px;
        overflow: hidden;
        position: relative;

        .shadow {
          display: block;
          position: absolute;
          width: 100%;
          height: 130px;
          text-align: center;
          line-height: 160px;
          font-size: 22px;
          color: rgb(52, 95, 222);
          bottom: 0;
          left: 0;
          background: linear-gradient(to top, rgb(235, 229, 229) 15%, rgba(255, 255, 255, 0));
        }

        .title {
          text-align: center;
        }
      }
    }
  }
</style>
