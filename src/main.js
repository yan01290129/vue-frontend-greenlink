import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from '@/api'
import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'
import '@/icons'

Vue.use(ElementUI)
Vue.prototype.$http = axios
Vue.config.productionTip = false

const whiteList = ['/login', '/forget'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  if (whiteList.indexOf(to.path) !== -1) {
    sessionStorage.removeItem('user')
    store.state.users = {}
    next()
  } else {
    const user = JSON.parse(sessionStorage.getItem('user'))
    if (!user) {
      next('/login')
    } else {
      next()
    }
  }
})

router.afterEach(() => {
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
