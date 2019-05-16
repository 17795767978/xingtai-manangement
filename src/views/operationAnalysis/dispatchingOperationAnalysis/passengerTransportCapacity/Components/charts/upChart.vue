<template>
  <div>
    <div
      ref="upChartWrapper"
      id="up-chart-wrapper"
      :style="{width: '100%', height: '300px'}"
      v-loading="loading"
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
import {numberAnalysisUp} from 'server/interface';
import {max} from 'utils/max';
import moment from 'moment';
export default {
  props: {
    selectData: {
      type: Object
    },
    isUpdateUp: {
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
    this._numberAnalysisUp({
      lineId: '0103',
      dateTime: '2019-04-24',
      type: '1'
    });
  },
  mounted () {
  },
  watch: {
    selectData: {
      deep: true,
      handler () {
        if (this.selectData.value !== '' && this.selectData.date !== '') {
          this._numberAnalysisUp({
            lineId: this.selectData.value,
            dateTime: moment(this.selectData.date).format('YYYY-MM-DD'),
            type: '1'
          });
        }
      }
    },
    isUpdateUp () {
      if (this.isUpdateUp) {
        if (this.selectData.value !== '' && this.selectData.date !== '') {
          this._numberAnalysisUp({
            lineId: this.selectData.value,
            dateTime: moment(this.selectData.date).format('YYYY-MM-DD'),
            type: '1'
          });
          this.$emit('isUpdateToUp', false);
        }
      }
    }
  },
  methods: {
    _numberAnalysisUp (params) {
      numberAnalysisUp('zhfxpt/analysis/getUpLineCapacityChartDatas', params).then(res => {
        this.xAxisData = res.data.data.xAxisNames;
        this.echartsData = res.data.data.datas;
        this.legendNames = res.data.data.legendNames;
        if (this.echartsData.length > 0) {
          this.echartsDataMax = max([max(this.echartsData[0]), max(this.echartsData[1]), max(this.echartsData[2])]);
        }
        if (this.echartsData.length > 0) {
          this.$refs.upChartWrapper.style.display = 'block';
          this.drawLine();
          this.loading = false;
        } else {
          this.$message.warning('暂无数据');
          this.$refs.upChartWrapper.style.display = 'none';
          this.echartsDataMax = '';
        }
      });
    },
    drawLine () {
      let upChart = this.$echarts.init(document.getElementById('up-chart-wrapper'));
      window.addEventListener('resize', () => upChart.resize());
      upChart.setOption({
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
        // toolbox: {
        //     feature: {
        //         saveAsImage: {}
        //     }
        // },
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
