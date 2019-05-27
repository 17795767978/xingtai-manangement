<template>
  <div>
    <div id="echart-wrapper" ref="echartWrapper" v-if="echartData.length > 0" :style="{width: '100%', height: '500px'}"></div>
    <div v-if="echartData.length === 0" class="anim" style="width: 100%; height: 300px; line-height:300px;text-align:center">
      暂无数据
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {runtimeAnalysis} from 'server/interface';
import {max} from 'utils/max';
import moment from 'moment';
export default {
  props: {
    selectData: {
      type: Object
    },
    isUpdate: {
      type: Boolean
    }
  },
  data () {
    return {
      echartData: [],
      legendNames: [],
      xAxisNames: [],
      maxData: ''
    };
  },
  created () {
    this._runtimeAnalysis({
      lineId: '0103',
      type: '1',
      month: '2019-05'
    });
  },
  watch: {
    selectData: {
      deep: true,
      handler () {
        if (this.selectData.value !== '' && this.selectData.turn !== '' && this.selectData.month !== '') {
          this._runtimeAnalysis({
            lineId: this.selectData.value,
            type: this.selectData.turn,
            month: moment(this.selectData.date).format('YYYY-MM')
          });
        }
      }
    },
    isUpdate () {
      if (this.isUpdate) {
        if (this.selectData.value !== '' && this.selectData.turn !== '' && this.selectData.month !== '') {
          this._runtimeAnalysis({
            lineId: this.selectData.value,
            type: this.selectData.turn,
            month: moment(this.selectData.date).format('YYYY-MM')
          });
        }
        this.$emit('isUpdateTo');
      }
    }
  },
  methods: {
    _runtimeAnalysis (params) {
      runtimeAnalysis('zhfxpt/analysis/getLineBetweenStationsRunningTimeChartDatas', params).then(res => {
        this.echartData = res.data.data.datas;
        this.legendNames = res.data.data.legendNames;
        this.xAxisNames = res.data.data.xAxisNames;
        if (this.echartData.length > 0) {
          let maxBefore = [];
          this.echartData.forEach(item => {
            maxBefore.push(max(item));
          });
          this.maxData = max(maxBefore) * this.echartData.length;
          this.$refs.echartWrapper.style.display = 'block';
          this.dawnLine();
        } else {
          this.$message.warning('暂无数据');
          this.$refs.echartWrapper.style.display = 'none';
          this.maxData = '';
        }
      });
    },
    dawnLine () {
      let chart = this.$echarts.init(document.getElementById('echart-wrapper'));
      window.addEventListener('resize', () => { chart.resize(); });
      let series = [];
      this.echartData.forEach((item, index) => {
        series.push({
          name: this.legendNames[index],
          data: item,
          type: 'bar',
          stack: '总量',
          barWidth: '20',
          label: {
              normal: {
                  show: true,
                  position: 'inside'
              }
          }
        });
      });
      console.log(series);
      chart.setOption({
        tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
          data: this.legendNames
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '5%',
          containLabel: true
      },
      xAxis: {
          type: 'value',
          max: this.maxData,
          min: 0,
          interval: Math.floor(this.maxData / 10)
      },
      yAxis: {
          type: 'category',
          data: this.xAxisNames
      },
      series
      });
    }
  }
};
</script>

<style lang="scss" scoped>
[v-cloak]
{
display: none;
}
.anim {
  animation: zy 2.5s .15s linear forwards;
}
@keyframes zy {
  0%   { transform: rotate(15deg);}
  25%  {transform: rotate(-10deg);}
  50%  { transform: rotate(5deg);}
  75%  {transform: rotate(-5deg);}
  100% { transform: rotate(0deg);}
}
</style>
