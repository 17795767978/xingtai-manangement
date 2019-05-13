<template>
<div>
  <div class="header">
    <el-form :inline="true" :model="formInline" class="form-inline">
      <el-form-item label="快速选择线路：">
        <el-select v-model="formInline.selectLine" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="车牌号：">
        <el-select v-model="formInline.carNum" placeholder="请选择">
          <el-option
            v-for="item in turnOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">实时显示</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div style="padding: 10px 20px; font-size:14px;">
    <el-row style="margin-bottom:5px;" :gutter="12">
      <el-col :span="4">
        <el-card shadow="hover">
          姓名：张大大
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="hover">
          性别：男
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="hover">
          驾龄：10年
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="hover">
          所属公司：三分公司
        </el-card>
      </el-col>
    </el-row>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      formInline: {
        selectLine: '',
        carNum: ''
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
      }]
    };
  },
  methods: {
    changeToday () {
      this.formInline.select.today = false;
      this.formInline.select.threeDays = true;
      this.formInline.select.week = true;
      this.formInline.select.month = true;
    },
    changeThreeDays () {
      this.formInline.select.today = true;
      this.formInline.select.threeDays = false;
      this.formInline.select.week = true;
      this.formInline.select.month = true;
    },
    changeWeek () {
      this.formInline.select.today = true;
      this.formInline.select.threeDays = true;
      this.formInline.select.week = false;
      this.formInline.select.month = true;
    },
    changeMonth () {
      this.formInline.select.today = true;
      this.formInline.select.threeDays = true;
      this.formInline.select.week = true;
      this.formInline.select.month = false;
    },
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
