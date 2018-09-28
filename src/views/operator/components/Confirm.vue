<template>
<el-dialog @open="open" title="受理申请" top="35%" custom-class="sm-confirm" :visible.sync="visible" size="tiny" :close-on-click-modal="false" :before-close="cancel">
  <div>
    <img class="message__img" :src="typeImg" alt="您的浏览器不支持"> 受理来自"{{row.companyName}}"的油罐申请?

  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="reject">驳 回</el-button>
    <el-button type="primary" @click="accept">确 定</el-button>
  </span>
</el-dialog>
</template>

<script>
export default {
  data() {
    return {
      oilCanApplicationAcceptEnable: false,
      oilCanApplicationRejectEnable: false
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    row: {
      type: Object
    },
    type: {
      type: String,
      default: 'warning'
    }
  },
  computed: {
    typeImg() {
      return require(`./assets/${ this.type }.svg`);
    }
  },
  methods: {
    open() {
      this.$nextTick(() => {
        this.oilCanApplicationAcceptEnable = this.$authorityAction("/api/oilCanApplication/accept")
        this.oilCanApplicationRejectEnable = this.$authorityAction("/api/oilCanApplication/reject")
      })
    },
    close() {
      this.$emit("update:visible", false)
      this.$emit('refresh',true)
    },
    cancel(){
      this.$emit("update:visible", false)
      this.$emit('refresh',false)
    },
    accept() {
      if (!this.oilCanApplicationAcceptEnable) {
        this.$message.warning("您没有权限受理")
        this.close()
        this.refresh()
        return false
      }
      this.$http.oilCanApplicationCccept(this.row).then(res => {
        this.$message.success("受理成功")
        this.close()
      }).catch(err => {
        this.$message.error(err.message)
      })
    },
    reject() {
      if (!this.oilCanApplicationRejectEnable) {
        this.$message.warning("您没有权限驳回")
        this.close()
        return false
      }
      this.$http.oilCanApplicationReject(this.row).then(res => {
        this.$message.success("驳回成功")
        this.close()
      }).catch(err => {
        this.$message.error(err.message)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.message__img {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  position: relative;
  top: 2px;
}
</style>
