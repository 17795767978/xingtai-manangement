<template>
  <div class="errPage-container">
    <el-button
      @click="back"
      class="pan-back-btn">
      返回
    </el-button>
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">Oops!</h1>
        <h2>你没有权限去该页面</h2>
        <h6>如有不满请联系你领导</h6>
        <ul class="list-unstyled">
          <li>或者你可以去:</li>
          <li class="link-type">
            <router-link to="/dashboard">回首页</router-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="12">
        <img :src="errGif" width="313" height="428" alt="Girl has dropped her ice cream.">
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import errGif from '../../assets/images/401/401.gif';

  export default {
    name: 'page401',
    data() {
      return {
        errGif: errGif
      };
    },
    methods: {
      back() {
        if (this.$route.params.noGoBack) {
          this.$router.push({
            path: '/dashboard'
          });
        } else {
          this.$router.go(-1);
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .errPage-container {
    width: 800px;
    margin: 0 auto;
    padding-top: 100px;

    .pan-back-btn {
      background: #008489;
      color: #fff;
    }

    .pan-gif {
      margin: 0 auto;
      display: block;
    }

    .pan-img {
      display: block;
      margin: 0 auto;
      width: 100%;
    }

    .text-jumbo {
      font-size: 60px;
      font-weight: 700;
      color: #484848;
    }

    .list-unstyled {
      padding-left: 40px;
      font-size: 14px;

      li {
        padding-bottom: 5px;
      }

      a {
        color: #008489;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
</style>
