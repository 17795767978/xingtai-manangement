<template>
  <div class="dashboard-container cont-container">
    <el-row>
      <span class="main-title">大数据平台软件系统</span>
    </el-row>
    <el-row class="main-card" :gutter="12">
      <el-col :span="8">
        <el-card class="tab-con" shadow="hover">
          <div class="tab first"></div>
          <h3>运营监控</h3>
          <el-row style="margin-top: 20px;">
            <el-button class="con-button" type="info">
              <i class="fa fa-line-chart" aria-hidden="true"></i>
            </el-button>
            <p style="text-align: center">数据监控平台</p>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="14">
        <el-card class="tab-ans" shadow="hover">
          <h3>运营分析</h3>
          <el-row :gutter="24" style="margin-top: 20px;">
            <el-col :span="8" v-for="(item, index) in operationAnalysis" :key="index">
              <el-button class="ans-button" plain type="info">
                <i :class="item.icon" class="icon-item"></i>
              </el-button>
              <p style="text-align: center">{{item.name}}</p>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'Dashboard',
    data () {
      return {
        operationAnalysis: [
          {name: '总体客流高峰时刻分析', icon: 'fa fa-clock-o'},
          {name: '车辆发车趟次时序图', icon: 'fa fa-area-chart'},
          {name: '区间满载率查询', icon: 'fa fa-search-plus'},
          {name: '线路站点登降量查询', icon: 'fa fa-search'},
          {name: '客流运力运量分析', icon: 'fa fa-bar-chart'},
          {name: 'CAN总线数据实时监测', icon: 'fa fa-television'},
          {name: '智能时刻表推荐', icon: 'fa fa-table'},
          {name: '线路客流高峰断面分析', icon: 'fa fa-external-link-square'},
          {name: '视频监控与报警中心', icon: 'fa fa-exclamation-triangle'},
          {name: '线路站间运行时间分析', icon: 'fa fa-calendar'}

        ]
      };
    }
  };
</script>

<style lang="scss" scoped>
.dashboard-container  {
  .main-title {
    font-size: 20px;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-weight: bold;
  }
  .main-card {
    .tab-con {
      color: #fff;
      background: #409EFF;
      .con-button {
        border: 3px solid #fff;
        display: block;
        margin: 0 auto;
        .fa-line-chart {
          font-size: 100px;
          color: #fff;
        }
      }
    }
    .tab-ans {
      color: #fff;
      background: #409EFF;
      .ans-button {
        border: 3px solid #fff;
        display: block;
        margin: 0 auto;
        .icon-item {
          font-size: 50px;
          color: #000;
        }
      }
    }
    .tab-ser {
      color: #fff;
      background: #E6A23C
    }
  }
}
</style>
