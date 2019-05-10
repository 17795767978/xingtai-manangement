<template>
  <div class="main-chart-wrapper">
    <el-row :gutter="24">
      <el-col :span="6" class="data-style">
        <div class="left-wrapper">
          <div class="person-chart-wrapper">
            <personChart></personChart>
          </div>
          <div class="per-chart-wrapper">
            <perChart></perChart>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="middel-wrapper">
          <mapChart></mapChart>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="right-wrapper">
          <div class="drive-chart-wrapper">
            <driveChart></driveChart>
          </div>
          <div class="level-chart-wrapper">
            <levelChart></levelChart>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import personChart from './echartsComponent/personChart.vue';
import perChart from './echartsComponent/perChart.vue';
import driveChart from './echartsComponent/driveChart.vue';
import levelChart from './echartsComponent/levelChart.vue';
import mapChart from './echartsComponent/mapChart.vue';
export default {
  data () {
    return {
    };
  },
  components: {
    personChart,
    perChart,
    driveChart,
    levelChart,
    mapChart
  }
};
</script>

<style lang="scss" scoped>
.main-chart-wrapper {
  width: 100%;
  margin-top: 20px;
  .left-wrapper {
    width: 100%;
    height: 460px;
    .person-chart-wrapper {
      width: 100%;
      height: 220px;
      margin-bottom: 20px;
      background-color: rgba(0,0,0, 0.65);
      border-radius: 6px;
      box-shadow: -4px -5px 10px #409EFF;
    }
    .per-chart-wrapper {
      width: 100%;
      height: 220px;
      background-color: rgba(0,0,0, 0.65);
      border-radius: 6px;
      box-shadow: -4px -5px 10px #409EFF;
    }
  }
  .middel-wrapper {
    width: 100%;
    height: 460px;
    background-color: rgba(0,0,0, 0.65);
    border-radius: 6px;
    box-shadow: -4px -5px 10px #409EFF;
  }
  .right-wrapper {
    width: 100%;
    height: 460px;
    .drive-chart-wrapper {
      width: 100%;
      height: 220px;
      margin-bottom: 20px;
      background-color: rgba(0,0,0, 0.65);
      border-radius: 6px;
      box-shadow: -4px -5px 10px #409EFF;
    }
    .level-chart-wrapper {
      width: 100%;
      height: 220px;
      background-color: rgba(0,0,0, 0.65);
      border-radius: 6px;
      box-shadow: -4px -5px 10px #409EFF;
    }
  }
}
</style>
