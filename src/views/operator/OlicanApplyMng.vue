<template>
<div class="olican-apply__mng">
  <div class="olican-list__content">
    <div class="opt-wrap">
      <!-- <el-search-input :search-value.sync="search.companyName" @change="companyInputChange" inline placeholder="按客户名称搜索"></el-search-input> -->
      <div class="btn-box pull-right">
        <el-button type="primary" @click="dialogVisible = true" v-if="oilCanApplicationCreateEnable">
          <i class="iconfont el-icon-plus"></i>申请油罐
        </el-button>
      </div>
    </div>
    <div class="table-wrap">
      <el-table :data="oilCanApplicationList.list" style="width: 100%" ref="table"
      @filter-change="changeFilter" v-loading.body="tableLoading">
        <el-table-column label="申请时间" width="120" fixed>
          <template slot-scope="scope">
              {{scope.row.createTime | formatDate('yyyy-MM-dd')}}
          </template>
          </el-table-column>
          <el-table-column prop="companyName" label="客户名称" width="300">
          </el-table-column>
          <el-table-column prop="iotProductName" label="设备型号" width="180" :filters="applyOilcanCapacityList" :filter-multiple="false" :filtered-value="deviceFilVal" filter-placement="bottom-start" :render-header="renderHeader" column-key="iotProductId">
          </el-table-column>
          <!-- <el-table-column prop="categoryName" label="油品类型" width="180" :filters="applyOilTypeList" :filter-multiple="false" :filtered-value="oilTypeFilVal" filter-placement="bottom-start" :render-header="renderHeader" column-key="productId">
          </el-table-column> -->
          <el-table-column prop="address" label="装罐地址">
          </el-table-column>
          <!-- <el-table-column prop="contactName" label="联系人" width="100">
          </el-table-column>
          <el-table-column prop="contactPhone" label="联系电话" width="160">
          </el-table-column> -->
          <el-table-column prop="status" label="状态" width="210" :filters="statusFiltersList" :filter-multiple="false" :filtered-value="statusFilVal" filter-placement="bottom-start" :render-header="renderHeader" column-key="status">
            <template slot-scope="scope">
              <i class="iconfont el-icon-dot" :class="scope.row.status | filterText(statusFiltersList,'icon')"></i>
              {{scope.row.status | filterText(statusFiltersList)}}
              <span class="operation-btn"  v-if="scope.row.status===0&&(oilCanApplicationAcceptEnable || oilCanApplicationRejectEnable)">
                <el-button @click="check(scope.row,$event)">受理</el-button>
              </span>
              <el-tooltip effect="dark" content="油罐申请详情" placement="top">
                <a href="javascript:void(0);" 
                  class="pull-right skip-detail" 
                  :class="{'offset-site':scope.row.status===0&&(oilCanApplicationAcceptEnable || oilCanApplicationRejectEnable)}" 
                  @click="openClick(scope.row)"><i class="iconfont el-icon-order"></i></a>
              </el-tooltip>
            </template>
        </el-table-column>
        <div slot="empty">
          <!-- <el-empty :visible="true"></el-empty> -->
        </div>
      </el-table>
      <div class="table-page">
        <!-- <el-page @current-change="changePage" :current-page="pageIndex" :page-size="10" :total="oilCanApplicationList.count" layout="total, prev, pager, next, jumper"></el-page> -->
      </div>
    </div>
  </div>
  <OlicanApplyDialog :visible.sync="dialogVisible" :applyOilcanCapacityList="applyOilcanCapacityList" @refresh="refresh"/>
  <Confirm :visible.sync="confirmVisible" :row="active" @refresh="refresh"/>
  <OlicanApplyDetailDialog :visible.sync="applyDetailVisible" :applyOilTypeList="applyOilTypeList" :applyOilcanCapacityList="applyOilcanCapacityList" :row="active" @refresh="refresh"/>
</div>
</template>

<script>
import OlicanApplyDialog from './components/OlicanApplyDialog'
import Confirm from './components/Confirm'
import OlicanApplyDetailDialog from './components/OlicanApplyDetailDialog'
export default {
  components: {
    OlicanApplyDialog,
    Confirm,
    OlicanApplyDetailDialog
  },
  data() {
    return {
      tableLoading:false,
      search: {
        companyName: "",
        iotProductId: null,
        productId: null,
        status: null
      },
      pageIndex: 1,
      oilCanApplicationList: {
        list: [],
        count: 0
      },
      deviceFilVal: [],
      oilTypeFilVal: [],
      statusFiltersList: [
        {text: "申请中",value: 0,icon: 'success-dot'}, 
        {text: "待受理",value: 1,icon: 'warning-dot'},
        {text: "待安装",value: 3,icon: 'info-dot'},
        {text: "已完成",value: 2,icon: 'info-dot'},
        {text: "驳回",value: -2,icon: ''},
        {text: "平台驳回",value: -1,icon: ''},
        {text: "平台取消", value: -3,icon: ''}
      ],
      statusFilVal: [],
      dialogVisible: false,
      confirmVisible:false,
      applyOilTypeList: [],
      applyOilcanCapacityList: [],
      active:{},
      oilCanApplicationListEnable:false,
      oilCanApplicationCreateEnable:false,
      oilCanApplicationAcceptEnable:false,
      oilCanApplicationRejectEnable:false,
      applyDetailVisible:false
    };
  },
  methods: {
    check(row,$event){
      this.active = {...row}
      this.confirmVisible = true
    },
    companyInputChange(val) {
      this.getOilCanApplicationList()
    },
    changeFilter(filters) {
      this.search.iotProductId = this.deviceFilVal ? this.deviceFilVal[0] : null;
      this.search.productId = this.oilTypeFilVal? this.oilTypeFilVal[0] : null;
      this.search.status = this.statusFilVal ? this.statusFilVal[0] : null;
      this.pageIndex = 1
      this.getOilCanApplicationList()
    },
    renderHeader(createElement, {
      column
    }) {
      let text = "";
      column.filters.forEach((v, i) => {
        if (v.value == column.filteredValue) {
          text = v.text;
        }
      });
      return createElement("span", [
        column.filteredValue.length > 0 ? text : column.label
      ]);
    },
    changePage(page) {
      this.pageIndex = page
      this.getOilCanApplicationList()
    },
    getApplyOilTypeList() {
      this.$http.apiProductList().then(res => {
        this.applyOilTypeList = res.data.list.map(item => {
          return {
            text: item.name,
            value: item.id
          }
        })
      }).catch(err => {
        console.error(err.message)
      })
    },
    getApplyOilcanCapacityList(type = 1) {
      this.$http.apiIotProductList({
        type
      }).then(res => {
        this.applyOilcanCapacityList = res.data.list.map(item => {
          return {
            text: item.name,
            value: item.id
          }
        })
      }).catch(err => {
        console.error(err.message)
      })
    },
    getOilCanApplicationList() {
      this.tableLoading = true
      if(!this.oilCanApplicationListEnable){
        this.oilCanApplicationList = {
          list:[],
          count:0
        }
        this.tableLoading = false
        return false
      }
      let params = this.search
      this.$http.oilCanApplicationList({
        pageSize: 10,
        pageIndex: this.pageIndex - 1,
        ...params
      }).then(res => {
        this.oilCanApplicationList = res.data
        this.tableLoading = false
      }).catch(err => {
        this.tableLoading = false
        console.error(err.message)
      })
      setTimeout(() => { this.tableLoading = false }, 3000)
    },
    refresh(status){
      if(status) {
        this.$refs.table.clearFilter()
        this.pageIndex = 1
        this.search = {
          companyName: "",
          iotProductId: null,
          productId: null,
          status: null
        }
      }
      this.getOilCanApplicationList()
    },
    openClick(row){
      this.active = {...row}
      this.applyDetailVisible = true
    }
  },
  mounted() {
    this.$nextTick(()=>{
      this.oilCanApplicationListEnable = this.$authorityAction("/api/oilCanApplication/list")
      this.oilCanApplicationCreateEnable = this.$authorityAction("/api/oilCanApplication/create")
      this.oilCanApplicationAcceptEnable = this.$authorityAction("/api/oilCanApplication/accept")
      this.oilCanApplicationRejectEnable = this.$authorityAction("/api/oilCanApplication/reject")
      // this.getApplyOilTypeList()
      this.getApplyOilcanCapacityList()
      this.getOilCanApplicationList()
    })
  }
};
</script>
