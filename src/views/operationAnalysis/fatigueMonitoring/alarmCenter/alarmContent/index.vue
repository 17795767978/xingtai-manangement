<template>
  <div class="alarm-content">
    <el-row class="pic">
      <el-card shadow="hover" class="person-detail">
        <personDetail :busDetails="busDetails" />
      </el-card>
    </el-row>
    <el-row class="pic" :gutter="12">
      <el-col :span="12">
        <el-card shadow="hover" class="pic-detail">
          <picDetail :busDetails="busDetails.warnPicList"/>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover" class="video-detail">
          <videoDetail :busDetails="busDetails.warnMediaList"/>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="pic">
      <el-card shadow="hover" class="map-detail">
        <mapDetail :busDetails="busDetails"/>
      </el-card>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import {warnInfoDetail} from 'server/interface';
import personDetail from './Components/personDetail';
import picDetail from './Components/picDetail';
import videoDetail from './Components/videoDetail';
import mapDetail from './Components/mapDetail';
// import moment from 'moment';
export default {
  name: 'alarmContent',
  data () {
    return {
      busDetails: {},
      isClear: false
    };
  },
  components: {
    personDetail,
    picDetail,
    videoDetail,
    mapDetail
  },
  created () {
    this._warnInfoDetail({
      warnUuid: this.$route.query.warnUuid
    });
  },
  watch: {
  },
  methods: {
    _warnInfoDetail (params) {
      warnInfoDetail('warns/warnInfoDetail/get', params).then(res => {
        this.busDetails = res.data.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.alarm-content {
  width: 100%;
  padding: 10px 10px;
  box-sizing: border-box;
  background-color: #f0f2f5;
  .pic {
    margin-bottom: 10px;
  }
  .person-detail {
    height: 140px;
  }
  .pic-detail {
    height: 300px;
  }
  .video-detail {
    height: 300px;
  }
  .map-detail {
    height: 350px;
  }
}
</style>
