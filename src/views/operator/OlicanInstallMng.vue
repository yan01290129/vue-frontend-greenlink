<template>
<div class="olican-install__mng">
  <div class="olican-list__content">
    <div class="opt-wrap">
      <!-- <el-search-input :search-value.sync="search.companyName" @change="companyInputChange" inline placeholder="按客户或编号搜索"></el-search-input> -->
      <div class="btn-box pull-right">
        <el-button type="primary" @click="addDialogVisible = true">
          <i class="iconfont el-icon-plus"></i>创建
        </el-button>
      </div>
    </div>
    <div class="table-wrap">
      <el-table :data="olican.list" style="width: 100%" ref="table" highlight-current-row @filter-change="changeFilter">
        <el-table-column prop="createTime" label="申请时间" width="120">
        </el-table-column>
        <el-table-column prop="createTime" label="客户名称" width="180">
        </el-table-column>
        <el-table-column prop="createTime" label="设备型号" width="120"
          :filters="deviceFiltersList"
          :filter-multiple="false"
          :filtered-value="deviceFilVal"
          filter-placement="bottom-start"
          :render-header="renderHeader"
          column-key="device">
        </el-table-column>
        <el-table-column prop="createTime" label="油品类型" width="120"
          :filters="deviceFiltersList"
          :filter-multiple="false"
          :filtered-value="deviceFilVal"
          filter-placement="bottom-start"
          :render-header="renderHeader"
          column-key="device">
        </el-table-column>
         <el-table-column prop="createTime" label="装罐地址" width="180">
        </el-table-column>
        <el-table-column prop="createTime" label="联系人" width="100">
        </el-table-column>
        <el-table-column prop="createTime" label="联系电话" width="100">
        </el-table-column>
        <el-table-column prop="status" label="状态" width="140"
          :filters="statusFiltersList"
          :filter-multiple="false"
          :filtered-value="statusFilVal"
          filter-placement="bottom-start"
          :render-header="renderHeader"
          column-key="status">
          <template slot-scope="scope">
             <i class="iconfont el-icon-dot" :class="scope.row.status | filterText(statusFiltersList,'icon')"></i>
            {{scope.row.status | filterText(statusFiltersList)}}
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="操作" width="180">
        </el-table-column>
        <div slot="empty">
          <!-- <el-empty :visible="true"></el-empty> -->
        </div>
      </el-table>
      <div class="table-page">
        <!-- <el-page @current-change="changePage" :current-page="search.pageIndex" :page-size="10" :total="olican.count" layout="total, prev, pager, next, jumper"></el-page> -->
      </div>
    </div>
  </div>
</div>
</template>

<script>
import OlicanTabs from './OlicanTabs'
export default {
  components: {
    OlicanTabs
  },
  data() {
    return {
      search: {
        companyName: "",
        pageIndex:1
      },
      olican: {
        list: [],
        count:0
      },
      deviceFiltersList:[
        { text: "申请中", value: 0 },
        { text: "待出库", value: 1 },
        { text: "配送中", value: 2 },
        { text: "完成", value: 4 },
        { text: "取消", value: -1 }
      ],
      deviceFilVal:[],
      statusFiltersList:[
        { text: "申请中", value: 0,icon: 'success-dot' },
        { text: "待受理", value: 1,icon: 'warning-dot' },
        { text: "待安装", value: 2,icon: 'info-dot' },
        { text: "已完成", value: 4,icon: 'info-dot' },
        { text: "驳回", value: -1,icon: '' },
        { text: "平台驳回", value: -2,icon: '' }
      ],
      statusFilVal:[],
      addDialogVisible: false
    };
  },
  methods: {
    companyInputChange(val) {
      console.log(val);
    },
    changeFilter() {

    },
    renderHeader(createElement, { column }) {
      let text = "";
      column.filterable.forEach((v, i) => {
        if (v.value == column.filteredValue) {
          text = v.text;
        }
      });
      return createElement("span", [
        column.filteredValue.length > 0 ? text : column.label
      ]);
    },
    changePage(page){
      this.pageIndex = page
    }
  }
};
</script>
