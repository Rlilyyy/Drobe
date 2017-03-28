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
    box-shadow: rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px;
    background-color: #fff;
  }
</style>
