<template>
  <div class="content-wrapper">
    <el-row :gutter="10">
      <el-col class="chart-style" :span="14">
        <leftTable></leftTable>
      </el-col>
      <el-col class="chart-style" :span="10">
        <rightTable></rightTable>
      </el-col>
    </el-row>
    <el-row class="bottom-chart">
      <bottomTable></bottomTable>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import leftTable from './leftTable';
import rightTable from './rightTable';
import bottomTable from './bottomTable';
export default {
  data () {
    return {};
  },
  components: {
    leftTable,
    rightTable,
    bottomTable
  }
};
</script>

<style lang="scss" scoped>
.content-wrapper {
  padding: 0 10px;
  box-sizing: border-box;
  .bottom-chart {
    width: 100%;
    height: 250px;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #eee;
    border-radius: 6px;
    margin-top: -10px;
  }
}
</style>
