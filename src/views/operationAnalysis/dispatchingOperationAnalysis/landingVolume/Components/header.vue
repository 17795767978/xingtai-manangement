<template>
  <div class="header">
    <el-form :inline="true" :model="formInline" class="form-inline">
      <el-form-item label="线路类型">
        <el-select style="width:150px;" v-model="formInline.value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择站点">
        <el-select style="width:150px;" v-model="formInline.value" placeholder="请选择">
          <el-option
            multiple
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择日期">
        <el-date-picker
          v-model="formInline.date"
          style="width: 380px;"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        </el-form-item>
        <el-form-item label="选择时间">
          <el-time-select
          style="width: 120px"
          placeholder="起始时间"
          v-model="formInline.startTime"
          :picker-options="{
            start: '00:00',
            step: '01:00',
            end: '23:59'
          }">
        </el-time-select>
        -
        <el-time-select
          placeholder="结束时间"
          style="width: 120px"
          v-model="formInline.endTime"
          :picker-options="{
            start: '00:00',
            step: '01:00',
            end: '23:59',
            minTime: formInline.startTime
          }">
        </el-time-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="warning" @click="onSubmit">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      formInline: {
        value: [],
        date: '',
        type: [],
        startTime: '',
        endTime: ''
        // typeUp: '',
        // typeDown: '',
        // typeStream: '',
        // typeFullRate: ''
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      turnOptions: [{
        value: '0',
        label: '上行'
      }, {
        value: '1',
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
  methods: {
    onSubmit() {
      console.log(this.formInline);
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
  }
}
</style>
