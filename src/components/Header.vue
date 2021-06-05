<template>
  <div class="header-container">
    <div class="header_nav">
      <p id="title">小型网上书店</p>
      <ul>
        <li v-if="$cookies.get('role')">
          <a @click="logout">退出登录</a>
        </li>
        <li v-else>
          <router-link to="/login">您好,请登录</router-link>
        </li>
        <li>
          <router-link to="/admin/orderupdate" v-if="$cookies.get('role')=='admin'">
            <i class="el-icon-s-tools"></i>平台管理</router-link>
          <router-link to="/personinfo/profile" v-else><i class="el-icon-user-solid"></i>个人中心</router-link>
        </li>
        <li>
          <router-link to="/cart"><i class="el-icon-shopping-cart-2"></i>我的购物车</router-link>
        </li>
      </ul>
    </div>
    <div class="header-blank"></div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$http.post("/api/logout")
        .then((response) => {
          if (response.data.detail) {
            this.$message(response.data.detail)
          }
          this.$router.go()
        })
        .catch(error => {
          console.log(error)
          this.$notify({
            title: 'Could not reach the API.',
            message: error
          })
        })
    }
  }
}
</script>

<style scoped>
.header_nav {
  position: fixed;
  z-index: 1500;
  width: 100%;
  height: 1cm;
  top: 0;
  left: 0;
  background: rgb(91, 155, 148);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header-blank {
  width: 100%;
  height: 1cm;
}
#title {
  margin-left: 1cm;
  color: #fff;
  font-size: 1em;
}
.header_nav > ul {
  margin: 0 2cm;
  list-style: none;
  display: flex;
  align-items: center;
}
.header_nav > ul > li * {
  display: inline-block;
  padding: 0 1em 0.1em 1em;
  font-size: 0.8em;
  color: #fff;
  text-decoration: none;
  cursor: pointer;
}
.header_nav > ul > li *:hover {
  color: rgb(248, 224, 157);
}
</style>
