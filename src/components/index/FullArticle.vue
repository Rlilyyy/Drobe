<template>
  <div class="home">
    <div class="main">
      <div class="item">
        <h2 class='title'>{{ article.title }}</h2>
        <div id="wrapper" v-html="article.content"></div>
      </div>
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
    this.getArticleById()
  },

  data () {
    return {
      article: {}
    }
  },

  methods: {
    getArticleById () {
      axios.get('http://localhost:3000/getArticle', {
        params: {
          id: this.$route.params.id
        }
      }).then(res => {
        res.data.content = marked(res.data.content)
        this.article = res.data
      })
    }
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
        margin: 30px 50px;
        border-radius: 20px;
        background-color: #fff;
        box-shadow: 0 10px 15px rgba(0, 0, 0, .1);
        padding: 20px;
        overflow: hidden;
        position: relative;

        .title {
          text-align: center;
        }
      }
    }
  }
</style>
