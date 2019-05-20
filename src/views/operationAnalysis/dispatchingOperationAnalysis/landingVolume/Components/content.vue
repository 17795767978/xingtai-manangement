<template>
  <div class="content-wrapper">
    <el-row :gutter="10">
      <el-col :span="12">
        <el-table
          :data="upTableData"
          border
          class="inside-table"
          @expand-change="rowData"
          style="width: 100%;">
          <el-table-column type="expand" width="60" fixed>
            <template slot-scope="props">
              <el-table
                :show-header="false"
                :data="props.row.tableData"
                ref="insideTable"
                style="width: 100%;">
                <el-table-column
                  align="center"
                  property="hour"
                  label="时刻"
                  width="180">
                  <template slot-scope="scope">
                    {{scope.row.hour}}时
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  v-for="(station, index) in stations"
                  :key="index"
                  :label="station"
                >
                  <template slot-scope="scope">
                    {{scope.row.numAll[index] || '0'}}
                  </template>
                </el-table-column>
                <el-table-column
                  v-if="emptyStations.length > 0"
                  align="center"
                  v-for="emptyStation in emptyStations"
                  :key="emptyStation"
                  :label="emptyStation"
                >
                  <template slot-scope="scope">
                    0
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  width="59"
                  label="总数"
                  fixed="right"
                  prop="totle">
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column
            fixed
            align="center"
            width="120"
            label="日期"
            prop="date">
          </el-table-column>
          <!-- 有数据的station -->
          <el-table-column
            align="center"
            v-for="(station, index) in stations"
            :key="index"
            :label="station"
          >
            <template slot-scope="scope">
              {{scope.row.numAllList[index] || '0'}}
            </template>
          </el-table-column>
          <!-- emptyStations -->
          <el-table-column
            v-if="emptyStations.length > 0"
            align="center"
            v-for="emptyStation in emptyStations"
            :key="emptyStation"
            :label="emptyStation"
          >
            <template slot-scope="scope">
              0
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="60"
            label="总数"
            fixed="right"
            prop="totle">
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="12">
        <el-table
          :data="downTableData"
          border
          style="width: 100%">
          <el-table-column type="expand" width="60" fixed>
            <template slot-scope="props">
            </template>
          </el-table-column>
          <el-table-column
            fixed
            align="center"
            width="120"
            label="日期"
            prop="date">
          </el-table-column>
          <!-- 有数据的station -->
          <el-table-column
            align="center"
            v-for="(station, index) in stations"
            :key="index"
            :label="station"
          >
            <template slot-scope="scope">
              {{scope.row.numAllList[index] || '0'}}
            </template>
          </el-table-column>
          <!-- emptyStations -->
          <el-table-column
            v-if="emptyStations.length > 0"
            align="center"
            v-for="emptyStation in emptyStations"
            :key="emptyStation"
            :label="emptyStation"
          >
            <template slot-scope="scope">
              0
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="60"
            label="总数"
            fixed="right"
            prop="totle">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  <!-- <div class="Summaries"> -->
    <!-- <div class="title">总计</div>
    <el-row :gutter="0" class="item">
      <el-col :span="24 / getSummaries.length" class="item-stlye" v-for="(item, index) in getSummaries" :key="index">
        {{item}}
      </el-col>
    </el-row>
    <div class="totle">{{totle}}</div> -->
  <!-- </div> -->
  </div>
</template>

<script type="text/ecmascript-6">
import {uniq} from 'utils/removal';
import {getArrDifference} from 'utils/diffConcat';
export default {
  props: {
    selectData: {
      type: Array
    },
    selectStations: {
      type: Array
    }
  },
  data () {
    return {
      dateRowTableData: [],
      stations: [],
      emptyStations: [],
      upTableData: [],
      downTableData: [],
      expands: [],
      tableData1: [],
      getUpSummaries: [],
      upTotle: ''
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
        // console.log(this.selectData);
        this.upTableData = this.getTableData(true);
        this.downTableData = this.getTableData(false);
        // if (this.$refs.insideTable) {
        //   this.$refs.insideTable.style.padding = '0';
        // }
        // table的数组初始化
      }
    }
  },
  methods: {
    getTableData (bool) {
      let tableDataAll = [];
      let dateArr = [];
      let stationArr = [];
      let stationDate = [];
      let dateNumAll = [];
      // 每个站点的人数总和（二维数组）
      let numAll = [];
      let totle = [];
      // 后台数据时间去重
      dateArr = uniq(this.selectData.map(item => item.timeDate));
      // 后台数据站点去重
      stationArr = uniq(this.selectData.map(item => item.staName));
      this.stations = stationArr;
      // 找出空数组的站点
      if (this.selectStations.length > 0) {
        this.emptyStations = getArrDifference(stationArr, this.selectStations);
      }
      // 根据时间数组组装
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
          if (bool) {
            dateNumAll[index][listIndex] = item.map(i => i.getOnNumber);
          } else {
            dateNumAll[index][listIndex] = item.map(i => i.getOffNumber);
          }
        });
      });
      dateNumAll.forEach((data, index) => {
        numAll[index] = [];
      });
      dateNumAll.forEach((dateNum, index) => {
        dateNum.forEach((num, numIndex) => {
          if (num.length !== 0) {
            numAll[index][numIndex] = num.reduce((prev, curr) => prev + curr);
          }
        });
      });
      numAll.forEach((num, index) => {
        if (num.length !== 0) {
          totle[index] = num.reduce((prev, curr) => prev + curr);
        }
      });
      // 每行的总数
      tableDataAll.forEach((data, index) => {
        data.numAllList = numAll[index];
        data.totle = totle[index];
      });
      // tableData组合完成
      // dataTable = tableDataAll;
      tableDataAll.forEach(itm => {
        itm.tableData = this.rowTableData(itm.tableData);
      });
      console.log(tableDataAll);
      return tableDataAll;
      // 综合统计
      // let stationAllArr = [];
      // let itemSummaries = [];
      // stationArr.forEach((station, index) => {
      //   stationAllArr[index] = this.selectData.filter(select => select.staName === station);
      // });
      // console.log(stationAllArr);
      // stationAllArr.forEach((arrList, index) => {
      //   itemSummaries[index] = arrList.map(item => item.getOnNumber);
      // });
      // console.log(itemSummaries);
      // itemSummaries.forEach((num, index) => {
      //   if (num.length !== 0) {
      //     summaries[index] = num.reduce((prev, curr) => prev + curr);
      //   }
      // });
      // if (this.getSummaries.length !== 0) {
      //   totleNum = summaries.reduce((prev, curr) => prev + curr);
      // }
    },
    rowTableData (data) {
      // table的初始化
      // console.log(data);
      // 根据station划分data
      let dataOptions = [];
      let tableData = [];
      // 小时容器
      let hoursArr = [];
      // 每小时过滤的数组
      // let hourIndexList = [];
      this.stations.forEach((itm, index) => {
        dataOptions[index] = data.filter(sta => sta.staName === itm);
      });
      dataOptions.forEach(option => {
        hoursArr = uniq(option.map(item => item.timeHour));
      });
      hoursArr.forEach((data, index) => {
        tableData[index] = {};
      });
      hoursArr.forEach((item, index) => {
        tableData[index].hour = item;
        tableData[index].numAll = [];
        tableData[index].numAll.length = dataOptions.length;
      });
      dataOptions.forEach((option, optionIndex) => {
        hoursArr.forEach((hour, hourIndex) => {
          tableData[hourIndex].numAll[optionIndex] = option.map(i => i.getOnNumber)[hourIndex];
        });
      });
      return tableData;
    },
    rowData (row, expandedRows) {
      // console.log(row);
    }
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
<style lang="scss">
.inside-table {
  .el-table__expanded-cell[class*=cell] {
    padding: 0 !important;
  }
}
</style>
