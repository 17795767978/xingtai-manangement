import api from './api';

// 获取天气情况
export function getWeather(url, params) {
  return api.post(url, params);
}

// 在线车辆数 zhfxpt/getOnlineBusNumber
export function onLineCarNum(url, params) {
  return api.post(url, params);
}

// 运营车辆数 zhfxpt/getOperateBusNumber
export function operateCarNum(url, params) {
  return api.post(url, params);
}

// 运营线路
export function operateLines(url, params) {
  return api.post(url, params);
}

// 待发车辆数
export function outgoingCarNum(url, params) {
  return api.post(url, params);
}

// 实时趟次
export function realTimeTrips(url, params) {
  return api.post(url, params);
}

// 实时里程
export function realTimeMileage(url, params) {
  return api.post(url, params);
}

// 实时班次
export function realTimeShift(url, params) {
  return api.post(url, params);
}

// 实时车辆位置
export function realTimeLocation(url, params) {
  return api.post(url, params);
}

// 车辆到站时刻信息(获取前一天数据)
export function arrivalTimeInformation(url, params) {
  return api.post(url, params);
}

// 不良驾驶行为数据(按分公司)
export function badDrivingBehavior(url, params) {
  return api.post(url, params);
}

// 当日累计客流（人次）
export function passengeFlow(url, params) {
  return api.post(url, params);
}

// 实时客流（人）
export function realTimePassengeFlow(url, params) {
  return api.post(url, params);
}

// 实时客流人次
export function realTimePassengeFlowTime(url, params) {
  return api.post(url, params);
}

// 实时满载率
export function realTimeFullRate(url, params) {
  return api.post(url, params);
}

// 线路满载率排行top10
export function lineRateTen(url, params) {
  return api.post(url, params);
}

// 不良驾驶行为统计
export function getLevelList(url, params) {
  return api.post(url, params);
}

// 车辆实时位置及满载率
export function positionRating(url, params) {
  return api.post(url, params);
}

// 线路站点热力数据
export function hotDataLine(url, params) {
  return api.post(url, params);
}

// 线路客流高峰时刻分析-上行
export function timeTableAnalysisUp(url, params) {
  return api.post(url, params);
}

// 线路客流高峰时刻分析-下行
export function timeTableAnalysisDown(url, params) {
  return api.post(url, params);
}

// 客流高峰断面分析
export function sectionAnalysis(url, params) {
  return api.post(url, params);
}

// 线路区间满载率查询(上行)
export function fullRateAnalysisUp(url, params) {
  return api.post(url, params);
}

// 线路区间满载率查询(上行)
export function fullRateAnalysisDown(url, params) {
  return api.post(url, params);
}

// 车辆发车趟次时序图
export function tripOrder(url, params) {
  return api.post(url, params);
}

// 线路运力运量车内人数分析（上行）
export function numberAnalysisUp(url, params) {
  return api.post(url, params);
}

// 线路运力运量车内人数分析（下行）
export function numberAnalysisDown(url, params) {
  return api.post(url, params);
}

// 线路站点登降量查询
export function lineStation(url, params) {
  return api.post(url, params);
}

// 站点信息
export function stationList(url, params) {
  return api.post(url, params);
}

// 线路信息
export function lineList(url, params) {
  return api.post(url, params);
}

// 机构信息
export function comList(url, params) {
  return api.post(url, params);
}

// 车辆信息
export function carList(url, params) {
  return api.post(url, params);
}

// 线路站间运行时间分析
export function runtimeAnalysis(url, params) {
  return api.post(url, params);
}

// 报警中心-组织线路车辆树
export function lineTree(url, params) {
  return api.post(url, params);
}
// 报警中心-列表
export function tableList(url, params) {
  return api.post(url, params);
}
// 报警中心-报警类型
export function alarmType(url, params) {
  return api.post(url, params);
}
// 报警中心-详情
export function warnInfoDetail(url, params) {
  return api.post(url, params);
}
// 设备在线率
export function onLineRate(url, params) {
  return api.post(url, params);
}
// 线路设备状态列表
export function statusTable(url, params) {
  return api.post(url, params);
}
// 各线路下的设备状态
export function lineStatus(url, params) {
  return api.post(url, params);
}
// 等级占比
export function levelRate(url, params) {
  return api.post(url, params);
}
// 报警分析-列表
export function alarmTableAna(url, params) {
  return api.post(url, params);
}
// 报警排序
export function alartTerm(url, params) {
  return api.post(url, params);
}
// 报警分析-次数趋势折线图
export function alarmTimeChart(url, params) {
  return api.post(url, params);
}
// 报警类型管理--列表
export function alarmManageTable(url, params) {
  return api.post(url, params);
}
// 报警类型管理--新增
export function alarmManageAdd(url, params) {
  return api.post(url, params);
}
// 报警类型管理--修改
export function alarmManageCheck(url, params) {
  return api.post(url, params);
}
// 报警类型管理---启用/禁用
export function alarmManageIsuse(url, params) {
  return api.post(url, params);
}
// 报警中心---下载
export function downLoad(url, params) {
  return api.post(url, params);
}
