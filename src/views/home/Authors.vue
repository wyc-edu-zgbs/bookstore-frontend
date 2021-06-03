<template>
  <div class="authors">
    <div class="header">
      <i class="el-icon-star-off">
      </i> 您可能喜欢的作者
    </div>
    <el-menu>
      <el-menu-item
        :index="(index+'')"
        v-for="(item,index) in this.menus"
        :key="index"
      >
        <span> {{index+1}}. {{item}} </span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: ["余华", "郑渊洁", "余秋雨", "曹文轩", "刘慈欣", "莫言", "村上春树", "东野圭吾",
        "大冰", "张嘉佳", "沈石溪", "当年明月"
      ]
    }
  },
}
</script>

<style scoped>
.authors {
  border: 2px solid rgba(58, 130, 119, 0.7);
  margin: 8% 5% 0;
}
.header {
  font-size: 100%;
  font-weight: bold;
  padding: 5% 10%;
  color: rgba(58, 130, 119, 0.9);
}
.el-menu-item {
  font-size: 90% !important;
  text-align: left;
  height: 5vh;
  line-height: 5vh;
  width: 100%;
}
.el-menu-item:hover {
  color: rgb(58, 130, 119) !important;
}
</style>