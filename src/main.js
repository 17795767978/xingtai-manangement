// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import './permission';
import vueSeamlessScroll from 'vue-seamless-scroll';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css/normalize.css';
import 'font-awesome/css/font-awesome.css';
import './assets/sass/index.scss';
import moment from 'moment';
import * as filters from './filter';
import echarts from 'echarts';
import BaiduMap from 'vue-baidu-map';

Vue.prototype.$echarts = echarts;

// import ImgPlugin from './mixins/index.js';
// Vue.use(new ImgPlugin(['AcousticAdvert', 'Advertising', 'Competition', 'PerformEntry', 'UserDetail', 'Band', '']));
Vue.use(Element, {
  size: 'medium'
});

moment.locale('zh-cn');

Vue.use(BaiduMap, {
  ak: '7vVOlMOKr03PaWX82WajF6m'
});

Vue.use(vueSeamlessScroll);

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  // components: { App },
  // template: '<App/>'
  render: h => h(App)
});
