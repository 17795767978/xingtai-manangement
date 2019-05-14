<template>
  <div class="full-load-rate">
    <header>
      <headerNav @configCheck="configCheck" @tabTypeCheck="tabTypeCheck"></headerNav>
    </header>
    <div class="content">
      <contentWrapper :checkData="checkData" :tabTypeData="tabTypeData"></contentWrapper>
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
      checkData: {},
      tabTypeData: []
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
      this.checkData = data;
    },
    tabTypeCheck (tabType) {
      this.tabTypeData = tabType;
    }
  }
};
</script>

<style lang="scss" scoped>
.full-load-rate {
  width: 100%;
}
</style>
