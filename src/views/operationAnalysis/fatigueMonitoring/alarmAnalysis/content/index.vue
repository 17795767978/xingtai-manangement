<template>
  <div class="content">
    <el-row :gutter="24">
      <el-col :span="12">
        <alarmLevel :selectData="selectData"></alarmLevel>
      </el-col>
      <el-col :span="12">
        <alarmTable :selectData="selectData"></alarmTable>
      </el-col>
    </el-row>
    <el-row style="margin-bottom: 0" :gutter="24">
      <el-col :span="12">
        <alarmTerm :selectData="selectData" @getWarnId="getWarnId"></alarmTerm>
      </el-col>
      <el-col :span="12">
        <alarmRealTime :selectData="selectData" :warnObj="warnObj"></alarmRealTime>
      </el-col>
    </el-row>
  </div>
</template>

<script type="type/ecmascript-6">
import alarmLevel from './alarmLevel';
import alarmRealTime from './alarmRealTime';
import alarmTable from './alarmTable';
import alarmTerm from './alarmTerm';
export default {
  props: {
    selectData: {
      type: Object
    }
  },
  data () {
    return {
      warnObj: {}
    };
  },
  components: {
    alarmLevel,
    alarmRealTime,
    alarmTable,
    alarmTerm
  },
  watch: {
  },
  methods: {
    getWarnId (data) {
      this.warnObj = data;
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%
}
</style>
