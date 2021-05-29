<template>
  <div class="search-container">
    <SearchBox />
    <ItemsView />
  </div>
</template>

<script>
import ItemsView from '../components/ItemsView.vue'
import SearchBox from '../components/SearchBox.vue'

export default {
  components: {
    ItemsView,
    SearchBox
  }
}
</script>
