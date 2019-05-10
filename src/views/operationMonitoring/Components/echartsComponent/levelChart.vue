<template>
  <div id="level-chart" :style="{width: '90%', height: '230px',padding: '10px 0', margin: '0 auto'}"
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0)"
  >
  </div>
</template>

<script>
import {getLevelList} from 'server/interface';
export default {
  data () {
    return {
      loading: true,
      changeData: [],
      getLevelList: []
    };
  },
  created () {
    this._getLevelList({
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
    _getLevelList (params) {
      getLevelList('zhfxpt/getAnalysisDatasByWarnLeave', params).then(res => {
        this.changeData = res.data.data;
        let dataArrValue = res.data.data.map(item => item.warnLabel);
        let dataArrNumber = res.data.data.map(item => item.warnNumber);
        for (let i = 0; i < dataArrValue.length; i++) {
           this.getLevelList[i] = {
             name: dataArrValue[i],
             value: dataArrNumber[i]
           };
        }
        this.drawLine();
        this.loading = false;
      });
    },
    drawLine () {
      let levelLine = this.$echarts.init(document.getElementById('level-chart'));
      window.addEventListener('resize', () => { levelLine.resize(); });
      levelLine.setOption({
        title: {
          text: '不良行为等级分析',
          left: 'center',
          textStyle: {
            'color': '#fff'
          }
        },
        legend: {
          x: 'center',
          y: 'bottom',
          data: ['一般', '预警', '严重'],
          bottom: 20,
          textStyle: {
            color: '#fff'
          }
        },
        color: ['#2bacd0', '#fedd00', '#f98e00'],
        series: [
          {
              name: '面积模式',
              type: 'pie',
              radius: [0, 60],
              center: ['50%', '50%'],
              roseType: 'radius',
              label: {
                  normal: {
                      show: false
                  },
                  emphasis: {
                      show: true
                  }
              },
              lableLine: {
                  normal: {
                      show: false
                  },
                  emphasis: {
                      show: true
                  }
              },
              data: this.getLevelList
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
