<template>
  <section class="app-main">
    <breadcrumb></breadcrumb>
    <transition name="fade" mode="out-in">
        <router-view></router-view>
    </transition>
    <el-footer>国泰绿通（北京）科技发展有限公司</el-footer>
  </section>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
export default {
  name: 'AppMain',
  components: {
    Breadcrumb
  },
  computed: {
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  }
}
</script>
