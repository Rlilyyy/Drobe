<template>
  <div class="sidebar">
    <avatar></avatar>
    <el-menu></el-menu>
  </div>
</template>

<script>
  import Avatar from './Avatar'
  import ElMenu from './ElMenu'

  export default {
    name: 'SideBar',
    components: {
      Avatar,
      ElMenu
    }
  }
</script>

<style scoped>
  .sidebar {
    position: fixed;
    width: 300px;
    height: 100%;
    top: 0;
    left: 0;
    /*padding-top: 45px;*/
    box-shadow: 3px 0px 5px rgba(31, 31, 31, .5);
    background-color: #fff;
  }
</style>
