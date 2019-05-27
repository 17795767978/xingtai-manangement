<template>
  <div class="alarm-table">
    <el-row>
      <el-button type="success" @click="AddAlarm">新增报警类型</el-button>
    </el-row>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        align="center"
        width="60"
        type="index"
        label="序号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="plValue"
        label="报警类型编码">
      </el-table-column>
      <el-table-column
        align="center"
        prop="plDisplay"
        label="报警类型名称">
      </el-table-column>
      <el-table-column
        align="center"
        prop="plRemark"
        label="备注">
      </el-table-column>
      <el-table-column
        align="center"
        prop="plSort"
        label="排序">
      </el-table-column>
      <el-table-column
        align="center"
        prop="plWarnLevel"
        label="报警级别">
        <template slot-scope="scope">
          {{scope.row.plWarnLevel}}级
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="报警状态">
        <template slot-scope="scope">
          <el-button type="danger" plain v-if="scope.row.plIsvalid === '0'" size="small" @click="handleBan(scope.row)">禁用</el-button>
          <el-button type="success" plain v-if="scope.row.plIsvalid === '1'" size="small"  @click="handleOpen(scope.row)">启用</el-button>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="primary" size="small">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        style="float: right; margin-top: 20px;"
        background
        :current-page="currentPage"
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
      <span class="demonstration" style="float: right; margin-top: 20px; line-height: 36px;">共{{total}}条</span>
    </div>
    <dialogWrapper :rowData="rowData" @updateTable="updateTable"></dialogWrapper>
  </div>
</template>

<script type="text/ecmascript-6">
// import moment from 'moment';
import {alarmManageTable, alarmManageIsuse} from 'server/interface';
import dialogWrapper from './dialog';
export default {
  name: 'alarmManagement',
  data () {
    return {
      total: 0,
      tableData: [],
      rowData: {},
      currentPage: 1
    };
  },
  components: {
    dialogWrapper
  },
  created () {
    this._alarmManageTable({
      pageSize: 10,
      pageNum: this.currentPage
    });
  },
  mounted () {
  },
  watch: {
  },
  methods: {
    _alarmManageTable (params) {
      alarmManageTable('warntype/warnTypePage/get', params).then(res => {
        let tableArr = res.data.data.list;
        this.tableData = tableArr.sort((prev, next) => next.plSort - prev.plSort);
        this.total = res.data.data.total;
      });
    },
    handleBan (row) {
      alarmManageIsuse('warntype/isvalid/update', {
        plUuid: row.plUuid,
        plIsvalid: 1
      }).then(res => {
        if (res.data.head.code === '200') {
          this._alarmManageTable({
            pageSize: 10,
            pageNum: this.currentPage
          });
        }
      });
    },
    handleOpen (row) {
      alarmManageIsuse('warntype/isvalid/update', {
        plUuid: row.plUuid,
        plIsvalid: 0
      }).then(res => {
        if (res.data.head.code === '200') {
          this._alarmManageTable({
            pageSize: 10,
            pageNum: this.currentPage
          });
        }
      });
    },
    handleClick (row) {
      this.$children[3].dialogFormVisible = true;
      this.rowData = row;
    },
    AddAlarm () {
      this.$children[3].dialogFormVisible = true;
      this.rowData = {};
    },
    handleCurrentChange (val) {
      this.currentPage = val;
      this._alarmManageTable({
        pageSize: 10,
        pageNum: this.currentPage
      });
    },
    updateTable () {
      this._alarmManageTable({
        pageSize: 10,
        pageNum: this.currentPage
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.alarm-table {
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
}
</style>
