<template>
  <div class="echart-term" ref="echartTerm">
    <div
      id="echart-term"
      :style="{width: '100%', height: '300px'}"
      element-loading-background="rgba(0, 0, 0, 0)"
      >
    </div>
  </div>
</template>

<script type="type/ecmascript-6">
import {alartTerm} from 'server/interface';
import {max} from 'utils/max';
import elementResizeDetector from 'element-resize-detector';
export default {
  props: {
    selectData: {
      type: Object
    }
  },
  data () {
    return {
      echartsData: [],
      xAxise: [],
      listData: [],
      maxNum: ''
    };
  },
  components: {
  },
  created () {
    this._alartTerm({
      orgId: this.selectData.orgId,
      lineId: this.selectData.lineId,
      busPlateNumber: this.selectData.busPlateNumber,
      startTime: '',
      endTime: ''
    });
  },
  mounted () {
    let listenResize = elementResizeDetector();
    listenResize.listenTo(this.$refs.echartTerm, (el) => {
      this.$echarts.init(document.getElementById('echart-term')).resize();
    });
  },
  methods: {
    _alartTerm (params) {
      alartTerm('warnsAnalysis/warnSort/echar/get', params).then(res => {
        let arr = res.data.data;
        this.listData = arr.sort((i, k) => k.count - i.count);
        this.echartsData = this.listData.map(list => Number(list.count));
        this.xAxise = this.listData.map(list => list.warnTypeName);
        this.maxNum = max(this.echartsData);
        if (this.maxNum >= 0) {
          this.drawLine();
        }
      });
    },
    drawLine () {
      let chart = this.$echarts.init(document.getElementById('echart-term'));
      window.addEventListener('resize', () => { chart.resize(); });
      chart.setOption({
        title: {
          text: '报警排序图',
          x: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.xAxise,
            axisTick: {
                alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            max: this.maxNum + this.maxNum / 6,
            min: 0
          }
        ],
        series: [
          {
            name: '数值',
            type: 'bar',
            barWidth: '30px',
            data: this.echartsData,
            itemStyle: {
              emphasis: {
                barBorderRadius: 20
              },
              normal: {
                barBorderRadius: 20,
                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                    offset: 0,
                    color: 'red' // 0% 处的颜色
                }, {
                    offset: 0.6,
                    color: 'blue' // 60% 处的颜色
                }, {
                    offset: 1,
                    color: 'yellow' // 100% 处的颜色
                }], false)
              }
            }
          }
        ]
      });
      chart.on('click', (param) => {
        let arr = this.listData.filter(list => list.warnTypeName === param.name);
        this.$emit('getWarnId', arr[0]);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.echart-term {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #eeeeee;
  border-radius: 12px;
  height: 322px;
}
</style>
