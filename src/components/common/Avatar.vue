<template>
  <div class="avatar">
    <div class="avatar-img-wrapper">
      <div class="avatar-img"></div>
      <div class="avatar-name">
        <div class="en-name">Rlily Lee</div>
        <div class="cn-name">李滨泓</div>
      </div>
    </div>

    <div class="avatar-shadow"></div>
  </div>
</template>

<script>
  export default {
    name: 'Avatar'
  }
</script>

<style scoped>
  .avatar {
    position: relative;
    width: 100%;
    height: 200px;
    background-color: rgb(214, 214, 214);
    background-image: url('../../assets/back.jpg');
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;

    .avatar-img-wrapper {
        position: relative;
        width: 100%;
        text-align: left;
        overflow: hidden;
        padding-left: 10px;
        top: 30px;

        .avatar-img {
          display: inline-block;
          width: 80px;
          height: 80px;
          border: 5px solid rgb(217, 217, 217);
          border-radius: 50%;
          background-color: rgb(214, 214, 214);
          background-image: url('../../assets/avatar2.jpg');
          background-size: 100% 100%;
          background-position: center;
          background-repeat: no-repeat;
        }


    }

    .avatar-name {
      position: absolute;
      top: 10px;
      left: 0;
      width: 100%;
      padding: 10px 0 0 100px;

      .en-name,
      .cn-name {
        max-width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      .en-name {
        font-size: 20px;
        color: #fff;
      }

      .cn-name {
        font-size: 14px;
        color: #ffffff;
      }
    }

    .avatar-shadow {
      position: absolute;
      width:0;
      height:0;
      left: 0;
      bottom: 0;
      border-width: 20px 150px;
      border-style:solid;
      border-color: transparent transparent #ffffff #ffffff;
    }
  }
</style>
