import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import './plugins/tiptap-vuetify'
import '@babel/polyfill'


Vue.config.productionTip = false
Vue.config.devtools = true;
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
