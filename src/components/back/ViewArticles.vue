<template>
  <div class="view-articles">
    <div class="wrapper">
      <div class="main">
        <div class="page-title">
          浏览文章
        </div>
        <div class="view-main">
          <table class="view-table">
            <tr>
              <th>文章标题</th>
              <th>创建时间</th>
              <th>操作</th>
            </tr>
            <tr v-for="(article, index) in articles" :key="article._id">
              <td>{{ article.title }}</td>
              <td>{{ frontFormatDate(article.createTime) }}</td>
              <td>
                <router-link :to="{ name: 'fullArticle', params: { id: article._id }}">
                  <button type="button" name="button" class="btn view-btn">查看</button>
                </router-link>
                <router-link :to="{ name: 'changeArticle', params: { id: article._id }}">
                  <button type="button" name="button" class="btn change-btn">修改</button>
                </router-link>
                <button type="button" name="button" class="btn del-btn" @click="deleteArticle(article._id, index)">删除</button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Store from '../../store.js'

export default {
  name: 'ViewArticles',

  created () {
    this.getArticlesInfo()
  },

  data () {
    return {
      articles: []
    }
  },

  methods: {
    getArticlesInfo () {
      axios.get(`${Store.BASE_URL}/back/getArticlesInfo`).then(response => {
        if (response.data === 'no login') {
          this.$router.push({name: 'login'})
        }
        this.articles = response.data
      })
    },

    deleteArticle (id, index) {
      axios.get(`${Store.BASE_URL}/back/deleteArticle`, {
        params: {
          id
        }
      }).then(() => {
        this.articles.splice(index, 1)
      })
    },

    frontFormatDate (t) {
      if (!t) return
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
  .view-articles {
    width: 100%;
    float: left;
    color: #3c3c3c;

    .wrapper {
      margin-left: 300px;

      .main {
        margin: 30px 50px;
        background-color: white;
        border-radius: 2px;
        box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;
        text-align: left;

        .page-title {
          width: 100%;
          background-color: rgb(232, 232, 232);
          line-height: 56px;
          color: rgba(0, 0, 0, 0.4);
          font-size: 20px;
          padding-left: 24px;
        }

        .view-main {
          padding: 20px 30px 40px 30px;

          .view-table {
            width: 100%;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.4);
            border-collapse: collapse;

            tr {
              border-bottom: 1px solid rgb(228, 228, 228);

              td, th {
                padding: 15px 25px;
                font-weight: normal;
              }

              td {
                color: #3c3c3c;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }

              &:last-child {
                border-bottom: none;
              }

              .btn {
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

              .del-btn {
                background-color: rgb(235, 60, 60);

                &:hover {
                  background-color: rgb(215, 60, 60);
                }

                &:active {
                  background-color: rgb(175, 60, 60);
                }
              }
            }
          }
        }
      }
    }
  }
</style>
