<template>
  <div class="alarm-analysis">
    <headerWrapper @configCheck="configCheck"></headerWrapper>
    <contentWrapper class="content-style" :selectData="selectData"></contentWrapper>
  </div>
</template>

<script type="text/ecmascript-6">
import headerWrapper from './header/';
import contentWrapper from './content/';
// import moment from 'moment';
export default {
  name: '',
  data() {
    return {
      selectData: {}
    };
  },
  components: {
    headerWrapper,
    contentWrapper
  },
  mounted() {},
  watch: {},
  methods: {
    configCheck (data) {
      this.selectData = data;
    }
  }
};
</script>

<style lang="scss" scoped>
.alarm-analysis {
  width: 100%;
  .content-style {
    padding: 20px;
    box-sizing: border-box;
  }
}
</style>
