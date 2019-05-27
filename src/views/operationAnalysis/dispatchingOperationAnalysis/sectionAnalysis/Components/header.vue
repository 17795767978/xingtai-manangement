<template>
  <div class="header">
    <el-form :inline="true" size="mini" :model="formInline" class="form-inline">
      <el-form-item label="选择路线">
        <el-select v-model="formInline.value" placeholder="请选择">
          <el-option
            v-for="item in lineOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="方向">
        <el-select v-model="formInline.turn" placeholder="请选择">
          <el-option
            v-for="item in turnOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="月份">
        <el-date-picker
          v-model="formInline.date"
          type="month"
          format="yyyy-MM"
          placeholder="选择月">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="warning" @click="onClear">重置</el-button>
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
        turn: '',
        date: ''
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
      if (this.formInline.date && this.formInline.date !== 'Invalid date') {
        this.formInline.date = moment(this.formInline.date).format('YYYY-MM');
      } else {
        this.formInline.date = '';
      }
      this.$emit('configCheck', this.formInline);
    },
    onClear () {
      this.formInline.date = '';
      this.formInline.value = '';
      this.formInline.turn = '';
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
