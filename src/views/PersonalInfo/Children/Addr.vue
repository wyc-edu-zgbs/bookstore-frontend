<template>
  <div>
    <el-header>
      <span id="title">收货地址管理</span>
      <el-button
        class="add"
        type="primary"
        icon="el-icon-plus"
      >
        新增收货地址
      </el-button>
    </el-header>

    <el-main>
      <el-row>
        <el-col :span="8">
          <AddrItem />
        </el-col>
        <el-col :span="8">
          <AddrItem />
        </el-col>
        <el-col :span="8">
          <AddrItem />
        </el-col>
        <el-col :span="8">
          <AddrItem />
        </el-col>
      </el-row>

    </el-main>
  </div>
</template>

<script>

import AddrItem from '../../../components/AddrItem.vue'
export default {
  components: {
    AddrItem
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