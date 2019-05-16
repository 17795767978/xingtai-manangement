<template>
  <div>
    <div id="chart-wrapper"
      ref="chartWrapper"
      :style="{width: '100%', height: '700px'}"
      v-loading="loading"
      element-loading-background="rgba(255, 255, 255, 0.5)"
    >
    </div>
    <div v-if="echartsData.length === 0" style="width: 100%; height: 300px; line-height:300px;text-align:center">
      暂无数据
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {sectionAnalysis} from 'server/interface';
import moment from 'moment';
export default {
  name: 'sectionAnalysis',
  props: {
    checkData: {
      type: Object
    },
    isUpdate: {
      type: Boolean
    }
  },
  data () {
    return {
      loading: true,
      yAxisData: [],
      echartsData: []
    };
  },
  created () {
    // this.echartsData = [];
    this.xAxisData = [];
    this._sectionAnalysis({
      lineId: '0103',
      type: '1',
      month: ''
    });
  },
  mounted () {
  },
  watch: {
    checkData: {
      deep: true,
      handler (newData) {
        // console.log(this.checkData.date);
        // this.checkData.date = moment(this.checkData.date).format('YYYY-MM');
        if (this.checkData.value !== '' && this.checkData.turn !== '' && this.checkData.date !== '') {
          this._sectionAnalysis({
            lineId: this.checkData.value,
            type: this.checkData.turn,
            month: moment(this.checkData.date).format('YYYY-MM')
          });
        }
      }
    },
    isUpdate () {
      if (this.isUpdate) {
        this._sectionAnalysis({
          lineId: this.checkData.value,
          type: this.checkData.turn,
          month: moment(this.checkData.date).format('YYYY-MM')
        });
        this.$emit('isUpdateTo');
      }
    }
  },
  methods: {
    _sectionAnalysis (params) {
      sectionAnalysis('zhfxpt/analysis/getSectionLinePassengerChartDatas', params).then(res => {
        // console.log(res);
        this.xAxisData = res.data.data.xAxisNames;
        this.yAxisData = res.data.data.yAxisNames;
        this.echartsData = res.data.data.datas;
        if (this.echartsData.length > 0) {
          this.drawLine();
          this.loading = false;
          this.$refs.chartWrapper.style.display = 'block';
        } else {
          this.$refs.chartWrapper.style.display = 'none';
        }
      });
    },
    drawLine () {
      let chartLine = this.$echarts.init(document.getElementById('chart-wrapper'));
      window.addEventListener('resize', () => chartLine.resize());
      let positions = this.xAxisData;
      let times = this.yAxisData;
      // let index = this.yAxisData.length;
      // (每个数组中的第一项是多少条数据的索引（相当于Y轴的数），第二项是每条数据对应的X轴的数，第三项数是数据多少也就是圆的大小)
      let data = this.echartsData;
      data = data.map(function (item) {
        return [item[1], item[0], item[2]];
      });
      let options = {
        tooltip: {
          position: 'top',
          formatter: function (params) {
            return params.name + '---客流高峰值:' + params.value[2];
          }
        },
        grid: {
          left: 2,
          bottom: 10,
          right: 18,
          containLabel: true
        },
        xAxis: {
            type: 'category',
            data: positions,
            boundaryGap: false,
            categoryAxis: {
              autoGridCount: false
            },
            axisLabel: {
              interval: 0,
              rotate: 40
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#999',
                    type: 'dashed'
                }
            },
            axisLine: {
                show: false
            }
        },
        yAxis: {
            type: 'category',
            data: times,
            axisLine: {
                show: false
            }
        },
        series: [{
            // name: 'Punch Card',
            type: 'scatter',
            symbolSize: function (val) {
                return val[2] * 0.4;
            },
            data: data,
            animationDelay: function (idx) {
                return idx * 6;
            }
        }]
      };
    //   this.$echarts.util.each(times, function (time, idx) {
    //     options.title.push({
    //         textBaseline: 'middle',
    //         // 多少条数据
    //         top: (idx + 0.5) * 100 / index + '%',
    //         text: time
    //     });
    //     options.singleAxis.push({
    //         left: 100,
    //         type: 'category',
    //         boundaryGap: false,
    //         data: positions,
    //         // 多少条数据
    //         top: (idx * 100 / index + 5) + '%',
    //         height: (100 / index - 10) + '%',
    //         axisLabel: {
    //             interval: 1
    //         }
    //     });
    //     options.series.push({
    //         singleAxisIndex: idx,
    //         coordinateSystem: 'singleAxis',
    //         type: 'scatter',
    //         data: [],
    //         // 圆圈大小
    //         symbolSize: function (dataItem) {
    //             return dataItem[1] * 0.8;
    //         }
    //     });
    // });

    // this.$echarts.util.each(data, function (dataItem) {
    //     options.series[dataItem[0]].data.push([dataItem[1], dataItem[2]]);
    // });
      chartLine.setOption(options);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
