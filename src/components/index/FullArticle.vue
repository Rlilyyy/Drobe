<template>
  <div class="home">
    <div class="main">
      <div class="item">
        <h2 class='title'>文章名称</h2>
        <vue-markdown id="wrapper">{{ content }}</vue-markdown>
      </div>
    </div>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import prism from 'prismjs'
require('../../css/prism.css')
require('../../css/markdown.css')
console.log(prism)

export default {
  name: 'Home',

  components: {
    VueMarkdown
  },

  data () {
    return {
      content: `> 饿了么二面是在线写代码，有三道题，一道题十分钟内写完提交，在一个网站写，会自动录制代码编写过程

1. 首先写了一个判断数组的函数

\`\`\`javascript
function isArray(array) {
  return !!array && Object.prototype.toString.call(array) === "[object Array]";
}
\`\`\`

\`\`\`javascript
function isArray(array) {
  return !!array && Object.prototype.toString.call(array) === "[object Array]";
}
\`\`\`
      `
    }
  },

  updated () {
    prism.highlightAll()
  }
}
</script>

<style scoped>
  .home {
    float: left;
    width: 100%;
    color: #3c3c3c;
    text-align: left;

    .main {
      margin-left: 300px;
      height: 100%;

      .item {
        margin: 30px 50px;
        border-radius: 20px;
        background-color: #fff;
        box-shadow: 0 10px 15px rgba(0, 0, 0, .1);
        padding: 20px;
        overflow: hidden;
        position: relative;

        .title {
          text-align: center;
        }
      }
    }
  }
</style>
