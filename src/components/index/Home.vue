<template>
  <div class="home">
    <div class="wrapper">
      <div class="main" v-for="item in items" :key="item._id">
        <div class="page-title">
          <router-link :to="{ name: 'articlesWithTag', params: { tag: tag }}" v-for="tag in item.tags">
            <span class="tag">{{ tag }}</span>
          </router-link>
          <!-- <span class="tag" v-for="tag in item.tags">{{ tag }}</span> -->
          <span class="time">创建于 {{ frontFormatDate(item.createTime) }}</span>
        </div>
        <h1 class='title'>{{ item.title }}</h1>
        <div class="list-main">
          <div id="wrapper" v-html="marked(item.content)"></div>
          <div class="shadow">
            <router-link :to="{ name: 'fullArticle', params: { id: item._id }}">
              <span class="read-btn">阅读全文</span>
            </router-link>
          </div>
        </div>
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
    if (this.$route.name === 'index') {
      this.getAllArticles()
    } else {
      this.getArticlesByTag()
    }
  },

  data () {
    return {
      items: []
    }
  },

  methods: {
    getAllArticles () {
      axios.get(`${Store.BASE_URL}/getArticles`).then(response => {
        this.items = response.data.splice(0, 5)
      })
    },

    getArticlesByTag () {
      axios.get(`${Store.BASE_URL}/getArticlesByTag`, {
        params: {
          tag: this.$route.params.tag
        }
      }).then(response => {
        this.items = response.data
      })
    },

    marked,

    frontFormatDate (t) {
      let date = new Date(t)
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      return `${year}-${month < 10 ? 0 : ''}${month}-${day < 10 ? 0 : ''}${day}`
    }
  },

  watch: {
    '$route' () {
      this.items = []
      if (this.$route.name === 'index') {
        this.getAllArticles()
      } else {
        this.getArticlesByTag()
      }
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
        height: 450px;
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

        .list-main {
          padding: 20px 30px;

          .shadow {
            display: block;
            position: absolute;
            width: 100%;
            height: 100px;
            text-align: center;
            line-height: 120px;
            font-size: 22px;
            color: rgb(0, 171, 255);
            bottom: 0;
            left: 0;
            background: linear-gradient(to top, rgb(232, 232, 232) 35%, rgba(255, 255, 255, 0));

            .read-btn {
              font-size: 16px;
              display: inline-block;
              height: 30px;
              line-height: 30px;
              padding: 0 15px;
              background-color: rgb(0, 171, 255);
              color: white;
              border-radius: 2px;
              box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;
              cursor: pointer;
              transition: background-color .3s ease;

              &:hover {
                background-color: rgb(0, 151, 255);
              }

              &:active {
                background-color: rgb(0, 131, 255);
              }
            }
          }
        }

        .title {
          text-align: center;
        }
      }
    }
  }
</style>
