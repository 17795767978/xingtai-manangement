import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const login = r => require.ensure([], () => r(require('../views/login/Login')), 'login');
const page401 = r => require.ensure([], () => r(require('../views/errorPage/401')), 'page401');
const page404 = r => require.ensure([], () => r(require('../views/errorPage/404')), 'page404');
const layout = r => require.ensure([], () => r(require('../views/layout/Layout')), 'layout');
const dashboard = r => require.ensure([], () => r(require('../views/dashboard/Dashboard')), 'dashboard');
const chartAnalysis = () => import('views/operationMonitoring/');
const dispatchingOperationAnalysis = () => import('views/operationAnalysis/dispatchingOperationAnalysis/');
const timeTableAnalysis = () => import('views/operationAnalysis/dispatchingOperationAnalysis/timeTableAnalysis/');
const sectionAnalysis = () => import('views/operationAnalysis/dispatchingOperationAnalysis/sectionAnalysis/');
const tripOrder = () => import('views/operationAnalysis/dispatchingOperationAnalysis/tripOrder/');
const fullLoadRate = () => import('views/operationAnalysis/dispatchingOperationAnalysis/fullLoadRate/');
const landingVolume = () => import('views/operationAnalysis/dispatchingOperationAnalysis/landingVolume/');
const runtimeAnalysis = () => import('views/operationAnalysis/dispatchingOperationAnalysis/runtimeAnalysis/');
const passengerTransportCapacity = () => import('views/operationAnalysis/dispatchingOperationAnalysis/passengerTransportCapacity/');
const fatigueMonitoring = () => import('views/operationAnalysis/fatigueMonitoring/');
const alarmCenter = () => import('views/operationAnalysis/fatigueMonitoring/alarmCenter/');
const alarmContent = () => import('views/operationAnalysis/fatigueMonitoring/alarmCenter/alarmContent/');
const deviceStatus = () => import('views/operationAnalysis/fatigueMonitoring/deviceStatus/');
const alarmAnalysis = () => import('views/operationAnalysis/fatigueMonitoring/alarmAnalysis/');
const alarmManagement = () => import('views/operationAnalysis/fatigueMonitoring/alarmManagement/');
const safetySupervision = () => import('views/operationAnalysis/safetySupervision/');
const vehicleFaultAlarm = () => import('views/operationAnalysis/safetySupervision/vehicleFaultAlarm');
const realTimeDashboard = () => import('views/operationAnalysis/safetySupervision/realTimeDashboard');

export const constantRouterMap = [{
    path: '/login',
    component: login,
    hidden: true
  },
  {
    path: '/401',
    component: page401,
    hidden: true
  },
  {
    path: '/404',
    component: page404,
    hidden: true
  },
  {
    path: '',
    component: layout,
    redirect: 'dashboard',
    meta: {
      title: '大数据工作台',
      icon: 'fa fa-home'
    },
    children: [{
      path: 'dashboard',
      component: dashboard,
      name: 'dashboard',
      meta: {
        title: '首页',
        icon: 'fa fa-home'
      }
    }]
  },
  {
    path: '/chart-analysis',
    component: layout,
    meta: {
      title: '运营监控',
      icon: 'fa fa-line-chart'
    },
    children: [{
      path: '/chart-analysis',
      component: chartAnalysis,
      name: 'chartAnalysis',
      meta: {
        title: '运营监控',
        icon: 'fa fa-line-chart'
      }
    }]
  },
  {
    path: '/operation',
    component: layout,
    meta: {
      title: '运营分析',
      icon: 'fa fa-th-large'
    },
    children: [{
        path: '/operation/operation-analysis',
        name: 'dispatchingOperationAnalysis',
        component: dispatchingOperationAnalysis,
        meta: {
          title: '调度运营分析',
          icon: 'fa fa-area-chart'
        },
        children: [{
            path: '/operation/operation-analysis/timeTable-analysis',
            component: timeTableAnalysis,
            name: 'timeTableAnalysis',
            meta: {
              title: '客流高峰时刻分析',
              icon: 'fa fa-line-chart'
            }
          },
          {
            path: '/operation/operation-analysis/section-analysis',
            component: sectionAnalysis,
            name: 'sectionAnalysis',
            meta: {
              title: '客流高峰断面分析',
              icon: 'fa fa-line-chart'
            }
          },
          {
            path: '/operation/operation-analysis/trip-order',
            component: tripOrder,
            name: 'tripOrder',
            meta: {
              title: '发车趟次时序图',
              icon: 'fa fa-line-chart'
            }
          },
          {
            path: '/operation/operation-analysis/full-load-rate',
            component: fullLoadRate,
            name: 'fullLoadRate',
            meta: {
              title: '区间满载率查询',
              icon: 'fa fa-line-chart'
            }
          },
          {
            path: '/operation/operation-analysis/landing-volume',
            component: landingVolume,
            name: 'landingVolume',
            meta: {
              title: '站点登降量查询',
              icon: 'fa fa-line-chart'
            }
          },
          {
            path: '/operation/operation-analysis/runtime-analysis',
            component: runtimeAnalysis,
            name: 'runtimeAnalysis',
            meta: {
              title: '站间运行时间分析',
              icon: 'fa fa-line-chart'
            }
          },
          {
            path: '/operation/operation-analysis/passenger-transport-capacity',
            component: passengerTransportCapacity,
            name: 'passengerTransportCapacity',
            meta: {
              title: '客流运力运量分析',
              icon: 'fa fa-line-chart'
            }
          }
        ]
      },
      {
        path: '/safety-supervision',
        component: safetySupervision,
        name: 'safetySupervision',
        meta: {
          title: '安全监管',
          icon: 'fa fa-exclamation-triangle'
        },
        children: [{
            path: '/operation/safety-supervision/vehicle-fault-alarm',
            component: vehicleFaultAlarm,
            name: 'vehicleFaultAlarm',
            meta: {
              title: '车辆故障报警',
              icon: 'fa fa-bell'
            }
          },
          {
            path: '/operation/safety-supervision/real-time-dashboard',
            component: realTimeDashboard,
            name: 'realTimeDashboard',
            meta: {
              title: '实时仪表盘',
              icon: 'fa fa-dashboard'
            }
          }
        ]
      },
      {
        path: '/fatigue-monitoring',
        component: fatigueMonitoring,
        name: 'fatigueMonitoring',
        meta: {
          title: '疲劳监测',
          icon: 'fa fa-television'
        },
        children: [{
            path: '/operation/fatigue-monitoring/alarm-center',
            component: alarmCenter,
            name: 'alarmCenter',
            meta: {
              title: '报警中心',
              icon: 'fa fa-bell'
            }
          },
          {
            path: '/operation/fatigue-monitoring/alarm-center/alarm-content',
            component: alarmContent,
            name: 'alarmContent',
            hidden: true,
            meta: {
              title: '报警中心详情',
              icon: 'fa fa-bell'
            }
          },
          {
            path: '/operation/fatigue-monitoring/device-status',
            component: deviceStatus,
            name: 'deviceStatus',
            meta: {
              title: '设备状态',
              icon: 'fa fa-bell'
            }
          },
          {
            path: '/operation/fatigue-monitoring/alarm-analysis',
            component: alarmAnalysis,
            name: 'alarmAnalysis',
            meta: {
              title: '报警分析',
              icon: 'fa fa-bell'
            }
          },
          {
            path: '/operation/fatigue-monitoring/alarm-management',
            component: alarmManagement,
            name: 'alarmManagement',
            meta: {
              title: '报警类型管理',
              icon: 'fa fa-bell'
            }
          }
        ]
      }
    ]
  }
];

export default new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
});

export const asyncRouterMap = [];
