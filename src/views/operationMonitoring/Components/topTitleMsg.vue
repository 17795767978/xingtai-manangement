<template>
  <div class="header-wrapper">
    <header>
     <el-row :gutter="24">
       <el-col :span="8" class="data-style">
         <span style="margin-right: 30px;">{{dataNow}}</span>
         <i v-if="weather.indexOf('晴') !== -1" class="iconfont icon-tianqi-qing" style="color: #ff0"></i>
         <i v-else-if="weather.indexOf('雨') !== -1" class="iconfont icon-tianqi-yu"></i>
         <i v-else-if="weather.indexOf('阴') !== -1" class="iconfont icon-tianqi-yin"></i>
         <i v-else-if="weather.indexOf('雷') !== -1" class="iconfont icon-tianqi-leiyu"></i>
         <i v-else-if="weather.indexOf('多云') !== -1" class="iconfont icon-tianqi-icon-tianqi-duoyun"></i>
         <i v-else-if="weather.indexOf('雪') !== -1" class="iconfont icon-tianqi-daxue"></i>
         <span style="margin-left: 10px;">{{weather}}</span>
         <span style="margin-left: 30px;">{{temperature}}</span>
       </el-col>
       <el-col :span="8">
        <h2 class="font">{{title}}</h2>
       </el-col>
       <el-col :span="8">
       </el-col>
     </el-row>
    </header>
  </div>
</template>

<script>
import moment from 'moment';
import {getWeather} from 'server/interface';
import 'assets/iconfont/iconfont.css';
export default {
  data () {
    return {
      dataNow: '',
      title: '邢台市公交运营监控系统',
      timer: null,
      temperature: '',
      weather: ''
    };
  },
  created () {
    this._getWeather();
    this.timer = setInterval(() => {
      this.dataNow = moment().format('YYYY MM-DD HH:mm:ss');
    }, 1000);
  },
  destroyed () {
    clearInterval(this.timer);
    this.timer = null;
  },
  methods: {
    _getWeather () {
      getWeather('zhfxpt/weather/getNowWeather', {}, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        let lowTemperature = res.data.data.result.templow;
        let heightTemperature = res.data.data.result.temphigh;
        this.temperature = `${lowTemperature}-${heightTemperature} °C`;
        this.weather = res.data.data.result.weather;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.header-wrapper {
  width: 100%;
  .data-style {
    line-height: 67px;
    font-size: 16px;
    color: #fff;
    font-weight: bold;
  }
  .font {
    color: #fff;
    text-align: center;
  }
}
</style>
