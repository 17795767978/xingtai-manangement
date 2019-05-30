<template>
  <div class="chart-complete-wrapper">
    <el-row style="height: 170px" :gutter="5">
      <el-col style="height: 100%;" :span="8">
        <div class="echarts-wrapper" v-loading="loading" element-loading-background="rgba(255, 255, 255, 0)" id="echart-left" :style="{width: '80%', height: '200px',margin: '0 auto'}"></div>
        <!-- <noEcharts style="display: none" :eChartsTitle="'实时里程'"></noEcharts> -->
      </el-col>
      <el-col :span="8" style="border-left: 1px #214e74 solid;border-right: 1px #214e74 solid;height: 100%">
        <div class="echarts-wrapper" v-loading="loading" element-loading-background="rgba(255, 255, 255, 0)" id="echart-middle" :style="{width: '80%', height: '200px', margin: '0 auto'}">
        </div>
        <!-- <noEcharts v-else :eChartsTitle="'实时趟次'"></noEcharts> -->
      </el-col>
      <el-col style="height: 100%" :span="8">
        <div class="echarts-wrapper" v-loading="loading" element-loading-background="rgba(255, 255, 255, 0)" id="echart-right" :style="{width: '80%', height: '200px', margin: '0 auto'}"></div>
        <!-- <noEcharts v-else :eChartsTitle="'实时换班'"></noEcharts> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { realTimeMileage, realTimeTrips, realTimeShift } from 'server/interface';
import { max } from 'utils/max.js';
export default {
  data () {
    return {
      loading: true,
      orgNameTrips: [],
      realTimeTrips: [],
      realTimeTripsMax: '',
      orgNameShift: [],
      realTimeShift: [],
      realTimeShiftMax: '',
      realTimeMileage: [],
      orgNameMileage: [],
      realTimeMileageMax: ''
    };
  },
  components: {
  },
  created () {
    this._realTimeMileage({
      orgId: ''
    });
    this._realTimeTrips({
      orgId: ''
    });
    this._realTimeShift({
      orgId: ''
    });
  },
  mounted () {
    // setTimeout(() => {
    // }, 1000);
  },
  activated () {
    this.drawLineLeft();
    this.drawLineMiddle();
    this.drawLineRight();
  },
  methods: {
    _realTimeMileage (params) {
      realTimeMileage('zhfxpt/getRealtimeMileage', params).then(res => {
        this.realTimeMileage = res.data.data.map(item => parseInt(item.realtimeMileage));
        this.orgNameMileage = res.data.data.map(item => item.orgName);
        this.realTimeMileageMax = max(this.realTimeMileage);
      });
    },
    _realTimeTrips (params) {
      realTimeTrips('zhfxpt/getRealtimeTrips', params).then(res => {
        this.realTimeTrips = res.data.data.map(item => parseInt(item.realtimeTrips));
        this.orgNameTrips = res.data.data.map(item => item.orgName);
        this.realTimeTripsMax = max(this.realTimeTrips);
      });
    },
    _realTimeShift (params) {
      realTimeShift('zhfxpt/getRealtimeClasses', params).then(res => {
        this.realTimeShift = res.data.data.map(item => parseInt(item.realtimeClasses));
        this.orgNameShift = res.data.data.map(item => item.orgName);
        this.realTimeShiftMax = max(this.realTimeShift);
      });
    },
    drawLineLeft () {
      let leftChart = this.$echarts.init(document.getElementById('echart-left'));
      window.addEventListener('resize', () => { leftChart.resize(); });
      // let dataAxis = ['一公司', '二公司', '三公司', '四公司', '五公司', '六公司', '七公司'];
      leftChart.setOption({
        title: {
          text: '实时里程',
          left: 'center',
          textStyle: {
            'color': '#fff'
          }
        },
        // color: ['#242d78', '#03abd0', '#ff30a0'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        // legend: {
        //   data: ['当日计划总里程', '计划完成', '实际完成'],
        //   bottom: 10,
        //   textStyle: {
        //     color: '#fff'
        //   }
        // },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            axisLine: {
              show: false
            },
            data: this.orgNameMileage,
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
        yAxis: {
          max: this.realTimeMileageMax + 10,
          min: 0,
          interval: Math.floor(this.realTimeMileageMax / 4),
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
        series: [
          {
            name: '实时里程',
            type: 'bar',
            // barGap: '-100%',
            barWidth: '20',
            data: this.realTimeMileage,
            itemStyle: {
              emphasis: {
                barBorderRadius: 20
              },
              normal: {
                barBorderRadius: 20
              }
            }
          }
        // {
        //     name: '计划完成',
        //     type: 'bar',
        //     barWidth: '20',
        //     data: [2800, 2500, 2400, 2200, 3100, 2900, 2000],
        //     itemStyle: {
        //       emphasis: {
        //         barBorderRadius: 20
        //       },
        //       normal: {
        //         barBorderRadius: 20
        //       }
        //     }
        // },
        // {
        //     name: '实际完成',
        //     type: 'bar',
        //     barWidth: '20',
        //     data: [1300, 1200, 1400, 2000, 3000, 2100, 1000],
        //     itemStyle: {
        //       emphasis: {
        //         barBorderRadius: 20
        //       },
        //       normal: {
        //         barBorderRadius: 20
        //       }
        //     }
        // }
        ]
      });
    },
    drawLineMiddle () {
      let middleChart = this.$echarts.init(document.getElementById('echart-middle'));
      window.addEventListener('resize', () => { middleChart.resize(); });
      middleChart.setOption({
        title: {
          text: '实时趟次',
          left: 'center',
          textStyle: {
            'color': '#fff'
          }
        },
        // color: ['#03abd0', '#fedd00', '#8fc31f'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        // legend: {
        //   data: ['当日计划总趟次', '计划完成', '实际完成'],
        //   bottom: 10,
        //   textStyle: {
        //     color: '#fff'
        //   }
        // },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            axisLine: {
              show: false
            },
            data: this.orgNameTrips,
            axisLabel: {
              inside: false,
              // interval: 0,
              // formatter: function(value) {
              //   return value.split('').join('\n');
              // },
              textStyle: {
                color: '#fff',
                fontSize: '10',
                borderRadius: '6'
              }
            }
          }
        ],
        yAxis: {
          max: this.realTimeTripsMax + 10,
          min: 0,
          interval: Math.floor(this.realTimeTripsMax / 4),
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
        series: [
          {
            // name: '当日计划总趟次',
            name: '实时趟次',
            type: 'bar',
            // barGap: '-100%',
            barWidth: '15',
            data: this.realTimeTrips,
            itemStyle: {
              emphasis: {
                barBorderRadius: 20
              },
              normal: {
                barBorderRadius: 20,
                color: '#8fc31f'
              }
            }
          }
        // {
        //     name: '计划完成',
        //     type: 'bar',
        //     barWidth: '20',
        //     data: [2800, 2500, 2400, 2200, 3100, 2900, 2000],
        //     itemStyle: {
        //       emphasis: {
        //         barBorderRadius: 20
        //       },
        //       normal: {
        //         barBorderRadius: 20
        //       }
        //     }
        // },
        // {
        //     name: '实际完成',
        //     type: 'bar',
        //     barWidth: '20',
        //     data: [1300, 1200, 1400, 2000, 3000, 2100, 1000],
        //     itemStyle: {
        //       emphasis: {
        //         barBorderRadius: 20
        //       },
        //       normal: {
        //         barBorderRadius: 20
        //       }
        //     }
        // }
        ]
      });
    },
    drawLineRight () {
      let rightChart = this.$echarts.init(document.getElementById('echart-right'));
      window.addEventListener('resize', () => { rightChart.resize(); });
      rightChart.setOption({
        title: {
          text: '实时换班',
          left: 'center',
          textStyle: {
            'color': '#fff'
          }
        },
        color: ['#8957a1', '#f39800', '#00ffff'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        // legend: {
        //   data: ['当日计划总班次', '计划完成', '实际完成'],
        //   bottom: 10,
        //   textStyle: {
        //     color: '#fff'
        //   }
        // },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            axisLine: {
              show: false
            },
            data: this.orgNameShift,
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
        yAxis: {
          max: this.realTimeShiftMax + 10,
          min: 0,
          interval: Math.floor(this.realTimeShiftMax / 4),
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
        series: [
          {
            name: '实时班次',
            type: 'bar',
            // barGap: '-100%',
            barWidth: '15',
            data: this.realTimeShift,
            itemStyle: {
              emphasis: {
                barBorderRadius: 20
              },
              normal: {
                barBorderRadius: 20
              }
            }
          }
        // {
        //     name: '计划完成',
        //     type: 'bar',
        //     barWidth: '20',
        //     data: [2800, 2500, 2400, 2200, 3100, 2900, 2000],
        //     itemStyle: {
        //       emphasis: {
        //         barBorderRadius: 20
        //       },
        //       normal: {
        //         barBorderRadius: 20
        //       }
        //     }
        // },
        // {
        //     name: '实际完成',
        //     type: 'bar',
        //     barWidth: '20',
        //     data: [1300, 1200, 1400, 2000, 3000, 2100, 1000],
        //     itemStyle: {
        //       emphasis: {
        //         barBorderRadius: 20
        //       },
        //       normal: {
        //         barBorderRadius: 20
        //       }
        //     }
        // }
        ]
      });
    }
  },
  watch: {
    realTimeMileageMax () {
      this.drawLineLeft();
      this.loading = false;
    },
    realTimeTripsMax () {
      this.drawLineMiddle();
      this.loading = false;
    },
    realTimeShiftMax () {
      this.drawLineRight();
      this.loading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.chart-complete-wrapper {
  width: 100%;
  padding: 10px 50px;
  box-sizing: border-box;
  background-color: rgba(0,0,0, 0.65);
  border-radius: 6px;
  box-shadow: -4px -5px 10px #409EFF;
}
</style>
