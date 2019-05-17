<template>
  <div class="content-wrapper">
    <el-table
      :data="tableData"
      border
      style="width: 50%">
      <el-table-column type="expand" width="60">
        <template slot-scope="props">
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="120"
        label="日期"
        prop="date">
      </el-table-column>
      <el-table-column
        align="center"
        v-for="(station, index) in stations"
        :key="index"
        :label="station"
      >
        <template slot-scope="scope">
          {{scope.row.numAllList[index]}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="60"
        label="总数"
        prop="totle">
      </el-table-column>
    </el-table>
  <div class="Summaries">
    <div class="title">总计</div>
    <el-row :gutter="0" class="item">
      <el-col :span="24 / getSummaries.length" class="item-stlye" v-for="(item, index) in getSummaries" :key="index">
        {{item}}
      </el-col>
    </el-row>
    <div class="totle">{{totle}}</div>
  </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {uniq} from 'utils/removal';
export default {
  props: {
    selectData: {
      type: Array
    }
  },
  data () {
    return {
      dateRowTableData: [],
      stations: [],
      tableData: [],
      getRowKeys(row) {
        return row.id;
      },
      expands: [],
      tableData1: [],
      getSummaries: [],
      totle: ''
    };
  },
  components: {
  },
  computed: {
  },
  created () {},
  mounted () {
  },
  watch: {
    selectData: {
      deep: true,
      handler () {
        console.log(this.selectData);
        // table的数组初始化
        let tableDataAll = [];
        let dateArr = [];
        let stationArr = [];
        let stationDate = [];
        let dateNumAll = [];
        // 每个站点的人数总和（二维数组）
        let numAll = [];
        let totle = [];
        dateArr = uniq(this.selectData.map(item => item.timeDate));
        stationArr = uniq(this.selectData.map(item => item.staName));
        this.stations = stationArr;
        dateArr.forEach((item, index) => {
          tableDataAll[index] = {};
          tableDataAll[index].date = item;
          tableDataAll[index].tableData = this.selectData.filter(list => list.timeDate === item);
        });
        tableDataAll.forEach((data, index) => {
          stationDate[index] = [];
        });
        // table 数据的组装初步
        tableDataAll.forEach((data, index) => {
          stationArr.forEach((station, stationIndex) => {
            stationDate[index][stationIndex] = data.tableData.filter(item => item.staName === station);
          });
        });
        stationDate.forEach((data, index) => {
          dateNumAll[index] = [];
        });
        stationDate.forEach((list, index) => {
          list.forEach((item, listIndex) => {
            dateNumAll[index][listIndex] = item.map(i => i.getOnNumber);
          });
        });
        dateNumAll.forEach((data, index) => {
          numAll[index] = [];
        });
        dateNumAll.forEach((dateNum, index) => {
          dateNum.forEach((num, numIndex) => {
           numAll[index][numIndex] = num.reduce((prev, curr) => prev + curr);
          });
        });
        console.log(numAll);
        numAll.forEach((num, index) => {
          totle[index] = num.reduce((prev, curr) => prev + curr);
        });
        // 每行的总数
        console.log(totle);
        tableDataAll.forEach((data, index) => {
          data.numAllList = numAll[index];
          data.totle = totle[index];
        });
        console.log(tableDataAll);
        // tableData组合完成
        this.tableData = tableDataAll;
        // 综合统计
        let stationAllArr = [];
        let itemSummaries = [];
        stationArr.forEach((station, index) => {
          stationAllArr[index] = this.selectData.filter(select => select.staName === station);
        });
        console.log(stationAllArr);
        stationAllArr.forEach((arrList, index) => {
          itemSummaries[index] = arrList.map(item => item.getOnNumber);
        });
        console.log(itemSummaries);
        itemSummaries.forEach((num, index) => {
          this.getSummaries[index] = num.reduce((prev, curr) => prev + curr);
        });
        this.totle = this.getSummaries.reduce((prev, curr) => prev + curr);
      }
    }
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
.content-wrapper {
  width: 100%;
  padding: 20px 20px;
  box-sizing: border-box;
  .Summaries {
    width: 50%;
    height: 40px;
    background-color: #409EFF;
    line-height: 40px;
    .title {
      width: 180px;
      float: left;
      text-align: center;
      border-right: 1px solid #eee
    }
    .item {
      width: calc(100% - 242px);
      display: flex;
      float: left;
      justify-content: center;
      .item-stlye {
        text-align: center;
        border-right: 1px solid #eee;
      }
    }
    .totle {
      width: 60px;
      float: right;
      text-align: center;
    }
  }
}
</style>
