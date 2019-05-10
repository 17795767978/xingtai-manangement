<template>
  <div class="data-wrapper">
    <div class="content-wrapper">
     <TopTitleMsg></TopTitleMsg>
     <StreamNum></StreamNum>
     <chartsComplete></chartsComplete>
     <chartsMain></chartsMain>
     <bottomChart></bottomChart>
    </div>
  </div>
</template>

<script type="ecmascript">
import TopTitleMsg from './Components/topTitleMsg.vue';
import StreamNum from './Components/streamNum.vue';
import chartsComplete from './Components/chartsComplete.vue';
import chartsMain from './Components/chartsMain.vue';
import bottomChart from './Components/bottomChart.vue';
export default {
  name: 'chartAnalysis',
  data () {
    return {
      message: '123'
    };
  },
  components: {
    TopTitleMsg,
    StreamNum,
    chartsComplete,
    chartsMain,
    bottomChart
  }
};
</script>

<style lang="scss" scoped>
.data-wrapper {
  width: 100%;
  min-height: calc(100vh);
  background: url(../../assets/images/space.jpg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .content-wrapper {
    padding: 10px 10px;
    box-sizing: border-box;
  }
}
</style>
