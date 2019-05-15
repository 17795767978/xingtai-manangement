import api from './api';

// 获取天气情况
export function getWeather (url, params) {
  return api.post(url, params);
}

// 在线车辆数 zhfxpt/getOnlineBusNumber
export function onLineCarNum (url, params) {
  return api.post(url, params);
}

// 运营车辆数 zhfxpt/getOperateBusNumber
export function operateCarNum (url, params) {
  return api.post(url, params);
}

// 运营线路
export function operateLines (url, params) {
  return api.post(url, params);
}

// 待发车辆数
export function outgoingCarNum (url, params) {
  return api.post(url, params);
}

// 实时趟次
export function realTimeTrips (url, params) {
  return api.post(url, params);
}

// 实时里程
export function realTimeMileage (url, params) {
  return api.post(url, params);
}

// 实时班次
export function realTimeShift (url, params) {
  return api.post(url, params);
}

// 实时车辆位置
export function realTimeLocation (url, params) {
  return api.post(url, params);
}

// 车辆到站时刻信息(获取前一天数据)
export function arrivalTimeInformation (url, params) {
  return api.post(url, params);
}

// 不良驾驶行为数据(按分公司)
export function badDrivingBehavior (url, params) {
  return api.post(url, params);
}

// 当日累计客流（人次）
export function passengeFlow (url, params) {
  return api.post(url, params);
}

// 实时客流（人）
export function realTimePassengeFlow (url, params) {
  return api.post(url, params);
}

// 实时客流人次
export function realTimePassengeFlowTime (url, params) {
  return api.post(url, params);
}

// 实时满载率
export function realTimeFullRate (url, params) {
  return api.post(url, params);
}

// 线路满载率排行top10
export function lineRateTen (url, params) {
  return api.post(url, params);
}

// 不良驾驶行为统计
export function getLevelList (url, params) {
  return api.post(url, params);
}

// 车辆实时位置及满载率
export function positionRating (url, params) {
  return api.post(url, params);
}

// 线路站点热力数据
export function hotDataLine (url, params) {
  return api.post(url, params);
}

// 线路客流高峰时刻分析-上行
export function timeTableAnalysisUp (url, params) {
  return api.post(url, params);
}

// 线路客流高峰时刻分析-下行
export function timeTableAnalysisDown (url, params) {
  return api.post(url, params);
}

// 客流高峰断面分析
export function sectionAnalysis (url, params) {
  return api.post(url, params);
}

// 线路区间满载率查询(上行)
export function fullRateAnalysisUp (url, params) {
  return api.post(url, params);
}

// 线路区间满载率查询(上行)
export function fullRateAnalysisDown (url, params) {
  return api.post(url, params);
}

// 车辆发车趟次时序图
export function tripOrder (url, params) {
  return api.post(url, params);
}
