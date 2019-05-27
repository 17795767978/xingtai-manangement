<template>
  <div class="person-detail-content">
    <el-row :gutter="1">
      <el-col :span="3">
        <h3 class="demonstration">报警视频</h3>
        <h5><span style="margin-left:20px; font-size: 16px; font-weight: 600">共{{videoList.length}}部</span></h5>
      </el-col>
      <el-col :span="21">
        <el-carousel v-if="videoList.length > 0"
          height="270px"
          style="width: 80%; margin-left: 5%"
          indicator-position="none"
          :autoplay="false"
          trigger="click">
          <el-carousel-item v-for="(item, index) in videoList" :key="index">
            <video :src="item.url" width="100%" height="100%" controls></video>
          </el-carousel-item>
        </el-carousel>
        <img v-else src="../../../../../../assets/images/noVideoData.png" width="70%" style="margin-left: 10%">
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
// import leftWrapper from './Components/leftWrapper';
// import rightWrapper from './Components/rightWrapper';
// import moment from 'moment';
export default {
  name: 'alarmContent',
  props: {
    busDetails: {
      type: Array
    }
  },
  data () {
    return {
      isLoading: true,
      videoList: [],
      direction: 'vertical'
    };
  },
  components: {
    // leftWrapper,
    // rightWrapper
  },
  created () {
  },
  watch: {
    busDetails () {
      this.videoList = this.busDetails;
      this.isLoading = false;
    }
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
.alarm-content {
  width: 100%;
  padding: 5px 10px;
  box-sizing: border-box;
  .demonstration {
    margin-top: 0px;
  }
}
</style>
