<template>
  <div>
    <div id="per-chart" :style="{width: '100%', height: '240px',padding: '10px', margin: '0 auto'}"
      v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0)"
      >
    </div>
    <!-- <noEcharts v-else :eChartsTitle="'实时满载率'"></noEcharts> -->
  </div>
</template>

<script>
import {realTimeFullRate} from 'server/interface';
import noEcharts from './noEcharts.vue';
import {max} from 'utils/max.js';
export default {
  data () {
    return {
      loading: true,
      busLoadNumber: 0,
      fullLoadRate: '',
      personCount: 0,
      timeInterval: '',
      busLoadNumberMax: 0,
      fullLoadRateMax: ''
    };
  },
  components: {
    noEcharts
  },
  created () {
    this._realTimeFullRate({
      orgId: ''
    });
  },
  mounted () {
    // setTimeout(() => {
    //   this.drawLine();
    //   this.loading = false;
    // }, 3000);
  },
  activated () {
    this.drawLine();
  },
  methods: {
    _realTimeFullRate (params) {
      realTimeFullRate('zhfxpt/passengerflow/getRealTimeFullLoadRate', params).then(res => {
        this.busLoadNumber = res.data.data.map(item => +item.busLoadNumber);
        this.fullLoadRate = res.data.data.map(item => +item.fullLoadRate);
        this.personCount = res.data.data.map(item => +item.personCount);
        this.timeInterval = res.data.data.map(item => item.timeInterval);
        this.busLoadNumberMax = max(this.busLoadNumber);
        this.fullLoadRateMax = max(this.fullLoadRate);
        this.drawLine();
        this.loading = false;
      });
    },
    drawLine () {
      let fullLoadRate = this.$echarts.init(document.getElementById('per-chart'));
      window.addEventListener('resize', () => { fullLoadRate.resize(); });
      fullLoadRate.setOption({
        title: {
          text: '实时满载率',
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
        color: ['#0490b3', '#6e9724', '#b22679'],
        legend: {
          data: ['通过量', '定员数', '满载率'],
          bottom: 10,
          textStyle: {
            color: '#fff'
          }
        },
        xAxis: [
            {
                type: 'category',
                data: this.timeInterval,
                axisPointer: {
                    type: 'shadow'
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    inside: false,
                    // interval: 0,
                    textStyle: {
                      color: '#fff',
                      fontSize: '10',
                      borderRadius: '6'
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                // name: '水量',
                min: 0,
                max: this.busLoadNumberMax,
                interval: this.busLoadNumberMax / 6,
                // axisLabel: {
                //     formatter: '{value} ml'
                // },
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                  inside: false,
                  interval: 0,
                  textStyle: {
                    color: '#fff',
                    fontSize: '10',
                    borderRadius: '6'
                  }
              }
            },
            {
                type: 'value',
                min: 0,
                max: this.fullLoadRateMax + 10,
                interval: Math.floor(this.fullLoadRateMax / 3),
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
                    formatter: '{value}%',
                    color: '#fff',
                    fontSize: '10',
                    borderRadius: '6'
                }
            }
        ],
        series: [
            {
                name: '定员数',
                type: 'bar',
                barWidth: '10',
                barGap: '-100%',
                itemStyle: {
                  emphasis: {
                    barBorderRadius: 5
                  },
                  normal: {
                    barBorderRadius: 5
                  }
                },
                data: this.busLoadNumber
            },
            {
                name: '通过量',
                type: 'bar',
                barWidth: '10',
                data: this.personCount
            },
            {
                name: '满载率',
                type: 'line',
                yAxisIndex: 1,
                data: this.fullLoadRate
            }
        ]
      });
    }
  },
  watch: {
    busLoadNumberMax () {
    }
  }
};
</script>

<style lang="scss" scoped>
.per-chart {
  width: 100%;
}
</style>
