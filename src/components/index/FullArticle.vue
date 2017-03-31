<template>
  <div class="home">
    <div class="wrapper">
      <div class="main">
        <div class="page-title">
          <router-link :to="{ name: 'articlesWithTag', params: { tag: tag }}" v-for="tag in article.tags">
            <span class="tag">{{ tag }}</span>
          </router-link>
          <span class="time">创建于 {{ frontFormatDate(article.createTime) }}</span>
        </div>
        <h1 class='title'>{{ article.title }}</h1>
        <div id="wrapper" v-html="article.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import marked from 'marked'
import hljs from 'highlight.js'
import Store from '../../store.js'
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
      axios.get(`${Store.BASE_URL}/getArticle`, {
        params: {
          id: this.$route.params.id
        }
      }).then(res => {
        res.data.content = marked(res.data.content)
        this.article = res.data
      })
    },

    frontFormatDate (t) {
      let date = new Date(t)
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      return `${year}-${month < 10 ? 0 : ''}${month}-${day < 10 ? 0 : ''}${day}`
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

    .wrapper {
      margin-left: 300px;
      height: 100%;

      .main {
        margin: 30px 50px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;
        overflow: hidden;
        position: relative;

        .page-title {
          width: 100%;
          background-color: rgb(232, 232, 232);
          line-height: 56px;
          color: rgba(0, 0, 0, 0.4);
          font-size: 20px;
          padding-left: 24px;

          .tag {
            font-size: 14px;
            display: inline-block;
            height: 26px;
            line-height: 26px;
            padding: 0 15px;
            background-color: rgb(0, 171, 255);
            color: white;
            border-radius: 2px;
            box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;
            cursor: pointer;
            transition: background-color .3s ease;
            margin-right: 5px;

            &:hover {
              background-color: rgb(0, 151, 255);
            }

            &:active {
              background-color: rgb(0, 131, 255);
            }
          }

          .time {
            float: right;
            padding-right: 24px;
            font-size: 16px;
          }
        }

        .title {
          text-align: center;
        }

        #wrapper {
          padding: 20px 30px;
        }
      }
    }
  }
</style>
