<template>
  <el-container style="height: 100%;">
    <el-aside width="15vw">
      <!--
            <img v-if="userInfo.user_avatar" :src="userInfo.user_avatar" class="navbar-brand-img mx-auto">
            <img v-else src="./images/no_login.jpg" class="navbar-brand-img mx-auto">
            不知道有没有头像 先这么写了-->

        <el-header>
            <!--
             <img
          src="../../assets/bread.png"
          alt="bread"
          class="img"
          style="height:100%;width:50%"
        >
        -->

            <h1>
                        <i class="el-icon-setting"></i>
                管理页面
            </h1>
        </el-header>
      <el-menu :unique-opened="true">
        <el-menu-item
          index="1"
          @click="goTo('/admin/goodsshow')"
        >
          <i class="el-icon-document-copy"></i>
          <span slot="title">商品信息</span>
        </el-menu-item>
       
        <el-menu-item
          index="2"
          @click="goTo('/admin/goodsadd')"
        >
          <i class="el-icon-circle-plus-outline"></i>
          <span slot="title">商品上架</span>
        </el-menu-item>

        <el-menu-item
          index="3"
          @click="goTo('/admin/orderupdate')"
        >
          <i class="el-icon-s-order"></i>
          <span slot="title">订单处理</span>
        </el-menu-item>

      </el-menu>

    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>
<script>
export default
  {
    methods:
    {
      goTo(path) {
        this.$router.replace(path);
      }
    }
  }

</script>

<style scoped>
.el-aside {
  background-color: rgba(91, 155, 148, 0.3);
  display: block;
  height: 60vh;
  position: relative;
}
.el-main {
  padding: 0 2%;
}
</style>
