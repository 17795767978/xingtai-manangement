<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key"></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
  export default {
    name: 'AppMain',
    computed: {
      cachedViews() {
        return this.$store.state.tagsView.cachedViews;
      },
      key() {
        return this.$route.fullPath;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .app-main {
    /*84 = navbar + tags-view = 50 +34 */
    min-height: calc(100vh - 94px);
    position: relative;
    overflow: hidden;
    background: #fff;
  }
</style>
