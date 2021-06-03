<template>
  <div class="recd">
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
  data() {
    return {
      "products_row": [
        [{
          "name": "寻找《局外人》",
          "cover": "s33658199.jpg",
          "author": "[美]爱丽丝·卡普兰 ",
          "price": 98.0,
          "id": "d99a716c-b952-11eb-8bfc-f1ff82be21dd",
          "rating": 0.8
        },
        {
          "name": "不要和你妈争辩",
          "cover": "s33610259.jpg",
          "author": "[瑞典] 弗雷德里克·巴克曼 ",
          "price": 39.8,
          "id": "d99a716d-b952-11eb-8bfc-f1ff82be21dd",
          "rating": 0.8
        },
        {
          "name": "鞋带",
          "cover": "s33601424.jpg",
          "author": "[意] 多梅尼科·斯塔尔诺内 ",
          "price": 45,
          "id": "d99a716e-b952-11eb-8bfc-f1ff82be21dd",
          "rating": 0.8
        },
        {
          "name": "正常人",
          "cover": "s33684681.jpg",
          "author": "[爱尔兰] 萨莉·鲁尼 ",
          "price": 49.8,
          "id": "d99a716f-b952-11eb-8bfc-f1ff82be21dd",
          "rating": 0.8
        },
        {
          "name": "正常人",
          "cover": "s33684681.jpg",
          "author": "[爱尔兰] 萨莉·鲁尼 ",
          "price": 49.8,
          "id": "d99a716f-b952-11eb-8bfc-f1ff82be21dd",
          "rating": 0.8
        }],
        [{
          "name": "光明共和国",
          "cover": "s33625558.jpg",
          "author": "[西]安德烈斯·巴尔瓦 ",
          "price": 46,
          "id": "d99a7170-b952-11eb-8bfc-f1ff82be21dd",
          "rating": 0.8
        }],
        [{
          "name": "往复书简：初恋与不伦",
          "cover": "s33668217.jpg",
          "author": "[日] 坂元裕二 ",
          "price": 42.0,
          "id": "d99a7171-b952-11eb-8bfc-f1ff82be21dd",
          "rating": 0.8
        }]
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

