<template>
  <div>
    <h3 class="title">{{eChartsTitle}}</h3>
    <h5 class="content">暂无数据</h5>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
    };
  },
  props: {
    eChartsTitle: {
      type: String
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  color: #fff;
  text-align: center;
}
.content {
  color: #fff;
  text-align: center;
  margin-top: 50px;
}
</style>
