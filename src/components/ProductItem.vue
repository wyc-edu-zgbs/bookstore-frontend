<template>
  <router-link :to="'/book/' + product.id">
    <el-card
      class="product"
      shadow="hover"
    >
      <el-image
        :src="product.cover | media2url"
        class="pro_img"
        lazy
      />
      <p class="title">{{product.name}}</p>
      <p class="author">{{product.author}}</p>
      <span class="new-price">{{(product.price*product.rating) | formatPrice}}</span>
      <span class="old-price">定价: {{product.price | formatPrice}}</span>
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
    </el-card>
  </router-link>
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
  width: 90%;
  height: 70%;
  background: rgba(255, 255, 255, 0.7);
  margin: 3%;
}

.el-image {
  position: relative;
  width: 100%;
  height: 7cm;
  margin: 0 0 -5%;
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
}

.author {
  font-size: 70%;
  margin: -5% 0 5%;
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
