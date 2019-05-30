<template>
  <div class="echart-level" ref="echartLevel">
    <div
      id="level-chart"
      :style="{width: '100%', height: '350px'}"
      element-loading-background="rgba(0, 0, 0, 0)"
      >
    </div>
  </div>
</template>

<script type="type/ecmascript-6">
import {levelRate} from 'server/interface';
import elementResizeDetector from 'element-resize-detector';
export default {
  props: {
    selectData: {
      type: Object
    }
  },
  data () {
    return {
      levelData: [],
      observer: null
    };
  },
  components: {
  },
  created () {
    this._levelRate({
      orgId: this.selectData.orgId,
      lineId: this.selectData.lineId,
      busPlateNumber: this.selectData.busPlateNumber,
      // startTime: this.selectData.valueTime[0], // 默认7天，昨天开始.时间格式
      // endTime: this.selectData.valueTime[1],
      startTime: '',
      endTime: ''
    });
  },
  mounted () {
    let listenResize = elementResizeDetector();
    listenResize.listenTo(this.$refs.echartLevel, (el) => {
      this.$echarts.init(document.getElementById('level-chart')).resize();
    });
  },
  watch: {
    selectData: {
      deep: true,
      handler () {
        this._levelRate({
          orgId: this.selectData.orgId,
          lineId: this.selectData.lineId,
          busPlateNumber: this.selectData.busPlateNumber,
          startTime: '',
          endTime: ''
        });
      }
    }
  },
  methods: {
    _levelRate (params) {
      levelRate('warnsAnalysis/warnPie/echar/get', params).then(res => {
        this.levelData = res.data.data;
        if (this.levelData) {
          this.drawLine();
        }
      });
    },
    drawLine () {
      let chart = this.$echarts.init(document.getElementById('level-chart'));
      window.addEventListener('resize', () => { chart.resize(); });
      this.$refs.echartLevel.addEventListener('resize', () => { chart.resize(); });
      chart.setOption({
        title: {
          text: '报警等级占比',
          x: 'left'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'right',
          data: ['等级1', '等级2', '等级3']
        },
        series: [
          {
            name: '报警等级',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            labelLine: {
                normal: {
                  show: true
                }
            },
            itemStyle: {
              normal: {
                label: {
                  formatter: '{b} : {c} ({d}%)'
                }
              }
            },
            data: [
              {value: this.levelData[0].warnNum, name: '等级1'},
              {value: this.levelData[1].warnNum, name: '等级2'},
              {value: this.levelData[2].warnNum, name: '等级3'}
            ]
          }
        ]
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.echart-level {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #eeeeee;
  border-radius: 12px;
}
</style>
