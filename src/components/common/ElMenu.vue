<template>
  <div class="menu">
    <ul class="menu-ul">
      <a href="#">
        <li class='cur'>
          <div>主页 | PAGE</div>
        </li>
      </a>
      <a href="https://ameizi.libinhong.com" target="_blank">
        <li>
          <div>福利 | FULI</div>
        </li>
      </a>
      <a href="https://ameizi.libinhong.com" target="_blank">
        <li>
          <div>听听音乐 | MUSIC</div>
        </li>
      </a>
      <a href="#">
        <li>
          <div>所有文章 | ALL</div>
        </li>
      </a>
      <a href="#">
        <li>
          <div>关于我 | ABOUT</div>
        </li>
      </a>
    </ul>

    <div class="icons">
      <a href="http://weibo.com/u/1883893572?is_all=1" target="_blank" title="微博"><svg><use xlink:href="#weibo"/></svg></a>
      <a href="https://twitter.com/binbinhehonhon" target="_blank" title="推特"><svg><use xlink:href="#twitter"/></svg></a>
      <a href="https://github.com/Rlilyyy" target="_blank" title="Github"><svg><use xlink:href="#github"/></svg></a>
      <a href="mailto:bingohlee@gmail.com" target="_blank" title="Gmail邮箱"><svg><use xlink:href="#gmail"/></svg></a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ElMenu',
    data: () => {
      return {
        weiboIcon: require('../../assets/weibo.svg'),
        twitterIcon: require('../../assets/twitter.svg'),
        githubIcon: require('../../assets/github.svg'),
        gmailIcon: require('../../assets/gmail.svg')
      }
    }
  }
</script>

<style scoped>
  .menu {
    width: 100%;
    margin-top: 15px;

    .menu-ul {
      text-decoration: none;
      list-style: none;

      a {
        text-decoration: none;
        color: inherit;
      }

      li {
        position: relative;
        width: 100%;
        height: 50px;
        line-height: 50px;
        padding: 0 50px;
        color: #3c3c3c;
        font-size: 14px;
        text-align: left;
        border-left: 5px solid #fff;
        border-right: 5px solid #fff;
        transition: border .3s ease;

        &:hover {
          border-left: 5px solid rgb(0, 171, 255);
          border-right: 5px solid rgb(0, 171, 255);
          color: rgb(0, 171, 255);
        }
      }

      .cur {
        border-left: 5px solid rgb(0, 171, 255);
        border-right: 5px solid rgb(0, 171, 255);
        color: rgb(0, 171, 255);
      }
    }

    .icons {
      position: absolute;
      width: 100%;
      bottom: 50px;

      svg {
        display: inline-block;
        width: 30px;
        height: 30px;
        margin: 0 10px;
      }
    }
  }
</style>
