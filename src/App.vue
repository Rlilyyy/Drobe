<template>
  <div id="app" class="clearfix">
    <!-- <nav-bar></nav-bar> -->
    <side-bar></side-bar>
  </div>
</template>

<script>
// import NavBar from 'components/common/NavBar'
import SideBar from 'components/common/SideBar'

export default {
  name: 'app',
  components: {
    // NavBar,
    SideBar
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  background-color: #fff;
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
