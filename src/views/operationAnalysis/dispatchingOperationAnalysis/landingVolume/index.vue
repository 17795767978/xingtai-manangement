<template>
  <div class="trip-order">
    <header>
      <headerNav @configTableData="configTableData" @selectStation="selectStation"></headerNav>
    </header>
    <div class="content">
      <contentWrapper :selectData="selectData" :selectStations="selectStations"></contentWrapper>
    </div>
  </div>
</template>

<script type="text-ecmascript-6">
import headerNav from './Components/header';
import contentWrapper from './Components/content';
export default {
  name: 'tripOrder',
  data () {
    return {
      selectData: [],
      selectStations: []
    };
  },
    components: {
    headerNav,
    contentWrapper
  },
  created () {
  },
  methods: {
    configTableData (data) {
      this.selectData = data;
    },
    selectStation (data) {
      this.selectStations = data;
    }
  }
};
</script>

<style lang="scss" scoped>
.trip-order {
  width: 100%;
  .content {
    width: 100%;
    padding: 10px 50px;
    box-sizing: border-box;
    .title {
      text-align: center;
    }
  }
}
</style>
