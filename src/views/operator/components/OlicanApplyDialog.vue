<template>
<el-dialog title="申请油罐" :visible.sync="visible" size="tiny" custom-class="md-dialog olican-dialog__apply" @open="open" :before-close="close" :close-on-click-modal="false" center>
  <el-form :model="form" :rules="rules" ref="form" label-position="top" v-loading="formLoading">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="油品类型" prop="category">
          <!-- <el-select v-model="form.categoryId" size="large" @change="categoryChange" placeholder="请选择油品类型">
            <el-option v-for="item in applyOilTypeList" :key="item.value" :label="item.text" :value="item.value"></el-option>
          </el-select> -->
          <el-cascader size="large" 
              :options="categoryOptions" 
              v-model="form.category" 
              @change="changeCategory" 
              :props="props" 
              placeholder="请选择油品类型">
            </el-cascader>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="设备型号" prop="iotProductId">
          <el-select v-model="form.iotProductId" size="large" placeholder="请选择设备型号">
            <el-option v-for="item in applyOilcanCapacityList" :key="item.value" :label="item.text" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="客户名称" prop="companyId">
      <el-select v-model="form.companyId" size="large" placeholder="请搜索客户名称" @change="companyChange" no-data-text="暂无相关客户信息" filterable remote :remote-method="remoteMethod" clearable>
        <el-option v-for="item in companyDataList" :key="item.id" :label="item.companyName" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="装罐地址" prop="addressId">
      <el-select v-model="form.addressId" size="large" placeholder="请选择装罐地址" @change="addressChange" no-data-text="暂无可选地址">
        <el-option v-for="item in addressList" :key="item.id" :label="item.address" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="特殊要求" prop="remark">
      <el-input placeholder="非必填，请输入特殊要求，特殊要求不能超过20个字符！" :maxlength="20" size="large" v-model.trim="form.remark"></el-input>
    </el-form-item>
    <div class="company-address__skip" v-show="form.companyId&&companyDetailListEnable">
      若需修改或新增地址,请点击
      <router-link :to="'/company/details/'+form.companyId+'#address'">这里</router-link>
    </div>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="submit"> 提 交 </el-button>
  </div>
</el-dialog>
</template>

<script>
import { apiAddressListNoAuthority, apiCompanyListNoAuthority } from '@/api/apiAddressListNoAuthority'

export default {
  data() {
    return {
      companyDataList: [],
      addressList: [],
      form: {
        categoryId: "",
        category:[],
        categoryName: '',
        iotProductId: "",
        companyId: "",
        companyName: '',
        addressId: '',
        remark: ''
      },
      rules: {
        category: [{
          required: true,
          type: "array",
          message: "请选择油品类型",
          trigger: "change"
        }],
        iotProductId: [{
          required: true,
          type: "number",
          message: "请选择设备型号",
          trigger: "change"
        }],
        companyId: [{
          required: true,
          type: "number",
          message: "请输入相关的客户名称进行搜索",
          trigger: "change"
        }],
        addressId: [{
          required: true,
          type: "number",
          message: "请选择装罐地址",
          trigger: "change"
        }],
        remark: [{
          message: "请输入特殊要求",
          trigger: "change"
        }]
      },
      companyDetailListEnable:false,
      isSubmit:false,
      formLoading:false,
      applyOilTypeList:[],
      categoryOptions:[],
      props: {
        value: "id",
        label: "name",
        children: "children"
      },
    };
  },
  watch:{
    visible:(n,o)=>{
      if(n){
        
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    // applyOilTypeList: {
    //   type: Array,
    //   default: []
    // },
    applyOilcanCapacityList: {
      type: Array,
      default: []
    }
  },
  methods: {
    open() {
      this.$nextTick(() => {
        this.companyDetailListEnable = this.$authorityAction("/api/company/detail/list/");
        this.getCategoryListNoAuth()
        // this.getApplyOilTypeList()
      })
    },
    changeCategory(value){
      let currentCategory = {}
      let currentChildren = {}
      this.categoryOptions.forEach(item=>{
        if(item.id == value[0]){
          currentCategory = item
        }
      })
      if(currentCategory.children){
        currentCategory.children.forEach(item=>{
          if(item.id == value[1]){
            currentChildren = item
          }
        })
      }
      this.form.categoryId = value[value.length - 1]      
      this.form.categoryName = (currentChildren.name || '') + currentCategory.name
    },
    async getCategoryListNoAuth(){
      try {
        let {data} = await this.$http.categoryListV2NoAuth()
        let list  = data || []
        this.categoryOptions = list.map(item=>{
          if(item.children.length==0){
            item.children = null
          }
          return item
        })
      } catch (error) {
        console.error(error.message)
      }
    },
    getApplyOilTypeList() {
      this.$http.apiProductList().then(res => {
        this.applyOilTypeList = res.data.list
      }).catch(err => {
        console.error(err.message)
      })
    },
    getApplyOilcanCapacityList() {
      this.$http.apiIotProductList({
        type: 1
      }).then(res => {
        this.applyOilcanCapacityList = res.data.list
      }).catch(err => {
        console.error(err.message)
      })
    },
    close(){
      this.$refs["form"].resetFields();
      this.$emit("update:visible", false);
      this.$emit('refresh',false)
    },
    cancel() {
      this.$refs["form"].resetFields();
      this.$emit("update:visible", false);
      this.$emit('refresh',true)
    },
    remoteMethod(query) {
      if (!query) {
        this.companyDataList = [];
        return false;
      }
      apiCompanyListNoAuthority({
          companyName: query
        })
        .then(res => {
          this.companyDataList = res.data.list;
        })
        .catch(err => {
          console.error(err.message);
        });
    },
    categoryChange(val) {
      if (val) {
        let result = this.filter(this.applyOilTypeList, val, 'value')
        this.form.categoryName = result.text
      }
    },
    companyChange(val) {
      if (val) {
        let result = this.filter(this.companyDataList, val)
        this.form.companyName = result.companyName
        this.form.addressId = ''
        apiAddressListNoAuthority({
          companyId: val
        }).then(res => {
          this.addressList = res.data.list;
        });
      }
    },
    addressChange(val) {

    },
    filter(arr, val, key = 'id') {
      let newArr = arr.filter(item => {
        return item[key] == val
      })
      if (newArr) return newArr[0]
      return []
    },
    submit() {
      if(this.isSubmit) return false
      this.$refs["form"].validate(valid => {
        if (!valid) return false;
        this.isSubmit = true
        this.formLoading = true
        this.$http.apiOilCanApplicationCreate(this.form).then(res => {
          this.$message.success('油罐申请成功')
          this.cancel()
          this.isSubmit = false     
          this.formLoading = false               
        }).catch(err => {
          this.$message.error('油罐申请失败')
          this.isSubmit = false       
          this.formLoading = false                   
          console.error(err.message)
        })
      });
    }
  }
};
</script>
<style lang="scss">
.olican-dialog__apply{
  .el-cascader{
    width: 100%;
  }
}

</style>
