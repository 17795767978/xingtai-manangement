<template>
  <div class="echart-wrapper">
    <el-row :gutter="10">
      <el-col :span="8" style="height: 260px; position: relative">
        <p style="text-align: center;color: #777;font-weight: bold">即时速度(最大时速：100)</p>
        <el-progress type="circle" :stroke-width="20" :width="220" :percentage="40" status="text" class="style-circle">
          44KM/H
        </el-progress>
      </el-col>
      <el-col :span="8" style="height: 260px; position: relative">
        <p style="text-align: center;color: #777;font-weight: bold">天然气(最大容量：100)</p>
        <el-progress type="circle"  :stroke-width="20" :width="220" :percentage="25" status="text" class="style-circle">
          200m3
        </el-progress>
      </el-col>
      <el-col :span="8" style="height: 260px; position: relative">
        <p style="text-align: center;color: #777;font-weight: bold">发动机转速(最大转速：100)</p>
        <el-progress type="circle"  :stroke-width="20" :width="220" :percentage="80" status="text" color="#8e71c7" class="style-circle">
          16(X100/MIN)
        </el-progress>
      </el-col>
    </el-row>
    <el-row style="padding:0 10px; box-sizing:border-box;">
      <el-table
        :data="tableData"
        :row-style="{height: '10px'}"
        border
        style="width: 100%">
        <el-table-column
          align="center"
          prop="date"
          label="档位">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="最高电圧">
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          label="最低电圧"
          >
        </el-table-column>
        <el-table-column
          prop="address"
          align="center"
          label="左转向"
          >
        </el-table-column>
        <el-table-column
          prop="address"
          align="center"
          label="右转向"
          >
        </el-table-column>
        <el-table-column
          prop="address"
          label="前门"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="address"
          label="后门"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="address"
          label="近光灯"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="address"
          label="前轮胎压"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="address"
          label="后轮胎压"
          align="center"
          >
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      tableData: []
    };
  },
  created () {},
  mounted () {
    this.leftDrawnLine();
    this.middelDrawnLine();
    this.rightDrawnLine();
  },
  methods: {
    leftDrawnLine () {
    },
    middelDrawnLine () {},
    rightDrawnLine () {}
  }
};
</script>

<style lang="scss" scoped>
.echart-wrapper {
  height: 400px;
  border: 1px solid #eee;
  border-radius: 6px;
  .style-circle {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -110px;
    margin-top: -90px;
  }
}
</style>
