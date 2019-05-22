<template>
  <div class="right-search-wrapper">
    <div class="top-search">
      <el-form :inline="true" size="mini" :model="formInline" class="form-inline">
        <el-form-item label="设备编号">
          <el-input v-model="formInline.devCode" placeholder="请输设备编号" clearable></el-input>
        </el-form-item>
        <el-form-item label="车牌号">
          <el-input v-model="formInline.busPlateNumber" placeholder="请输车牌号" clearable></el-input>
        </el-form-item>
        <el-form-item label="自编号">
          <el-input v-model="formInline.busSelfCode" placeholder="请输自编号" clearable></el-input>
        </el-form-item>
        <el-form-item label="报警级别">
          <el-select v-model="formInline.warnLevel" placeholder="请选择">
            <el-option
              v-for="item in levelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="报警类型">
          <el-select v-model="formInline.warnTypeId" multiple collapse-tags placeholder="请选择">
            <el-option
              v-for="item in warnOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择时间">
          <el-date-picker
            v-model="formInline.timeValue"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="warning" @click="onClear">重置</el-button>
          <el-button type="success" @click="onSave">导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <hr style="border: 1px solid #eee; margin-bottom: 20px;" />
    <div class="content">
      <el-table
        :data="tableData"
        stripe
        border
        height="580"
        size="mini"
        style="width: 100%">
        <el-table-column
          align="center"
          type="index"
          label="序列"
          width="60">
        </el-table-column>
        <el-table-column
          prop="orgName"
          align="center"
          label="所属公司"
          width="150">
        </el-table-column>
        <el-table-column
          align="center"
          prop="lineName"
          label="所属路线"
          width="150">
        </el-table-column>
        <el-table-column
          align="center"
          prop="busPlateNumber"
          label="车牌号"
          width="150">
        </el-table-column>
        <el-table-column
          align="center"
          prop="busSelfCode"
          label="车辆自编号"
          width="150">
        </el-table-column>
        <el-table-column
          align="center"
          prop="devCode"
          label="设备编号"
          width="150">
        </el-table-column>
        <el-table-column
          align="center"
          prop="warnSourceName"
          label="设备类型"
          width="150">
        </el-table-column>
        <el-table-column
          align="center"
          prop="warnTime"
          label="报警时间"
          :formatter="formatterTime"
          >
        </el-table-column>
        <el-table-column
          align="center"
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="primary" size="mini">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          style="float: right; margin-top: 20px;"
          background
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="total">
        </el-pagination>
        <span class="demonstration" style="float: right; margin-top: 20px; line-height: 36px;">共{{total}}条</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {tableList, alarmType} from 'server/interface';
import moment from 'moment';
export default {
  props: {
    selectCarData: {
      type: Object
    }
  },
  data () {
    return {
      formInline: {
        orgId: '',
        lineIdId: '',
        devCode: '',
        busPlateNumber: '',
        busUuid: '',
        busSelfCode: '',
        warnLevel: '',
        warnTypeId: [],
        timeValue: []
      },
      levelOptions: [
        {
          value: '1',
          label: 'L1'
        }, {
          value: '2',
          label: 'L2'
        }, {
          value: '3',
          label: 'L3'
        }
      ],
      warnOptions: [],
      tableData: [],
      total: 100
    };
  },
  created () {
    this._alarmType({
      warnLevel: '1'
    });
    this._tableList({
      orgId: this.formInline.orgId, // 组织机构id
      lineIdId: this.formInline.lineIdId, // 线路id
      busUuid: this.formInline.busUuid, // 车辆id
      devCode: this.formInline.devCode, // 设备号
      busPlateNumber: this.formInline.busPlateNumber, // 车牌号
      busSelfCode: this.formInline.busSelfCode, // 自编号
      warnLevel: this.formInline.warnLevel, // 报警等级  （一级：1；二级：2；三级：3）
      warnTypeId: this.formInline.warnTypeId, // 报警类型
      startTime: this.formInline.timeValue[0], // 时间格式   开始结束默认查近7天的
      endTime: this.formInline.timeValue[1],
      pageSize: 10,
      pageNum: 1
    });
  },
  watch: {
    selectCarData: {
      deep: true,
      handler () {
        // 车偏号 联动
        this.changeBusPlateNumber();
        this.formInline.timeValue.forEach(time => {
          time = moment(time).format('YYYY-MM-DD HH:MM:SS');
        });
        this._tableList({
          orgId: this.formInline.orgId, // 组织机构id
          lineIdId: this.formInline.lineIdId, // 线路id
          busUuid: this.formInline.busUuid, // 车辆id
          devCode: this.formInline.devCode, // 设备号
          busPlateNumber: this.formInline.busPlateNumber, // 车牌号
          busSelfCode: this.formInline.busSelfCode, // 自编号
          warnLevel: this.formInline.warnLevel, // 报警等级  （一级：1；二级：2；三级：3）
          warnTypeId: this.formInline.warnTypeId, // 报警类型
          startTime: this.formInline.timeValue[0], // 时间格式   开始结束默认查近7天的
          endTime: this.formInline.timeValue[1],
          pageSize: 10,
          pageNum: 1
        });
      }
    },
    'formInline.warnLevel' () {
      // console.log(this.formInline.warnLevel);
      this._alarmType({
        warnLevel: this.formInline.warnLevel
      });
    }
  },
  methods: {
    _alarmType (params) {
      alarmType('common/warntypes/get', params).then(res => {
        let dataArr = res.data.data;
        this.warnOptions = [];
        dataArr.forEach((list, index) => {
          this.warnOptions[index] = {
            label: list.value,
            value: list.code
          };
        });
      });
    },
    _tableList (params) {
      tableList('warns/warnPage/get', params).then(res => {
        this.tableData = res.data.data.list;
        this.total = res.data.data.total;
      });
    },
    changeBusPlateNumber () {
      if (this.selectCarData.levelsType === '3') {
        this.formInline.busPlateNumber = this.selectCarData.name;
        this.formInline.busUuid = this.selectCarData.id;
      } else if (this.selectCarData.levelsType === '2') {
        this.formInline.busPlateNumber = '';
        this.formInline.busUuid = '';
        this.formInline.orgId = '';
        this.formInline.lineIdId = this.selectCarData.id;
      } else if (this.selectCarData.levelsType === '1') {
        this.formInline.busPlateNumber = '';
        this.formInline.busUuid = '';
        this.formInline.lineIdId = '';
        this.formInline.orgId = this.selectCarData.id;
      }
    },
    formatterTime (row) {
      return moment(row.warnTime).format('YYYY-MM-DD HH:MM:SS');
    },
    handleCurrentChange (val) {
      this._tableList({
        orgId: this.formInline.orgId, // 组织机构id
        lineIdId: this.formInline.lineIdId, // 线路id
        busUuid: this.formInline.busUuid, // 车辆id
        devCode: this.formInline.devCode, // 设备号
        busPlateNumber: this.formInline.busPlateNumber, // 车牌号
        busSelfCode: this.formInline.busSelfCode, // 自编号
        warnLevel: this.formInline.warnLevel, // 报警等级  （一级：1；二级：2；三级：3）
        warnTypeId: this.formInline.warnTypeId, // 报警类型
        startTime: this.formInline.timeValue[0], // 时间格式   开始结束默认查近7天的
        endTime: this.formInline.timeValue[1],
        pageSize: 10,
        pageNum: val
      });
    },
    handleClick () {
    },
    onSubmit () {
      this.formInline.timeValue = this.formInline.timeValue.map(time => {
        return moment(time).format('YYYY-MM-DD HH:MM:SS');
      });
      this._tableList({
        orgId: this.formInline.orgId, // 组织机构id
        lineIdId: this.formInline.lineIdId, // 线路id
        busUuid: this.formInline.busUuid, // 车辆id
        devCode: this.formInline.devCode, // 设备号
        busPlateNumber: this.formInline.busPlateNumber, // 车牌号
        busSelfCode: this.formInline.busSelfCode, // 自编号
        warnLevel: this.formInline.warnLevel, // 报警等级  （一级：1；二级：2；三级：3）
        warnTypeId: this.formInline.warnTypeId, // 报警类型
        startTime: this.formInline.timeValue[0], // 时间格式   开始结束默认查近7天的
        endTime: this.formInline.timeValue[1],
        pageSize: 10,
        pageNum: 1
      });
      console.log(this.formInline.timeValue);
    },
    onClear () {},
    onSave () {}
  }
};
</script>

<style lang="scss" scoped>
.right-search-wrapper {
  width: 100%;
  padding: 20px 10px;
  box-sizing: border-box;
  max-height: 800px;
  overflow: auto;
}
</style>
