<template>
  <div
    v-loading="is_loading"
    class="book-container"
    :key="key"
    v-if="key"
  >
      <el-row
        type="flex"
        justify="space-around"
      >

      <el-col
        :span="7"
        :offset="1"
      >
        <img
          :src="book.cover | media2url"
          class="book-img"
        />
      </el-col>

      <el-col :span="12">
        <div class="book-hd">
          <h1>
            {{book.name}}
          </h1>
        </div>

        <div class="book-publish">
          <p>作者：
          <router-link :to="'/search?q='+book.author">
            <span class="book-search">{{book.author}}</span>
          </router-link>
          </p>
          <p>出版社：
          <router-link :to="'/search?q='+book.press">
            <span class="book-search">{{book.press}}</span>
          </router-link>
          <span style="margin-right:24px;" /> 出版时间：{{book.date}}</p>
          <p> ISBN：{{book.isbn}}</p>
        </div>

        <div class="book-price">
          <p>抢购价 </p>
          <p> <span class="new-price">{{book.price | formatPrice}}</span>
            <span class="book-rate">{{book.rating}}折</span>
          </p>
          <p>定价
            <span class="old-price">{{book.original_price | formatPrice}}</span>
          </p>
        </div>

        <div v-if="$cookies.get('role')=='admin'">
          <div class="button">
            <router-link :to="'/admin'+$route.path">
              <el-button type="danger" icon="el-icon-edit">
                编辑
              </el-button>
            </router-link>
          </div>
        </div>
        <div v-else>
          <div class="book-num">
            <p>数量：
              <el-input-number
                v-model="buyNum"
                size="small"
                :min="1"
                :max="book.stock"
              ></el-input-number>
              （库存{{book.stock}}件）
            </p>
          </div>
          <div class="button">
            <el-button type="danger" @click="add_to_cart">
              <i class="el-icon-shopping-cart-2"></i> 加入购物车</el-button>
            <!--
            <el-button
              type="danger"
              plain
            ><i class="el-icon-goods"></i> 立即购买</el-button>
            -->
          </div>
        </div>
      </el-col>
    </el-row>

    <el-tabs class="book-card">
      <el-tab-pane label="图书详情">
        <span class="dep">开 本：16开 </span>
        <span class="dep">纸 张：胶版纸</span>
        <span class="dep"> 包 装：平装-胶订</span>
        <p>
          <el-tag plain><i class="el-icon-reading"></i> 图书简介</el-tag>
        </p>
        <p>{{book.description}}</p>
      </el-tab-pane>
      <el-tab-pane label="图书评论" lazy>
        <iframe
          class="comment"
          frameborder="0"
          :src="'/comment/comment/'+book.id"
          onload="javascript:(function(o){console.log('load');o.style.height=o.contentWindow.document.body.scrollHeight+'px';}(this));"
          ></iframe>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      key: "",
      is_loading: true,
      book: {
        "name": "寻找《局外人》",
        "cover": "s33658199.jpg",
        "author": "[美]爱丽丝·卡普兰 ",
        "press": "新星出版社 ",
        "date": "2020-6 ",
        "stock": 5,
        "pages": 360,
        "price": 68.00,
        "isbn": "9787513333733 ",
        "description": "description",
        "rating": " 9.1 "
      },
      buyNum: 1
    }
  },
  components: {
  },
  computed: {
    getPrice: function () {
      return (this.book.price * this.book.rating * 0.1).toFixed(1)
    }
  },
  mounted() {
    this.update()
  },
  watch: {
    $route(to) {
      console.log(to)
      this.update()
    },
  },
  methods: {
    add_to_cart() {
      console.log("add", this.book.id, this.buyNum)
      this.$http.put("/api/cart", {id: this.book.id, count: this.buyNum})
        .then((response) => {
          this.$message("add success")
        })
        .catch((error) => {
          console.log(error)
          this.$notify({
            title: 'Could not reach the API.',
            message: error
          })
        })
        .finally(() => this.update())
    },
    update() {
      this.is_loading = true
      this.$http.get("/api/book/" + this.$route.params.id)
        .then((response) => {
          //Object.assign(this.book, response.data)
          this.book = response.data
          this.key = this.$route.params.id
        })
        .catch((error) => {
          console.log(error)
          this.$notify({
            title: 'Could not reach the API.',
            message: error
          })
        })
        .finally(() => this.is_loading = false)
    }
  },
}
</script>

<style scoped>
iframe.comment {
  width: 100%;
}

.book-container {
  padding: 3%;
}

.book-img {
  float: left;
  position: relative;
  padding: 8% 0 0 0;
  max-width: 100%;
  max-height: 100%;
}

.book-hd {
  font-size: 100%;
  font-weight: 700;
}

.book-subtitle {
  font-size: 100%;
}
.book-publish {
  font-size: 70%;
}

.book-search {
  cursor: pointer;
  color: rgb(116, 115, 221);
}

.book-price {
  padding: 1% 3%;
  background-color: rgba(247, 244, 244, 0.7);
  color: rgb(139, 134, 134);
  font-size: 80%;
}

.new-price {
  line-height: 90%;
  color: #ff0036;
  font-family: Arial;
  font-size: 260%;
  font-weight: bold;
  padding: 0.5% 3% 0% 0;
}

.book-rate {
  font-size: 55%;
  background: #fa2554f6;
  color: white;
  padding: 0.5% 1%;
  text-align: center;
}

.old-price {
  text-decoration: line-through;
}

.book-num {
  margin: 5% 0;
  font-size: 80%;
}

.button {
  margin: 5% 0;
}

.book-card {
  padding: 5%;
}
.dep {
  font-size: 80%;
  padding-right: 8vw;
}
</style>
