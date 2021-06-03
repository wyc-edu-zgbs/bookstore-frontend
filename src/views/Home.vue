<template>
  <div id="home">
    <SearchBox />
    <el-row>
      <el-col :span="4">
        <HomeCate></HomeCate>
      </el-col>
      <el-col :span="15">
        <div class="main">
          <HomeCarousel></HomeCarousel>
        </div>
      </el-col>
      <el-col :span="5">
        <Notice />
      </el-col>
    </el-row>
    <el-row>
      <Remend></Remend>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src
import SearchBox from '../components/SearchBox.vue'
import HomeCarousel from './home/HomeCarousel.vue'
import HomeCate from './home/HomeCate.vue'
import Remend from './home/Remend.vue'
import Notice from './home/Notice.vue'

export default {
  name: 'Home',
  components: {
    SearchBox,
    HomeCarousel,
    HomeCate,
    Remend,
    Notice
  }
}
</script>

<style scoped>
.main {
  margin: 0 1%;
}
</style>
