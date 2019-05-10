<template>
  <div class="map-chart">
    <baidu-map
      :style="{width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0, 0.5)'}"
      :zoom="zoom"
      :center="center"
      :scroll-wheel-zoom="true"
      @ready="handler"
    >
      <!-- animation="BMAP_ANIMATION_DROP" -->
      <bm-marker
        v-for="marker in markers"
        :key="marker.busId"
        :position="{lng: marker.lng, lat: marker.lat}"
        @click="handleMarkerClick(marker)"
        :title="`${marker.lineName}-${marker.busNumber}`"
        :icon="{url: `${iconCar}`, size: {width: 30, height: 30}}"
        animation="BMAP_ANIMATION_BOUNCE"
        >
      </bm-marker>
      <bml-heatmap :data="hotdata" :max="max" :radius="20">
      </bml-heatmap>
    </baidu-map>
  </div>
</template>

<script type="text/ecmascript-6">
import {positionRating, hotDataLine} from 'server/interface.js';
import {BmMarker, BmlHeatmap} from 'vue-baidu-map';
import iconCar from 'assets/images/bus.png';
export default {
  data () {
    return {
      isLoading: true,
      center: {lng: 0, lat: 0},
      zoom: 3,
      mapStyle: {
        styleJson: [
          {
              'featureType': 'water',
              'elementType': 'all',
              'stylers': {
                  'color': '#044161'
              }
          },
          {
              'featureType': 'land',
              'elementType': 'all',
              'stylers': {
                  'color': '#132b3e'
              }
          },
          {
              'featureType': 'railway',
              'elementType': 'all',
              'stylers': {
                  'visibility': 'off'
              }
          },
          {
              'featureType': 'highway',
              'elementType': 'geometry',
              'stylers': {
                  'color': '#004981'
              }
          },
          {
              'featureType': 'highway',
              'elementType': 'geometry.fill',
              'stylers': {
                  'color': '#005b96',
                  'lightness': 1
              }
          },
          {
              'featureType': 'arterial',
              'elementType': 'geometry',
              'stylers': {
                  'color': '#004981'
              }
          },
          {
              'featureType': 'arterial',
              'elementType': 'geometry.fill',
              'stylers': {
                  'color': '#00508b'
              }
          },
          {
              'featureType': 'poi',
              'elementType': 'all',
              'stylers': {
                  'color': '#000'
              }
          },
          {
              'featureType': 'green',
              'elementType': 'all',
              'stylers': {
                  'color': '#056197',
                  'visibility': 'off'
              }
          },
          {
              'featureType': 'manmade',
              'elementType': 'all',
              'stylers': {
                  'visibility': 'off'
              }
          },
          {
              'featureType': 'local',
              'elementType': 'all',
              'stylers': {
                  'color': '#000'
              }
          },
          {
              'featureType': 'building',
              'elementType': 'all',
              'stylers': {
                  'color': '#1a5787'
              }
          }
        ]
      },
      markers: [],
      hotdata: [],
      max: 100,
      iconCar: iconCar
    };
  },
  components: {
    BmlHeatmap,
    BmMarker
  },
  created () {
    this._positionRating({
      orgId: ''
    });
    this._hotDataLine({
      orgId: ''
    });
  },
  mounted () {
  },
  methods: {
    _positionRating (params) {
      positionRating('zhfxpt/map/getBusPositionAndFullLoadRate', params).then(res => {
        this.markers = res.data.data;
      });
    },
    _hotDataLine (params) {
      hotDataLine('zhfxpt/map/getBusHeatmapDatas', params).then(res => {
        let dataArrCount = res.data.data.map(item => parseInt(item.getOnNumber));
        let dataArrLat = res.data.data.map(item => item.lat);
        let dataArrLng = res.data.data.map(item => item.lng);
        for (let i = 0; i < dataArrCount.length; i++) {
           this.hotdata[i] = {
             lng: +dataArrLng[i],
             lat: +dataArrLat[i],
             count: dataArrCount[i]
           };
        }
        this.max = 4000;
      });
    },
    handler ({BMap, map}) {
      // console.log(BMap)
      this.center.lng = '114.520486813';
      this.center.lat = '37.0695311969';
      this.zoom = 13;
      this.isLoading = false;
      map.setMapStyle(this.mapStyle);
    },
    handleMarkerClick () {
      console.log(123);
    }
  }
};
</script>

<style lang="scss" scoped>
.map-chart {
  width: 100%;
  height: 100%;
}
</style>
