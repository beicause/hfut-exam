<template>
  <body id="poster">
    <h2 class="All-title">WMS管理系统</h2>

    <el-form class="login-container" label-position="left" label-width="0px">
      <h1 class="login_title">系统登录</h1>
      <el-form-item>
        <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号/手机号"></el-input>
      </el-form-item>

      <el-form-item>
        <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码" @keyup.enter.native="login"></el-input>
      </el-form-item>

      <el-form-item style="width: 100%">
        <el-button type="primary" style="width: 100%;background: #505458;border: none" @click="login" @keyup.enter.native="login">登录</el-button>
        <router-link to="/register">没有账号？</router-link>
      </el-form-item>
    </el-form>
  </body>
</template>

<script>
import Qs from 'qs'

export default {
    name: "Login",
    data() {
        return {
            toastInstance: null,
            loginForm: {
                username: '',
                password: ''
            },
            responseResult: []
        }
    },
    methods: {
      getList(str, time){//设置一个延时器,模拟获取列表的Ajax方法
            //在数据获取到之前，弹出Toast提示用户，正在加载数据
            this.show(str, time)
            setTimeout(() => {
                //一段时间过后，数据获取回来了，要把Toast移出
                // this.toastInstance.close()
            }, time);
        },
      show(str, time) {
            this.toastInstance = Toast({
                message: str,
                duration: time, //如果是-1，弹出之后不会消失
                position: 'top',
                iconClass: 'glyphicon glyphicon-heart',
                className: 'myToast'  //在css中编写样式
            });
        },
      login() {
          this.getList("正在登陆", 10000); //显示等待层
          this.$axios({
              url: 'http://101.200.216.229:8000/users/login/',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
              method: 'post',
              data: {
                username: this.loginForm.username,
                pwd: this.loginForm.password
              },
              transformRequest: [function (data) {
                data = Qs.stringify(data);
                return data;
            }],
          })
          .then(successResponse => {//successResponse.data.code
              this.toastInstance.close(); //关闭等待层
              this.$router.replace({path: '/home'});
              this.$notify({
                  title: '提示',
                  message: '用户登录成功',
                  duration: 3000
              });
          })
          .catch(failResponse => {
            this.toastInstance.close(); //关闭等待层
            this.getList("登录失败", 1000);
            console.log(failResponse)
          })
        }
    }
}
</script>

<style>
.All-title{
  color:coral;
  font-size: 25px;
  margin-left: 110px;
  margin-top: 40px;
  /* margin: auto 0; */
}
#poster {
  /* background:url("../images/") no-repeat; */
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}
body{
  margin: 0;
  padding: 0;
}

.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login_title {
  margin: 0 auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>
