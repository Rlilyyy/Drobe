<template>
  <div class="sidebar">
    <avatar></avatar>
  </div>
</template>

<script>
  import Avatar from './Avatar'

  export default {
    name: 'SideBar',
    components: {
      Avatar
    }
  }
</script>

<style scoped>
  .sidebar {
    position: absolute;
    width: 300px;
    height: 100%;
    top: 0;
    left: 0;
    padding-top: 45px;
    background-color: #3e9dff;
  }
</style>
