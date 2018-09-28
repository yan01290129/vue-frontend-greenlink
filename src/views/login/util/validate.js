// import axios from '@/api'

// 11 位手机号码
const phoneRule = (rule, value, callback) => {
  const phone = /^1[3-8]{1}\d{9}$/
  if (!phone.test(value)) {
    return callback(new Error('请输入正确的手机号码'))
  } else {
    callback()
  }
}

export default {
  phoneRule
}
