<template>
  <div>
    <div id="person-chart" :style="{width: '90%', height: '240px',padding: '10px 0', margin: '0 auto'}"
      v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0)"
    >
    </div>
    <noEcharts style="display: none" :eChartsTitle="'实施客流人数'"></noEcharts>
  </div>
</template>

<script>
import {realTimePassengeFlow} from 'server/interface';
import noEcharts from './noEcharts.vue';
import {max} from 'utils/max.js';
export default {
  data () {
    return {
      loading: true,
      timeInterval: [],
      personCount: [],
      personCountMax: ''
    };
  },
  components: {
    noEcharts
  },
  created () {
    this._realTimePassengeFlow({
      orgId: ''
    });
  },
  mounted () {
    // setTimeout(() => {
    //   this.drawLine();
    //   this.loading = false;
    // }, 2000);
  },
  activated () {
    this.drawLine();
  },
  methods: {
    _realTimePassengeFlow (params) {
      realTimePassengeFlow('zhfxpt/passengerflow/getRealTimePassengerFlow', params).then(res => {
        this.timeInterval = res.data.data.map(item => item.timeInterval);
        this.personCount = res.data.data.map(item => parseInt(item.personCount));
        this.personCountMax = max(this.personCount);
        this.drawLine();
        this.loading = false;
      });
    },
    drawLine () {
      let brokenLine = this.$echarts.init(document.getElementById('person-chart'));
      window.addEventListener('resize', () => { brokenLine.resize(); });
      brokenLine.setOption({
        title: {
          text: '实时客流人次',
          left: 'center',
          textStyle: {
            'color': '#fff'
          }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        xAxis: {
          type: 'category',
          data: this.timeInterval,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#fff',
              fontSize: '10',
              borderRadius: '6'
            }
          }
        },
        yAxis: {
          max: this.personCountMax + 10,
          min: 0,
          splitNumber: 6,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#fff'
            }
          }
        },
        series: [{
          name: '实时客流人次',
          data: this.personCount,
          type: 'line',
          color: '#e2be08'
        }]
      });
    }
  },
  watch: {
    personCountMax () {
    }
  }
};
</script>

<style lang="scss" scoped>
.person-chart {
  width: 100%;
}
</style>
