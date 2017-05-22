import Vue from 'vue'
import Electron from 'vue-electron'
import VueBlu from 'vue-blu'
import 'vue-blu/dist/css/vue-blu.min.css'

Vue.use(Electron)
Vue.use(VueBlu)
Vue.config.debug = true

import App from './App'

/* eslint-disable no-new */
new Vue({
  ...App
}).$mount('#app')
