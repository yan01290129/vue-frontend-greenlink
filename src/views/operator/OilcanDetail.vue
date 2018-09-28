<template>
  <div class="container">
    <el-breadcrumb separator=">" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/company/mng' }">客户管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/company/mng' , query: { companyName: oilcan.companyName } }">{{oilcan.companyName}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{oilcan.id}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20" class="oilcan-detail-wrap" v-loading="loading">
      <el-col :span="20" :offset="2">
        <el-row :gutter="20">
          <el-col :span="6" class="left-wrap">
            <div class="surplus-box">
              <template v-if="oilcan.sensor.oilcanIotProductType=='CS'">
                                  <el-progress :width="58" type="circle" :percentage="oilcan.sensor.height,oilcan.sensor.oilcanHeight | percent"  :status="oilcan.sensor.height / oilcan.sensor.oilcanHeight <= 0.25 ? 'exception' :'success'" :show-text="false"></el-progress><!--:class="{'insufficient-progress':oilcan.sensor.height / oilcan.sensor.oilcanHeight <= 0.25}"-->
                                  <div class="info">
                                      <strong>{{oilcan.sensor.height,oilcan.sensor.oilcanHeight | percent}}%</strong>
                                      <label>余油比例</label>
                                  </div>
                        </template>

                        <template v-else>
                          <el-progress :width="58" type="circle" :percentage="oilcan.sensor.volume,oilcan.sensor.oilcanVolume | percent" :status="(oilcan.sensor.volume <= 170 && oilcan.sensor.oilcanVolume == 700) || (oilcan.sensor.volume <= 300 && oilcan.sensor.oilcanVolume >= 1250) ? 'exception' :'success'"
                            :show-text="false">
                          </el-progress>
                          <div class="info">
                            <strong>{{oilcan.sensor.volume,oilcan.sensor.oilcanVolume | percent}}%</strong>
                            <label>余油比例</label>
                          </div>
                        </template>
                        </div>
                        <div class="height-box common-box" v-if="oilcan.sensor.oilcanIotProductType!='CS'">
                            <label>液位信息/mm</label>
                            <strong>{{oilcan.sensor.height}}</strong>
                            <span class="icon blue">
                                <i class="iconfont el-icon-liquid-indicator"></i>
                            </span>
                        </div>
                        <ul class="params-box common-box">
                            <li>
                                <label>电池状态</label>
                                <strong>
                                    <div class="badge" :class="oilcan.sensor.battery > 20 ? 'badge-green' : 'badge-danger'">{{oilcan.sensor.battery > 20 ? '健康' : '异常'}}</div>
                                </strong>
                            </li>
                            <li>
                                <label>环境温度</label>
                                <strong>{{oilcan.sensor.temperature}}℃</strong>
                                <span class="icon">
                                    <i class="iconfont el-icon-tree"></i>
                                </span>
                            </li>
                            <li>
                                <label>电压／mv</label>
                                <strong>{{oilcan.sensor.voltage}}</strong>
                                <span class="icon yellow">
                                    <i class="iconfont el-icon-lightning"></i>
                                </span>
                            </li>
                        </ul>
                    </el-col>
                    <el-col :span="18" class="right-wrap">
                        <div class="right-box">
                            <div class="title-box">
                                {{oilcan.id}}
                                <span class="status">
                                    <i class="iconfont el-icon-dot success-dot " :class="{'error-dot':!oilcan.sensor.online}"></i>
                                    {{oilcan.sensor.online?'在线':'离线'}}
                                </span>
                                <div class="btn-box pull-right">
                                <el-button type="text" @click="applyAftermarket" v-if="oilcan.allStatus===1&&deviceMaintainApplicationCreateEnable">
                                  <i class="iconfont el-icon-add"></i>申请售后
                                </el-button>
                              </div>
                            </div>
                            <el-row class="content-box">
                                <el-col class="top-box">
                                    <div class="oilcan-chart-wrap">
                                        <div class="info" v-if="oilcan.sensor.oilcanIotProductType=='CS'">
                                            <strong>{{oilcan.sensor.height}}</strong>
                                            <label>剩余油量／mm</label>
                                        </div>
                                        <div class="info" v-if="oilcan.sensor.oilcanIotProductType!='CS'">
                                            <strong>{{oilcan.sensor.volume}}</strong>
                                            <label>剩余油量／L</label>
                                        </div>
                                        <el-water-wave :range-value="olicanPercentage" :width="420" :height="130" :color="oilcanColor"></el-water-wave>
                                    </div>
                                    <ul class="number-box">
                                        <li>
                                            <div class="view-box" v-show="changeSensorVisible==false">
                                                <div class="info">
                                                    <label>传感器编号</label>
                                                    <div>
                                                        {{oilcan.sensorId}}
                                                        <!-- <i class="iconfont el-icon-edit" @click="openChangeSensor" v-if="changeSensorEnable"></i> -->
                                                    </div>
                                                </div>
                                                <i class="iconfont el-icon-facility iconfont-right"></i>
                                            </div>
                                            <div class="edit-box"  v-show="changeSensorVisible==true">
                                                <label>传感器编号</label>
                                                <el-form :model="sensorForm" :rules="sensorRules" ref="sensorForm" inline>
                                                    <el-form-item prop="sensorId">
                                                        <el-input size="small" v-model.trim="sensorForm.sensorId" placeholder="请输入传感器编号"></el-input>
                                                    </el-form-item>
                                                    <el-form-item>
                                                        <el-button size="small" @click="sensorCancel()">取 消</el-button>
                                                        <el-button size="small" type="primary" @click="sensorSubmit()">确 定</el-button>
                                                    </el-form-item>
                                                </el-form>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="view-box" v-show="changeBaseStationVisible==false">
                                                <div class="info">
                                                    <label>基站编号</label>
                                                    <div>
                                                        {{oilcan.baseStationId}}
                                                        <!-- <i class="iconfont el-icon-edit" @click="openChangeBaseStation" v-if="changeBaseStationEnable"></i> -->
                                                    </div>
                                                </div>
                                                <i class="iconfont el-icon-signal iconfont-right"></i>
                                            </div>
                                            <div class="edit-box"  v-show="changeBaseStationVisible==true">
                                                <label>基站编号</label>
                                                <el-form :model="baseStationForm" :rules="baseStationRules" ref="baseStationForm" inline>
                                                    <el-form-item prop="baseStationId">
                                                        <el-input size="small" v-model.trim="baseStationForm.baseStationId" placeholder="请输入基站编号"></el-input>
                                                    </el-form-item>
                                                    <el-form-item>
                                                        <el-button size="small" @click="baseStationCancel()">取 消</el-button>
                                                        <el-button size="small" type="primary" @click="baseStationSubmit()">确 定</el-button>
                                                    </el-form-item>
                                                </el-form>
                                            </div>
                                        </li>
                                    </ul>
                                </el-col>
                                <el-col :span="24">
                                    <el-row>
                                        <label>装罐地址</label>
                                        <p class="text">{{oilcan.address}}</p>
                                    </el-row>
                                    <el-row>
                                        <label>客户名称</label>
                                        <p class="text">{{oilcan.companyName}}</p>
                                    </el-row>
                                    <el-row>
                                      <el-col :span="24" class="category__wrap">
                                        <label>油品类型</label>
                                        <div class="edit-category__wrap" v-if="isEditCategory&&oilcanUpdateCategoryEnable">
                                          <el-cascader size="small" 
                                              :options="categoryOptions" 
                                              v-model="categoryForm.category" 
                                              @change="changeCategory" 
                                              :props="props" 
                                              placeholder="请选择油品类型">
                                            </el-cascader>
                                            <!-- <el-select v-model="categoryForm.categoryId" size="small" @change="categoryChange" placeholder="请选择油品类型">
                                              <el-option v-for="item in applyOilTypeList" :key="item.value" :label="item.text" :value="item.value"></el-option>
                                            </el-select> -->
                                            &nbsp;&nbsp;
                                            <el-button size="mini" :disabled="saveCategoryLoading" @click="reset">取 消</el-button>
                                            <el-button type="success" size="mini" :loading="saveCategoryLoading" @click="saveCategory">保 存</el-button>
                                        </div>
                                        <div></div>
                                        <p class="text" v-if="!isEditCategory">{{oilcan.categoryName}}&nbsp;</p>
                                        <i class="iconfont el-icon-edit edit-category__btn" v-if="!isEditCategory&&oilcanUpdateCategoryEnable" @click="editCategory"></i>
                                      </el-col>
                                    </el-row>
                                    <el-row>
                                       <el-col :span="8">
                                            <label>设备型号</label>
                                            <p class="text">{{oilcan.iotProduct.name}}</p>
                                        </el-col>
                                        <el-col :span="8">
                                            <label>油罐容量</label>
                                            <p class="text">{{oilcan.sensor.oilcanVolume}}L</p>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <label>特殊要求</label>
                                        <p class="text">{{oilcan.specialDescription || '无'}}</p>
                                    </el-row>
                                    <el-row>
                                        <label>备注信息</label>
                                        <p class="text" v-show="changeRemarkVisible==false">
                                            {{oilcan.remark || '无'}}
                                            <!-- <i class="iconfont el-icon-edit" @click="openChangeRemark" v-if="updateOilcanRemarkEnable"></i> -->
                                        </p>
                                        <el-form v-show="changeRemarkVisible==true" :model="remarkForm" :rules="remarkRules" ref="remarkForm" inline>
                                            <el-form-item prop="remark">
                                                <el-input size="small" v-model.trim="remarkForm.remark" placeholder="请输入6字以内的备注信息"></el-input>
                                            </el-form-item>
                                            <el-form-item>
                                                <el-button size="small" @click="remarkcancel()">取 消</el-button>
                                                <el-button size="small" type="primary" @click="remarkSubmit()">确 定</el-button>
                                            </el-form-item>
                                        </el-form>
                                    </el-row>
                                    
                                </el-col>
                                <el-col :span="24" class="border-top">
                                    <el-row>
                                        <el-col :span="8">
                                            <label>生产批次</label>
                                            <p class="text">{{oilcan.purchaseOrder.id}}</p>
                                        </el-col>
                                        <el-col :span="16">
                                            <label>生产厂商</label>
                                            <p class="text">{{oilcan.purchaseOrder.producer}}</p>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <label>监制单位</label>
                                        <p class="text">{{oilcan.purchaseOrder.superviser}}</p>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="8">
                                            <label>安装时间</label>
                                            <p class="text">{{oilcan.allStatus==1?oilcan.installTime:'未安装完成'}}</p>
                                        </el-col>
                                        <el-col :span="16">
                                            <label>安装单位</label>
                                            <p class="text">{{oilcan.installUnit}}</p>
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <ApplyMaintainDialog :visible.sync="ApplyDialogVisible" :detail="oilcan"/>
    </div>
</template>
<script>
  import {
    apiOilcanDetail,
    apiSensorChange,
    apiBaseStationChange,
    apiOilcanUpdateRemark
  } from '@/api'
  import validate from '../../utils/validate'
  import ApplyMaintainDialog from "./components/ApplyMaintainDialog"
  export default {
    components:{
      ApplyMaintainDialog
    },
    data() {
      let ValidateSensorExist = (rule, value, callback) => {
        if (this.errorSensorMsg.length > 0) {
          callback(new Error(this.errorSensorMsg))
        } else {
          callback();
        }
      };
      let ValidateBaseStationExist = (rule, value, callback) => {
        if (this.errorBaseStationMsg.length > 0) {
          callback(new Error(this.errorBaseStationMsg))
        } else {
          callback();
        }
      };
      return {
        loading: false,
        oilcan: {
          sensor: {},
          iotProduct: {},
          purchaseOrder: {}
        },
        olicanPercentage: 0,
        oilcanColor: '#d9534f',
        /**sensor */
        changeSensorVisible: false,
        errorSensorMsg: '',
        sensorForm: {
          oilcanId: this.$route.params.id,
          sensorId: '',
        },
        sensorRules: {
          sensorId: [{
              validator: validate.sensorIdRule,
              trigger: 'change'
            },
            {
              validator: ValidateSensorExist,
              trigger: 'change'
            },
          ],
        },
        /**bsstation */
        changeBaseStationVisible: false,
        errorBaseStationMsg: '',
        baseStationForm: {
          oilcanId: this.$route.params.id,
          baseStationId: '',
        },
        baseStationRules: {
          baseStationId: [{
              validator: validate.baseStationIdRule,
              trigger: 'change'
            },
            {
              validator: ValidateBaseStationExist,
              trigger: 'change'
            },
          ],
        },
        /**remark */
        changeRemarkVisible: false,
        remarkForm: {
          oilcanId: this.$route.params.id,
          remark: '',
        },
        remarkRules: {
          remark: [{
            min: 1,
            max: 4,
            message: '请输入6字以内的特殊要求',
            trigger: 'change'
          }, ],
        },
        detailOilcanEnable: false,
        changeSensorEnable: false,
        changeBaseStationEnable: false,
        updateOilcanRemarkEnable: false,
        deviceMaintainApplicationCreateEnable:false,
        ApplyDialogVisible:false,
        applyOilTypeList:[],
        categoryForm:{
          categoryName:'',
          categoryId:'',
          category:[]
        },
        isEditCategory:false,
        saveCategoryLoading:false,
        oilcanUpdateCategoryEnable:false,
        props: {
          value: "id",
          label: "name",
          children: "children"
        },
        categoryOptions:[]
      }
    },
    methods: {
      async getOilcanDetail() {
        if (!this.detailOilcanEnable) return;
        this.loading = true
        await apiOilcanDetail({
          id: this.$route.params.id
        }).then((res) => {
          this.loading = false
          let isWarning = false;
          this.oilcan = res.data;
          const {categoryId,categoryName,id} = res.data
           let LastLevel = this.getLastLevel(this.categoryOptions,categoryId)
          let category = []
          if(LastLevel.parentId){
            category.push(LastLevel.parentId)
          }
          category.push(LastLevel.id)
          this.categoryForm = {categoryId,categoryName,oilcanId:id,category} 
          this.olicanPercentage = this.oilcan.sensor.oilcanIotProductType == 'CS' ? (this.oilcan.sensor.height / this.oilcan.sensor.oilcanHeight * 100) : (this.oilcan.sensor.volume / this.oilcan.sensor.oilcanVolume * 100);
          if ((this.oilcan.sensor.oilcanIotProductType == 'CS' && (this.oilcan.sensor.height / this.oilcan.sensor.oilcanHeight <= 0.25)) ||
            (this.oilcan.sensor.oilcanIotProductType != 'CS' && ((this.oilcan.sensor.volume <= 170 && this.oilcan.sensor.oilcanVolume == 700) || (this.oilcan.sensor.volume <= 300 && this.oilcan.sensor.oilcanVolume >= 1250)))) {
            isWarning = true;
          }
          this.oilcanColor = isWarning ? '#d9534f' : '#4eb940';
        }).catch((err) => {
          this.loading = false          
          this.$message.error(err.message);
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
      /**sensor */
      openChangeSensor() {
        this.changeSensorVisible = true;
        this.sensorForm.sensorId = this.oilcan.sensorId;
      },
      sensorSubmit() {
        this.$refs.sensorForm.validate((valid) => {
          if (!valid) return
          if (this.sensorForm.sensorId == this.oilcan.sensorId) return this.sensorCancel();
          apiSensorChange(this.sensorForm).then((res) => {
            this.$message.success('修改传感器编号成功！');
            this.getOilcanDetail();
            this.changeSensorVisible = false;
          }).catch((err) => {
            this.errorSensorMsg = err.message;
            this.$refs.sensorForm.validateField('sensorId');
          })
        })
      },
      sensorCancel() {
        this.changeSensorVisible = false;
      },
      /**baseStation */
      openChangeBaseStation() {
        this.changeBaseStationVisible = true;
        this.baseStationForm.baseStationId = this.oilcan.baseStationId;
      },
      baseStationSubmit() {
        this.$refs.baseStationForm.validate((valid) => {
          if (!valid) return
          if (this.baseStationForm.baseStationId == this.oilcan.baseStationId) return this.baseStationCancel();
          apiBaseStationChange(this.baseStationForm).then((res) => {
            this.$message.success('修改基站编号成功！');
            this.getOilcanDetail();
            this.changeBaseStationVisible = false;
          }).catch((err) => {
            this.errorBaseStationMsg = err.message;
            this.$refs.baseStationForm.validateField('baseStationId');
          })
        })
      },
      baseStationCancel() {
        this.changeBaseStationVisible = false;
      },
      /**remark */
      openChangeRemark() {
        this.changeRemarkVisible = true;
        this.remarkForm.remark = this.oilcan.remark;
      },
      remarkSubmit() {
        this.$refs.remarkForm.validate((valid) => {
          if (!valid) return
          apiOilcanUpdateRemark(this.remarkForm).then((res) => {
            this.$message.success('修改备注成功！');
            this.getOilcanDetail();
            this.changeRemarkVisible = false;
          }).catch((err) => {
            this.$message.error(err.message)
          })
        })
      },
      remarkcancel() {
        this.changeRemarkVisible = false;
      },
      async applyAftermarket() {
        const {data: {response, msg}} = await this.$http.deviceMaintainApplicationCheckOilcan(this.oilcan.id).catch( err=> { console.error(err.message) })
         if (!response) {
           this.$message.error(msg)
           return
         }
        this.ApplyDialogVisible = true
      },
      async getApplyOilTypeList() {
        const {data} = await this.$http.apiProductList().catch(err => {console.error(err.message)})
        this.applyOilTypeList = data.list.map(item => {
          return {
            text: item.name,
            value: item.id
          }
        })
      },
      categoryChange(val) {
        if (val) {
          let result = this.filter(this.applyOilTypeList, val, 'value')
          this.categoryForm.categoryName = result.text
        }
      },
      filter(arr, val, key = 'id') {
        let newArr = arr.filter(item => {
          return item[key] == val
        })
        if (newArr) return newArr[0]
        return []
      },
      editCategory(){
        this.isEditCategory = true
      },
      reset(){
          const {categoryId,categoryName,id} = this.oilcan
          let LastLevel = this.getLastLevel(this.categoryOptions,categoryId)
          let category = []
          if(LastLevel.parentId){
            category.push(LastLevel.parentId)
          }
          category.push(LastLevel.id)
          this.categoryForm = {categoryId,categoryName,category,oilcanId:id} 
          this.isEditCategory = false          
      },
      async saveCategory(){
        if(this.oilcan.categoryId ===this.categoryForm.categoryId){
          this.$message.success('保存成功！')
          this.isEditCategory = false    
          return false
        }
        this.saveCategoryLoading = true
        const {data} = await this.$http.oilcanUpdateCategory(this.categoryForm).catch(err=>{
          this.$message.error('保存失败！')
        this.saveCategoryLoading = false          
        })
        this.$message.success('保存成功！')
        this.isEditCategory = false   
        this.saveCategoryLoading = false                   
        this.getOilcanDetail()
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
        this.categoryForm.categoryId = value[value.length - 1]      
        this.categoryForm.categoryName = this.filterCategoryName(value)
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
    },
    async mounted() {
      this.detailOilcanEnable = this.$authorityAction('/api/oilcan/detail/');
      this.changeSensorEnable = this.$authorityAction('/api/sensor/change');
      this.changeBaseStationEnable = this.$authorityAction('/api/baseStation/change');
      this.updateOilcanRemarkEnable = this.$authorityAction('/api/oilcan/update/remark');
      this.deviceMaintainApplicationCreateEnable = this.$authorityAction('/api/deviceMaintainApplication/create')
      this.oilcanUpdateCategoryEnable = this.$authorityAction('/api/oilcan/update/category')
      await this.getCategoryListNoAuth()
      await this.getOilcanDetail()
      // await this.getApplyOilTypeList()
    },
    watch: {
      "sensorForm.sensorId": {
        handler(newValue, oldValue) {
          if (newValue.length > 0) {
            this.errorSensorMsg = '';
            this.$refs.sensorForm.validateField('sensorId');
          }
        }
      },
      "baseStationForm.baseStationId": {
        handler(newValue, oldValue) {
          if (newValue.length > 0) {
            this.errorBaseStationMsg = '';
            this.$refs.baseStationForm.validateField('baseStationId');
          }
        }
      }
    }
  }
</script>
