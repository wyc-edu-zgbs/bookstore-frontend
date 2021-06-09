<template>
  <div>
    <div class="cate">
      <div class="header">
        <i class="el-icon-notebook-2">
        </i> 图书类目
      </div>
      <el-menu
        background-color="white"
        text-color="rgb(58, 130, 119)"
        :collapse="true"
        :collapse-transition="false"
      >
        <el-submenu
          :index="(index+'')"
          v-for="(item,index) in Object.keys(menus)"
          :key="index"
          :show-timeout=10
          :hide-timeout=10
          id="sub"
        >
          <template
            slot="title"
            class="tt"
          >
          <router-link :to="'/category?cat='+item" class="menulink">
            {{item}}
          </router-link>
          </template>
          <el-menu-item
            v-for="(subitem,index) in menus[item]"
            :key="index"
          >
            <router-link :to="'/category?cat='+item+','+subitem" class="menulink">
              {{subitem}}
            </router-link>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: require('../../assets/categories.json')
    }
  },

}
</script>

<style scoped>
.menulink {
  text-decoration: inherit;
  color: inherit;
}
.header {
  margin: 0 -1px;
  font-size: 150%;
  font-weight: bold;
  padding: 5% 10%;
  color: white;
  background: rgba(58, 130, 119, 0.9);
}
.cate {
  border: 2px solid rgba(58, 130, 119, 0.7);
  margin: 0 3% 10%;
}

.el-submenu {
  font-weight: bold;
  text-align: left;
  height: 9vh;
  line-height: 6vh;
  width: 100%;
}

.el-menu--collapse {
  width: 11vw;
  border: 0vw;
}

#sub >>> .el-submenu__title:hover {
  background: rgb(255, 255, 255) !important;
  color: rgb(58, 130, 119) !important;
}

.el-menu-item:hover {
  background: rgba(58, 130, 119, 0.1) !important;
  color: rgb(58, 130, 119) !important;
}
.el-menu-item {
  font-size: 90% !important;
  text-align: left;
  height: 5vh;
  line-height: 5vh;
  width: 100%;
}

#sub >>> .el-submenu__title {
  width: 10vw;
  font-size: 130% !important;
}
</style>


