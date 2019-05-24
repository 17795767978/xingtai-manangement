<template>
  <div>
    <baidu-map
    :style="{width: '500px', height: '400px', backgroundColor: 'rgba(0,0,0, 0.5)'}"
    :zoom="zoom"
    :center="center"
    :scroll-wheel-zoom="true"
    >
    <!-- animation="BMAP_ANIMATION_DROP" -->
    <bm-marker
      :dragging="true"
      :position="position"
      animation="BMAP_ANIMATION_BOUNCE"
      >
    </bm-marker>
    </baidu-map>
</div>
</template>

<script type="text/ecmascript-6">
import { BmMarker } from 'vue-baidu-map';
export default {
  props: {
    rowData: {
      type: Object
    }
  },
  data() {
    return {
      data: {},
      center: { lat: 0, lng: 0 },
      position: { lat: 0, lng: 0 },
      zoom: 10
    };
  },
  components: {
    BmMarker
  },
  watch: {
    rowData: {
      deep: true,
      handler() {
        this.data = this.rowData;
        this.center.lat = this.data.lat;
        this.center.lng = this.data.lng;
        this.position.lat = this.data.lat;
        this.position.lng = this.data.lng;
        this.zoom = 20;
      }
    }
  },
  mounted() {},
  methods: {}
};
</script>

<style>
</style>
