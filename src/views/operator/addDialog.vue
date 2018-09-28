<template>
<el-dialog style="" class="dialog" title='新增运营商' :visible.sync='visible' :before-close='close'>
  <el-form :model='form'>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-form-item label="公司名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="运营商分类">
          <el-radio-group v-model="form.resource">
            <el-radio label="需求方"></el-radio>
            <el-radio label="中间商"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="工商注册号">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="注册地址">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="公司名称">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
  </el-form>
  <div slot='footer' class='dialog-footer'>
    <el-button type='primary' @click='submit'>确 定</el-button>
  </div>
</el-dialog>
</template>

<script>
  export default {
    props: {
        visible: {
        type: Boolean,
        default: false
        }
    },
    data() {
      return {
        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
      };
    },
    methods: {
      close(){
        this.$emit('update:visible', false);
      },
      submit() {
        
      }
    }
  };
</script>
<style lang="scss">
.el-cascader{
    width: 100%;
  }
.el-dialog__header{
  border-bottom: 1px solid #e9edf2;
  text-align: center;
}
.el-dialog__footer{
  border-top: 1px solid #e9edf2;
  text-align: center;
}
.dialog > .el-dialog{
  margin-top: 6vh !important;
}
.el-dialog__header{
  padding: 10px;
}
.el-dialog__headerbtn{
  top: 15px;
}
.el-form-item__label, .el-radio{
  font-size: .6rem;
    line-height: 1rem;
    margin-bottom: .6rem;
    color: #8492a6;
}
.el-input__inner{
    color: #8492a6;
}
</style>
