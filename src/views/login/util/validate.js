import axios from '@/api'

// 11位手机号码
const contactPhoneRule = (rule, value, callback) => {
  const PhoneRegular = /^1[3-8]{1}\d{9}$/
  if (value.length > 0 && !PhoneRegular.test(value)) {
    return callback(new Error('请输入正确的手机号码'))
  } else {
    callback()
  }
}

// 后台检验11位手机号码
const apicontactPhoneRule = (rule, value, callback) => {
  const PhoneRegular = /^1[3-8]{1}\d{9}$/
  if (value != null && value.length > 0 && !PhoneRegular.test(value)) {
    return callback(new Error('请输入正确的手机号码'))
  } else if (value != null && value.length > 0 && PhoneRegular.test(value)) {
    axios
      .apiemployeePhoneExist({ phone: value })
      .then(res => {
        if (!res.data) {
          return callback(new Error('该手机号码不存在'))
        }
        callback()
      })
      .catch(err => {
        console.error(err.message)
      })
  } else {
    callback()
  }
}

// 密码长度及字符校验
const contactPwdRule = (rule, value, callback) => {
  var PwdRegular = /^([A-Za-z0-9]|[~!@#$%^&*()_+`\-={}:";'<>?,.]){6,12}$/
  if (value != null && value.length >= 6 && value.length <= 12 && !PwdRegular.test(value)) {
    return callback(new Error('密码只能输入数字、字母和特殊字符'))
  } else {
    callback()
  }
}

export default {
  contactPhoneRule,
  apicontactPhoneRule,
  contactPwdRule
}
