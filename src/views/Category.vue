<template>
  <div
    class="category-container"
    :key="$route.query.cat || ''"
  >
    <SearchBox />
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{query: {cat: ''}}">homepage</el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="i in p.map((v, i) => ({i:i, v:v}))"
        :key="i.v"
        :to="{query: {cat: p.slice(0, i.i+1).join(',')}}"
      >
        {{i.v}}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <ItemsView />
  </div>
</template>

<script>
import ItemsView from '../components/ItemsView.vue'
import SearchBox from '../components/SearchBox.vue'

export default {
  computed: {
    p() {
      return (this.$route.query.cat || "").split(",")
    }
  },
  components: {
    ItemsView,
    SearchBox
  }
}
</script>

<style scoped>
.el-breadcrumb {
  margin: 1cm;
}
</style>
