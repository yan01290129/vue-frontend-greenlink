<template>
  <div class="app-container">
    <div class="box-top">
      <el-row>
        <el-col :span="5" :offset="1">
          <div class="tip tip1">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAoCAYAAAC8cqlMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxYjMwY2RkMS0yMGI5LTQyMmMtYTkwYy01Y2MyMmQwZDU2MGQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTJFRTlDMEU4Qzc4MTFFN0JFNkZFN0Y5NEI0RDBEMDMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTJFRTlDMEQ4Qzc4MTFFN0JFNkZFN0Y5NEI0RDBEMDMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpjYTBhMWQxNi1mZjhjLTRmMTctOGU0Yi1lNmY2NGU4NjQ1OTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MWIzMGNkZDEtMjBiOS00MjJjLWE5MGMtNWNjMjJkMGQ1NjBk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" alt="图片加载失败">
            <div class="amount-box">
              <span>客户总数</span>
              <div class="amounttext">
                本月新增<em>5</em>
              </div>
            </div>
            <span class="bigtext">{{dashboard.operatorCompanyNumber}}</span>
            <a href="#/company/mng" class="shade"><i class="el-icon-download"></i></a>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="tip tip2">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAoCAYAAAC8cqlMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxYjMwY2RkMS0yMGI5LTQyMmMtYTkwYy01Y2MyMmQwZDU2MGQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTJFRTlDMTY4Qzc4MTFFN0JFNkZFN0Y5NEI0RDBEMDMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTJFRTlDMTU4Qzc4MTFFN0JFNkZFN0Y5NEI0RDBEMDMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpjYTBhMWQxNi1mZjhjLTRmMTctOGU0Yi1lNmY2NGU4NjQ1OTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MWIzMGNkZDEtMjBiOS00MjJjLWE5MGMtNWNjMjJkMGQ1NjBk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" alt="图片加载失败">
            <div class="amount-box">
              <span>今日订单数</span>
            </div>
            <span class="bigtext">{{dashboard.operatorApplyOilcanNumber}}</span>
            <a href="#/company/mng" class="shade"><i class="el-icon-download"></i></a>
          </div>
        </el-col>
        <el-col :span="8" :offset="2">
          <div class="tip tip3">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAoCAYAAAC8cqlMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxYjMwY2RkMS0yMGI5LTQyMmMtYTkwYy01Y2MyMmQwZDU2MGQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTJFRTlDMTY4Qzc4MTFFN0JFNkZFN0Y5NEI0RDBEMDMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTJFRTlDMTU4Qzc4MTFFN0JFNkZFN0Y5NEI0RDBEMDMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpjYTBhMWQxNi1mZjhjLTRmMTctOGU0Yi1lNmY2NGU4NjQ1OTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MWIzMGNkZDEtMjBiOS00MjJjLWE5MGMtNWNjMjJkMGQ1NjBk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" alt="图片加载失败">
            <div class="amount-box">
              <span>本月成交总额(万元)</span>
            </div>
            <span class="bigtext">{{dashboard.operatorOilcanNumber}}</span>
            <a href="#/company/mng" class="shade"><i class="el-icon-download"></i></a>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="box-top">
      <el-row>
        <el-col :span="10" :offset="1">
          <div class='shijian'>待处理事项</div>
          <div class="tip tipq q1">
            <div class='flex'>
              <div class="amount-box">
                <span>客户总数</span>
              </div>
              <span class="">9</span>
            </div>
            <div class='flex'>
              <div class="amount-box">
                <span>客户总数</span>
              </div>
              <span class="">9</span>
            </div>
            <div class='flex'>
              <div class="amount-box">
                <span>客户总数</span>
              </div>
              <span class="">9</span>
            </div>
            <a href="#/company/mng" class="shade"><i class="el-icon-download"></i></a>
          </div>
        </el-col>
        <el-col :span="4" :offset="2">
          <div class="tip tipq q2">
            <div class="amount-box">
              <span>今日订单数</span>
            </div>
            <span class="">1</span>
            <a href="#/company/mng" class="shade"><i class="el-icon-download"></i></a>
          </div>
        </el-col>
        <el-col :span="4" :offset="2">
          <div class="tip tipq q3">
            <div class="amount-box">
              <span>今日订单数</span>
            </div>
            <span class="">1</span>
            <a href="#/company/mng" class="shade"><i class="el-icon-download"></i></a>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import axios from "@/api";
export default {
  data() {
    return {
      dashboard: ''
    };
  },
  methods: {
    getApi() {
      this.loading = true;
      axios.homepage()
        .then(res => {
           this.dashboard = res.data
          console.log(res)
        })
        .catch(err => {
          console.error("异常")
        })
    },
  },
  mounted () {
    this.getApi()
  }
};
</script>

<style scoped>

.flex{
  display: flex;
}

.app-container {
  padding-top: 20px;
}
.box-top {
  padding: 20px 0;
}

.tip {
  position: relative;
  display: flex;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: white;
  padding: 20px;
  border: 1px solid #ebeef5;
  color: #303133;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  align-items: center;
  height: 6rem;
}
.tip:before {
  content: "";
  display: block;
  position: absolute;
  height: 100%;
  width: 4px;
  left: 0;
  top: 0;
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
}
.tip > .shade {
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: all 0.4s ease;
  border-radius: 2px;
  cursor: pointer;
  color: #fff;
}
.shade:hover {
  opacity: 1;
  color: white;
}
.amount-box {
  flex: 1;
  padding: 0 1rem;
}
.amounttext {
  font-size: 0.6rem;
  margin-top: 1rem;
}
.bigtext {
  font-size: 2rem;
}

/**/

.tip1:before {
  background: #4eb940;
}
.tip1 > .shade {
  background: rgba(78, 185, 64, 0.8);
}
.tip2:before {
  background: rgba(252, 191, 25, 0.8);
}
.tip2 > .shade {
  background: rgba(252, 191, 25, 0.8);
}
.tip3:before {
  background: rgba(30, 152, 255, 0.8);
}
.tip3 > .shade {
  background: rgba(30, 152, 255, 0.8);
}
.tipq > .shade {
  background-color: hsla(0, 0%, 100%, 0.9);
}
.tipq > .shade > i {
  font-size: 2rem;
  color: black;
}
.shijian {
  height: 3rem;
  line-height: 3rem;
  border-bottom: 1px solid;
  margin-bottom: 2rem;
}
.q1 {
  height: 13rem;
  flex-direction: column;
}
.q2 {
  height: 18rem;
}
.q3 {
  height: 18rem;
}
.flex {
  flex: 1;
  align-items: center;
}
</style>
