<template>
  <el-card
    class="product"
    shadow="hover"
  >
    <router-link :to="'/book/' + product.id">
      <el-image
        :src="product.cover | media2url"
        class="pro_img"
        lazy
      />
      <p class="title">{{product.name}}</p>
      <p class="author">{{product.author}}</p>
      <span class="new-price">{{product.price | formatPrice}}</span>
      <span class="old-price" v-if="product.original_price">
        定价: {{product.original_price | formatPrice}}
      </span>
      <!-- <div class="button"> -->
      <el-row
        type="flex"
        class="button"
      >
        <el-button
          type="danger"
          size="mini"
        > <i class="el-icon-shopping-cart-2"></i> 加入购物车</el-button>
        <el-button
          type="danger"
          plain
          size="mini"
        ><i class="el-icon-goods"></i> 立即购买</el-button>
      </el-row>
    </router-link>
  </el-card>

</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  }
}

</script>

<style scoped>
.product {
  text-align: left;
  width: 85%;
  height: 75%;
  margin: 2% 4%;
  padding-left: 1vw;
}

.el-image {
  position: relative;
  width: 90%;
  height: 33vh;
  margin: 0 0 -2vh 0;
}

a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}

.title {
  font-size: 110%;
  font-weight: bold;
  color: black;
}

.author {
  font-size: 70%;
  margin: -5% 0 5%;
  color: black;
}

.new-price {
  color: #ff0036;
  font-family: Arial;
  font-size: 150%;
  font-weight: bold;
  padding: 3% 4% 0 0;
}

.old-price {
  text-decoration: line-through;
  color: rgb(139, 134, 134);
  font-size: 80%;
}

.button {
  padding: 5% 0 0;
}

.el-button {
  padding: 4% 3%;
}
</style>

