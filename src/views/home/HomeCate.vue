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
        active-text-color="fff"
      >
        <el-menu-item
          :index="(index+'')"
          v-for="(item,index) in this.menus"
          :key="index"
        >
          <span>{{item}}</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: ["文学", "小说", "童书", "教辅", "艺术", "休闲爱好", "青春文学", "成功励志", "管理", "动漫/幽默",
        "烹饪/美食", "人文社科", "亲子家教", "保健养生", "科技"]
    }
  },

}
</script>

<style scoped>
.header {
  margin: -1px;
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
.el-menu-item {
  font-size: 110% !important;
  font-weight: bold;
  text-align: left;
  height: 5.5vh;
  line-height: 5vh;
  width: 101%;
}
.el-menu-item:hover {
  border-color: rgba(58, 130, 119, 0.7);
  border-style: solid;
  border-width: 1px 0;
  background: rgb(255, 255, 255) !important;
  color: rgb(58, 130, 119) !important;
}
</style>