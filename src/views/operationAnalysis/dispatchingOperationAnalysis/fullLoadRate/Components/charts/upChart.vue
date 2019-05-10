<template>
  <div class="up-chart-wrapper"
    id="up-chart-wrapper"
    :style="{width: '100%', height: '330px'}"
    v-loading="loading"
    element-loading-background="rgba(255, 255, 255, 0.5)"
  >
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    updata: {
      type: Boolean
    },
    downdata: {
      type: Boolean
    }
  },
  data () {
    return {
      loading: true
    };
  },
  created () {},
  mounted () {
    setTimeout(() => {
      this.drawLine();
      this.drawLine();
      this.loading = false;
    }, 2000);
  },
  methods: {
    drawLine () {
      let upChart = this.$echarts.init(document.getElementById('up-chart-wrapper'));
      let timeInterval = ['西直门1', '西直门2', '西直门3', '西直门4', '西直门5', '西直门6', '西直门7',
        '西直门8', '西直门9', '西直门10', '西直门11', '西直门12',
        '西直门13', '西直门14', '西直门15', '西直门16', '西直门17', '西直门18',
        '西直门19', '西直门20', '西直门21', '西直门22', '西直门23', '西直门24'];
      window.addEventListener('resize', () => { upChart.resize(); });
      upChart.setOption({
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
        color: ['#0490b3', '#6e9724', '#b22679', '#0468b2'],
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
                    // interval: 0,
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
                max: 150,
                interval: 30,
                // axisLabel: {
                //     formatter: '{value} ml'
                // },
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
                axisLine: {
                    show: true
                },
                axisTick: {
                    show: true
                },
                splitLine: {
                  show: true
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
                barWidth: '20',
                barGap: '-100%',
                itemStyle: {
                  emphasis: {
                    barBorderRadius: 20
                  },
                  normal: {
                    barBorderRadius: 20
                  }
                },
                data: [50, 80, 30, 50, 80, 30, 50, 80, 30, 50, 80, 30, 50, 80, 30, 50, 80, 30, 50, 80, 30, 50, 80, 30]
            },
            {
                name: '断面客流',
                type: 'line',
                barWidth: '10',
                data: [3, 2, 8, 3, 2, 8, 3, 2, 8, 3, 2, 8, 3, 2, 8, 3, 2, 8, 3, 2, 8, 3, 2, 8]
            },
            {
                name: '下车人数',
                type: 'bar',
                barWidth: '20',
                yAxisIndex: 1,
                itemStyle: {
                  emphasis: {
                    barBorderRadius: 20
                  },
                  normal: {
                    barBorderRadius: 20
                  }
                },
                data: [3, 2, 8, 3, 2, 8, 3, 2, 8, 3, 2, 8, 3, 2, 8, 3, 2, 8, 3, 2, 8, 3, 2, 8]
            },
            {
              name: '满载率',
              type: 'line',
              barWidth: '20',
              data: [30, 42, 20, 30, 42, 20, 30, 42, 20, 30, 42, 20, 30, 42, 20, 30, 42, 20, 30, 42, 20, 30, 42, 20]
            }
        ]
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
