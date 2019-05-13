<template>
  <div id="real-time" :style="{width: '100%', height: '250px'}"></div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {};
  },
  created () {},
  mounted () {
    this.drawnLine();
  },
  methods: {
    drawnLine () {
      let realTime = this.$echarts.init(document.getElementById('real-time'));
      window.addEventListener('resize', () => { realTime.resize(); });
      realTime.setOption({
        title: {
          text: 'SOC实时趋势',
          subtext: '测试',
          left: 'center'
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      });
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
