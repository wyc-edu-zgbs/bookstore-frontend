<template>
  <div class="header-container">
    <div class="header_nav">
      <p id="title">header text</p>
      <ul>
        <li v-if="!userInfo.id">
          <router-link to="/login">您好,请登录</router-link>
        </li>
        <li v-else>
          <a v-if="userInfo.user_nickname">您好,{{ userInfo.user_nickname }}</a>
          <a @click="logout">退出登录</a>
        </li>
        <li><router-link to="/settings">个人中心</router-link></li>
        <li><router-link to="/cart">我的购物车</router-link></li>
      </ul>
    </div>
    <div class="header-blank"></div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      userInfo: {}
    }
  },
  methods: {
    logout() {
      console.log("logout")
    }
  }
}
</script>

<style scoped>
.header_nav{
  position: fixed;
  z-index: 1500;
  width: 100%;
  height: 1cm;
  top: 0;
  left: 0;
  background: #F2F2F2;
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
  color: #999;
  font-size: 1em;
}
.header_nav>ul{
  margin: 0 2cm;
  list-style: none;
  display: flex;
  align-items: center;
}
.header_nav>ul>li *{
  display: inline-block;
  padding: 0 1em .1em 1em;
  font-size: .8em;
  color: #999;
  text-decoration: none;
  cursor: pointer;
}
.header_nav>ul>li *:hover{
  color: red;
}
</style>
