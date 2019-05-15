<template>
  <div>
    <div id="chart-wrapper"
     ref="chartWrapper"
     :style="{width: '100%', height: '600px'}"></div>
    <div
      v-cloak
      ref="animationDom"
      v-if="echartDatas.length === 0"
      class="anim"
      style="width: 100%; height: 330px; line-height:300px;text-align:center">
      暂无数据
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {tripOrder} from 'server/interface';
import moment from 'moment';
import {max, min} from 'utils/max.js';
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
      echartDatas: [],
      legendNames: [],
      xAxisNames: [],
      maxDate: '',
      minDate: ''
    };
  },
  created () {
    this._tripOrder({
      lineId: '0103',
      dateTime: '2019-05-13',
      type: '1',
      startHour: '08',
      endHour: '12'
    });
  },
  mounted () {
  },
  watch: {
    selectData: {
      deep: true,
      handler () {
        this._tripOrder({
          lineId: this.selectData.value,
          dateTime: this.selectData.date,
          type: this.selectData.turn,
          startHour: this.selectData.startTime.substring(0, 2),
          endHour: this.selectData.endTime.substring(0, 2)
        });
      }
    },
    isUpdate () {
      if (this.isUpdate === true) {
        this._tripOrder({
          lineId: this.selectData.value,
          dateTime: this.selectData.date,
          type: this.selectData.turn,
          startHour: this.selectData.startTime.substring(0, 2),
          endHour: this.selectData.endTime.substring(0, 2)
        });
      }
    }
  },
  methods: {
    _tripOrder (params) {
      tripOrder('zhfxpt/analysis/getSequenceChartDatas', params).then(res => {
        this.echartDatas = res.data.data.datas;
        this.legendNames = res.data.data.legendNames;
        this.xAxisNames = res.data.data.xAxisNames;
        let abs = [];
        this.echartDatas.forEach(item => {
          item.forEach(item => {
            abs.push(item);
          });
        });
        this.maxDate = max(abs);
        this.minDate = min(abs);
        if (this.echartDatas.length > 0) {
          this.$refs.chartWrapper.style.display = 'block';
          this.drawLine();
          this.loading = false;
        } else {
          // this.$refs.animationDom.addClassList('anim');
          this.$message.warning('暂无数据');
          this.$refs.chartWrapper.style.display = 'none';
        }
      });
    },
    drawLine () {
      let chart = this.$echarts.init(document.getElementById('chart-wrapper'));
      window.addEventListener('resize', () => {
        chart.resize();
      });
      let series = [];
      for (var i = 0; i < this.echartDatas.length; i++) {
        series.push({
          type: 'line',
          data: this.echartDatas[i]
        });
      }
      chart.setOption({
        title: {
        text: ''
      },
      grid: {
          left: '1%',
          right: '10%',
          bottom: '3%',
          containLabel: true
      },
      xAxis: {
          type: 'category',
          data: this.xAxisNames,
          splitLine: { // y轴刻度线
            'show': true
          },
          axisTick: {
            interval: 0,
            alignWithLabel: true
          }
      },
      yAxis: {
          type: 'value',
          min: this.minDate,
          max: this.maxDate + 1000,
          splitLine: { // y轴刻度线
            'show': true
          },
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            inside: false, // 刻度值卸载y轴右侧
            textStyle: {
              fontSize: 14,
              color: '#666'
            },
            formatter: function(val) {
              return moment(val * 1000).format('HH:mm:ss');
            }
          }
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
