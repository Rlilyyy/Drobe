<template>
  <div class="create">
    <div class="wrapper">
      <div class="main">
        <div class="page-title">
          新建文章
        </div>
        <div class="create-main clearfix">
          <div class="field-item">
            <p>文章标题</p>
            <input type="text" class="title" name="title" placeholder="请输入文章标题" autocomplete="off" v-model="title">
          </div>
          <div class="field-item">
            <p>创建时间</p>
            <input type="date" class="create-time" name="createTime" placeholder="请输入创建时间" autocomplete="off" v-model="createTime">
          </div>
          <div class="field-item">
            <p>文章标签</p>
            <input type="text" name="tags" placeholder="请输入文章标签" autocomplete="off" v-model="tags">
          </div>
          <div class="field-item">
            <p>文章内容</p>
            <textarea name="content" class="content" v-model="content"></textarea>
          </div>
          <div class="btn-item">
            <button type="button" name="submit" class="init" @click="init">初始化</button>
            <button type="button" name="submit" @click="createArticle">创建文章</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'CreateArticle',

  data () {
    return {
      title: '',
      createTime: '',
      tags: '',
      content: ''
    }
  },

  methods: {
    createArticle () {
      axios.post('http://localhost:3000/saveArticle', {
        title: this.title,
        createTime: new Date(this.createTime).getTime(),
        tags: this.tags.split('|'),
        content: this.content
      }).then(response => {
        console.log('ok')
      })
    },

    init () {
      this.title = ''
      this.createTime = ''
      this.tags = ''
      this.content = ''
    }
  }
}
</script>

<style scoped>
.create {
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

      .create-main {
        padding: 20px 30px 40px 30px;

        .field-item {
          margin-bottom: 35px;

          input {
            border: none;
            outline: none;
            border-bottom: 1px solid rgb(228, 228, 228);
            width: 300px;
            transition: border-color .3s ease;
            font-size: 14px;
            padding: 0 10px;
            padding-bottom: 5px;

            &:focus {
              border-color: rgb(0, 171, 255);
            }
          }

          .content {
            border-color: rgb(228, 228, 228);
            transition: border-color .3s ease;
            outline: none;
            width: 100%;
            min-height: 500px;
            resize: none;
            border-radius: 2px;
            padding: 15px;
            font-size: 14px;

            &:focus {
              border-color: rgb(0, 171, 255);
            }
          }
        }

        .btn-item {
          float: right;

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

          .init {
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
</style>
