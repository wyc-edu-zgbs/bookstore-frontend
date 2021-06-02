<template>
  <div v-loading="is_loading" >
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

      <span id="stitle">最多可创建9个收货地址</span>
    </el-header>

    <el-main>
      <AddrItem v-for="k in [1,2,3]" :key="k"></AddrItem>
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
      is_loading: false
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
}
#title {
  font-weight: bold;
  font-size: 130%;
  color: rgb(58, 130, 119);
}
#stitle {
  color: rgb(8, 46, 25);
  padding: 0 3%;
}
</style>
