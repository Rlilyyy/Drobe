<template>
  <div class="tag-view">
    <div class="wrapper">
      <div class="main">
        <div class="page-title">
          所有标签
        </div>
        <div class="tag-main">
          <router-link :to="{ name: 'articlesWithTag', params: { tag: tag }}" v-for="tag in tags">
            <span class="tag">{{ tag }}</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Store from '../../store.js'

export default {
  name: 'TagView',

  created () {
    this.getAllTags()
  },

  data () {
    return {
      tags: []
    }
  },

  methods: {
    getAllTags () {
      axios.get(`${Store.BASE_URL}/getAllTags`).then(response => {
        this.tags = response.data
      })
    }
  }
}
</script>

<style scoped>
  .tag-view {
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

        .tag-main {
          padding: 20px 30px 20px 30px;

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
            margin-bottom: 10px;

            &:hover {
              background-color: rgb(0, 151, 255);
            }

            &:active {
              background-color: rgb(0, 131, 255);
            }
          }
        }
      }
    }
  }
</style>
