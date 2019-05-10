<template>
  <div class="trip-order">
    <header>
      <headerNav></headerNav>
    </header>
    <div class="content">
      <contentWrapper></contentWrapper>
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
      busLine: '1路',
      station: '<kobe>'
    };
  },
  components: {
    headerNav,
    contentWrapper
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
