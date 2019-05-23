<template>
  <div class="alarm-center">
    <el-row :gutter="12">
      <el-col :span="4">
        <div class="left-wrapper">
          <leftWrapper @selectCar="selectCar" :isClear="isClear" @isClearTo="isClearTo"></leftWrapper>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="right-content">
          <rightWrapper
            :selectCarData="selectCarData"
            @clear="clear"
          ></rightWrapper>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import leftWrapper from './Components/leftWrapper';
import rightWrapper from './Components/rightWrapper';
import moment from 'moment';
export default {
  name: '',
  data () {
    return {
      selectCarData: {},
      isClear: false
    };
  },
  components: {
    leftWrapper,
    rightWrapper
  },
  mounted () {
    // console.log(123);
  },
  watch: {
    headerParams: {
      deep: true,
      handler () {
        this.timeNow = moment(Date.now()).valueOf();
      }
    }
  },
  methods: {
    selectCar (data) {
      this.selectCarData = data;
    },
    clear () {
      this.isClear = true;
    },
    isClearTo () {
      this.isClear = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.alarm-center {
  width: 100%;
  padding: 5px 10px;
  box-sizing: border-box;
  .left-wrapper {
    border: 1px solid #eee;
    border-radius: 8px;
  }
  .right-content {
    border: 1px solid #eee;
    border-radius: 8px;
  }
}
</style>
