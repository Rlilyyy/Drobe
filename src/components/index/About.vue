<template>
  <div class="about">
    <div class="wrapper">
      <div class="main">
        <h3>声明</h3>
        <p>本站所有文章皆为本人原创，参考或引用文献资料均在文章最后有说明，本站作为个人学习之用，与其他人或组织无关 </p>
        <h3>个人介绍</h3>
        <p>以前喜欢玩前端，后来喜欢玩 JavaScript，再后来感觉“前端救不了前端”，又喜欢上了玩 Web 相关的技术，像素级细节控，强迫症患者，极度喜欢猫~\(≧▽≦)/~</p>
        <p>如果想和我聊聊天，那么可以通过以下的方式联系我</p>
        <p>
          <ul class="chat-list">
            <li><a href="http://weibo.com/u/1883893572?is_all=1">微博</a></li>
            <li><a href="https://twitter.com/binbinhehonhon">推特</a></li>
            <li><a href="mailto:bingohlee@gmail.com">Gmail邮箱</a></li>
          </ul>
        </p>
        <h3>关于其他</h3>
        <p>暂时没有其他东西，以后想到什么写什么O(∩_∩)O哈哈~</p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>
  .about {
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

        .chat-list {
          padding-left: 25px;
        }
      }
    }
  }
</style>
