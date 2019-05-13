<template>
  <div class="content-wrapper">
    <header>
    <el-form :inline="true" :model="formInline" class="form-inline">
      <el-form-item label="公司选择">
        <el-input
          placeholder="请输入内容"
          v-model="formInline.selectCom"
          :disabled="true">
        </el-input>
        </el-form-item>
        <el-form-item label="路线">
          <el-input
            placeholder="请输入内容"
            v-model="formInline.selectLine"
            :disabled="true">
          </el-input>
      </el-form-item>
      <el-form-item label="车牌号">
        <el-input
          placeholder="请输入内容"
          v-model="formInline.selectNum"
          :disabled="true">
        </el-input>
      </el-form-item>
      <el-form-item label="故障级别" style="margin-left: 100px;">
        <el-checkbox-group
          v-model="selectLevel"
          :min="0"
          :max="4">
          <el-checkbox v-for="level in levels" :label="level" :key="level">{{level}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
  </header>
  <div class="table-content">
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        fixed
        align="center"
        prop="date"
        label="编号">
      </el-table-column>
      <el-table-column
        prop="name"
        align="center"
        label="分公司名称">
      </el-table-column>
      <el-table-column
        prop="province"
        align="center"
        label="路线">
      </el-table-column>
      <el-table-column
        prop="city"
        align="center"
        label="车牌号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="address"
        label="故障类型">
      </el-table-column>
      <el-table-column
        prop="zip"
        align="center"
        label="发现时间">
      </el-table-column>
      <el-table-column
        prop="type"
        align="center"
        label="检测类型">
      </el-table-column>
      <el-table-column
        fixed="level"
        align="center"
        label="故障级别">
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="8" :offset="8">
        <el-pagination
          style="margin-top: 20px"
          background
          layout="prev, pager, next"
          :total="total">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
  </div>
</template>

<script type="text/ecmascript-6">
const levelOptions = ['L1', 'L2', 'L3', 'L4'];
export default {
  data() {
    return {
      formInline: {
        selectCom: '',
        selectLine: '',
        selectNum: ''
      },
      levels: levelOptions,
      selectLevel: [],
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
      tableData: [],
      total: 110
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
.content-wrapper {
  width:100%;
  border: 1px solid #eee;
  border-radius: 6px;
  padding: 20px 50px;
  box-sizing: border-box;
  margin-top: 20px;
  padding-bottom: 16%;
}
</style>
