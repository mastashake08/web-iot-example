import Vue from 'vue'
import App from './App.vue'
import router from './router'
import LogoSvg from '@/assets/LogoSvg.vue'
Vue.config.productionTip = false
Vue.component('logo-svg',LogoSvg)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
