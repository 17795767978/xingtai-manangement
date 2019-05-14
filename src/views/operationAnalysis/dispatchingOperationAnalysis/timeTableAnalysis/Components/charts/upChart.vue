<template>
  <div>
    <div class="up-chart-wrapper"
      ref="upChartWrapper"
      id="up-chart-wrapper"
      :style="{width: '100%', height: '400px'}"
      v-loading="loading"
      element-loading-background="rgba(255, 255, 255, 0.5)"
    >
    </div>
    <div v-if="echartsData.length === 0" style="width: 100%; height: 300px; line-height:300px;text-align:center">
      暂无数据
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { timeTableAnalysisUp } from 'server/interface';
import {max} from 'utils/max';
import moment from 'moment';
export default {
  props: {
    headerParams: {
      type: Object
    }
  },
  data () {
    return {
      loading: true,
      xAxisData: [],
      yAxisData: [],
      echartsData: [],
      maxNum: ''
    };
  },
  created () {
    this._timeTableAnalysisUp({
      lineId: '',
      month: '',
      type: '1'
    });
  },
  mounted () {
    // setTimeout(() => {
    //   this.drawLine();
    // }, 2000);
    // console.log(this.headerParams);
  },
  watch: {
    headerParams: {
      deep: true,
      immediate: false,
      handler () {
        let month = '';
        if (this.headerParams.date && this.headerParams.date === 'Invalid date') {
          month = '';
        } else if (this.headerParams.date && this.headerParams.date !== 'Invalid date') {
          month = moment(this.headerParams.date).format('YYYY-MM');
        }
        console.log(this.headerParams.date);
        this._timeTableAnalysisUp({
          lineId: this.headerParams.value,
          // lineId: '0103',
          month,
          type: '1'
        });
      }
    }
  },
  methods: {
    _timeTableAnalysisUp (params) {
      timeTableAnalysisUp('zhfxpt/analysis/getUpRushHourLinePassengerChartDatas', params).then(res => {
        this.xAxisData = res.data.data.xAxisNames;
        this.yAxisData = res.data.data.yAxisNames;
        this.echartsData = res.data.data.datas;
        this.maxNum = max(this.echartsData.map(item => item[2]));
        if (this.echartsData.length > 0) {
          this.$refs.upChartWrapper.style.display = 'block';
          this.drawLine();
          this.loading = false;
        } else {
          this.$refs.upChartWrapper.style.display = 'none';
        }
      });
    },
    drawLine () {
      let upChart = this.$echarts.init(document.getElementById('up-chart-wrapper'));
      window.addEventListener('resize', () => { upChart.resize(); });
      let data = this.echartsData.map(function (item) {
          return [item[1], item[0], item[2] || '-'];
      });
      window.addEventListener('resize', () => { upChart.resize(); });
      upChart.setOption({
      tooltip: {
        position: 'top'
      },
      animation: false,
      grid: {
        height: '50%',
        y: '10%'
      },
      xAxis: {
        type: 'category',
        data: this.xAxisData,
        splitArea: {
            show: true
        },
        splitLine: {
          show: false
        },
        axisTick: { // y轴刻度线
          show: false
        },
        axisLine: {
          show: false
        }
      },
      yAxis: {
          type: 'category',
          data: this.yAxisData,
          splitArea: {
              show: true
          },
          splitLine: {
            show: false
          },
          axisTick: { // y轴刻度线
            show: false
          },
          axisLine: {
            show: false
          }
      },
      visualMap: {
          min: 0,
          max: this.maxNum,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: '16%'
      },
      series: [{
          name: 'Punch Card',
          type: 'heatmap',
          data: data,
          label: {
              normal: {
                  show: true
              }
          },
          itemStyle: {
              emphasis: {
                  shadowBlur: 10,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
          }
        }]
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
