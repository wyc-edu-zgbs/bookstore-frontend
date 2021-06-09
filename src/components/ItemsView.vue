<template>
  <div class="item-container">
    <el-radio-group
      v-model="sort_key"
      @change="selectSort"
      id="radio"
      fill="grey"
    >
      <el-radio-button label="default">默认排序</el-radio-button>
      <el-radio-button label="price_desc">价格 <i class="el-icon-bottom"></i></el-radio-button>
      <el-radio-button label="price_asc">价格 <i class="el-icon-top"></i></el-radio-button>
      <el-radio-button label="rating_desc">评分 <i class="el-icon-bottom"></i></el-radio-button>
      <el-radio-button label="rating_asc">评分 <i class="el-icon-top"></i></el-radio-button>
      <el-radio-button label="sold_desc">销量 <i class="el-icon-bottom"></i></el-radio-button>
      <el-radio-button label="sold_asc">销量 <i class="el-icon-top"></i></el-radio-button>
    </el-radio-group>
    <div class="result">
      <div
        v-if="product_rows.length"
        :key="$route.fullPath"
      >
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
      <div v-else class="empty-result">暂无结果</div>
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
      sort_key: this.$route.query.sort || "default",
      item_per_rows: 4,
      totalPages: 1,
      product_rows: [],
      is_loading: true,
      demo_products: {
        "pages": 0,
        "content": [
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
    this.show()
  },
  watch: {
    $route() {
      this.show()
    },
  },
  methods: {
    show() {
      this.is_loading = true;
      this.product_rows = []
      // while (this.product_rows.length) {this.product_rows.pop()}
      this.$http.get("/api" + this.$route.fullPath)
        .then((response) => {
          this.showProducts(response.data)
          console.log(this.product_rows)
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
    showProducts(resp) {
      this.totalPages = resp.pages
      for (let i of chunk(resp.content, this.item_per_rows)) {
        this.product_rows.push(i)
      }
    },
    selectSort() {
      this.$router.push({
        path: this.$route.path,
        query: { ...this.$route.query, p: 1, sort: this.sort_key }
      })
        .catch(() => { })
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
.empty-result {
  text-align: center;
  margin: 1cm;
}
.el-radio-group {
  margin: 1vh 0 0 1vw;
}
#radio >>> .el-radio-button__inner {
  background-color: rgba(247, 244, 244, 0.7);
}
.el-pagination {
  text-align: center;
}
.result {
  padding: 2% 0;
  background: rgba(255, 255, 255, 0.5);
}
</style>

