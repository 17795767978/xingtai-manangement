<template>
  <div id="echart-wrapper" :style="{width: '100%', height: '500px'}"></div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {};
  },
  created () {},
  mounted () {
    this.dawnLine();
  },
  methods: {
    dawnLine () {
      let chart = this.$echarts.init(document.getElementById('echart-wrapper'));
      window.addEventListener('resize', () => { chart.resize(); });
      chart.setOption({
        tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
          data: ['钟楼1', '钟楼2', '钟楼3', '钟楼4', '钟楼5', '钟楼6', '钟楼7', '钟楼8', '钟楼9', '钟楼10', '钟楼11', '钟楼12', '钟楼13', '钟楼14', '钟楼15', '钟楼16', '钟楼17', '钟楼18', '钟楼19', '钟楼20', '钟楼21', '钟楼22', '钟楼23', '钟楼24', '钟楼25']
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '5%',
          containLabel: true
      },
      xAxis: {
          type: 'value',
          max: 300,
          min: 0,
          interval: 10
      },
      yAxis: {
          type: 'category',
          data: ['5-7', '7-9', '9-11', '11-13', '13-15', '15-17', '17-19', '19-21', '21-23']
      },
      series: [
          {
              name: '钟楼1',
              type: 'bar',
              stack: '总量',
              barWidth: '20',
              label: {
                  normal: {
                      show: true,
                      position: 'inside'
                  }
              },
              data: [10, 5, 1, 9, 2, 3, 4, 5, 7]
          },
          {
              name: '钟楼2',
              type: 'bar',
              barWidth: '20',
              stack: '总量',
              label: {
                  normal: {
                      show: true,
                      position: 'inside'
                  }
              },
              data: [10, 5, 1, 9, 2, 3, 4, 5, 7]
          },
          {
              name: '钟楼3',
              type: 'bar',
              barWidth: '20',
              stack: '总量',
              label: {
                  normal: {
                      show: true,
                      position: 'inside'
                  }
              },
              data: [10, 5, 1, 9, 2, 3, 4, 5, 7]
          },
          {
              name: '钟楼4',
              type: 'bar',
              barWidth: '20',
              stack: '总量',
              label: {
                  normal: {
                      show: true,
                      position: 'inside'
                  }
              },
              data: [10, 5, 1, 9, 2, 3, 4, 5, 7]
          },
          {
              name: '钟楼5',
              type: 'bar',
              barWidth: '20',
              stack: '总量',
              label: {
                  normal: {
                      show: true,
                      position: 'inside'
                  }
              },
              data: [10, 5, 3, 9, 2, 3, 4, 5, 7]
          },
          {
              name: '钟楼6',
              type: 'bar',
              barWidth: '20',
              stack: '总量',
              label: {
                  normal: {
                      show: true,
                      position: 'inside'
                  }
              },
              data: [10, 5, 3, 9, 2, 3, 4, 5, 7]
          },
          {
              name: '钟楼7',
              type: 'bar',
              barWidth: '20',
              stack: '总量',
              label: {
                  normal: {
                      show: true,
                      position: 'inside'
                  }
              },
              data: [10, 5, 3, 9, 2, 3, 4, 5, 7]
          }, {
              name: '钟楼8',
              type: 'bar',
              barWidth: '20',
              stack: '总量',
              label: {
                  normal: {
                      show: true,
                      position: 'inside'
                  }
              },
              data: [10, 5, 3, 9, 2, 3, 4, 5, 7]
          }, {
              name: '钟楼9',
              type: 'bar',
              barWidth: '20',
              stack: '总量',
              label: {
                  normal: {
                      show: true,
                      position: 'inside'
                  }
              },
              data: [10, 5, 3, 9, 2, 3, 4, 5, 7]
          }, {
              name: '钟楼10',
              type: 'bar',
              barWidth: '20',
              stack: '总量',
              label: {
                  normal: {
                      show: true,
                      position: 'inside'
                  }
              },
              data: [10, 5, 3, 9, 2, 3, 4, 5, 7]
          }, {
              name: '钟楼11',
              type: 'bar',
              barWidth: '20',
              stack: '总量',
              label: {
                  normal: {
                      show: true,
                      position: 'inside'
                  }
              },
              data: [10, 5, 3, 9, 2, 3, 4, 5, 7]
          }, {
              name: '钟楼12',
              type: 'bar',
              barWidth: '20',
              stack: '总量',
              label: {
                  normal: {
                      show: true,
                      position: 'inside'
                  }
              },
              data: [10, 5, 3, 9, 2, 3, 4, 5, 7]
          }, {
              name: '钟楼13',
              type: 'bar',
              barWidth: '20',
              stack: '总量',
              label: {
                  normal: {
                      show: true,
                      position: 'inside'
                  }
              },
              data: [10, 5, 3, 9, 2, 3, 4, 5, 7]
          }, {
              name: '钟楼14',
              type: 'bar',
              barWidth: '20',
              stack: '总量',
              label: {
                  normal: {
                      show: true,
                      position: 'inside'
                  }
              },
              data: [10, 5, 3, 9, 2, 3, 4, 5, 7]
          }, {
              name: '钟楼15',
              type: 'bar',
              barWidth: '20',
              stack: '总量',
              label: {
                  normal: {
                      show: true,
                      position: 'inside'
                  }
              },
              data: [10, 5, 3, 9, 2, 3, 4, 5, 7]
          }, {
              name: '钟楼16',
              type: 'bar',
              barWidth: '20',
              stack: '总量',
              label: {
                  normal: {
                      show: true,
                      position: 'inside'
                  }
              },
              data: [10, 5, 3, 9, 2, 3, 4, 5, 7]
          }, {
              name: '钟楼17',
              type: 'bar',
              barWidth: '20',
              stack: '总量',
              label: {
                  normal: {
                      show: true,
                      position: 'inside'
                  }
              },
              data: [10, 5, 3, 9, 2, 3, 4, 5, 7]
          }, {
              name: '钟楼18',
              type: 'bar',
              barWidth: '20',
              stack: '总量',
              label: {
                  normal: {
                      show: true,
                      position: 'inside'
                  }
              },
              data: [10, 5, 3, 9, 2, 3, 4, 5, 7]
          }, {
              name: '钟楼19',
              type: 'bar',
              barWidth: '20',
              stack: '总量',
              label: {
                  normal: {
                      show: true,
                      position: 'inside'
                  }
              },
              data: [10, 5, 3, 9, 2, 3, 4, 5, 7]
          }, {
              name: '钟楼20',
              type: 'bar',
              barWidth: '20',
              stack: '总量',
              label: {
                  normal: {
                      show: true,
                      position: 'inside'
                  }
              },
              data: [10, 5, 3, 9, 2, 3, 4, 5, 7]
          }, {
              name: '钟楼21',
              type: 'bar',
              barWidth: '20',
              stack: '总量',
              label: {
                  normal: {
                      show: true,
                      position: 'insideRight'
                  }
              },
              data: [10, 5, 3, 9, 2, 3, 4, 5, 7]
          }, {
              name: '钟楼22',
              type: 'bar',
              barWidth: '20',
              stack: '总量',
              label: {
                  normal: {
                      show: true,
                      position: 'inside'
                  }
              },
              data: [10, 5, 3, 9, 2, 3, 4, 5, 7]
          }, {
              name: '钟楼23',
              type: 'bar',
              barWidth: '20',
              stack: '总量',
              label: {
                  normal: {
                      show: true,
                      position: 'inside'
                  }
              },
              data: [10, 5, 3, 9, 2, 3, 4, 5, 7]
          }, {
              name: '钟楼24',
              type: 'bar',
              barWidth: '20',
              stack: '总量',
              label: {
                  normal: {
                      show: true,
                      position: 'inside'
                  }
              },
              data: [10, 5, 3, 9, 2, 3, 4, 5, 7]
          }, {
              name: '钟楼25',
              type: 'bar',
              barWidth: '20',
              stack: '总量',
              label: {
                  normal: {
                      show: true,
                      position: 'inside'
                  }
              },
              data: [10, 5, 3, 9, 2, 3, 4, 5, 7]
          }
      ]
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
