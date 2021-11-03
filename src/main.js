// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// mui的原生框架
import '../static/reset.css';
import '../static/mui/css/mui.min.css';
import '../static/mui/css/icons-extra.css';
// import '../static/mui/js/mui.min.js';
// import '../static/mui/css/app.css';

// import ViewUI from 'view-design';
// import 'view-design/dist/styles/iview.css';
// Vue.use(ViewUI);
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import GoEasy from "goeasy";

Vue.use(MintUI)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})


// Vue.prototype.goeasy = GoEasy.getInstance({
//   host:"hangzhou.goeasy.io",  //若是新加坡区域：singapore.goeasy.io
//   appkey:"您的common key",
//   modules:['pubsub'],//根据需要，传入‘pubsub’或'im’，或数组方式同时传入
//   allowNotification:true,  // true表示支持通知栏提醒，false则表示不需要通知栏提醒
// });
