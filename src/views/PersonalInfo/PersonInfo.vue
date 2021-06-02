<template>
  <el-container>
    <el-aside>
      <!--
            <img v-if="userInfo.user_avatar" :src="userInfo.user_avatar" class="navbar-brand-img mx-auto">
            <img v-else src="./images/no_login.jpg" class="navbar-brand-img mx-auto">
            不知道有没有头像 先这么写了-->

      <el-menu :unique-opened="true">
        <el-menu-item
          index="1"
          @click="goTo('/personinfo/profile')"
        >
          <i class="el-icon-document-copy"></i>
          <span slot="title">我的资料</span>
        </el-menu-item>

        <el-menu-item
          index="2"
          @click="goTo('/personinfo/addr')"
        >
          <i class="el-icon-location"></i>
          <span slot="title">收货地址</span>
        </el-menu-item>

        <el-menu-item
          index="4"
          @click="goTo('/personinfo/myorder')"
        >
          <i class="el-icon-s-order"></i>
          <span slot="title">我的订单</span>
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
  height: 70vh;
  position: relative;
  border-width: 0.2vw;
  border-style: solid;
  border-color: rgba(91, 155, 148, 0.7);
}

.el-main {
  padding: 0 2%;
}
</style>
