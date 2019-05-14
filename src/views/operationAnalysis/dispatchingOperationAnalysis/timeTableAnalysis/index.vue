<template>
  <div class="time-table-analysis">
    <header>
      <headerNav @configCheck="configCheck"></headerNav>
    </header>
    <div class="content">
      <contentWrapper :headerParams="headerParams"></contentWrapper>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import headerNav from './Components/header';
import contentWrapper from './Components/content';
export default {
  name: 'timeTableAnalysis',
  data () {
    return {
      headerParams: {}
    };
  },
  components: {
    headerNav,
    contentWrapper
  },
  mounted () {
    console.log(123);
  },
  methods: {
    configCheck (data) {
      this.headerParams = data;
    }
  }
};
</script>

<style lang="scss" scoped>
.time-table-analysis {
  width: 100%;
}
</style>
