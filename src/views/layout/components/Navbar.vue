<template>
<el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    {{userinfo.operatorName?userinfo.operatorName:'请登录'}}
    <div class="pull-right">
      <ul class="nav">
        <el-menu-item index="1">
          <el-dropdown>
            <span class="el-dropdown-link">
              {{userinfo.userName?userinfo.userName:'请登录'}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item disabled>
                <div>{{userinfo.userName?userinfo.userName:'请登录'}}<span class="righttext">{{userinfo.phone}}</span></div>
                <el-tag>总经理</el-tag>
              </el-dropdown-item>
              <el-dropdown-item divided>账号设置</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
        <el-menu-item index="2">
          <el-tooltip class="item" effect="dark" content="退出登录" placement="bottom">
            <div @click="logOut()">
              <svg-icon icon-class="out" class="iconout" />
            </div>
          </el-tooltip>
        </el-menu-item>
      </ul>
    </div>
</el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  data () {
    return {
      userinfo: {}
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    getUsers () {
      //vuex用于组件之间的传值，响应式，localstorage、sessionstorage则主要用于不同页面之间传值,刷新不会丢失
      // this.userinfo = this.$store.getters.user
      this.userinfo = JSON.parse(sessionStorage.getItem('user'))//用户信息使用sessionStorage
    },
    logOut() {
      sessionStorage.removeItem('user')
      // this.$store.commit('SET_USER', {})
      location.reload()// 为了重新实例化vue-router对象 避免bug
    }
  },
  mounted () {
    this.getUsers()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.navbar {
  height: 60px;
  line-height: 60px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 60px;
    height: 60px;
    float: left;
    padding: 0 20px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}

.pull-right {
  float: right;
}
.nav>li {
    float: left;
    border-left: 1px solid #f5f5f5;
    height: 60px;
    line-height: 60px;
}
.el-menu-item:hover, .el-menu-item.is-active {
  background-color: transparent;
  color: #5a5e66;
}
.iconout{
  width: 1.2rem;
  height: 1.2rem;
  vertical-align: -0.3em;
}
.el-dropdown-menu__item.is-disabled{
  color: #606266;
}
.righttext{
  margin-left: 1rem;
}
</style>

