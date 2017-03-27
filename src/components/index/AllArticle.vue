<template>
  <div class="all-article">
    <div class="wrapper">
      <div class="main">
        <div class="title-item" v-for="titleItem in titleList" :key="titleItem._id">
          <router-link :to="{ name: 'fullArticle', params: { id: titleItem._id }}"><div class="shadow">《{{ titleItem.title }}》</div></router-link>
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
        border-radius: 20px;
        box-shadow: 0 10px 15px rgba(0, 0, 0, .1);
        padding: 20px 30px 40px 30px;
        text-align: left;

        .title-item:last-child {
          &:after {
            display: none;
          }
        }

        a {
          text-decoration: none;
          color: inherit;
        }

        .title-item {
          position: relative;
          height: 26px;
          line-height: 26px;
          padding-left: 38px;
          font-size: 18px;
          margin-top: 25px;

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
