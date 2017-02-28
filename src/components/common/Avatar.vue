<template>
  <div class="avatar">
    <div class="avatar-img-wrapper">
      <div class="avatar-img">

      </div>
    </div>
    <div class="avatar-name">
      <span>longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglong name</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SideBar'
  }
</script>

<style scoped>
  .avatar {
    width: 100%;

    .avatar-img-wrapper {
        width: 100%;
        text-align: center;

        .avatar-img {
          display: inline-block;
          width: 80px;
          height: 80px;
          border: 5px solid rgba(205, 205, 205, .5);
          border-radius: 50%;
          background-color: rgb(210, 182, 210);
        }
    }

    .avatar-name {
      max-width: 100%;
      color: white;
      text-align: center;
      margin-top: 15px;
      padding: 0 15px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
</style>
