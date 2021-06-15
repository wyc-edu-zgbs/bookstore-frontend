<template>
  <el-container>
    <h1>
      <i class="el-icon-s-order"></i>
      订单结算
    </h1>
    <!--   <el-container>-->
    <p>
      <el-tag>请选择收货地址</el-tag>
    </p>

    <el-radio-group
      v-model="addr"
      v-if="addresses.addresses.length"
      v-loading="addr_loading"
    >
      <el-row>
        <el-col
          :span="6"
          v-for="addr in addresses.addresses"
          :key="addr.id"
        >
          <el-radio :label="addr.id">
            <AddrItem
              :form="addr"
              :isDefault="addr.id == addresses.default"
              :editable="false"
            ></AddrItem>
          </el-radio>
        </el-col>

      </el-row>
    </el-radio-group>
    <el-alert
      v-else
      title="收货地址为空"
      :closable="false"
      type="warning"
      show-icon>
      请
      <router-link to="/personinfo/addr">
        添加收货地址
      </router-link>
    </el-alert>
    <!--  </el-container>-->
    <el-header></el-header>
    <p>
      <el-tag>请核对商品</el-tag>
    </p>
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
          共计:
          {{order.price | formatPrice}}
        </span>
        <!-- <el-divider direction="vertical"></el-divider> -->
        <el-button
          class="check-button"
          type="text"
          plain
          @click="pay()"
          :disabled="addr == ''"
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
          if (response.data.default) {
            this.addr = response.data.default
          }
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
        address: this.addr
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
      addr: "",
      order: {
        price: 0.0,
        items: [ ]
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
  margin: 0 0 0 80%;
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
  z-index: 1500;
}
.el-radio {
  width: 100%;
  text-overflow: ellipsis;
  white-space: normal;
}
.el-header {
  height: 1vh !important;
}
</style>
