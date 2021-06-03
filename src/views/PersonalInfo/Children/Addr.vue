<template>
  <div v-loading="is_loading">
    <el-header>
      <span id="title">收货地址管理</span>
      <el-button
        class="add"
        type="primary"
        icon="el-icon-plus"
        @click="new_addr_diag_visible = true"
      >
        新增收货地址
      </el-button>

      <AddrDialog
        :visible.sync="new_addr_diag_visible"
        :addr="empty_addr"
        @updateaddr="new_addr($event)"
      >
      </AddrDialog>
    </el-header>

    <el-main>
      <el-row>
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
    </el-main>
  </div>
</template>

<script>

import AddrItem from '../../../components/AddrItem.vue'
import AddrDialog from '../../../components/AddrDialog.vue'

export default {
  data() {
    return {
      empty_addr: {
        name: '',
        region: '',
        detail: "",
        tel: "",
        adpca: ["", "", ""],
      },
      new_addr_diag_visible: false,
      is_loading: false,
      addresses: {
        default: "028bdac0-c371-11eb-a887-757050c39c90",
        addresses: [
          {
            id: "028bdac0-c371-11eb-a887-757050c39c90",
            name: '张三',
            region: '北京市海淀区',
            detail: "北京航空航天大学",
            tel: "12345678910",
            adpca: ["11", "1101", "110108"],
          },
          {
            id: "128bdac0-c371-11eb-a887-757050c39c90",
            name: '张三',
            region: '北京市海淀区',
            detail: "北京航空航天大学",
            tel: "12345678910",
            adpca: ["11", "1101", "110108"],
          },
          {
            id: "228bdac0-c371-11eb-a887-757050c39c90",
            name: '张三',
            region: '北京市海淀区',
            detail: "北京航空航天大学",
            tel: "12345678910",
            adpca: ["11", "1101", "110108"],
          },
          {
            id: "528bdac0-c371-11eb-a887-757050c39c90",
            name: '张三',
            region: '北京市海淀区',
            detail: "北京航空航天大学",
            tel: "12345678910",
            adpca: ["11", "1101", "110108"],
          },
        ]
      }
    }
  },
  components: {
    AddrItem,
    AddrDialog
  },
  methods: {
    new_addr(e) {
      this.is_loading = true
      console.log(e)
      setTimeout(this.$router.go, 1)
    }
  }
}

</script>
 
 <style scoped>
.add {
  float: right;
  margin: -1% 0;
}
.el-header {
  padding: 2%;
  background-color: rgba(91, 155, 148, 0.3);
}

.el-main {
  background-color: white;
  padding: 1%;
}
#title {
  font-weight: bold;
  font-size: 130%;
  color: rgb(58, 130, 119);
}
</style>
