import {
  getToken,
  setToken,
  removeToken
} from '../../utils/auth';
// import { loginByUsername, getUserInfo } from '../../server/user';

const user = {
  state: {
    token: getToken(),
    roles: [],
    name: '',
    roleId: ''
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_ROLEID: (state, id) => {
      state.roleId = id;
    }
  },
  actions: {
    // 用户名登录
    LoginByUsername({commit}, userInfo) {
      // const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        // loginByUsername('sys/user/login', {
        //   account: username,
        //   password: userInfo.password
        // }).then(res => {
        //   if (res.code === 0) {
        //     commit('SET_TOKEN', 1);
        //     setToken(1);
        //     resolve();
        //   }
        // }).catch(error => {
        //   reject(error);
        // });
        commit('SET_TOKEN', 1);
        setToken(1);
        resolve();
      });
    },

    // 获取用户信息
    GetUserInfo({commit, state}) {
      return new Promise((resolve, reject) => {
        // getUserInfo('sys/user/info').then(res => {
        //   const data = res.data;
        //   commit('SET_NAME', 'kobe');
        //   commit('SET_ROLEID', '1');
        //   if (data.perms && data.perms.length > 0) {
        //     commit('SET_ROLES', '123');
        //   } else {
        //     reject('getInfo: roles must be a non-null array !');
        //   }
        //   resolve(res);
        // }).catch(error => {
        //   reject(error);
        // });
        commit('SET_NAME', 'kobe');
        commit('SET_ROLEID', '1');
        commit('SET_ROLES', '123');
        resolve();
      });
    },
    LogOut({commit, state}) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '');
        removeToken();
        resolve();
      });
    },
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        removeToken();
        resolve();
      });
    }
  }
};

export default user;
