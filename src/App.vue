<template>
  <div id="app">
    <Header />
    <el-col
      :span="18"
      :offset="3"
    >
      <div id="nav">

      </div>
      <router-view />
      <Foot></Foot>
    </el-col>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Foot from './components/Foot.vue'

export default {
  components: {
    Header,
    Foot
  }
}
</script>
<style scoped>
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

