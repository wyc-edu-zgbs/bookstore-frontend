<template>
  <div id="app">
    <el-col
      :span="18"
      :offset="3"
    >
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/cart">Cart</router-link> |
        <router-link to="/login">Greeter</router-link> |
        <router-link to="/book/:id">Book</router-link> |
        <router-link to="/search">Search</router-link>
        |
        <router-link to="/personInfo/Profile">personInfo</router-link>
      </div>
      <router-view />
    </el-col>
  </div>
</template>

<style>
body {
  background-color: #eaece1;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
