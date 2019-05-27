<template>
  <div>
    <div
      ref="downChartWrapper"
      id="down-chart-wrapper"
      :style="{width: '100%', height: '300px'}"
      v-loading="loading"
      v-if="echartsData.length > 0"
      element-loading-background="rgba(255, 255, 255, 0.5)"
    >
    </div>
    <div
      v-cloak
      ref="animationDom"
      v-if="echartsData.length === 0"
      class="anim"
      style="width: 100%; height: 330px; line-height:300px;text-align:center">
      暂无数据
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {numberAnalysisDown} from 'server/interface';
import {max} from 'utils/max';
import moment from 'moment';
export default {
  props: {
    selectData: {
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
      echartsData: [],
      legendNames: [],
      echartsDataMax: ''
    };
  },
  created () {
    this._numberAnalysisDown({
      lineId: '0103',
      dateTime: '2019-04-24',
      type: '2'
    });
  },
  mounted () {
  },
  watch: {
    selectData: {
      deep: true,
      handler () {
        if (this.selectData.value !== '' && this.selectData.date !== '') {
          this._numberAnalysisDown({
            lineId: this.selectData.value,
            dateTime: moment(this.selectData.date).format('YYYY-MM-DD'),
            type: '2'
          });
        }
      }
    },
    isUpdateDown () {
      if (this.isUpdateDown) {
        if (this.selectData.value !== '' && this.selectData.date !== '') {
          this._numberAnalysisDown({
            lineId: this.selectData.value,
            dateTime: moment(this.selectData.date).format('YYYY-MM-DD'),
            type: '2'
          });
          this.$emit('isUpdateToDown', false);
        }
      }
    }
  },
  methods: {
    _numberAnalysisDown (params) {
      numberAnalysisDown('zhfxpt/analysis/getDownLineCapacityChartDatas', params).then(res => {
        this.xAxisData = res.data.data.xAxisNames;
        this.echartsData = res.data.data.datas;
        this.legendNames = res.data.data.legendNames;
        if (this.echartsData.length > 0) {
          this.echartsDataMax = max([max(this.echartsData[0]), max(this.echartsData[1]), max(this.echartsData[2])]);
        }
        if (this.echartsData.length > 0) {
          this.drawLine();
          this.loading = false;
          this.$refs.downChartWrapper.style.display = 'block';
        } else {
          this.echartsDataMax = '';
          this.$refs.downChartWrapper.style.display = 'none';
        }
      });
    },
    drawLine () {
      let downChart = this.$echarts.init(document.getElementById('down-chart-wrapper'));
      window.addEventListener('resize', () => downChart.resize());
      downChart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: this.legendNames
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.xAxisData
        },
        yAxis: {
          type: 'value',
          max: this.echartsDataMax + 100,
          min: 0,
          interval: 100
        },
        series: [
          {
            name: '运力',
            type: 'line',
            data: this.echartsData[0]
          },
          {
            name: '运量',
            type: 'line',
            data: this.echartsData[1]
          },
          {
            name: '车内人数',
            type: 'line',
            data: this.echartsData[2]
          }
        ]
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
