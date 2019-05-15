<template>
  <div class="trip-order">
    <header>
      <headerNav @configType="configType"></headerNav>
    </header>
    <div class="content">
      <h2 class="title"><span style="color: #f00">{{busLine}}{{station}}</span>车次时序图</h2>
      <h4 class="title time">刷新时间：{{timeNow}}</h4>
      <contentWrapper :selectData="selectData" :isUpdate='isUpdate'></contentWrapper>
      <!-- <Chart></Chart> -->
    </div>
  </div>
</template>

<script type="text-ecmascript-6">
import headerNav from './Components/header';
import contentWrapper from './Components/content';
import moment from 'moment';
export default {
  name: 'tripOrder',
  data () {
    return {
      busLine: '1路',
      station: '<kobe>',
      timeNow: '',
      selectData: {},
      isUpdate: false
    };
  },
  mounted () {
    this.timeNow = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  },
  components: {
    headerNav,
    contentWrapper
  },
  watch: {
    selectData: {
      deep: true,
      handler (oldData, newData) {
        this.timeNow = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
      }
    }
  },
  methods: {
    configType (data) {
      let oldTime = moment(this.timeNow).valueOf();
      this.timeNow = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
      let newTime = moment(this.timeNow).valueOf();
      if (newTime - oldTime < 6000) {
        this.$message.warning('已是最新数据，请勿重复操作');
        this.isUpdate = false;
      } else {
        this.isUpdate = true;
      }
      this.selectData = data;
    }
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
