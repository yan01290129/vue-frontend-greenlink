<template>
  <el-dialog title="油罐申请详情" :visible.sync="visible" size="tiny" :dialogFlex="detail.sourceDocumentUrl!=null" custom-class="md-dialog olican-dialog__apply--detail" @open="open" :before-close="close" :close-on-click-modal="false" center>
    <el-form :model="form" :rules="rules" ref="form" label-position="top" v-loading="formLoading">
      <el-row :gutter="20">
        <el-col :span="24">
            <el-form-item label="客户名称" class="form-text">
              {{detail.companyName}}
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="所属运营商" class="form-text">
              {{detail.operatorName}}
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="装罐地址" v-show="!isEdit" class="form-text">
              {{detail.address||'无'}}
            </el-form-item>
            <el-form-item  v-show="isEdit" label="装罐地址" prop="addressId" class="address-select">
              <el-select v-model="form.addressId" size="large" placeholder="请选择装罐地址" @change="addressChange" no-data-text="暂无可选地址">
                <el-option v-for="item in addressList" :key="item.id" :label="item.address" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="联系人" class="form-text">
              {{addressCurrent.contactName || detail.contactName}}
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="联系电话" class="form-text">
              {{addressCurrent.contactPhone || detail.contactPhone}}
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="设备型号" v-show="!isEdit" class="form-text">
              {{detail.iotProductName}}
            </el-form-item>
            <el-form-item v-show="isEdit" label="设备型号" prop="oilcanIotProductId">
              <el-select v-model="form.oilcanIotProductId" size="large" placeholder="请选择设备型号">
                <el-option v-for="item in applyOilcanCapacityList" :key="item.value" :label="item.text" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="油品类型" v-show="!isEdit"  class="form-text">
              {{detail.categoryName}}
            </el-form-item>
            <el-form-item v-show="isEdit" label="油品类型" prop="category">
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
          <el-col :span="10" v-if="detail.installCan">
            <el-form-item label="油罐编号" class="form-text">
              {{detail.oilcanId}}
            </el-form-item>
          </el-col>
          <el-col :span="14" v-if="detail.installCan">
            <el-form-item label="安装单位" class="form-text">
              {{detail.oilcanInstallUnit}}
            </el-form-item>
          </el-col>
          <el-col :span="10" v-if="detail.installStation">
            <el-form-item label="基站编号" class="form-text">
              {{detail.baseStationId}}
            </el-form-item>
          </el-col>
          <el-col :span="10" v-if="detail.installSensor">
            <el-form-item label="传感器编号" class="form-text">
              {{detail.sensorId}}
            </el-form-item>
          </el-col>
          <el-col :span="24" class="upload-box" v-if="detail.sourceDocumentUrl">
            <el-form-item label="附件信息" class="form-text">
              <div class="show-img">
                <img :src="detail.sourceDocumentUrl" alt="显示异常">
                <div class="img-info">
                  <p class="text-ellipsis">{{imgName}}</p>
                  <el-button type="text" @click="albumVisible = true" class="picture-btn">查看大图</el-button>
                </div>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="特殊要求" v-show="!isEdit" class="form-text">
              {{detail.remark|| '无'}}
            </el-form-item>
            <el-form-item  v-show="isEdit" label="特殊要求" prop="remark">
              <el-input placeholder="非必填，请输入特殊要求，特殊要求不能超过20个字符！" :maxlength="20" size="large" v-model.trim="form.remark"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <ul class="records-list">
              <h5><i class="iconfont el-icon-clock"></i> 操作记录</h5>
              <li v-for="item in detail.logList" v-if="detail.id == item.oilcanapplicationId" :key="item.id"><em>{{item.createTime}}</em> <i class="iconfont el-icon-dot"></i> {{`${item.platform} 【${item.createBy}】 ${item.content}`}}</li>
            </ul>
          </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer" v-if="detail.status===0&&oilCanApplicationUpdateEnable">
      <el-button v-if="!isEdit" type="success" @click="isEdit=true">编 辑</el-button>
      <template v-if="isEdit">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="success" @click="submit" :loading="loading">确 定</el-button>
      </template>
    </div>
    <Album :album-list="albumList" :current-album-index="0" :isShow.sync="albumVisible"></Album>
  </el-dialog>
</template>
<script>
import { apiAddressListNoAuthority } from '@/api/apiAddressListNoAuthority'
export default {
  data() {
    return {
      detail:{},
      loading:false,
      imgName:'-',
      isEdit:false,
      form: {
        id:'',
        categoryId: "",
        categoryName: '',
        oilcanIotProductId: "",
        addressId: '',
        remark: '',
        category:[]
      },
      rules: {
        category: [
          {required: true,type: "array",message: "请选择油品类型",trigger: "change"}
        ],
        oilcanIotProductId: [
          {required: true,type: "number",message: "请选择设备型号",trigger: "change"}
        ],
        addressId: [
          {required: true,type: "number",message: "请选择送货地址",trigger: "change"}
        ],
        remark: [
          {message: "请输入特殊要求",trigger: "change"}
        ]
      },
      addressList: [],
      formLoading:false,
      oilCanApplicationUpdateEnable:false,
      addressCurrent:{
        contactPhone:null,
        contactName:null
      },
      albumVisible:false,
      props: {
        value: "id",
        label: "name",
        children: "children"
      },
      categoryOptions:[]
    };
  },
  props: {
    visible: Boolean,
    row: Object,
    applyOilcanCapacityList:Array,
    applyOilTypeList:Array
  },
  computed: {
    albumList () {
      if (!this.detail.sourceDocumentUrl) return []
      return [
        {
          name: this.imgName,
          url: this.detail.sourceDocumentUrl
        }
      ]
    }
  },
  methods: {
    async open() {
      this.formLoading = true   
      this.oilCanApplicationUpdateEnable = this.$authorityAction("/api/oilCanApplication/update")      
      this.form = {
        id:'',
        categoryId: "",
        categoryName: '',
        oilcanIotProductId: "",
        addressId: '',
        remark: '',
        category:[]
      }     
      await this.getCategoryListNoAuth()
      this.$nextTick(async()=>{
        this.addressCurrent = {}
        let {id} = this.row
        try {
          const res = await this.$http.oilCanApplicationDetail(id)
          this.detail = res.data || this.row
          const {companyId,sourceDocumentUrl,categoryId,categoryName,oilcanIotProductId,remark,addressId} = res.data || this.row
          this.imgName = this.$utils.imgUrlFormat(sourceDocumentUrl)
          let LastLevel = this.getLastLevel(this.categoryOptions,categoryId)
          let category = []
          if(LastLevel.parentId){
            category.push(LastLevel.parentId)
          }
          category.push(LastLevel.id)
          this.form = {id,categoryId,categoryName,oilcanIotProductId,addressId,remark,category}          
          const resAddress = await apiAddressListNoAuthority({companyId})
          this.formLoading = false          
          this.addressList = resAddress.data.list
        } catch (error) {
          console.error(err.message)
          this.formLoading = false 
        }
      })
    },
    getLastLevel(categoryOptions = [],id){
      let result = {}
      levelDispose(categoryOptions)
      function levelDispose(arr){
        arr.forEach(item=>{
          if(item.id==id) {
            result = item
          }else{
            if(item.children){
              levelDispose(item.children)
            }
          }
        })
      }
      return result
    },
    categoryChange(val) {
      if (val) {
        let result = this.filter(this.applyOilTypeList, val, 'value')
        this.form.categoryName = result.text
      }
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
      this.form.categoryName = this.filterCategoryName(value)
    },
    filterCategoryName(arr){
      let categoryName = []
      function filterCategory(list){
        list.filter((item,i)=>{
          if(arr.includes(item.id)) categoryName.push(item.name)
          if(item.children&&item.children.length>0) filterCategory(item.children)
        })
      }
      filterCategory(this.categoryOptions)
      return categoryName.reverse().join('')
    },
    addressChange(val){
      if (val) {
        this.addressCurrent = this.filter(this.addressList, val) || {}
      }
    },
    filter(arr, val, key = 'id') {
      let newArr = arr.filter(item => {
        return item[key] == val
      })
      if (newArr) return newArr[0]
      return {}
    },
    close(){
      this.$refs.form.resetFields();
      this.$emit("update:visible", false);
      this.$emit('refresh',false)
      this.isEdit = false      
    },
    cancel() {
      this.$refs.form.resetFields();
      this.$emit("update:visible", false);
      this.$emit('refresh',true)
      this.isEdit = false      
    },
    submit(){
      this.loading = true
      this.$refs.form.validate(valid => {
        if (!valid) return false
        this.$http.oilCanApplicationUpdate(this.form).then(res=>{
          this.$message.success('编辑成功')
          this.cancel()
          this.loading = false
        }).catch(err=>{
          this.$message.error('编辑失败')          
          this.loading = false          
        })           
      })
    }
  }
};
</script>
<style lang="scss">
.olican-dialog__apply--detail{
  .form-text{
    .el-form-item__content{
      line-height: 1
    }
  }
  // .address-select{
    .el-select{
      display: block
    }
  // }
  .show-img{
    height: 120px;
    width: 300px;
    border-radius: 6px;
    border: 1px solid #d9d9d9;
    display: flex;
    justify-content: space-around;
    align-items:center;
    font-size: 14px;
    img{
      width: 90px;
      height: 90px;
      margin-left: 20px;
      margin-right: 25px;
      border: dashed 1px #bdc5d0;
    }
    .img-info{
      text-align: left;
      line-height:2.5;
      width: 160px;      
      padding-right: 4px;
      p{
        width: 160px;
      }
      .picture-btn{
        color: #8492a6;
        padding: 0;
        &:hover {
          color: #8492a6;
        }
      }
    }
  }
  .records-list{
    font-size: 14px;
    background-color: #fafbfc;
    padding: 1rem 0.8rem;
    border-radius: 4px;
    line-height: 1;
    height: 200px;
    overflow-y: auto;
    h5 i.iconfont{
      font-size: 16px;      
      margin-right: 10px;
      color: #4eb940;  
    }
    li{
      margin-top: 15px;
      padding-left: 26px;
      em{
        color: #8492a6;
        font-style: normal;
      }
      i.iconfont{
        color: #bdc5d0;  
        font-size: 12px;
        position: relative;
        top: 0px;      
      }
    }
  }
}
</style>
