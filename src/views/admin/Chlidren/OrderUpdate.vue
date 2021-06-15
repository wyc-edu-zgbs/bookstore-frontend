<template>
  <el-container style="height: 100%; width: 100%; border: 0px">
    <el-header style="text-align: left; font-size: 20px; display: flex; justify-content: space-between;">
      <span style="color: black;font-size: 30px">所有订单</span>

      <el-checkbox
        class="emptytrash"
        v-model="pending_only"
        label="仅看未完成订单"
        @change="update"
        border></el-checkbox>
      <!--<el-button
        class="emptytrash"
        type="primary"
        plain
        @click.native="selectnew()"
      >
        <i class="el-icon-plus"></i><span>仅看未完成订单</span>
      </el-button>-->

    </el-header>

    <el-main>
      <el-table
        v-loading="is_loading"
        :data="order"
        height=666px
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}"
        :header-cell-style="{background:'rgba(58, 130, 119,0.7)',color:'white'}"
        :row-style="{height: '30px'}"
      >
        <el-table-column type="expand">
          <template slot-scope="scope">
            <!--        <el-form label-position="left" inline class="demo-table-expand">
        </el-form>-->
            <el-table
              :data='scope.row.items'
              style="width: 100%"
              :header-cell-style="{background:'rgba(58, 130, 119,0.7)',color:'white'}"
              :row-style="{height: '20px'}"
            >
              <el-table-column
                prop="name"
                label="图书名称"
              >
              </el-table-column>
              <el-table-column
                prop='price'
                label="价格"
              >
              </el-table-column>
              <el-table-column
                prop="count"
                label="数量"
              >
              </el-table-column>
              <el-table-column label='共计'>
                <template slot-scope="scope">
                  {{scope.row.price * scope.row.count | formatPrice}}
                </template>
              </el-table-column>

            </el-table>

            <el-divider></el-divider>

            <AddrItem
              class="addr"
              v-if="scope.row.address"
              :editable="false"
              :form="scope.row.address" />

            <el-divider></el-divider>

            <div class="right-button">
              <OrderButtonGroup
                :id="scope.row.id"
                :is_admin="true"
                :state="scope.row.state" />
            </div>
          </template>
        </el-table-column>

        <!--
            <el-table-column prop="id" label="订单id" @contextmenu.prevent="" width="300px"></el-table-column>
            -->

        <el-table-column label='预览'>
          <template slot-scope="scope">

            <el-row
              :gutter="20"
              style="margin-top:20px"
            >
              <el-col
                v-for="item in scope.row.items.slice(0,2)"
                :key=item.id
                :span="6"
              >
                <div>
                  <img
                    :src="item.cover | media2url"
                    width="40"
                    height="40"
                  >
                </div>

              </el-col>
              <el-col
                v-if='scope.row.items.length>2'
                :span="6"
              >
                <i
                  class="el-icon-more"
                  style="margin-top:10px;margin-left:10px"
                ></i>
              </el-col>

            </el-row>

            <!--
            <el-image v-for="item in scope.row.items.slice(0,3)" :key=item.cover :src="item.cover" width="40" height="40">
            </el-image>
            -->
          </template>
        </el-table-column>
        <el-table-column
          prop="user"
          label="用户"
        ></el-table-column>
        <el-table-column
          prop="time"
          label="下单时间"
        ></el-table-column>
        <el-table-column
          prop="state"
          label="订单状态"
        >
          <template slot-scope="scope">
            <span v-if='scope.row.state == 0'>待确认</span>
            <span v-if='scope.row.state == 1'>未付款</span>
            <span v-if='scope.row.state == 2'>未发货</span>
            <span v-if='scope.row.state == 3'>已发货</span>
            <span v-if='scope.row.state == 4'>已确认</span>
            <span v-if='scope.row.state == 255'>已取消</span>
          </template>

        </el-table-column>

        <el-table-column label="订单金额">
          <template slot-scope="scope">

            {{scope.row.items.map(x=>x.count*x.price).reduce((a,b)=>a+b, 0) | formatPrice}}
          </template>
        </el-table-column>

      </el-table>

    </el-main>

  </el-container>
</template>
<script>
import OrderButtonGroup from '../../../components/OrderButtonGroup.vue'
import AddrItem from '../../../components/AddrItem.vue'

export default {
  components: {
    OrderButtonGroup,
    AddrItem
  },
  data() {
    return {
      addr: {
        name: '张三',
        region: '北京市海淀区',
        detail: "北京航空航天大学",
        tel: "12345678910",
        adpca: ["11", "1101", "110108"],
      },
      is_loading: false,
      pending_only: false,
      key: "",
      options:
        [
          {
            value: 1,
            label: '已完成',
          },
          {
            value: 2,
            label: '待处理'
          },
          {
            value: 3,
            label: '已取消'
          }

        ],
      order:
        [
          {
            "id": "001",
            "user": '00135',
            "time": "",
            "state": "1",
            items: [
            ]
          }

        ],
    }
  },
  mounted() {
    this.update()
  },
  methods:
  {
    update() {
      this.is_loading = true
      this.order = []
      this.$http.get("/api/orders?pending_only=" + this.pending_only)
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
    },
    goTo(path) {
      this.$router.replace(path);
    }
  }

}
</script>

<style scoped>
.addr {
  width: max-content;
  margin: auto;
}
</style>

<style >
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.right-button {
  text-align: right;
}
</style>
