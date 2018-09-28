<template>
  <el-dialog title="申请设备售后" custom-class="md-dialog apply-dialog" @open="open" top="5vh"
              :visible.sync="visible" :before-close="cancel" :close-on-click-modal="false">
    <el-form ref="form" label-position="top" :rules="rules" :model="form">
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="客户名称" class="description">
            {{detail.companyName}}
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="安装地址" class="description">
            {{detail.address}}
          </el-form-item>
        </el-col>
        <template >
          <el-col :span="24">
            <el-form-item label="所属运营商" class="description">
              {{detail.operatorName}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人" class="description">
              {{detail.contactName}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人电话" class="description">
              {{detail.contactPhone}}
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="油罐编号" class="description">
              {{detail.id}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="售后类型" prop="serviceType">
               <el-input v-model="form.serviceType" hidden></el-input>
              <el-select v-model="form.serviceType" size="large" placeholder="必选,请选择售后类型">
                <el-option
                  v-for="item in serviceTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="期望受理日期" prop="expectDate">
              <el-date-picker
                v-model="form.expectDate"
                align="center"
                size="large"
                type="date" class="apply-dialog__time"
                placeholder="选择日期"
                @change="dateChangeHandle"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="售后描述" prop="desc">
              <el-input
                type="textarea"
                :rows="2"
                size="large"
                placeholder="必填,请输入售后原因,限80个字"
                v-model="form.desc">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="现场图片" prop="pictureUrl">
              <div style="width: 100%">
                <el-input v-model="form.pictureUrl" hidden></el-input>
                <PictureCardUpload v-model="fileList" @uploadProgress="uploadProgress" @change="PictureCardUploadChange"/>
              </div>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submit" :loading="loading" :disabled="progress>0">确 定</el-button>
    </div>
  </el-dialog>

</template>
<script>
import Upload from '@components/Upload'
import {
    apiCompanyListNoAuthority,
    apiAddressListNoAuthority
  } from '@/api'
  export default {
    name: 'ApplyDialog',
    components: {Upload},
    data () {
      return {
        loading: false,
        form:{
          serviceType:'',
          expectDate:'',
          desc:'',
          pictureUrl:''
        },
        rules:{
          serviceType:[
            {required: true, type: 'number', message: '请选择售后类型', trigger: 'change,blur'},       
          ],
          expectDate:[
            {required: true, type: 'date', message: '请选择期望受理日期', trigger: 'change,blur'}
          ],
          desc:[
            {required: true, message: '请输入售后描述', trigger: 'change,blur'},
            {max: 80, message: "最大长度为 80", trigger: "change"}            
          ],
          pictureUrl:[{message: '请上传现场图片', trigger: 'change,blur'}]
        },
        companyDataList:[],
        company:{},
        addressList:[],
        oilcanList:[],
        serviceTypeList:[
           {label: '设备回收', value: 2}, {label: '设备维修', value: 1}
        ],
        fileList:[],
        progress:0
      }
    },
    props: {
      visible: Boolean,
      detail:Object      
    },
    computed: {
      pickerOptions () {
        return this.$utils.pickerOptions
      },
    },
    methods: {
      cancel () {
        this.$emit('update:visible', false)
        this.$refs.form.resetFields();  
      },
      open () {
        this.$nextTick(()=>{
          this.$refs.form.resetFields();                  
        })
      },
      filter(arr, val, key = 'id') {
        let newArr = arr.filter(item => {
          return item[key] == val
        })
        if (newArr) return newArr[0]
        return {}
      },
      dateChangeHandle() {
        this.$refs.form.validateField('expectDate')
      },
      uploadProgress(progress,file){
        this.progress = progress
      },
      PictureCardUploadChange(fileList,file){
        let pictureUrl = ''
        fileList.forEach(item=>{
          if(item.outerImgUrl!=''){
            pictureUrl +=item.outerImgUrl+';'
          }
        })
        this.form.pictureUrl = pictureUrl
      },
      submit () {
        this.$refs.form.validate(valid=>{
          if(!valid) return false
          let {serviceType,desc,expectDate,pictureUrl} = this.form
          let {companyId,companyName,addressId,id,contactName,contactPhone,operatorId,operatorName} = this.detail
          this.$http.deviceMaintainApplicationCreate({
              companyId,companyName,addressId,oilcanId:id,serviceType,desc,pictureUrl,operatorId,operatorName,contactName,contactPhone,expectDate:this.$utils.formatDate(expectDate,'yyyy-MM-dd')
          }).then(res=>{
            this.$message.success('设备售后申请成功');  
            this.$router.push({path:'/devicemaintain'});
            this.cancel()                     
          }).catch(err=>{
            this.$message.error('设备售后申请失败');            
            console.error(err.message)
          })
        })
      }
    }

  }
</script>
<style lang="scss">
  .apply-dialog {
    margin-bottom: auto;
    .el-dialog__body{
      padding-bottom: 10px;
    }
    .el-select,.el-date-editor{
      width: 100%;
    }
    .description{
      .el-form-item{
        &__content{
          line-height: 1
        }
      }
    }
  }
</style>
