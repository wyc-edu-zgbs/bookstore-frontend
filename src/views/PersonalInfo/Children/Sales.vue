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
        @click.native="selectnew()"
        type="primary"
        plain
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
          prop="time"
          label="下单时间"
        ></el-table-column>
        <el-table-column
          prop="state"
          label="订单状态"
        >
          <template slot-scope="scope">
            <span v-if='scope.row.state == 1'>已完成 </span>
            <span v-if='scope.row.state == 2'>未发货 </span>
            <span v-if='scope.row.state == 3'>已取消 </span>
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
export default {
  data() {
    return {
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
          { "id": "001",
            "time": "2021-05-08 23:55",
            "state": "1",
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
              }
            ]
          },
          { "id": "002",
            "time": "2021-05-08 23:55",
            "state": "1",
            items: [
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
        ]
    }
  },
  methods: {
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
  }

}
</script>

<style >
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
</style>
