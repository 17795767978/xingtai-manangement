<template>
  <div class="stream-wrapper">
    <header>
     <el-row :gutter="10">
       <el-col :span="4">
        <el-card class="bg-style" shadow="always">
          <h3 class="title-style">
            当日累计客流（人数）
          </h3>
          <p class="font-style" style="color: #e9e404">{{passengeFlowNum}}</p>
        </el-card>
       </el-col>
       <el-col :span="4">
        <el-card class="bg-style" shadow="always">
          <h3 class="title-style">实时载客（人）</h3>
          <p class="font-style" style="color: #00f4f5">{{totelPerson}}</p>
        </el-card>
       </el-col>
       <el-col :span="3">
        <el-card class="bg-style" shadow="always">
          <h3 class="title-style">运营路线</h3>
          <p class="font-style" style="color: #acf50f">{{operLines}}/{{totalLines}}</p>
        </el-card>
       </el-col>
       <el-col :span="4">
        <el-card class="bg-style" shadow="always">
          <h3 class="title-style">在线车辆数</h3>
          <p class="font-style" style="color: #ef9c05">{{onLineCarNum}}</p>
        </el-card>
       </el-col>
       <el-col :span="3">
        <el-card class="bg-style" shadow="always">
          <h3 class="title-style">实时满载率</h3>
          <p class="font-style" style="color: #d52d8c">{{totelFullLoadRate}}%</p>
        </el-card>
       </el-col>
       <el-col :span="3">
        <el-card class="bg-style" shadow="always">
          <h3 class="title-style">运营车辆数</h3>
          <p class="font-style" style="color: #d5d40c">{{operateCarNum}}</p>
        </el-card>
       </el-col>
       <el-col :span="3">
        <el-card class="bg-style" shadow="always">
          <h3 class="title-style">待发车辆数</h3>
          <p class="font-style" style="color: #a308b2">{{outgoingCarNum}}</p>
        </el-card>
       </el-col>
     </el-row>
    </header>
  </div>
</template>

<script>
import {
  passengeFlow,
  realTimePassengeFlow,
  operateLines,
  onLineCarNum,
  realTimeFullRate,
  operateCarNum,
  outgoingCarNum
} from 'server/interface';
export default {
  data () {
    return {
      passengeFlowNum: '',
      totelPerson: '',
      operLines: '',
      totalLines: '',
      realTimePassengeFlow: '',
      onLineCarNum: 0,
      totelFullLoadRate: '',
      realTimeFullRate: '',
      operateCarNum: 0,
      outgoingCarNum: ''
    };
  },
  created () {
    this._passengeFlow({
      orgId: ''
    });
    this._realTimePassengeFlow({
      orgId: ''
    });
    this._operateLines({
      orgId: ''
    });
    this._onLineCarNum({
      orgId: ''
    });
    this._realTimeFullRate({
      orgId: ''
    });
    this._operateCarNum({
      orgId: '',
      type: '1'
    });
    this._outgoingCarNum({
      orgId: '',
      type: '0'
    });
  },
  methods: {
    _passengeFlow (params) {
      passengeFlow('zhfxpt/passengerflow/getTotalPassengerFlow', params).then(res => {
        this.passengeFlowNum = res.data.data.personCount;
      });
    },
    _realTimePassengeFlow (parmas) {
      realTimePassengeFlow('zhfxpt/passengerflow/getRealTimePersoncountAndFullLoadRate', parmas).then(res => {
        this.totelPerson = res.data.data.personCount;
        this.totelFullLoadRate = res.data.data.fullLoadRate;
      });
    },
    _operateLines (params) {
      operateLines('/zhfxpt/passengerflow/getRealTimeOperLines', params).then(res => {
        this.operLines = res.data.data.operLines;
        this.totalLines = res.data.data.totalLines;
      });
    },
    _onLineCarNum (params) {
      onLineCarNum('zhfxpt/getOnlineBusNumber', params).then(res => {
        // console.log(res);
        // let dataArr = res.data.data;
        // let numArr = dataArr.map(item => item.onlineBusNumber);
        // numArr.forEach(item => {
        //   let num = parseInt(item);
        //   this.onLineCarNum += num;
        // });
        this.onLineCarNum = res.data.data.onlineBusNumber;
      });
    },
    _realTimeFullRate (params) {
      realTimeFullRate('zhfxpt/passengerflow/getRealTimeFullLoadRate', params).then(res => {
        console.log(res);
      });
    },
    _operateCarNum (params) {
      operateCarNum('zhfxpt/getOperateBusNumber', params).then(res => {
        // let dataArr = res.data.data;
        // let numArr = dataArr.map(item => item.operateBusNumber);
        // numArr.forEach(item => {
        //   let num = parseInt(item);
        //   this.operateCarNum += num;
        // });
        this.operateCarNum = res.data.data.operateBusNumber;
      });
    },
    _outgoingCarNum (params) {
      outgoingCarNum('zhfxpt/getOperateBusNumber', params).then(res => {
        this.outgoingCarNum = res.data.data.nooperateBusNumber;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.stream-wrapper {
  width: 100%;
  .bg-style {
    background-color: rgba(0,0,0, 0.6);
    box-shadow: -4px -5px 10px #409EFF;
    .title-style {
      margin-top: 0px;
      font-size: 14px;
      color: #fff;
    }
    .font-style {
      margin: 0;
      font-size: 20px;
      font-weight: bold;
      height: 30px;
    }
  }
}
</style>
