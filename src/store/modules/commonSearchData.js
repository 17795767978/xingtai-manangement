import {
  lineList,
  comList,
  stationList
} from 'server/interface';

const tabWrap = {
  state: {
    lineDate: [],
    stationData: [],
    comData: []
    // carData: []
  },
  mutations: {
    LINE_DATA: (state, lineDate) => {
      state.tabData = lineDate;
    },
    STATION_DATA: (state, stationData) => {
      state.tabData = stationData;
    },
    COM_DATA: (state, comData) => {
      state.tabData = comData;
    }
  },
  actions: {
    getLineList({
      commit
    }) {
      return new Promise((resolve, reject) => {
        lineList('api/bus/line/list').then(res => {
          commit('LINE_DATA', res.data.data.list);
          resolve(res);
        }).catch(error => {
          reject(error);
        });
      });
    },
    getStationList({
      commit
    }) {
      return new Promise((resolve, reject) => {
        stationList('zhfxpt/analysis/getStations').then(res => {
          commit('STATION_DATA', res.data.data.list);
          resolve(res);
        }).catch(error => {
          reject(error);
        });
      });
    },
    getComList({
      commit
    }) {
      return new Promise((resolve, reject) => {
        comList('api/bus/sysorg/list').then(res => {
          commit('LINE_DATA', res.data.data.list);
          resolve(res);
        }).catch(error => {
          reject(error);
        });
      });
    }
  }
};

export default tabWrap;
