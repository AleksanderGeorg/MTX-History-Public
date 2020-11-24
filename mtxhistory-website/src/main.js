import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Ads from 'vue-google-adsense'
Vue.use(require('vue-script2'))
Vue.use(Ads.Adsense)

import Meta from 'vue-meta'
Vue.use(Meta)

import '../public/styles.css';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')