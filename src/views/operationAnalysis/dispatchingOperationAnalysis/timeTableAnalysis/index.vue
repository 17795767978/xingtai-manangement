<template>
  <div class="time-table-analysis">
    <header>
      <headerNav></headerNav>
    </header>
    <div class="content">
      <contentWrapper></contentWrapper>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import headerNav from './Components/header';
import contentWrapper from './Components/content';
export default {
  name: 'timeTableAnalysis',
  components: {
    headerNav,
    contentWrapper
  },
  mounted () {
    console.log(123);
  }
};
</script>

<style lang="scss" scoped>
.time-table-analysis {
  width: 100%;
}
</style>
