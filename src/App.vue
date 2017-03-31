<template>
  <div id="app" class="clearfix">
    <!-- <nav-bar></nav-bar> -->
    <side-bar></side-bar>
    <!-- <home></home> -->
    <!-- <full-article></full-article> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import NavBar from 'components/common/NavBar'
import SideBar from 'components/common/SideBar'
// import Home from 'components/index/Home'
// import FullArticle from 'components/index/FullArticle'

export default {
  name: 'app',
  components: {
    // NavBar,
    SideBar
    // Home
    // FullArticle
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

html, body {
  height: 100%;
}

body {
  margin: 0 !important;
  padding: 0;
  min-width: 1200px;
}

ul, li {
    margin: 0;
    padding: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #409fff;
  /*background-color: #dde3ea;*/
  height: 100%;
}

.clearfix {
  *zoom: 1;

  &:before,
  &:after {
    content: '';
    display: table;
  }

  &:after {
    clear: both;
  }
}
</style>
