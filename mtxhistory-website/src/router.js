import Vue from 'vue'
import VueRouter from 'vue-router'

import SearchContent from './components/Content/Search/Search.vue';
import Deal from './components/Content/Deal/Deal.vue';
import Update from './components/Content/Update/Update.vue';
import HistoyMTX from './components/Content/Deal/HistoryMTX.vue';

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: SearchContent },
    { path: '/:name', component: Deal },
    { path: '/update/daily', component: Update },
    { path: '/historyMTX/:name', component: HistoyMTX }
  ]
})