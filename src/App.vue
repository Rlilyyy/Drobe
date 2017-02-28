<template>
  <div id="app">
    <nav-bar></nav-bar>
    <side-bar></side-bar>
  </div>
</template>

<script>
import NavBar from './components/common/NavBar'
import SideBar from './components/common/SideBar'

export default {
  name: 'app',
  components: {
    NavBar,
    SideBar
  }
}
</script>

<style>
* {
  box-sizing: border-box;
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
</style>
