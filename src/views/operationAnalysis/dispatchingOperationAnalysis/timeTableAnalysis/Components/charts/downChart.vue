<template>
  <div>
    <div class="down-chart-wrapper"
      ref="downChartWrapper"
      id="down-chart-wrapper"
      v-if="echartsData.length > 0"
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
import { timeTableAnalysisDown } from 'server/interface';
import {max} from 'utils/max';
import moment from 'moment';
export default {
  props: {
    headerParams: {
      type: Object
    },
    isUpdateDown: {
      type: Boolean
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
    this._timeTableAnalysisDown({
      fileId: '',
      month: '',
      type: '2'
    });
  },
  mounted () {
    setTimeout(() => {
      this.drawLine();
      this.drawLine();
      this.loading = false;
    }, 2000);
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
        this._timeTableAnalysisDown({
          lineId: this.headerParams.value,
          // lineId: '0103',
          month,
          type: '1'
        });
      }
    },
    isUpdateDown () {
      console.log(this.isUpdateDown);
      if (this.isUpdateDown) {
        let month = '';
        if (this.headerParams.date && this.headerParams.date === 'Invalid date') {
          month = '';
        } else if (this.headerParams.date && this.headerParams.date !== 'Invalid date') {
          month = moment(this.headerParams.date).format('YYYY-MM');
        }
        this._timeTableAnalysisDown({
          lineId: this.headerParams.value,
          // lineId: '0103',
          month,
          type: '1'
        });
        this.$emit('isUpdateToDown', false);
      }
    }
  },
  methods: {
    _timeTableAnalysisDown (params) {
      timeTableAnalysisDown('zhfxpt/analysis/getDownRushHourLinePassengerChartDatas', params).then(res => {
        // console.log(res);
        this.xAxisData = res.data.data.xAxisNames;
        this.yAxisData = res.data.data.yAxisNames;
        this.echartsData = res.data.data.datas;
        this.maxNum = max(this.echartsData.map(item => item[2]));
        if (this.echartsData.length > 0) {
          this.$refs.downChartWrapper.style.display = 'block';
          this.drawLine();
          this.loading = false;
        } else {
          this.$refs.downChartWrapper.style.display = 'none';
        }
      });
    },
    drawLine () {
      let downChart = this.$echarts.init(document.getElementById('down-chart-wrapper'));
      window.addEventListener('resize', () => { downChart.resize(); });
      let data = this.echartsData.map(function (item) {
          return [item[1], item[0], item[2] || '-'];
      });
      window.addEventListener('resize', () => { downChart.resize(); });
      downChart.setOption({
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
