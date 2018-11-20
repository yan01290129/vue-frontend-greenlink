<template>
  <el-container class="forget-body">
    <div class="content">
      <div class="phone-pwd-wrap">
        <div class="title">忘记密码</div>
        <div class="steps-wrap">
          <el-steps :space="109" :active="active" align-center finish-status="success" center>
            <el-step title="验证手机"></el-step>
            <el-step title="修改密码"></el-step>
            <el-step title="完成"></el-step>
          </el-steps>
        </div>
        <div class="content-wrap step-one" v-show="active==0">
          <el-form ref="verifyPhoneForm" :rules="phoneRuleValidate" :model="verifyPhoneForm" label-width="11rem">
            <el-form-item label="手机号码" required prop="phone">
              <el-input v-model="verifyPhoneForm.phone" placeholder="请输入11位手机号码" size="large"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="captcha">
              <el-input placeholder="请输入验证码" v-model="verifyPhoneForm.captcha" size="large" :disabled="phoneDirty">
                <el-button type="text" slot="append" :disabled="captchaDisabled" @click="getCaptcha()">{{paracont}}
                </el-button>
              </el-input>
            </el-form-item>
            <el-form-item class="submit-box">
              <el-button type="success" size="large" :disabled="verifyPhoneDisabled" @click="verifyPhone()">下一步
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="content-wrap step-two" v-show="active==1">
          <el-form ref="setPwdForm" :rules="pwdRuleValidate" :model="setPwdForm" label-width="11rem">
            <el-form-item label="新密码" required prop="password">
              <el-input type="password" v-model="setPwdForm.password" placeholder="请输入6-12位数新密码" size="large" @keyup.enter.native="setPwd()"></el-input>
            </el-form-item>
            <el-form-item label="验证密码" required prop="checkPassword">
              <el-input type="password" placeholder="请确认新密码" v-model="setPwdForm.checkPassword" size="large" @keyup.enter.native="setPwd()"></el-input>
            </el-form-item>
            <el-form-item class="submit-box">
              <el-button type="success" size="large" :disabled="setPwdDisabled" @click="setPwd()">修改</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="content-wrap step-tree" v-show="active==2">
          <p class="desc">您已成功修改密码，将重新登录系统..</p>
        </div>
      </div>
    </div>
    <div class="footer">
      <router-link :to="{ path: '/login' }">返回登录页</router-link>
      <div class="copy">国泰绿通（北京）科技发展有限公司</div>
    </div>
  </el-container>
</template>
<script>
import axios from '@/api'

export default {
  data() {
    let validatePhone = (rule, value, callback) => {
      const phone = /^1[3-8]{1}\d{9}$/
      if (!phone.test(value) || !value) {
        this.phoneDirty = true
        this.captchaDisabled = true
        return callback(new Error('请输入11位手机号码'))
      }
      if (this.time > 0) return callback()
      axios
      .apiemployeePhoneExist({ phone: value })
        .then(res => {
          if (res.data) {
            //系统中存在
            this.phoneDirty = false
            this.captchaDisabled = false
            callback()
          } else {
            callback(new Error('该手机号码不存在'))
          }
        })
        .catch(err => {
          this.$message.error(err.message)
        })
    }
    let validatePass = (rule, value, callback) => {
      if (this.setPwdForm.checkPassword !== '') {
        this.$refs.setPwdForm.validateField('checkPassword')
      }
      callback()
    }
    let validatePass2 = (rule, value, callback) => {
      if (value !== this.setPwdForm.password) {
        callback(new Error('两次输入密码不一致!'))
        this.setPwdDisabled = true
      } else {
        this.setPwdDisabled = false
        callback()
      }
    }
    let validateCaptcha = (rule, value, callback) => {
      if (this.errorCaptcha.length > 0) {
        callback(new Error(this.errorCaptcha))
      }
      let reg = /^\d{4}$/
      if (!reg.test(value)) {
        this.verifyPhoneDisabled = true
        callback(new Error('请输入4位数字验证码!'))
      } else {
        this.verifyPhoneDisabled = false
        callback()
      }
    }
    return {
      active: 0,
      phoneDirty: true,
      captchaDisabled: true,
      time: 0,
      verifyPhoneForm: {
        phone: '',
        captcha: ''
      },
      phoneRuleValidate: {
        phone: [{ validator: validatePhone, trigger: 'change' }],
        captcha: [{ validator: validateCaptcha, trigger: 'change' }]
      },
      verifyPhoneDisabled: true,
      errorCaptcha: '',
      /**steps two */
      setPwdForm: {
        phone: '',
        password: '',
        checkPassword: '',
        captcha: ''
      },
      pwdRuleValidate: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur,change' },
          { min: 5, max: 12, message: '密码长度有错', trigger: 'blur,change' },
          { validator: validatePass, trigger: 'blur,change' }
        ],
        checkPassword: [
          { required: true, message: '请输入密码', trigger: 'blur,change' },
          { min: 5, max: 12, message: '密码长度有错', trigger: 'blur,change' },
          { validator: validatePass2, trigger: 'blur,change' }
        ]
      },
      setPwdDisabled: true
    }
  },
  computed: {
    paracont: function() {
      this.captchaDisabled = !this.time > 0 && !this.phoneDirty ? false : true
      return this.time > 0 ? this.time + 's 后重新获取' : '获取验证码'
    }
  },
  methods: {
    /**step one */
    timer() {
      if (this.time > 0) {
        this.time--
        setTimeout(this.timer, 1000)
      }
    },
    getCaptcha() {
      this.time = 60
      this.timer()
      axios.apiemployeeSmsPasswordResetSend({ phone: this.verifyPhoneForm.phone })
        .then(res => {
          if (res.data.response)
            this.verifyPhoneForm.captcha = res.data.response
        })
        .catch(err => {
          this.$message.error(err.message)
        })
    },
    verifyPhone() {
      axios.apiemployeeCaptchaPasswordForgetValid(this.verifyPhoneForm)
        .then(res => {
          this.setPwdForm.captcha = this.verifyPhoneForm.captcha
          this.setPwdForm.phone = this.verifyPhoneForm.phone
          this.active = 1
        })
        .catch(err => {
          //   this.$message.error(err.message);
          this.errorCaptcha = err.message
          this.$refs.verifyPhoneForm.validateField('captcha')
        })
    },
    /**step two */
    setPwd() {
      forgetPwd(this.setPwdForm)
        .then(res => {
          this.active = 2
          let _this = this
          setTimeout(function() {
            _this.$router.push('/login')
          }, 2000)
        })
        .catch(err => {
          this.$message.error(err.message)
        })
    }
  },
  watch: {
    'verifyPhoneForm.captcha': {
      handler(newValue, oldValue) {
        if (newValue.length > 0) {
          this.errorCaptcha = ''
          this.$refs.verifyPhoneForm.validateField('captcha')
        }
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.forget-body {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-image: url(../../assets/login/bg1.png);
}
.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.footer {
  height: 6rem;
  text-align: center;
  font-size: 0.6rem;
  color: #8492a6;
}
.footer a {
  color: #4eb940;
  font-size: 0.7rem;
}
.footer .copy {
  margin-top: 2rem;
}
.phone-pwd-wrap {
  width: 44rem;
  height: 25rem;
  margin: 8rem auto 2rem;
  background-color: #fff;
  -webkit-box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}
.phone-pwd-wrap .title {
  padding: 0 1rem;
  height: 2.5rem;
  line-height: 2.5rem;
  font-size: 0.8rem;
  border-bottom: 1px solid #e9edf2;
}
.phone-pwd-wrap .steps-wrap {
  padding: 1.5rem 0 1.2rem;
  background-color: #f5f7fa;
}
.phone-pwd-wrap .steps-wrap .el-steps {
  -webkit-box-pack: center;
  justify-content: center;
}

.el-steps--horizontal {
  white-space: nowrap;
}
.el-steps {
  display: flex;
}
.phone-pwd-wrap .content-wrap {
  margin: 1.5rem 11rem 1.5rem 0;
  overflow: hidden;
}
</style>


