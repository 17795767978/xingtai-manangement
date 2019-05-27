<template>
  <div class="header">
    <el-form :inline="true" size="mini" :model="formInline" class="form-inline">
      <el-form-item label="选择路线">
        <el-select class="font-style" v-model="formInline.value" placeholder="请选择">
          <el-option
            v-for="item in lineOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择日期">
        <el-date-picker
          class="font-style"
          v-model="formInline.date"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions">
        </el-date-picker>
        </el-form-item>
        <el-form-item label="选择时间">
          <el-time-select
          class="font-style"
          placeholder="起始时间"
          v-model="formInline.startTime"
          :picker-options="{
            start: '00:00',
            step: '01:00',
            end: '24:00'
          }">
        </el-time-select>
        -
        <el-time-select
          placeholder="结束时间"
          class="font-style"
          v-model="formInline.endTime"
          :picker-options="{
            start: '00:00',
            step: '01:00',
            end: '24:00',
            minTime: formInline.startTime
          }">
        </el-time-select>
      </el-form-item>
      <el-form-item>
        <el-checkbox-group size="mini" style="transform: scale(0.9)" v-model="tabType" @change="changeType">
          <el-checkbox label="上车人数" name="type"></el-checkbox>
          <el-checkbox label="下车人数" name="type"></el-checkbox>
          <el-checkbox label="断面客流" name="type"></el-checkbox>
          <el-checkbox label="满载率" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="warning" @click="onclear">重置</el-button>
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
        type: '',
        startTime: '',
        endTime: ''
        // typeUp: '',
        // typeDown: '',
        // typeStream: '',
        // typeFullRate: ''
      },
      tabType: ['上车人数', '下车人数', '断面客流', '满载率'],
      lineOptions: [{
        value: '0103',
        label: '103路'
      },
      {
        value: '0104',
        label: '104路'
      }
      ],
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
  created () {
    let dataNow = new Date();
    let dataBefore = new Date(dataNow.getTime() - 24 * 60 * 60 * 1000);
    this.formInline.value = '0103';
    this.formInline.date = moment(dataBefore).format('YYYY-MM-DD');
    this.formInline.startTime = '00:00';
    this.formInline.endTime = '24:00';
  },
  mounted () {
    this.$store.dispatch('getLineList').then(res => {
      this.lineOptions = res;
    });
  },
  methods: {
    onSubmit() {
      this.formInline.date = moment(this.formInline.date).format('YYYY-MM-DD');
      this.$emit('configCheck', this.formInline);
      this.$emit('tabTypeCheck', this.tabType);
    },
    onclear () {
      this.formInline = {
        value: '',
        date: '',
        type: '',
        startTime: '',
        endTime: ''
      };
    },
    changeType () {
      this.$emit('tabTypeCheck', this.tabType);
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
     width: 130px;
   }
  }
}
</style>
