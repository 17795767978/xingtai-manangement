<template>
<div>
  <div
    id="drive-chart"
    :style="{width: '90%', height: '230px',padding: '10px 0', margin: '0 auto'}"
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0)"
    >
  </div>
</div>
</template>

<script>
import {badDrivingBehavior} from 'server/interface';
// import noEcharts from './noEcharts.vue';
export default {
  data () {
    return {
      loading: true,
      changeData: [],
      badDrivingBehavior: []
    };
  },
  components: {
    // noEcharts
  },
  created () {
    this._badDrivingBehavior({
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
    _badDrivingBehavior (params) {
      badDrivingBehavior('zhfxpt/getStatisticDatasByWarnType', params).then(res => {
        this.changeData = res.data.data;
        let dataArrValue = res.data.data.map(item => item.warnLabel);
        let dataArrNumber = res.data.data.map(item => item.warnNumber);
        for (let i = 0; i < dataArrValue.length; i++) {
           this.badDrivingBehavior[i] = {
             name: dataArrValue[i],
             value: dataArrNumber[i]
           };
        }
        this.drawLine();
        this.loading = false;
        console.log(this.badDrivingBehavior);
      });
    },
    drawLine () {
      let driveLine = this.$echarts.init(document.getElementById('drive-chart'));
      window.addEventListener('resize', () => { driveLine.resize(); });
      driveLine.setOption({
        title: {
          text: '不良驾驶行为统计',
          left: 'center',
          textStyle: {
            'color': '#fff'
          }
        },
        // legend: {
        //   x: 'center',
        //   y: 'bottom',
        //   data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
        // },
        series: [
          {
              name: '面积模式',
              type: 'pie',
              radius: [0, 60],
              center: ['50%', '60%'],
              roseType: 'radius',
              data: this.badDrivingBehavior
          }
      ]
      });
    }
  },
  watch: {
    changeData () {
    }
  }
};
</script>

<style lang="scss" scoped>
.drive-chart {
  width: 100%;
}
</style>
