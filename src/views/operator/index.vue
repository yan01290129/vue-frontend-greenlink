<template>
  <div class="app-container">
    <div class="wrap">
      <div class="top-wrap">
            <el-input size="small" placeholder="搜索运营商名称" v-model="searchinput" clearable @change="searchChange" class="search-input">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
            <el-button size="small" type="primary" @click="dialogVisible = true" class="rightbut">
              <i class="el-icon-plus"></i>&nbsp;&nbsp;新增运营商
            </el-button>
        </div>
        <el-table
        :data="tableData"
        v-loading="loading"
        style="width: 100%">
        <el-table-column
            prop="createTime"
            label="开户日期"
            width="180">
        </el-table-column>
        <el-table-column
            prop="operatorName"
            label="运营商名称"
            width="180">
        </el-table-column>
        <el-table-column
            prop="contactsName"
            label="联系人姓名">
        </el-table-column>
        <el-table-column
            prop="contactsPhone"
            label="联系人电话">
        </el-table-column>
        <el-table-column
            prop="contactsClass"
            label="运营商分类">
        </el-table-column>
        </el-table>
      <div class="bottom-wrap">
        <el-pagination background
          layout="total, prev, pager, next, jumper"
          :total="count" :page-size="pagesize" :current-page.sync="currentPage"
          @current-change="handleCurrentChange" >
        </el-pagination>
      </div>
    </div>
    <addDialog :visible.sync="dialogVisible" />
  </div>
</template>
<script>
// import { apiOperator } from "@/api/operator"
import addDialog from './addDialog'
export default {
  components: {
    addDialog
  },
  data() {
    return {
        searchinput: '',
        loading: false,
        dialogVisible: false,
        tableData: null,
        count: 0,
        pagesize: 10,
        currentPage: 1
    }
  },
  methods: {
    getApi() {
      this.loading = true;
      apiOperator(this.currentPage, this.pagesize, this.searchinput)
        .then(res => {
          this.tableData = res.data.list
          this.count = res.data.operatorCount
          this.loading = false;
        })
        .catch(err => {
          console.error("异常")
        })
    },
    searchChange () {
      this.getApi()
    },
    handleCurrentChange(val) {
      this.getApi()
    }
  },
  mounted () {
    this.handleCurrentChange()
  }
}
</script>

<style>
.wrap{
    box-shadow: 0 0 8px rgba(0,0,0,.2);
    background-color: white;
}
.top-wrap{
  padding: 12px 20px;
    height: 3.5rem;
    border-bottom: 1px solid #e9edf2;
}
.search-input{
    width: 200px;
}
.el-table th, .el-table tr{
  height: 3.5rem;
}
.rightbut{
  float: right;
}
.bottom-wrap{
  padding: 12px 20px;
  text-align: center;
}
.el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
  background-color: white;
  border: 1px solid #e9edf2;
  border-radius: 4px;
}
.el-table{
  color: #909399;
}
.cell{
  text-align: center;
}
.has-gutter tr th{
  background-color: #f5f7fa;
}

.has-gutter tr th> .cell{
  font-weight: initial;
}
.el-pagination__total{
  float: left;
}
</style>
