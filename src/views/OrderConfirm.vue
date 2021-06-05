<template>
  <el-container>
    <h1>
      <i class="el-icon-s-order"></i>
      订单结算
    </h1>
    <!--   <el-container>-->
    <p>
      请选择收货地址
    </p>

    <el-row v-loading="addr_loading">
      <el-col
        :span="8"
        v-for="addr in addresses.addresses"
        :key="addr.id"
        >
        <AddrItem
          :form="addr"
          :isDefault="addr.id == addresses.default"
          :editable="true"
          ></AddrItem>
      </el-col>
    </el-row>

    <!--  </el-container>-->
    <el-header>
      <span>
        请核对商品
      </span>
    </el-header>
    <el-table
      stripe
      ref="table"
      v-loading="is_loading"
      :data="order.items"
      height="400"
      :header-cell-style="{background:'rgba(58, 130, 119,0.7)',color:'white'}"
      :row-style="{height: '40px'}"
    >
      <!--这里不知道要不要把商品名单大小写死-->
      <el-table-column>
        <template v-slot:default="scope">
          <el-image
            class="cart-cover"
            :src="scope.row.cover | media2url"
            fit="contain"
            lazy
            style="width:60px;height:80px"
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
      <el-table-column label="数量" prop="count">
      </el-table-column>
      <el-table-column label="合计">
        <template slot-scope="scope">
          {{scope.row.price * scope.row.count | formatPrice}}
        </template>
      </el-table-column>
    </el-table>

    <div>

      <el-card
        shadow="always"
        class="card-foot"
      >
        <span>
          寄送至：xx省xx市xx区 xxx
          收件人：xxx
        </span>
        <span>
          共计:
          {{order.price | formatPrice}}
        </span>
        <!-- <el-divider direction="vertical"></el-divider> -->
        <el-button
          class="check-button"
          type="text"
          plain
          @click="pay()"
        >去支付</el-button>
      </el-card>

    </div>

  </el-container>

</template>


<script>

import AddrItem from '../components/AddrItem.vue'
export default {
  components: {
    AddrItem
  },
  methods: {
    update() {
      this.is_loading = true
      this.addr_loading = true
      this.$http.get("/api/order/" + this.$route.params.id)
        .then((response) => {
          this.order = response.data
        })
        .catch((error) => {
          console.log(error)
          this.$notify({
            title: 'Could not reach the API.',
            message: error
          })
        })
        .finally(() => this.is_loading = false)
      this.$http.get("/api/address")
        .then((response) => {
          this.addresses = response.data
        })
        .catch((error) => {
          console.log(error)
          this.$notify({
            title: 'Could not reach the API.',
            message: error
          })
        })
        .finally(() => this.addr_loading = false)
    },
    pay() {
      this.is_loading = true
      var data = {
        id: this.$route.params.id,
        state: 1,
        address: "<uuid>"
      }
      this.$http.post("/api/order", data)
        .then((response) => {
          this.$router.push("/pay/"+data.id)
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
      addr_loading: true,
      addresses: {
        default: "",
        addresses: []
      },
      order: {
        price: 123.45,
        items: [
          {
            "count": 7,
            "id": "ad727512-bd80-11eb-a8b8-c1e635d27859",
            "name": "寻找《局外人》",
            "cover": "s33658199.jpg",
            "price": 98.0
          },
          {
            "count": 9,
            "id": "ad727513-bd80-11eb-a8b8-c1e635d27859",
            "name": "不要和你妈争辩",
            "cover": "s33610259.jpg",
            "price": 39.8
          },
          {
            "count": 5,
            "id": "ad727514-bd80-11eb-a8b8-c1e635d27859",
            "name": "鞋带",
            "cover": "s33601424.jpg",
            "price": 45
          },
          {
            "count": 6,
            "id": "ad727515-bd80-11eb-a8b8-c1e635d27859",
            "name": "正常人",
            "cover": "s33684681.jpg",
            "price": 49.8
          },
          {
            "count": 9,
            "id": "ad727516-bd80-11eb-a8b8-c1e635d27859",
            "name": "光明共和国",
            "cover": "s33625558.jpg",
            "price": 46
          },
          {
            "count": 2,
            "id": "ad727517-bd80-11eb-a8b8-c1e635d27859",
            "name": "往复书简：初恋与不伦",
            "cover": "s33668217.jpg",
            "price": 42.0
          }
        ]
      }
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

  overflow: hidden;
  width: 100%;
  position: fixed;
  bottom: 0;
}
.check-button {
  margin: 0 0 0 67%;
  padding: 1.5%;
  width: 10%;
  min-width: min-content;
  font-size: 130%;
  background-color: white;
}
.card-foot {
  margin: 0%;
  padding: 0 2%;
  background-color: rgba(58, 130, 119);
  color: white;
  overflow: hidden;
  width: 70.3%;
  position: fixed;
  bottom: 0;
}
</style>
