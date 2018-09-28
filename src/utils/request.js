import router from '../router'
import axios from 'axios'
import { Notification } from 'element-ui'

// 超时时间
axios.defaults.timeout = 15000

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 登录过期,请重新登录
          if (router.currentRoute.fullPath.indexOf('redirect') !== -1) return// 处理多次请求，redirect重复问题
          router.replace({
            path: '/login',
            query: { redirect: router.currentRoute.fullPath }
          })
          break
        case 500:
          Notification({
            title: '错误',
            message: '系统错误，请联系管理员',
            type: 'warning'
          })
          break
        case 502:
          Notification({
            title: '错误',
            message: '系统正在重启...',
            type: 'warning'
          })
          break
      }
    }
    return Promise.reject(
      error.response ? error.response.data : { message: '页面请求超时！' }
    ) // 返回接口返回的错误信息
  }
)

export default axios
