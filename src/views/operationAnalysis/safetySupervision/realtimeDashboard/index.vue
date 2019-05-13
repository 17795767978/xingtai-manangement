<template>
  <div class="rantime-analysis">
    <header>
      <headerNav></headerNav>
    </header>
    <div class="content">
      <!-- <h2 class="title">路线({{busLine}})站间运行时间分析({{turn}})</h2> -->
      <contentWrapper></contentWrapper>
    </div>
    <div class="floor">
      <!-- <floorWrapper></floorWrapper> -->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import headerNav from './Components/header';
import contentWrapper from './Components/content';
// import floorWrapper from './Components/floor';
export default {
  name: 'realTimeDashboard',
  data () {
    return {
      busLine: '1路',
      turn: '上行'
    };
  },
  components: {
    headerNav,
    contentWrapper
    // floorWrapper
  },
  mounted () {
    console.log(123);
  }
};
</script>

<style lang="scss" scoped>
.rantime-analysis {
  width: 100%;
  .content {
    padding: 0 10px;
    .title {
      text-align: center;
      margin: 50px 0;
    }
  }
  .floor {
    padding: 0 10px;
    margin-top: 20px;
  }
}
</style>
