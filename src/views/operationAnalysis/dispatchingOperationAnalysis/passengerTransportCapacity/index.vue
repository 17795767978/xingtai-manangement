<template>
  <div class="passenger-transport-capacity">
    <header>
      <headerNav @configCheck="configCheck"></headerNav>
    </header>
    <div class="content">
      <contentWrapper
        :selectData="selectData"
        :isUpdateUp="isUpdateUp"
        :isUpdateDown="isUpdateDown"
        @isUpdateFaUp="isUpdateFaUp"
        @isUpdateFaDown="isUpdateFaDown"
      ></contentWrapper>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import headerNav from './Components/header';
import contentWrapper from './Components/content';
import moment from 'moment';
export default {
  name: 'timeTableAnalysis',
  data () {
    return {
      selectData: {},
      nowTime: '',
      isUpdateUp: false,
      isUpdateDown: false
    };
  },
  components: {
    headerNav,
    contentWrapper
  },
  mounted () {
  },
  watch: {
    headerParams: {
      deep: true,
      handler () {
        this.nowTime = moment(Date.now()).valueOf();
      }
    }
  },
  methods: {
    configCheck (data) {
      this.selectData = data;
      let oldTime = this.nowTime;
      this.nowTime = moment(Date.now()).valueOf();
      if (this.nowTime - oldTime < 5000) {
        this.$message.warning('短时间内请勿重复操作，请等待10秒');
      } else {
        this.isUpdateUp = true;
        this.isUpdateDown = true;
      }
    },
    isUpdateFaUp () {
      this.isUpdateUp = false;
    },
    isUpdateFaDown () {
      this.isUpdateDown = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.passenger-transport-capacity {
  width: 100%;
}
</style>
