<template>
  <div class="header">
    <el-form :inline="true" size="mini" :model="formInline" class="form-inline">
      <el-form-item label="行车日期">
        <el-date-picker
          class="font-style"
          v-model="formInline.date"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="选择路线">
        <el-select v-model="formInline.value" class="font-style" placeholder="请选择">
          <el-option
            v-for="item in lineOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上下行">
        <el-select  class="font-style" v-model="formInline.turn" placeholder="请选择">
          <el-option
            v-for="item in turnOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间">
        <el-time-select
          placeholder="起始时间"
          class="font-style"
          v-model="formInline.startTime"
          :picker-options="{
            start: '06:00',
            step: '01:00',
            end: '24:00'
          }">
        </el-time-select>
        <el-time-select
          placeholder="结束时间"
          v-model="formInline.endTime"
          class="font-style"
          :picker-options="{
            start: '06:00',
            step: '01:00',
            end: '24:00',
            minTime: formInline.startTime
          }">
        </el-time-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
import moment from 'moment';
export default {
  data() {
    return {
      formInline: {
        value: '',
        date: '',
        turn: '',
        startTime: '',
        endTime: ''
      },
      lineOptions: [{
        value: '0103',
        label: '103路'
      }],
      turnOptions: [{
        value: '1',
        label: '上行'
      }, {
        value: '2',
        label: '下行'
      }],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      }
    };
  },
  mounted () {
    this.$store.dispatch('getLineList').then(res => {
      this.lineOptions = res;
    });
  },
  methods: {
    onSubmit() {
      this.formInline.date = moment(this.formInline.date).format('YYYY-MM-DD');
      this.$emit('configType', this.formInline);
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  border-bottom: 1px solid #eee;
  padding: 20px 20px;
  box-sizing: border-box;
  box-shadow: 0 1px 10px rgba(0,0,0, 0.5);
  .form-inline {
   height: 38px;
   .font-style {
     width: 160px;
   }
  }
}
</style>
