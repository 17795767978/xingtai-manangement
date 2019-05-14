<template>
  <div class="section-table-analysis">
    <header>
      <headerNav @configCheck="configCheck"></headerNav>
    </header>
    <div class="content">
      <!-- <contentWrapper></contentWrapper> -->
      <h2 class="title"><span style="color: #f00">{{checkData.value}}</span>客流高峰断面分析</h2>
      <Chart :checkData="checkData"></Chart>
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
      busLine: '1路',
      checkData: {}
    };
  },
  components: {
    headerNav,
    Chart
    // contentWrapper
  },
  mounted () {
    console.log(123);
  },
  methods: {
    configCheck (data) {
      // console.log(data);
      this.checkData = data;
    }
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
      margin-bottom: -20px;
    }
  }
}
</style>
