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
        collapse-transition="false"
      >
        <el-submenu
          :index="(index+'')"
          v-for="(item,index) in Object.keys(menus)"
          :key="index"
          show-timeout=10
          hide-timeout=10
          id="sub"
        >
          <template
            slot="title"
            class="tt"
          >{{item}}</template>
          <el-menu-item
            v-for="(item,index) in menus[item]"
            :key="index"
          >
            {{item}}
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
      menus: {
        "文学": ["中国古诗词", "青春文学", "外国当代诗歌", "民间文学"],
        "小说": ["中国当代小说", "四大名著", "中国当代小说", "外国小说", "世界名著"],
        "生活": ["亲子家教", "保健", "运动", "美妆", "手工"],
        "经管": ["经济", "管理", "投资理财"],
        "科技": ["科普", "建筑", "医学", "计算机"],
        "人文社科": ["历史", "古籍", "法律", "社会科学"],
        "动漫幽默": ["笑话集", "大陆漫画", "游戏同人作品", "画集"],
        "励志": ["人生哲学", "性格与习惯", "礼仪", "人际交往"],
        "童书": ["绘本", "童话", "英语", "科普"],
      }
    }
  },

}
</script>

<style scoped>
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


