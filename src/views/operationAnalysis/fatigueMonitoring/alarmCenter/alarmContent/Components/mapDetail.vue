<template>
  <div class="person-detail-content">
    <baidu-map
      :style="{width: '100%', height: '310px', backgroundColor: 'rgba(0,0,0, 0.5)'}"
      :zoom="zoom"
      :center="center"
      :scroll-wheel-zoom="true"
      @ready="handler"
    >
      <!-- animation="BMAP_ANIMATION_DROP" -->
      <bm-marker
        :position="position"
        animation="BMAP_ANIMATION_BOUNCE"
        >
      </bm-marker>
    </baidu-map>
  </div>
</template>

<script type="text/ecmascript-6">
import {BmMarker} from 'vue-baidu-map';
export default {
  name: 'alarmContent',
  props: {
    busDetails: {
      type: Object
    }
  },
  data () {
    return {
      mapData: {},
      center: {lng: 0, lat: 0},
      zoom: 3,
      position: {lng: 0, lat: 0}
    };
  },
  components: {
    BmMarker
  },
  created () {
  },
  watch: {
    busDetails: {
      deep: true,
      handler () {
        this.mapData = this.busDetails;
      }
    }
  },
  methods: {
    handler ({BMap, map}) {
      setTimeout(() => {
        this.center.lng = this.mapData.lng;
        this.center.lat = this.mapData.lat;
        this.zoom = 13;
        this.position.lng = this.mapData.lng;
        this.position.lat = this.mapData.lat;
      }, 100);
    }
  }
};
</script>

<style lang="scss" scoped>
.alarm-content {
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}
</style>
