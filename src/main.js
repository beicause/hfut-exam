// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './common/style.css'
Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// mui的原生框架
import '../static/reset.css';
import '../static/mui/css/mui.min.css';
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'virtual:windi.css'
import Composition from '@vue/composition-api'
Vue.use(Composition)
Vue.use(MintUI)

/* eslint-disable no-new */
new Vue({
    router,
    store,
    render:h=>h(App)
}).$mount('#app')
