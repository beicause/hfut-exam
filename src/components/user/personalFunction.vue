<template>
  <router-view/>
</template>

<script>
export default {
  name: "personalFunction",

  // mounted() {
  //   //这个不是写在首页，写在子页面（子页面才能返回，写在首页点击返回就是退出）
  //   //都是h5方法
  //   document.addEventListener('plusready', function () {
  //     var webview = plus.webview.currentWebview();
  //     plus.key.addEventListener('backbutton', function () {
  //       webview.canBack(function (e) {
  //         if (e.canBack) {
  //           webview.back();
  //         } else {
  //           webview.close(); //hide,quit
  //           //plus.runtime.quit();
  //         }
  //       })
  //     });
  //   });
  // },

  // beforeDestroy() {
  //   document.removeEventListener('plusready', function () {
  //     var webview = plus.webview.currentWebview();
  //     plus.key.addEventListener('backbutton', function () {
  //       webview.canBack(function (e) {
  //         if (e.canBack) {
  //           webview.back();
  //         } else {
  //           webview.close(); //hide,quit
  //           //plus.runtime.quit();
  //         }
  //       })
  //     });
  //   })
  // }
}

</script>

<style scoped>

</style>
