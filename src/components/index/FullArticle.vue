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

        <div class="comment">
          <div class="comment-title">
            评论区
          </div>
          <ul class="comment-ul">
            <li v-for="(comment, index) in article.comments" v-if="comment.pms">
              <div class="comment-name">
                <div class="clearfix floor">
                  第{{index + 1}}楼
                </div>
                {{comment.nickname}} {{frontFormatDate(comment.createTime)}}
              </div>
              <div class="comment-content">
                {{comment.content}}
              </div>
            </li>
            <li class="comment-control">
              <div>
                <textarea name="name" rows="3" class="new-comment" placeholder="请输入评论内容" v-model="content"></textarea>
              </div>
              <div>
                <input type="text" name="nickname" value="" placeholder="请输入你的昵称" v-model="nickname">
              </div>
              <div>
                <input type="email" name="email" value="" placeholder="请输入你的邮箱" v-model="email">
              </div>
              <div>
                <button type="button" name="submit" @click="comment">评论</button>
                <span style="font-size: 14px;color: gray;">(评论需要经过审核才会显示哦~)</span>
                <span style="font-size: 14px;color: red;" v-if="commentUnFinish">昵称/邮箱/评论未填写！</span>
              </div>
            </li>
          </ul>
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
    this.getArticleById()
  },

  data () {
    return {
      article: {},
      content: '',
      nickname: '',
      email: '',
      commentUnFinish: false
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

    comment () {
      if (this.content === '' || this.nickname === '' || this.email === '') {
        this.commentUnFinish = true
        return false
      }

      axios.post(`${Store.BASE_URL}/comment`, {
        id: this.$route.params.id,
        content: this.content,
        nickname: this.nickname,
        email: this.email
      }).then(res => {
        this.content = ''
        this.nickname = ''
        this.email = ''
        this.commentUnFinish = false
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

        .comment {
          margin: 0 25px;
          .comment-title {
            padding: 0 15px;
          }

          .comment-ul {
            list-style: none;
            border-top: 1px solid rgb(213, 213, 213);
            margin: 5px 0 25px 0;

            li {
              padding: 15px 10px;
              border-bottom: 1px solid rgb(213, 213, 213);
            }

            .comment-control {
              .new-comment {
                border: 1px solid rgb(228, 228, 228);
                transition: border-color .3s ease;
                outline: none;
                width: 100%;
                resize: none;
                border-radius: 2px;
                padding: 15px;
                font-size: 14px;

                &:focus {
                  border-color: rgb(0, 171, 255);
                }
              }

              input {
                border: 1px solid rgb(228, 228, 228);
                transition: border-color .3s ease;
                outline: none;
                width: 200px;
                resize: none;
                border-radius: 2px;
                padding: 5px;
                font-size: 14px;
                margin-bottom: 10px;

                &:focus {
                  border-color: rgb(0, 171, 255);
                }
              }

              button {
                border: none;
                background-color: rgb(0, 171, 255);
                padding: 5px 15px;
                color: white;
                border-radius: 2px;
                box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;
                cursor: pointer;
                outline: none;
                transition: background-color .3s ease;

                &:hover {
                  background-color: rgb(0, 151, 255);
                }

                &:active {
                  background-color: rgb(0, 131, 255);
                }
              }
            }

            .comment-name {
              font-size: 14px;
              color: gray;

              .floor {
                float: right;
              }
            }

            .comment-content {
              font-size: 16px;
              margin-top: 5px;
            }
          }
        }
      }
    }
  }
</style>
