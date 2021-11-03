<template>
  <div>
    <div class="instorage-title">
      <router-link to="/myInfo">
        <i class="el-icon-arrow-left back">&#xe670;</i>
      </router-link>
      <h1>设置</h1>
      <a href="#">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>

    </div>

    <div style="text-align: center">
      <button style="
        background: #F56C6C;
        color: #FFFFF6;
        border-radius: 30px;
        width: 80%;
        height: 40px;
        margin: 10px 0 10px 0;
        "
              @click="signOut()"
      >
        退出登录
      </button>
      <!--      <el-button type="danger">Danger</el-button>-->
    </div>
<!--    <div>-->
<!--      <button id="a1" style="-->
<!--        background: #F56C6C;-->
<!--        color: #FFFFF6;-->
<!--        border-radius: 30px;-->
<!--        width: 80%;-->
<!--        height: 40px;-->
<!--        margin: 10px 0 10px 0;-->
<!--        "-->
<!--      >-->
<!--        你好-->
<!--      </button>-->
<!--    </div>-->
  </div>
</template>

<script>

export default {
  components: {},
  data() {
    return {
      // isLogin: true,
    }
  },
  mounted() {
    // localStorage.clear();
    // 判断登录状态
    if (localStorage.token) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }


  },
  methods: {
    // 退出登录
    signOut(id) {
      localStorage.clear();
      this.$router.push(`/myInfo`); // 页面跳转到含有判断功能的界面
    },



  }
}

</script>

<!--<script>-->
<!--document.addEventListener('plusready', function () {-->
<!--  var webview = plus.webview.currentWebview();-->
<!--  plus.key.addEventListener('backbutton', function () {-->
<!--    webview.canBack(function (e) {-->
<!--      if (e.canBack) {-->
<!--        webview.back();-->
<!--      } else {-->
<!--        webview.close(); //hide,quit-->
<!--        //plus.runtime.quit();-->
<!--      }-->
<!--    })-->
<!--  });-->
<!--});-->
<!--</script>-->

<style scoped>
h1 {
  font-size: 17px;
}

/* 标题栏 */
.instorage-title {
  height: 52px;
  line-height: 52px;
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: lightskyblue;
}

.instorage-title a {
  display: block;
  height: 52px;
  margin-right: 10px;
  text-align: center;
  font-size: 18px;
}

.iconfont {
  font-size: 25px;
}

.back {
  margin-left: 5px;
}

.instorage-title a:active {
  color: #ff6700;
}

.instorage-title h1 {
  height: 52px;
  width: 70px;
  line-height: 52px;
  text-align: center;
  color: white;
}
</style>
