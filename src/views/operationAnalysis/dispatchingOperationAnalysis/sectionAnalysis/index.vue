<template>
  <div class="section-table-analysis">
    <header>
      <headerNav></headerNav>
    </header>
    <div class="content">
      <!-- <contentWrapper></contentWrapper> -->
      <h2 class="title"><span style="color: #f00">{{busLine}}</span>客流高峰断面分析</h2>
      <Chart></Chart>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import headerNav from './Components/header';
import Chart from './Components/chart';
// import contentWrapper from './Components/content';
export default {
  name: 'sectionAnalysis',
  data () {
    return {
      busLine: '1路'
    };
  },
  components: {
    headerNav,
    Chart
    // contentWrapper
  },
  mounted () {
    console.log(123);
  }
};
</script>

<style lang="scss" scoped>
.section-table-analysis {
  width: 100%;
  .content {
    width: 100%;
    padding: 10px 50px;
    box-sizing: border-box;
    .title {
      text-align: center;
    }
  }
}
</style>
