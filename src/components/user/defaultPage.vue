<template>
  <div>
    <router-view/>
    <div v-if="showAlertSentence" style="position: absolute; width: 60%; height: 16%; text-align: center">
      再按一次退出应用
    </div>
  </div>
</template>

<script>
export default {
  name: "defaultPage",
  data() {
    return {
      showAlertSentence: false,
    }
  },
  mounted() {
    //不需要mui.js版本
    document.addEventListener('plusready', function () {
      var first = null;
      plus.key.addEventListener('backbutton', function () {
        //首次按键，提示‘再按一次退出应用’
        if (!first) {
          first = new Date().getTime();
          // this.showAlertSentence = true;
          mui.toast('再按一次退出应用', {duration: 'long', type: "div"})

          setTimeout(function () {
            first = null;
            // this.showAlertSentence = false;
          }, 1000);
        } else {
          if (new Date().getTime() - first < 1000) {
            plus.runtime.quit();
          }
        }
      }, false);
    });
  },

  beforeDestroy() {
    document.removeEventListener('plusready', function () {
      var first = null;
      plus.key.addEventListener('backbutton', function () {
        //首次按键，提示‘再按一次退出应用’
        if (!first) {
          first = new Date().getTime();
          // this.showAlertSentence = true;
          mui.toast('再按一次退出应用', {duration: 'long', type: "div"})

          setTimeout(function () {
            first = null;
            // this.showAlertSentence = false;
          }, 1000);
        } else {
          if (new Date().getTime() - first < 1000) {
            plus.runtime.quit();
          }
        }
      }, false);
    })
  }
}

</script>

<style scoped>

</style>
