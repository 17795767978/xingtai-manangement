<template>
  <div class="header">
    <el-form :inline="true" size="mini" :model="formInline" class="form-inline">
      <el-form-item label="选择组织">
        <el-select class="font-style" v-model="formInline.orgUuid" placeholder="请选择">
          <el-option
            v-for="item in comOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择路线">
        <el-select class="font-style" v-model="formInline.lineUuid" placeholder="请选择">
          <el-option
            multiple
            collapse-tags
            v-for="item in lineOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="warning" @click="onclear">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
// import moment from 'moment';
export default {
  data() {
    return {
      formInline: {
        lineUuid: [],
        orgUuid: ''
      },
      comOptions: [],
      lineOptions: []
    };
  },
  created () {
    // this._lineList();
    // this._comList();
  },
  mounted () {
    this.$store.dispatch('getLineList').then(res => {
      this.lineOptions = res;
    });
    this.$store.dispatch('getComList').then(res => {
      this.comOptions = res;
    });
  },
  methods: {
    onSubmit() {
      this.$emit('selectConfig', this.formInline);
    },
    onclear () {
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  border-bottom: 1px solid #eee;
  padding: 20px 20px;
  box-sizing: border-box;
  box-shadow: 0 1px 10px rgba(0,0,0, 0.5);
  .form-inline {
   height: 38px;
   .font-style {
     width: 200px;
   }
  }
}
</style>
