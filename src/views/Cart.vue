<template>
  <div>
    <h1>
      <i class="el-icon-shopping-cart-2"></i>
      购物车
    </h1>
    <div>
      <el-table
        class="cart-table"
        stripe
        ref="table"
        :data="items"
        :header-cell-style="{background:'rgba(58, 130, 119,0.7)',color:'white'}"
        @selection-change="(x)=>{this.selection=x}"
        v-loading="is_loading"
      >
        <el-table-column type="selection" />
        <el-table-column>
          <template v-slot:default="scope">
            <el-image
              class="cart-cover"
              :src="scope.row.cover | media2url"
              fit="contain"
              lazy
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="图书信息"
        ></el-table-column>
        <el-table-column label="单价">
          <template v-slot:default="scope">
            {{scope.row.price | formatPrice}}
          </template>
        </el-table-column>
        <el-table-column label="数量">
          <template v-slot:default="scope">
            <el-input-number
              v-model="scope.row.count"
              :min="1"
              size="small"
              @change="(curval)=>change_count(scope.row, curval)"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="合计">
          <template slot-scope="scope">
            {{scope.row.price * scope.row.count | formatPrice}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot:default="scope">
            <el-button
              size="small"
              type="danger"
              @click.native.prevent="change_count(scope.row, 0)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div>
      <el-card
        shadow="always"
        class="cart-footer-right"
      >
        <span>已选择: {{selection.length}} 件</span>
        <el-divider direction="vertical"></el-divider>
        <span>
          共计:
          {{selection.map(x=>x.count*x.price).reduce((a,b)=>a+b, 0) | formatPrice}}
        </span>
        <!-- <el-divider direction="vertical"></el-divider> -->
        <el-button
          class="check-button"
          type="text"
          plain
          @click="checkout()"
        >结 算</el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    change_count(row, count) {
      console.log("chg", row.id, count)
      this.$http.post("/api/cart", {id: row.id, count: count})
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
      this.items = []
      this.$http.get("/api/cart")
        .then((response) => {
          this.items = response.data
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
  mounted() {
    this.update()
  },
  data() {
    return {
      is_loading: true,
      selection: [],
      items: []
    }
  }
}
</script>

<style scoped>
.cart-cover {
  height: 100px;
}

.cart-footer-right {
  margin: 2% 0;
  padding: 0 2%;
  background-color: rgba(58, 130, 119, 0.7);
  color: white;
}

.check-button {
  margin: 0 0 0 67%;
  padding: 1.5%;
  width: 10%;
  font-size: 130%;
  background-color: white;
}
.cart-table >>> .el-checkbox__inner {
  border-color: rgba(58, 130, 119, 0.7);
  width: 16px;
  height: 16px;
}
</style>



