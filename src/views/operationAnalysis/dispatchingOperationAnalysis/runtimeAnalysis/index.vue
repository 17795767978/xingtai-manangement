<template>
  <div class="rantime-analysis">
    <header>
      <headerNav @configCheck="configCheck"></headerNav>
    </header>
    <div class="content">
      <h2 class="title">站间运行时间分析</h2>
      <contentWrapper :selectData="selectData" :isUpdate="isUpdate" @isUpdateTo="isUpdateTo"></contentWrapper>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import headerNav from './Components/header';
import contentWrapper from './Components/content';
import moment from 'moment';
export default {
  name: 'rauntimeAnalysis',
  data () {
    return {
      selectData: {},
      isUpdate: false,
      timeNow: ''
    };
  },
  components: {
    headerNav,
    contentWrapper
  },
  watch: {
    selectData () {
      this.timeNow = moment(Date.now()).valueOf();
    }
  },
  methods: {
    configCheck (data) {
      this.selectData = data;
      let oldTime = this.timeNow;
      this.timeNow = moment(Date.now()).valueOf();
      if (this.timeNow - oldTime < 5000) {
        this.$message.warning('短时间内请勿重复操作');
      } else {
        this.isUpdate = true;
      }
    },
    isUpdateTo () {
      this.isUpdate = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.rantime-analysis {
  width: 100%;
  .content {
    .title {
      text-align: center;
      margin: 50px 0;
    }
  }
}
</style>
