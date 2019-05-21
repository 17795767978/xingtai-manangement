<template>
  <div class="content-wrapper">
    <el-row :gutter="24">
      <el-col :span="12">
        <el-table
          :data="upTableData"
          border
          :summary-method="getSummariesUp"
          show-summary
          class="inside-table"
          @expand-change="rowData"
          style="width: 100%;"
          max-height="691"
          >
          <el-table-column type="expand" width="60" fixed>
            <template slot-scope="props">
              <el-table
                :show-header="false"
                :data="props.row.tableData"
                ref="insideTable"
                style="width: 100%;"
                >
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
          :summary-method="getSummariesDown"
          show-summary
          @expand-change="rowData"
          class="inside-table"
          style="width: 100%"
          max-height="691"
          >
          <el-table-column type="expand" width="60" fixed>
            <template slot-scope="props">
              <el-table
                :show-header="false"
                :data="props.row.tableData"
                ref="insideTable"
                style="width: 100%;"
                >
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
    </el-row>
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
        this.upTableData = this.getTableData(true);
        this.downTableData = this.getTableData(false);
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
      console.log(tableDataAll);
      // console.log(this.selectData.filter(list => list.timeDate === dateArr[dateArr.length - 1]));
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
      console.log(tableDataAll);
      tableDataAll.forEach(itm => {
        if (bool) {
          itm.tableData = this.rowTableData(itm.tableData, true);
        } else {
          itm.tableData = this.rowTableData(itm.tableData, false);
        }
      });
      console.log(tableDataAll);
      return tableDataAll;
    },
    rowTableData (data, isBool) {
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
        hoursArr = option.map(item => item.timeHour);
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
          if (isBool) {
            tableData[hourIndex].numAll[optionIndex] = option.map(i => i.getOnNumber)[hourIndex];
          } else {
            tableData[hourIndex].numAll[optionIndex] = option.map(i => i.getOffNumber)[hourIndex];
          }
        });
      });
      // 行总数
      tableData.forEach(itm => {
        let arr = itm.numAll.filter(num => num !== undefined);
        itm.totle = arr.reduce((prev, next) => prev + next);
      });
      return tableData;
    },
    // 总数计算 上行
    getSummariesUp (param) {
      let dataNum = this.getSummaries(true);
      return dataNum;
    },
    // 总数计算 下行
    getSummariesDown (param) {
      let dataNum = this.getSummaries(false);
      return dataNum;
    },
    // 总数就算方法
    getSummaries (isBool) {
      // 数组标题
      let dataTitle = ['总计', '-'];
      // 数组空项
      let dataServ = [];
      // 数组数据项
      let dataCont = [];
      // 总数据数组
      let totleData = [];
      dataServ.length = this.emptyStations.length;
      this.emptyStations.forEach((stations, index) => {
        dataServ[index] = 0;
      });
      dataCont.length = this.stations.length;
      this.stations.forEach((station, index) => {
        let stationArr = this.selectData.filter(itm => itm.staName === station);
        let numArr;
        if (isBool) {
          numArr = stationArr.map(list => list.getOnNumber);
        } else {
          numArr = stationArr.map(list => list.getOffNumber);
        }
        dataCont[index] = numArr.reduce((prev, next) => prev + next);
      });
      let dataArr = dataTitle.concat(dataCont);
      totleData = dataArr.concat(dataServ);
      if (dataCont.length === 1) {
        totleData[totleData.length] = dataCont[0];
      } else if (dataCont.length > 1) {
        totleData[totleData.length] = dataCont.reduce((prev, next) => prev + next);
      }
      // console.log(totleData);
      return totleData;
    },
    rowData (row, expandedRows) {
    }
  }
};
</script>

<style lang="scss" scoped>
.content-wrapper {
  width: 100%;
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
