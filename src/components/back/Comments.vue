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
              <th>评论内容</th>
              <th>昵称</th>
              <th>邮箱</th>
              <th>评论时间</th>
              <!-- <th>所属文章</th> -->
              <th>操作</th>
            </tr>
            <tr v-for="(comment, index) in comments" :key="comment.createTime">
              <td>{{ comment.content }}</td>
              <td>{{ comment.nickname }}</td>
              <td>{{ comment.email }}</td>
              <td>{{ frontFormatDate(comment.createTime) }}</td>
              <!-- <td>{{ article.title }}</td> -->
              <td>
                <button type="button" name="button" class="btn change-btn" v-if="!comment.pms" @click="passComment(comment)">审核通过</button>
                <button type="button" name="button" class="btn del-btn" @click="deleteComment(comment, index)">删除</button>
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
  name: 'Comments',

  created () {
    this.getUnpassComments()
  },

  data () {
    return {
      comments: []
    }
  },

  methods: {
    getUnpassComments () {
      axios.get(`${Store.BASE_URL}/getUnpassComments`).then(response => {
        this.comments = response.data
      })
    },

    passComment (comment) {
      axios.post(`${Store.BASE_URL}/commentPass`, {
        comment
      }).then(response => {
        comment.pms = true
      })
    },

    deleteComment (comment, index) {
      axios.post(`${Store.BASE_URL}/deleteComment`, {
        comment
      }).then(() => {
        this.comments.splice(index, 1)
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
                max-width: 150px;
              }

              td:nth-child(1) {
                word-wrap: break-word;
                word-break: break-all;
                white-space: normal;
                min-width: 150px;
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
