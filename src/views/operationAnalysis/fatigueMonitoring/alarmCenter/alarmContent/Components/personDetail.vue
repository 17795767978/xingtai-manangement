<template>
  <div class="person-detail-content">
    <h3 class="demonstration">报警详情</h3>
    <el-row :gutter="24">
       <el-col :span="6">
        <i class="fa fa-credit-card"></i>
        <span>车牌号:</span>
        <span>{{busDetails.busPlateNumber}}</span>
       </el-col>
       <el-col :span="6">
        <i class="fa fa-drivers-license-o"></i>
        <span>自编号:</span>
        <span>{{busDetails.busSelfCode}}</span>
       </el-col>
       <el-col :span="6">
        <i class="fa fa-arrows-h"></i>
        <span>所属线路:</span>
        <span>{{busDetails.lineName}}</span>
       </el-col>
       <el-col :span="6">
        <i class="fa fa-building"></i>
        <span>所属公司:</span>
        <span>{{busDetails.orgName}}</span>
       </el-col>
    </el-row>
    <el-row :gutter="24">
       <el-col :span="6">
        <i class="fa fa-code-fork"></i>
        <span>设备类型:</span>
        <span>{{busDetails.warnSourceName}}</span>
       </el-col>
       <el-col :span="6">
        <i class="fa fa-exclamation-triangle"></i>
        <span>报警类型:</span>
        <span>{{busDetails.warnTypeName}}</span>
       </el-col>
       <el-col :span="6">
        <i class="fa fa-clock-o"></i>
        <span>报警时间:</span>
        <span>{{timeFormat}}</span>
       </el-col>
       <el-col :span="6">
        <i class="fa fa-flash"></i>
        <span>速度:</span>
        <span>{{busDetails.speed}}KM/H</span>
       </el-col>
    </el-row>
    <!-- <p>
      <i class="fa fa-credit-card"></i>
      <span>车牌号:</span>
      <span>{{busDetails.busPlateNumber}}</span>
    </p> -->
    <!-- <p>
      <i class="fa fa-drivers-license-o"></i>
      <span>自编号:</span>
      <span>{{busDetails.busSelfCode}}</span>
    </p> -->
    <!-- <p>
      <i class="fa fa-arrows-h"></i>
      <span>所属线路:</span>
      <span>{{busDetails.lineName}}</span>
    </p>-->
    <!-- <p>
      <i class="fa fa-building"></i>
      <span>所属公司:</span>
      <span>{{busDetails.orgName}}</span>
    </p>-->
    <!-- <p>
      <i class="fa fa-code-fork"></i>
      <span>设备类型:</span>
      <span>{{busDetails.warnSourceName}}</span>
    </p> -->
    <!-- <p>
      <i class="fa fa-exclamation-triangle"></i>
      <span>报警类型:</span>
      <span>{{busDetails.warnTypeName}}</span>
    </p> -->
    <!-- <p>
      <i class="fa fa-clock-o"></i>
      <span>报警时间:</span>
      <span>{{timeFormat}}</span>
    </p> -->
    <!-- <p>
      <i class="fa fa-flash"></i>
      <span>速度:</span>
      <span>{{busDetails.speed}}KM/H</span>
    </p> -->
  </div>
</template>

<script type="text/ecmascript-6">
// import leftWrapper from './Components/leftWrapper';
// import rightWrapper from './Components/rightWrapper';
import moment from 'moment';
export default {
  name: 'alarmContent',
  props: {
    busDetails: {
      type: Object
    }
  },
  data () {
    return {
    };
  },
  computed: {
    timeFormat () {
      return moment(this.busDetails.warnTime).format('YYYY-MM-DD HH:MM:SS');
    }
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
.person-detail-content {
  .demonstration {
    margin-top: 0px;
  }
  .fa {
    width: 10px;
    margin-right: 10px;
  }
}
</style>
