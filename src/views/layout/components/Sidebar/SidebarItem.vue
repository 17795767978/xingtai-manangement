<template>
  <div v-if="!item.hidden && item.children" class="menu-wrapper">
    <!-- <router-link
      v-if="hasOneShowingChild(item.children) && !onlyOneChild.children && !item.alwaysShow"
      :to="resolvePath(onlyOneChild.path)">
      <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown': !isNest}">
        <i v-if="onlyOneChild.meta && onlyOneChild.meta.icon" :class="onlyOneChild.meta.icon"></i>
        <span v-if="onlyOneChild.meta && onlyOneChild.meta.title" slot="title">
                    {{onlyOneChild.meta.title}}
                </span>
      </el-menu-item>
    </router-link> -->
    <el-submenu :index="item.name || item.path">
      <template slot="title">
        <i v-if="item.meta && item.meta.icon" style="color: #000" :class="item.meta.icon"></i>
        <span v-if="item.meta && item.meta.title" slot="title" style="color: #000">
                    {{item.meta.title}}
                </span>
      </template>
      <template v-for="child in item.children" v-if="!child.hidden">
        <sidebar-item
          :is-nest="true"
          class="nest-menu"
          v-if="child.children && child.children.length > 0"
          :item="child"
          :key="child.path"
          :base-path="resolvePath(child.path)">
        </sidebar-item>

        <router-link v-else :to="resolvePath(child.path)" :key="child.name">
          <el-menu-item :index="resolvePath(child.path)">
            <i v-if="child.meta && child.meta.icon" :class="child.meta.icon"></i>
            <span v-if="child.meta && child.meta.title" slot="title">
                            {{child.meta.title}}
                        </span>
          </el-menu-item>
        </router-link>
      </template>
    </el-submenu>
  </div>
</template>

<script>
  import path from 'path';

  export default {
    name: 'SidebarItem',
    props: {
      item: {
        type: Object,
        required: true
      },
      isNest: {
        type: Boolean,
        default: false
      },
      basePath: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        onlyOneChild: null
      };
    },
    methods: {
      hasOneShowingChild(children) {
        const showingChildren = children.filter(item => {
          if (item.hidden) {
            return false;
          } else {
            this.onlyOneChild = item;
            return true;
          }
        });
        if (showingChildren.length === 1) {
          return true;
        }
        return false;
      },
      resolvePath(...paths) {
        return path.resolve(this.basePath, ...paths);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .menu-wrapper {
    .fa {
      padding-right: 10px;
      font-size: 16px;
      vertical-align: middle;
      color: #464c5b;
    }

    .fa-handshake-o {
      font-size: 12px;
    }
  }
</style>
