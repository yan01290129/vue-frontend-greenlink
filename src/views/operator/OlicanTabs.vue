<template>
  <div class="app-container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>运营商管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="box-shadow">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  computed: {
    active() {
      let newArr = this.$route.path.split(/\//);
      return newArr[newArr.length - 2]
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.container {
    width: 750px;
}

.container {
    margin-right: auto;
    margin-left: auto;
    padding-left: 15px;
    padding-right: 15px;
    min-width: 1170px;
    box-sizing: content-box;
}

ul.tabs {
  height: 2.5rem;
  line-height: 2.5rem;
  background-color: #fff;
  border-bottom: solid 1px #d5d9e0;
  position: relative;
  li {
    float: left;
    padding: 0 1rem;
    position: relative;
    a {
      color: #263240;
      display: inline-block;
      height: 100%;
      transition: all ease 0.2s;
      &:before,
      &:after {
        content: "";
        display: inline-block;
        height: 3px;
        width: 0;
        background-color: #4eb940;
        position: absolute;
        bottom: 0;
        left: 50%;
        -webkit-transition: all 0.2s ease-in-out;
        -moz-transition: all 0.2s ease-in-out;
        -o-transition: all 0.2s ease-in-out;
        transition: all 0.2s ease-in-out;
      }
      &:hover {
        color: #4eb940;
        &:before {
          left: 30%;
          width: 20%;
        }
        &:after {
          left: 50%;
          width: 20%;
        }
      }
    }
    &.tab-active a {
      color: #4eb940;
      &:after {
        width: 40%;
        left: 30%;
      }
    }
  }
}
</style>
