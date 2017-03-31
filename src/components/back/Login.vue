<template>
  <div class="login">
    <div class="wrapper">
      <div class="main">
        <div class="field-item">
          <input type="text" name="username" placeholder="请输入用户名" autocomplete="off" v-model="username">
        </div>
        <div class="field-item">
          <input type="password" name="password" placeholder="请输入密码" autocomplete="off" v-model="password">
        </div>
        <div class="btn-item">
          <button type="button" name="submit" @click="login">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Store from '../../store.js'
export default {
  name: 'Login',

  data () {
    return {
      username: '',
      password: ''
    }
  },

  methods: {
    login () {
      if (this.username === '' || this.password === '') return

      axios.post(`${Store.BASE_URL}/login`, {
        username: this.username,
        password: this.password
      }).then(response => {
        if (response.data === 'no such user' || response.data === 'password incorrect') {
          this.$router.push({name: 'login'})
          return
        }
        this.$router.push({name: 'viewArticles'})
      })
    }
  }
}
</script>

<style scoped>
  .login {
    width: 100%;
    height: 100%;
    float: left;
    color: #3c3c3c;

    .wrapper {
      margin-left: 300px;
      height: 100%;
      position: relative;

      .main {
        height: 200px;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;

        .field-item {
          margin-bottom: 35px;

          input {
            border: none;
            outline: none;
            border-bottom: 1px solid rgb(228, 228, 228);
            width: 300px;
            transition: border-color .3s ease;
            font-size: 14px;
            padding: 0 10px;
            padding-bottom: 5px;

            &:focus {
              border-color: rgb(0, 171, 255);
            }
          }
        }

        .btn-item {

          button {
            border: none;
            background-color: rgb(0, 171, 255);
            padding: 5px 15px;
            color: white;
            border-radius: 2px;
            box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;
            cursor: pointer;
            outline: none;
            transition: background-color .3s ease;

            &:hover {
              background-color: rgb(0, 151, 255);
            }

            &:active {
              background-color: rgb(0, 131, 255);
            }
          }
        }
      }
    }
  }
</style>
