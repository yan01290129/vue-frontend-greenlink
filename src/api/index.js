import axios from '@/utils/request'

/** 登录登出 */
// 登录
axios.apiLogin = params => axios.post('/api/employee/login', params)
// 登出
axios.apilogout = params => axios.get(`/api/employee/logout`)

/** 忘记密码 */
// 手机号检验存在
axios.apiemployeePhoneExist = params => axios.post('/api/employee/phone/exist', params)
// 获取验证码
axios.apiemployeeSmsPasswordResetSend = params => axios.post('/api/employee/sms/password/reset/send', params)
// 校验手机号和验证码
axios.apiemployeeCaptchaPasswordForgetValid = params => axios.post('/api/employee/captcha/password/forget/valid', params)
// 设置密码
axios.apiemployeePasswordForget = params => axios.put('/api/employee/password/forget', params)

export default axios
