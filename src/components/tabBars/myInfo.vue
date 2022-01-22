<template>
  <div>
    <div class="after-login" v-if="isLogin">
      <img class="backgr" src="../../assets/pic.jpg" alt />
      <!-- 头像 -->
      <div class="img-bar">
        <img class="ba" src="../../assets/QQ.png" alt />
      </div>
      <div class="name">
        <span style="font-size: 22px;">{{ name }}</span>
        <span style="font-size: 14px; margin-top: 2px;">&nbsp;老师</span>
      </div>
      <!-- 调课安排，修改信息等 -->
      <div class="note">
        <ul class="note1">
          <li class="note-item blue" @click="$router.push('/me/changePassword')">
            <icon icon="ri:lock-password-line" class="icon-size"></icon>
            <span>修改密码</span>
          </li>
          <li class="note-item blue" @click="_logout">
            <icon icon="carbon:logout" class="icon-size"></icon>
            <span>退出登录</span>
          </li>
        </ul>

        <ul class="note1"></ul>
      </div>
    </div>

    <div class="before-login" v-if="!isLogin">
      <img src="../../assets/xiaohui.jpg" alt />
      <div class="intput">
        <el-input v-model="account" placeholder="工号或姓名">
          <i slot="prefix" class="el-input__icon el-icon-user"></i>
        </el-input>

        <el-input v-model="password" show-password placeholder="请输入密码">
          <i slot="prefix" class="el-input__icon el-icon-lock"></i>
        </el-input>
      </div>
      <div class="button_sumbit">
        <button class="submit" @click="submit()">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Qs from 'qs';
import { host, getTeacherInfo, logout } from '../../common/network.js'
import store from '../../store/index.js';
import tabBar from './tabBar.vue'
import { Icon } from '@iconify/vue2'
import { MessageBox } from 'mint-ui';

export default {
  components: { tabBar, Icon },
  data() {
    return {
      isLogin: false,
      account: "",
      password: "",
      name: "",
    }
  },
  mounted() {
    // localStorage.clear();
    // 判断登录状态
    if (localStorage.token) {
      this.isLogin = true;
      this.name = localStorage.name;
      store.dispatch('getMyInvigilate')
    } else {
      this.isLogin = false;
    }
  },
  methods: {
    submit() {
      if (this.account === "" || this.password === "") {
        this.$notify({
          title: '',
          message: '缺少必传参数',
          type: 'error'
        });
        return;
      }

      // 登录
      axios({
        url: host.ip + '/login',
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        data: {
          workId: this.account,
          password: this.password,
        },
        transformRequest: [function (data) {
          data = Qs.stringify(data);
          return data;
        }],
      }).then(suc => {
        if (suc.data.code === 0) {
          this.$notify({
            title: '',
            message: '登录成功',
            type: 'success'
          });
          // 存储用户登录信息
          // sessionStorage.clear();
          // localStorage.clear();
          localStorage.token = suc.data.data.token;
          // 获取老师的信息
          this._getTeacherInfo();
          // 修改登录状态
          this.isLogin = true;
          store.dispatch('getMyInvigilate')
        } else {
          this.$notify({
            title: '',
            message: '登录失败',
            type: 'error'
          });
        }
      }).catch(fail => {
        this.$notify({
          title: '',
          message: '登录失败了',
          type: 'error'
        });
      })
    },

    _getTeacherInfo() {
      let token = localStorage.token;
      getTeacherInfo(token).then(res => {
        if (res.data.code === 0) {
          this.name = res.data.data.name
          localStorage.name = this.name
        } else {
          this.$notify({
            title: '',
            message: '获取教师信息失败',
            type: 'error'
          })
        }
      }).catch(fail => {
        this.$notify({
          title: '',
          message: '获取老师信息失败',
          type: 'error'
        });
      })
    },
    _logout() {
      MessageBox.confirm('确定退出登录吗？').then(action => {
        logout()
        this.$notify({
          message: '退出成功',
          type: 'success'
        })
        this.isLogin = false
      }).catch(e=>{})
    }
  }
}

</script>

<style scoped>
.button_sumbit {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.submit {
  color: white;
  border-radius: 20px;
  height: 35px;
  width: 240px;
  background: linear-gradient(to left, #df013a, #df3a01); /* 标准的语法 */
}

.el-input__icon {
  margin-top: -7px;
}

.intput {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}

.el-input {
  /* width: 70%; */
  width: 250px;
  margin: 5pt auto;
}

.note-item {
  width: 23%;
  /* background: green; */
  height: 100%;
  line-height: 30px;
  text-align: center;
  padding-top: 15px;
}

.note-item i {
  font-size: 25px;
  color: #58acfa;
}

.note-item span {
  font-size: 14px;
  display: block;
  margin-top: -2px;
}

.note {
  /* background: red; */
  width: 95%;
  height: 160px;
  margin: 5px auto;
  /*border-radius: 14px;*/
  /* display: flex;
  justify-content:space-around; */
  border-radius: 10px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.note1 {
  /* background: red; */
  width: 100%;
  height: 80px;
  margin: 5px auto;
  /*border-radius: 14px;*/
  display: flex;
  justify-content: space-around;
  border-radius: 10px;
  background: #fff;
  /* border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6; */
}

.name {
  width: 100%;
  height: 50px;
  line-height: 50px;
  /* background: red; */
  display: flex;
  justify-content: center;
}

.backgr {
  width: 100%;
  height: 180px;
  z-index: -1;
}

.img-bar {
  width: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
  margin-top: -40px;
}

.ba {
  border-radius: 50%;
  width: 80px;
  height: 80px;
}
.blue {
  color: #58acfa;
}

</style>
