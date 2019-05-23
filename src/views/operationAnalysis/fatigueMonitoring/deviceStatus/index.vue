<template>
  <div class="alarm-center">
    <header>
      <headerNav @selectConfig='selectConfig'></headerNav>
    </header>
    <div class="rate-wrapper">
      <rateWrapper></rateWrapper>
    </div>
    <div class="table-wrapper">
      <tableWrapper :selectData="selectData"></tableWrapper>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import headerNav from './Components/header';
import rateWrapper from './Components/rate';
import tableWrapper from './Components/rateTable';
// import moment from 'moment';
export default {
  name: 'deviceStatus',
  data () {
    return {
      selectData: {}
    };
  },
  components: {
    headerNav,
    rateWrapper,
    tableWrapper
  },
  mounted () {
    // console.log(123);
  },
  watch: {
  },
  methods: {
    selectConfig (data) {
      this.selectData = data;
    }
  }
};
</script>

<style lang="scss" scoped>
.rate-wrapper {
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
}
.table-wrapper {
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
}
</style>
