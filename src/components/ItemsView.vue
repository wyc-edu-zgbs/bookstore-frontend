<template>
  <div class="item-container">
    <div class="result">
      <el-row
        v-for="product_row in product_rows"
        :key="product_row.map(x=>x.id).join()"
      >
        <el-col
          v-for="product in product_row"
          :key="product.id"
          :span="24/item_per_rows"
        >
          <ProductItem :product="product" />
        </el-col>
      </el-row>
    </div>
    <el-pagination
      @current-change="gotoPage"
      :current-page="pageNo"
      :page-size="1"
      layout="prev, pager, next, jumper"
      :total="totalPages"
    >
    </el-pagination>
  </div>
</template>

<script>
import ProductItem from './ProductItem.vue'

function chunk(a, n) {
  var ret = []
  for (var i = 0; i < a.length; i += n) {
    ret.push(a.slice(i, i + n))
  }
  return ret
}

export default {
  data() {
    return {
      item_per_rows: 4,
      totalPages: 1,
      product_rows: [],
      demo_products: {
        "pages": 12,
        "contents": [
          {
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
            "name": "光明共和国",
            "cover": "s33625558.jpg",
            "author": "[西]安德烈斯·巴尔瓦 ",
            "price": 46,
            "id": "d99a7170-b952-11eb-8bfc-f1ff82be21dd",
            "rating": 0.8
          },
          {
            "name": "往复书简：初恋与不伦",
            "cover": "s33668217.jpg",
            "author": "[日] 坂元裕二 ",
            "price": 42.0,
            "id": "d99a7171-b952-11eb-8bfc-f1ff82be21dd",
            "rating": 0.8
          }
        ]
      }
    }
  },
  components: {
    ProductItem
  },
  computed: {
    pageNo() {
      return parseInt(this.$route.query.p) || 1
    }
  },
  mounted() {
    this.showProducts(this.demo_products)
  },
  watch: {
    $route() {
      this.show()
    },
  },
  methods: {
    show() {
      this.product_rows = []
      // while (this.product_rows.length) {this.product_rows.pop()}
      this.$http.get("/api" + this.$route.fullPath)
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
    },
    showProducts(resp) {
      this.totalPages = resp.pages
      for (let i of chunk(resp.contents, this.item_per_rows)) {
        this.product_rows.push(i)
      }
    },
    gotoPage(p) {
      this.$router.push({
        path: this.$route.path,
        query: { ...this.$route.query, p: p }
      })
        .catch(() => { })
    }
  },
}
</script>

<style scoped>
.el-pagination {
  text-align: center;
}
.result {
  padding: 2% 3%;
  background: rgba(255, 255, 255, 0.5);
}
</style>
