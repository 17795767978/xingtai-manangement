<template>
  <div class="trip-order">
    <header>
      <headerNav></headerNav>
    </header>
    <div class="content">
      <!-- <contentWrapper></contentWrapper> -->
      <h2 class="title"><span style="color: #f00">{{busLine}}{{station}}</span>车次时序图</h2>
      <h4 class="title time">刷新时间：</h4>
      <!-- <Chart></Chart> -->
    </div>
  </div>
</template>

<script type="text-ecmascript-6">
import headerNav from './Components/header';
export default {
  name: 'tripOrder',
  data () {
    return {
      busLine: '1路',
      station: '<kobe>'
    };
  },
  components: {
    headerNav
  }
};
</script>

<style lang="scss" scoped>
.trip-order {
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
