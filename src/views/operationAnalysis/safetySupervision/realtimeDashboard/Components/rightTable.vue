<template>
  <div>
    <div class="btn">
      <el-switch
        class="btn-content"
        v-model="infoWindow.show"
        active-color="#13ce66"
        inactive-color="#ff4949">
      </el-switch>
    </div>
    <div class="map-wrapper">
      <baidu-map
        :style="{width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0, 0.5)'}"
        :zoom="zoom"
        :center="center"
        :scroll-wheel-zoom="true"
        :auto-resize="true"
        @ready="handler"
      >
        <bm-info-window :position="center" title="陕A9777E" :show="infoWindow.show" @close="infoWindowClose" @open="infoWindowOpen">
          <p class="font-style">用户：一公司</p>
          <p class="font-style">速度：19km/h</p>
          <p class="font-style">GPS：2019-05-13 17:42:00</p>
          <p class="font-style">接收：2019-05-13 17:42:00</p>
          <p class="font-style">状态：启动</p>
          <p class="font-style" style="margin-bottom: 5px;">行驶：1小时，16.17千米</p>
          <el-button type="text" style="margin-top: -20px;" size="mini" @click="subMit">点击事件</el-button>
        </bm-info-window>
        <bm-marker
          :position="center"
          :icon="{url: `${iconCar}`, size: {width: 50, height: 30}}"
          animation="BMAP_ANIMATION_DROP"
          >
        </bm-marker>
      </baidu-map>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {BmMarker} from 'vue-baidu-map';
import iconCar from 'assets/images/bus.png';
export default {
  data () {
    return {
      center: {lng: 0, lat: 0},
      zoom: 13,
      infoWindow: {
        show: true
      },
      iconCar: iconCar
    };
  },
  components: {
    BmMarker
  },
  mounted () {
  },
  methods: {
    handler ({BMap, map}) {
      // console.log(BMap)
      this.center.lng = '114.520486813';
      this.center.lat = '37.0695311969';
      this.zoom = 15;
      this.isLoading = false;
      map.setMapStyle(this.mapStyle);
    },
    subMit () {
      alert('ok');
    },
    infoWindowClose () {
      this.infoWindow.show = false;
    },
    infoWindowOpen () {
      this.infoWindow.show = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.btn {
  position: relative;
  .btn-content {
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 10;
  }
}
.map-wrapper {
  height: 400px;
  border: 1px solid #eee;
  border-radius: 6px;
  .font-style {
    font-size: 12px;
    line-height: 0.3
  }
}
</style>
