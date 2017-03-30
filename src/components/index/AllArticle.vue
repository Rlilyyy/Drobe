<template>
  <div class="all-article">
    <div class="wrapper">
      <div class="main">
        <div class="page-title">
          所有文章
        </div>
        <div class="title-main">
          <div class="title-item" v-for="titleItem in titleList" :key="titleItem._id">
            <div class="title">
              <router-link :to="{ name: 'fullArticle', params: { id: titleItem._id }}">
                《{{ titleItem.title }}》
              </router-link>
              <span class="tag" v-for="tag in titleItem.tags">{{ tag }}</span>
              <span class="create-time">创建于 {{ frontFormatDate(titleItem.createTime) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'AllArticle',

  created () {
    this.getAllTitle()
  },

  data () {
    return {
      titleList: []
    }
  },

  methods: {
    getAllTitle () {
      axios.get('http://localhost:3000/getArticlesTitle').then(response => {
        if (response.data.length > 3) {
          response.data.splice(0, response.data.length - 3)
        }
        this.titleList = response.data
      })
    },

    frontFormatDate (t) {
      let date = new Date(t)
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      return `${year}-${month < 9 ? 0 : ''}${month}-${day < 9 ? 0 : ''}${day}`
    }
  }
}
</script>

<style scoped>
  .all-article {
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

        .title-item:last-child {
          &:after {
            display: none;
          }
        }

        a {
          text-decoration: none;
          color: inherit;
        }

        .title-main {
          padding: 20px 30px 40px 30px;
        }

        .title-item {
          position: relative;
          height: 26px;
          line-height: 26px;
          padding-left: 38px;
          font-size: 18px;
          margin-top: 25px;

          .title {
            position: relative;
            padding-right: 185px;
            width: 100%;
            overflow: hidden;

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

            .create-time {
              position: absolute;
              right: 0;
              padding-right: 24px;
              font-size: 14px;
              color: rgba(0, 0, 0, 0.4);
            }
          }

          &:before {
            display: inline-block;
            content: '';
            width: 26px;
            height: 26px;
            border-radius: 50%;
            background-color: rgb(0, 171, 255);
            position: absolute;
            top: 0;
            left: 0;
          }

          &:after {
            display: inline-block;
            content: '';
            width: 2px;
            height: 25px;
            background-color: rgb(0, 171, 255);
            position: absolute;
            bottom: -25px;
            left: 12px;
          }
        }
      }
    }
  }
</style>
