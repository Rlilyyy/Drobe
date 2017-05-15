<template lang="html">
  <div class="archiving">
    <div class="wrapper">
      <div class="main">
        <div class="page-title">
          归档
        </div>
        <div class="archiving-main">
          <ul class="article-title" v-for="articles in items">
            <li class="date">{{ articles[0].year }}年{{ articles[0].month }}月</li>
            <li v-for="article in articles" :key="article._id">
              <router-link :to="{ name: 'fullArticle', params: { id: article._id }}">
                <span class="title">{{ article.title }}</span>
                <span class="createTime">({{ frontFormatDate(article.createTime) }})</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import Store from '../../store.js'

export default {
  name: 'Archiving',

  created () {
    setTimeout(this.getAllArticles, 0)
  },

  data () {
    return {
      items: []
    }
  },

  methods: {
    getAllArticles () {
      axios.get(`${Store.BASE_URL}/getArticles`).then(response => {
        let items = []
        let flag = {}

        for (let idx = 0; idx < response.data.length; idx++) {
          let tempDate = new Date(response.data[idx].createTime)
          let year = tempDate.getFullYear()
          let month = tempDate.getMonth() + 1

          if (flag[year + '' + month] === undefined) {
            flag[year + '' + month] = items.length
            items[flag[year + '' + month]] = []
          }

          response.data[idx].year = year
          response.data[idx].month = month
          items[flag[year + '' + month]].push(response.data[idx])
        }
        this.items = items
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

<style lang="css">
.archiving {
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

      .archiving-main {
        padding: 20px 30px 40px 30px;

        .date {
          list-style: none;
          font-size: 22px;
          color: black;
          margin-bottom: 10px;
          margin-top: 10px;
        }

        li .title {
          color: rgb(0, 171, 255);
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }

        li a {
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }

        .article-title {
          margin-left: 20px;
        }

        .createTime {
          color: gray;
          font-size: 14px;
        }
      }

      .chat-list {
        padding-left: 25px;
      }
    }
  }
}
</style>
