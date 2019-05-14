<template>
  <div>
    <div
      ref="downChartWrapper"
      id="down-chart-wrapper"
      :style="{width: '100%', height: '330px'}"
      v-loading="loading"
      element-loading-background="rgba(255, 255, 255, 0.5)"
    >
    </div>
    <div v-if="xAxisData.length === 0" class="anim" style="width: 100%; height: 330px; line-height:300px;text-align:center">
      暂无数据
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { fullRateAnalysisDown } from 'server/interface';
import moment from 'moment';
import {max} from 'utils/max';
export default {
  props: {
    checkData: {
      type: Object
    }
  },
  data () {
    return {
      loading: true,
      upPersonNum: [],
      downPersonNum: [],
      passengerFlow: [],
      fullRate: [],
      xAxisData: [],
      maxNum: '',
      maxRate: ''
    };
  },
  created () {
    this._fullRateAnalysisDown({
      lineId: '0103',
      type: '2',
      dateTime: '',
      startHour: '',
      endHour: ''
    });
  },
  mounted () {
  },
  watch: {
    checkData: {
      deep: true,
      handler () {
        if (this.checkData.value.length !== 0 && this.checkData.date.length !== 0 && this.checkData.startTime.length !== 0 && this.checkData.endTime.length !== 0) {
          this._fullRateAnalysisDown({
            lineId: this.checkData.value,
            type: '1',
            dateTime: moment(this.checkData.date).format('YYYY-MM-DD'),
            startHour: this.checkData.startTime.substring(0, 2),
            endHour: this.checkData.endTime.substring(0, 2)
          });
        }
      }
    }
  },
  methods: {
    _fullRateAnalysisDown (params) {
      fullRateAnalysisDown('zhfxpt/analysis/getDownLineStationChartDatas', params).then(res => {
        this.upPersonNum = res.data.data.datas[0];
        this.downPersonNum = res.data.data.datas[1];
        this.passengerFlow = res.data.data.datas[2];
        this.fullRate = res.data.data.datas[3];
        this.xAxisData = res.data.data.xAxisNames;
        if (res.data.data.datas.length > 0) {
          this.maxNum = max([max(this.upPersonNum), max(this.downPersonNum), max(this.passengerFlow)]);
          this.maxRate = max(this.fullRate);
        }
        if (this.xAxisData.length > 0) {
          this.$refs.downChartWrapper.style.display = 'block';
          this.drawLine();
          this.loading = false;
        } else {
          this.$message.error('暂无数据');
          this.$refs.downChartWrapper.style.display = 'none';
        }
      });
    },
    drawLine () {
      let downChart = this.$echarts.init(document.getElementById('down-chart-wrapper'));
      let timeInterval = this.xAxisData;
      window.addEventListener('resize', () => { downChart.resize(); });
      downChart.setOption({
        // title: {
        //   text: '实时满载率',
        //   left: 'center',
        //   textStyle: {
        //     'color': '#000'
        //   }
        // },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        // color: ['#0490b3', '#6e9724', '#b22679', '#0468b2'],
        legend: {
          data: ['上车人数', '断面客流', '下车人数', '满载率'],
          bottom: 10,
          textStyle: {
            color: '#000'
          }
        },
        xAxis: [
            {
                type: 'category',
                data: timeInterval,
                axisPointer: {
                    type: 'shadow'
                },
                splitLine: {
                    show: true
                },
                axisLine: {
                    show: true
                },
                axisTick: {
                    show: true
                },
                axisLabel: {
                    inside: false,
                    interval: 2,
                    textStyle: {
                      color: '#000',
                      fontSize: '16',
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
                max: this.maxNum + this.maxNum / 5,
                interval: Math.floor(this.maxNum / 5),
                // axisLabel: {
                //     formatter: '{value} ml'
                // },
                splitLine: {
                    show: false
                },
                axisLabel: {
                  inside: false,
                  interval: 0,
                  textStyle: {
                    color: '#000',
                    fontSize: '16',
                    borderRadius: '6'
                  }
              }
            },
            {
                type: 'value',
                min: 0,
                max: 100,
                interval: 20,
                splitLine: {
                  show: false
                },
                axisLabel: {
                    formatter: '{value}%',
                    color: '#000',
                    fontSize: '16',
                    borderRadius: '6'
                }
            }
        ],
        series: [
            {
                name: '上车人数',
                type: 'bar',
                barWidth: '10',
                // barGap: '-100%',
                yAxisIndex: 0,
                itemStyle: {
                  emphasis: {
                    barBorderRadius: 20
                  },
                  normal: {
                    barBorderRadius: 20
                  }
                },
                data: this.upPersonNum
            },
            {
                name: '断面客流',
                type: 'line',
                yAxisIndex: 0,
                barWidth: '10',
                data: this.passengerFlow
            },
            {
                name: '下车人数',
                type: 'bar',
                barWidth: '10',
                yAxisIndex: 0,
                itemStyle: {
                  emphasis: {
                    barBorderRadius: 20
                  },
                  normal: {
                    barBorderRadius: 20
                  }
                },
                data: this.downPersonNum
            },
            {
              name: '满载率',
              type: 'line',
              yAxisIndex: 1,
              barWidth: '10',
              data: this.fullRate
            }
        ]
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.anim {
  animation: zy 2.5s .15s linear forwards;
// -moz-animation: zy 2.5s .15s linear infinite; /* Firefox */
// -webkit-animation: zy 2.5s .15s linear infinite; /* Safari and Chrome */
// -o-animation: zy 2.5s .15s linear infinite; /* Opera */
}
@keyframes zy {
  0%   { transform: rotate(15deg);}
  25%  {transform: rotate(-10deg);}
  50%  { transform: rotate(5deg);}
  75%  {transform: rotate(-5deg);}
  100% { transform: rotate(0deg);}
}
</style>
