<template>
  <div class="recd" v-loading="is_loading">
    <img
      src="../../assets/title/1.png"
      class="image"
    >
    <el-row>
      <el-col
        v-for="product in products_row[0]"
        :key="product.id"
        :span="6"
      >
        <ProductItem
          :product="product"
          class="book"
        />
      </el-col>
    </el-row>

    <img
      src="../../assets/title/2.png"
      class="image"
    >
    <el-row class="it">
      <el-col
        v-for="product in products_row[1]"
        :key="product.id"
        :span="6"
      >
        <ProductItem
          :product="product"
          class="book"
        />
      </el-col>
    </el-row>

    <img
      src="../../assets/title/3.png"
      class="image"
    >
    <el-row class="it">
      <el-col
        v-for="product in products_row[2]"
        :key="product.id"
        :span="6"
      >
        <ProductItem
          :product="product"
          class="book"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ProductItem from '../../components/ProductItem.vue'

export default {
  methods: {
    show() {
      var endpoint = "/api/search?q=" + (process.env.RECOMMEND_KEY || "1")
      this.is_loading = true;
      this.product_rows = []
      this.$http.get(endpoint)
        .then((response) => {
          this.showProducts(response.data)
        })
        .catch((error) => {
          console.log(error)
          this.$notify({
            title: 'Could not reach the API.',
            message: error
          })
        })
        .finally(() => this.is_loading = false)
    },
  },
  mounted() {
    this.show();
  },
  data() {
    return {
      is_loading: true,
      "products_row": [
        [],
        [],
        []
      ]
    }
  },
  components: {
    ProductItem
  },
}
</script>

<style scoped>
.recd {
  padding: 0;
  height: 50%;
}
.image {
  padding: 1% 1% 0 1%;
}
</style>

