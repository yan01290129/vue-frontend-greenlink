<template>
  <el-row type="flex" justify="center" align="middle" class="login-row">
    <el-col :span="12">
      <div class="login-wrap">
        <div class="left-wrap">
          <img src="../../assets/login/login_img.png">
        </div>
          <div class="right-wrap">
            <div class="login-box">
              <h4>
                <em></em><em></em>&nbsp;绿心网大宗贸易管理系统&nbsp;
                <em></em><em></em>
              </h4>
              <div class="login-container">
                <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="ruleValidate" ref="loginForm" label-position="left">
                  <el-form-item prop="phone">
                    <span class="svg-container svg-container_login">
                      <svg-icon icon-class="user" />
                    </span>
                    <el-input ref="phoneInput" :maxlength="11" v-model="loginForm.phone" autoComplete="on" placeholder="手机号码" @keyup.enter.native="submit();" />
                  </el-form-item>
                  <el-form-item prop="password">
                    <span class="svg-container">
                      <svg-icon icon-class="password"></svg-icon>
                    </span>
                    <el-input ref="passwordInput" :type="pwdType" v-model="loginForm.password" autoComplete="on" placeholder="密码" @keyup.enter.native="submit();" />
                    <span class="show-pwd" @click="showPwd">
                      <svg-icon icon-class="eye" />
                    </span>
                  </el-form-item>
                  <el-button type="primary" style="width:100%;" shape="circle" class="submit-btn" :loading="loading" @click="submit()">登录</el-button>
                  <div class="forget-password__edit">
                    <router-link :to="{ path: '/forget' }">忘记密码</router-link>
                  </div>
                </el-form>
              </div>
            </div>
            <div class="footer">国泰绿通（北京）科技发展有限公司</div>
          </div>
        </div>
    </el-col>
  </el-row>
</template>

<script>
import validate from './util/validate'
export default {
  data() {
    return {
      loginForm: {
        phone: '',
        password: ''
      },
      pwdType: 'password',
      loading: false,
      ruleValidate: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: validate.phoneRule, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 12,
            message: '长度在 6 到 12 个字符',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    // 显示隐藏密码
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    submit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$http
            .apiLogin(this.loginForm)
            .then(res => {
              this.loading = false
              this.$store.commit('SET_USER', res.data)
              sessionStorage.setItem('user', JSON.stringify(res.data)) //同时备份到sessionStorage中防止刷新vuex数据丢失
              //如果有redirect, 跳回原来的页面
              if (
                this.$router.currentRoute.query &&
                this.$router.currentRoute.query.hasOwnProperty('redirect')
              ) {
                var redirect = this.$router.currentRoute.query.redirect
                redirect = redirect.replace('/login?redirect=')
                this.$router.push(unescape(redirect))
              } else {
                this.$router.push('/')
              }
              this.$message.success('登录成功')
            })
            .catch(err => {
              this.loading = false
              if (err.errorCode === 'PHONE_WRONG') {
                this.error.phone = true
                this.$refs.loginForm.validateField('phone')
                this.$refs.phoneInput.inputSelect()
              }
              if (err.errorCode === 'PASSWORD_WRONG') {
                console.log(this.error)
                this.error.password = true
                this.$refs.loginForm.validateField('password')
                this.$refs.passwordInput.inputSelect()
              }
            })
        } else {
          this.$notify({
            title: '提示',
            message: '请输入正确账户',
            type: 'warning'
          })
          return false
        }
      })
    }
  }
}
</script>


<style rel="stylesheet/scss" lang="scss">
$bg: #fff;
$light_gray: #000;

.login-container {
  margin-top: 3rem;
  .el-form-item {
    border: 1px solid #409eff;
    border-radius: 4px;
    color: #454545;
    margin-bottom: 1.5rem;
  }
  .el-input {
    display: inline-block;
    height: 2rem;
    width: 80%;
    input {
      background: transparent;
      -webkit-appearance: none;
      border-radius: 0px;
      border: 0px;
      padding: 0px 5px 0px 15px;
      height: 2rem;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: black !important;
      }
    }
  }
}

.svg-container {
  padding: 0 1rem;
  vertical-align: middle;
  width: 30px;
  display: inline-block;
  &_login {
    font-size: 1rem;
  }
}
.show-pwd {
  position: absolute;
  right: 1rem;
  font-size: 1rem;
  cursor: pointer;
  user-select: none;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px white inset;
  -webkit-text-fill-color: #333;
}

.login-row {
  height: 100%;
  background-image: url(https://green-public-test.oss-cn-shanghai.aliyuncs.com/intranet/static/img/bg.08e8bd7.png);
}
.login-wrap {
  width: 44rem;
  height: 25rem;
  margin: 0 auto;
  display: -webkit-box;
  display: flex;
  -webkit-box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
}
.left-wrap img {
  height: 100%;
  width: 22rem;
}
.right-wrap {
  width: 22rem;
  display: -webkit-box;
  display: flex;
  -moz-flex-direction: column;
  -o-flex-direction: column;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  background-color: #fff;
}
.right-wrap .login-box {
  -webkit-box-flex: 1;
  flex: 1;
  padding: 0 2rem;
}
.right-wrap .login-box h4 {
  text-align: center;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 3rem;
}
.right-wrap .login-box h4 em {
  display: inline-block;
  width: 1.5rem;
  height: 1px;
  background-color: #bdc5d0;
  position: relative;
  top: -0.3rem;
}
.right-wrap .footer {
  font-size: 0.6rem;
  text-align: center;
  margin-bottom: 1rem;
  color: #b6bac0;
}
.forget-password__edit {
  text-align: center;
  font-size: 0.6rem;
  margin-top: 1rem;
}
</style>
