<template>
  <div id="chart-wrapper" :style="{width: '100%', height: '600px'}"></div>
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
      let chart = this.$echarts.init(document.getElementById('chart-wrapper'));
      window.addEventListener('resize', () => {
        chart.resize();
      });
      chart.setOption({
        title: {
        text: ''
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    // toolbox: {
    //     feature: {
    //         saveAsImage: {}
    //     }
    // },
    xAxis: {
        type: 'category',
        data: ['西直门1', '西直门2', '西直门3', '西直门4', '西直门5', '西直门6', '西直门7', '西直门8', '西直门9', '西直门10', '西直门11', '西直门12', '西直门13', '西直门14', '西直门15', '西直门16', '西直门17', '西直门18', '西直门19', '西直门20', '西直门21', '西直门22'],
        splitLine: { // y轴刻度线
          'show': true
        },
        axisTick: {
          alignWithLabel: true
        }
    },
    yAxis: {
        type: 'category',
        // data: ['06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00'],
        splitLine: { // y轴刻度线
          'show': true
        },
        axisTick: {
          alignWithLabel: true
        }
      },
    series: [
      {
          type: 'line',
          data: [['西直门1', '09:10'], ['西直门2', '09:15'], ['西直门3', '09:17'], ['西直门4', '09:20']]
        },
        {
          type: 'line',
          data: [['西直门2', '07:10'], ['西直门3', '07:15'], ['西直门4', '07:17'], ['西直门5', '07:20']]
        },
        {
          type: 'line',
          data: [['西直门4', '09:10'], ['西直门5', '09:15'], ['西直门6', '09:17'], ['西直门7', '09:20']]
        },
        {
          type: 'line',
          data: [['西直门7', '09:10'], ['西直门8', '09:15'], ['西直门9', '09:17'], ['西直门10', '09:20']]
        },
        {
          type: 'line',
          data: [['西直门1', '06:10'], ['西直门2', '06:15'], ['西直门3', '06:17'], ['西直门4', '06:20']]
        },
        {
          type: 'line',
          data: [['西直门4', '10:10'], ['西直门5', '10:15'], ['西直门6', '10:17'], ['西直门7', '10:20']]
        }
        // {
        //   type: 'line',
        //   data: ['7:10', '09:30'],
        //   smooth: true
        // },
        // {
        //   type: 'line',
        //   data: ['7:10', '09:30'],
        //   smooth: true
        // }
        // {
        //     name: 'Step Middle1',
        //     type: 'line',
        //     data: ['', 282, '', '', 290, 430, 410],
        //     smooth: true
        // }
        // {
        //     name: 'Step End1',
        //     type: 'line',
        //     data: [450, 432, 401, 454, 590, 530, 510],
        //     smooth: true
        // }, {
        //     name: 'Step Middle2',
        //     type: 'line',
        //     data: ['', '', '', 24, 29, '', ''],
        //     smooth: true
        // }, {
        //     name: 'Step Middle3',
        //     type: 'line',
        //     data: [220, 282, 201, 234, 290, 430, 410],
        //     smooth: true
        // }, {
        //     name: 'Step Middle4',
        //     type: 'line',
        //     data: [220, 282, 201, 234, 290, 430, 410],
        //     smooth: true
        // }, {
        //     name: 'Step Middle5',
        //     type: 'line',
        //     data: [220, 282, 201, 234, 290, 430, 410],
        //     smooth: true
        // }, {
        //     name: 'Step Middle6',
        //     type: 'line',
        //     data: [220, 282, 201, 234, 290, 430, 410],
        //     smooth: true
        // }, {
        //     name: 'Step Middle7',
        //     type: 'line',
        //     step: 'middle',
        //     data: [220, 282, 201, 234, 290, 430, 410],
        //     smooth: true
        // }, {
        //     name: 'Step Middle8',
        //     type: 'line',
        //     data: [220, 282, 201, 234, 290, 430, 410],
        //     smooth: true
        // }, {
        //     name: 'Step Middle9',
        //     type: 'line',
        //     data: [220, 282, 201, 234, 290, 430, 410],
        //     smooth: true
        // }, {
        //     name: 'Step Middle10',
        //     type: 'line',
        //     data: [220, 282, 201, 234, 290, 430, 410],
        //     smooth: true
        // }, {
        //     name: 'Step Middle11',
        //     type: 'line',
        //     data: [220, 282, 201, 234, 290, 430, 410],
        //     smooth: true
        // }
        ]
      });
    }
  }
};
</script>

<style>

</style>
