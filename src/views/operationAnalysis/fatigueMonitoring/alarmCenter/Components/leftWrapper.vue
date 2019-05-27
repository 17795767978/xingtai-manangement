<template>
  <div class="left-search-wrapper">
    <div class="top-search">
      <el-input v-model="searchCode" placeholder="请输关键字进行查询" clearable></el-input>
    </div>
    <div class="content">
      <el-tree
        class="filter-tree"
        :data="lineList"
        node-key="id"
        :highlight-current="true"
        :props="defaultProps"
        :filter-node-method="filterNode"
        @node-click="handleNodeClick"
        ref="treeLine">
      </el-tree>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {lineTree} from 'server/interface';
export default {
  props: {
    isClear: {
      type: Boolean
    }
  },
  data () {
    return {
      searchCode: '',
      lineList: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    };
  },
  components: {
  },
  created () {
    this._lineTree();
  },
  watch: {
    searchCode(val) {
      this.$refs.treeLine.filter(val);
    },
    isClear () {
      if (this.isClear) {
        this._lineTree();
      }
      this.$emit('isClearTo');
    }
  },

  methods: {
    _lineTree () {
      lineTree('warns/orgLineBusTree/get').then(res => {
        let levelOne = res.data.data.filter(list => list.levelsType === '0');
        let levelTwo = res.data.data.filter(list => list.levelsType === '1');
        let levelThree = res.data.data.filter(list => list.levelsType === '2');
        let levelFour = res.data.data.filter(list => list.levelsType === '3');
        this.lineList = [];
        this.lineList.length = levelOne.length;
        levelOne.forEach((level, index) => {
          this.lineList[index] = {
            id: level.id,
            levelsType: '0',
            name: level.name,
            children: []
          };
        });
        this.lineList[0].children.length = levelTwo.length;
        levelTwo.forEach((level, index) => {
          this.lineList[0].children[index] = {
            id: level.id,
            name: level.name,
            levelsType: '1',
            pId: level.pId,
            children: []
          };
        });
        this.lineList[0].children.forEach((child, index) => {
          child.children = levelThree.filter(lv => lv.pId === child.id);
        });
        this.lineList[0].children.forEach((child, index) => {
          child.children.forEach(i => {
            i.children = [];
            i.children = levelFour.filter(lv => lv.pId === i.id);
          });
        });
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    handleNodeClick (data) {
      this.$emit('selectCar', data);
    }
  }
};
</script>

<style lang="scss" scoped>
.left-search-wrapper {
  width: 100%;
  padding: 20px 10px;
  box-sizing: border-box;
  height: 800px;
  overflow: auto;
  .content {
    margin-top: 20px;
  }
}
</style>
