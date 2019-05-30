<template>
  <div class="main-chart-wrapper">
    <el-row :gutter="50">
      <el-col :span="12" class="data-style">
        <div class="left-wrapper">
          <rankingChart></rankingChart>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="right-wrapper">
          <h3 style="text-align: center; color: #fff; margin-top:0;">司机不良驾驶行为实时报警</h3>
          <vueSeamless  class="scroll-wrapper" :class-option="allOptions" :data="alermData">
            <p class="list-font" v-for="(list, index) in alermData" :key="index">
              {{list}}
            </p>
          </vueSeamless>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import rankingChart from './echartsComponent/rankingChart.vue';
import { badDrivingBehavior } from 'server/interface.js';
import vueSeamless from 'vue-seamless-scroll';
export default {
  data () {
    return {
      alermData: [],
      topY: 40,
      timer: null
    };
  },
  components: {
    rankingChart,
    vueSeamless
  },
  computed: {
    allOptions () {
      return {
        hoverStop: true,
        step: 0.5
      };
    }
  },
  created () {
    this._badDrivingBehavior({
      orgId: ''
    });
  },
  mounted () {
  },
  methods: {
    _badDrivingBehavior (params) {
      badDrivingBehavior('zhfxpt/getBadDrivingBehaviorDatas', params).then(res => {
        this.alermData = res.data.data;
      });
      // this.alermData = [
      //   '奥术大师大所大所大多所撒大所大所大多1',
      //   '奥术大师大所大所大多所撒大所大所大多2',
      //   '奥术大师大所大所大多所撒大所大所大多3',
      //   '奥术大师大所大所大多所撒大所大所大多4',
      //   '奥术大师大所大所大多所撒大所大所大多5',
      //   '奥术大师大所大所大多所撒大所大所大多6',
      //   '奥术大师大所大所大多所撒大所大所大多7',
      //   '奥术大师大所大所大多所撒大所大所大多8',
      //   '奥术大师大所大所大多所撒大所大所大多9',
      //   '奥术大师大所大所大多所撒大所大所大多10',
      //   '奥术大师大所大所大多所撒大所大所大多11',
      //   '奥术大师大所大所大多所撒大所大所大多12',
      //   '奥术大师大所大所大多所撒大所大所大多13',
      //   '奥术大师大所大所大多所撒大所大所大多14',
      //   '奥术大师大所大所大多所撒大所大所大多15',
      //   '奥术大师大所大所大多所撒大所大所大多16',
      //   '奥术大师大所大所大多所撒大所大所大多17',
      //   '奥术大师大所大所大多所撒大所大所大多18',
      //   '奥术大师大所大所大多所撒大所大所大多19',
      //   '奥术大师大所大所大多所撒大所大所大多20',
      //   '奥术大师大所大所大多所撒大所大所大多21',
      //   '奥术大师大所大所大多所撒大所大所大多22',
      //   '奥术大师大所大所大多所撒大所大所大多23',
      //   '奥术大师大所大所大多所撒大所大所大多24',
      //   '奥术大师大所大所大多所撒大所大所大多25',
      //   '奥术大师大所大所大多所撒大所大所大多26',
      //   '奥术大师大所大所大多所撒大所大所大多27',
      //   '奥术大师大所大所大多所撒大所大所大多28',
      //   '奥术大师大所大所大多所撒大所大所大多29',
      //   '奥术大师大所大所大多所撒大所大所大多30',
      //   '奥术大师大所大所大多所撒大所大所大多31',
      //   '奥术大师大所大所大多所撒大所大所大多32',
      //   '奥术大师大所大所大多所撒大所大所大多33',
      //   '奥术大师大所大所大多所撒大所大所大多34',
      //   '奥术大师大所大所大多所撒大所大所大多35',
      //   '奥术大师大所大所大多所撒大所大所大多36',
      //   '奥术大师大所大所大多所撒大所大所大多37',
      //   '奥术大师大所大所大多所撒大所大所大多38',
      //   '奥术大师大所大所大多所撒大所大所大多39',
      //   '奥术大师大所大所大多所撒大所大所大多40',
      //   '奥术大师大所大所大多所撒大所大所大多41',
      //   '奥术大师大所大所大多所撒大所大所大多42',
      //   '奥术大师大所大所大多所撒大所大所大多43'
      // ];
    }
  },
  watch: {
    alermData () {
      // this.timer = setInterval(() => {
      //   this.$refs.scrollWrapper.scrollTop = this.$refs.scrollWrapper.scrollTop + 10;
      //   console.log(this.$refs.scrollWrapper.scrollTop);
      //   if (this.$refs.scrollWrapper.scrollTop > 32 * (this.alermData.length - 4)) {
      //     this.$refs.scrollWrapper.scrollTop = 0;
      //   }
      // }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
.main-chart-wrapper {
  width: 100%;
  margin-top: 20px;
  .left-wrapper {
    width: 100%;
    height: 220px;
    background-color: rgba(0,0,0, 0.65);
    border-radius: 6px;
    box-shadow: -4px -5px 10px #409EFF;
  }
  .right-wrapper {
    width: 100%;
    height: 220px;
    background-color: rgba(0,0,0, 0.65);
    border-radius: 6px;
    box-shadow: -4px -5px 10px #409EFF;
    padding: 15px;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    .scroll-wrapper {
      padding: 0 30px;
      height: 80%;
      overflow: hidden;
      // animation:myfirst 20s infinite;
      // -webkit-animation:myfirst 20s infinite;
      // -o-animation:myfirst 20s infinite;
      // -moz-animation:myfirst 20s infinite;
      // position: absolute;
      // @keyframes myfirst

      // {

      // 0%   {top: -0px;}

      // 26.6%   {top: -0px;}

      // 36.6%   {top: -100px;}

      // 63.2%   {top: -300px;}

      // 73.2%   {top: -500px;}

      // 99.7%   {top: -700px;}

      // 100% {top: -0px;}
      // }
      .list-font {
        color: #fff;
        font-size: 14px;
        margin-top: 0;
        margin-bottom: 20px;
      }
    }
    .scroll-wrapper::-webkit-scrollbar {
      width: 10px;
      position: absolute;
    }
    .scroll-wrapper::-webkit-scrollbar-track {
      background-color: rgba(0, 0, 0, 1.9);
      -webkit-border-radius: 2em;
      -moz-border-radius: 2em;
      border-radius:2em;
    }
    .scroll-wrapper::-webkit-scrollbar-thumb {
      background: rgba(23, 114, 218, 0.3);
      -webkit-border-radius: 2em;
      -moz-border-radius: 2em;
      border-radius:  2em;
    }
  }
}
</style>
