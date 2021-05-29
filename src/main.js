import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify'
import { createProvider } from './vue-apollo'
import 'regenerator-runtime/runtime'
import 'vue-material-design-icons/styles.css'

import VueCookies from 'vue-cookies'

Vue.use(VueCookies)
Vue.component('DateTimeSelector', () => import('./components/DateTimeSelector.vue'))

Vue.config.productionTip = false

new Vue({
  store,
  router,
  vuetify,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
