<template>
  <el-card
    class="addr-card"
    shadow="hover"
  >
    <div class="addr-header">
      <i class="el-icon-user-solid"></i>
      <span class="text-wrapper"> {{form.name}} </span>
      <el-button
        v-if="!form.isDef"
        type="text"
        class="de-button"
      > 设为默认地址</el-button>
      <el-tag
        v-else
        type="warning"
        style=" margin:-3%;float:right"
      >默认地址</el-tag>

    </div>

    <el-divider></el-divider>
    <p class="text-wrapper"><i class="el-icon-phone"></i> {{form.tel}}</p>
    <p class="text-wrapper"><i class="el-icon-location"></i> {{form.region+form.detail}}</p>

    <span v-if="editable">
      <el-divider></el-divider>

      <el-button
        class="addr-button"
        type="text"
        size="small"
      ><i class="el-icon-remove-outline"></i> 删除</el-button>

      <el-button
        type="text"
        class="addr-button"
        @click="dialogFormVisible = true"
        size="small"
      ><i class="el-icon-edit"></i> 修改</el-button>
    </span>

    <AddrDialog
      :visible.sync="dialogFormVisible"
      v-model="form"
    ></AddrDialog>

  </el-card>
</template>

<script>

import AddrDialog from "./AddrDialog"
const pca = require('../assets/pca.json')

export default {
  data() {
    return {
      form: {
        name: '张三',
        region: '北京市海淀区',
        detail: "北京航空航天大学",
        tel: "12345678910",
        adpca: ["11", "1101", "110108"],
        isDef: true,
      },
      pcaOptions: pca,
      addressProps: {
        label: 'name',
        children: 'children',
        value: 'code'
      },
      dialogFormVisible: false
    }
  },

  props: {
    editable: {
      default: true
    }
  },

  components: {
    AddrDialog
  },

  methods: {

  },
}
</script>
 
 <style scoped>
.addr-card {
  text-align: left;
  background: rgb(255, 255, 255);
  font-size: 0.9vw;
  margin: 3%;
  border-radius: 5%;
  border-width: 0.2vw;
  border-color: rgba(91, 155, 148, 0.3);
}
.addr-header {
  margin: -5% 0 2%;
  padding: 5%;
}

.addr-button {
  float: right;
  padding: 0;
  margin: 5%;
  padding: 2% 0;
}
.de-button {
  float: right;
  margin: -4% 0;
}
.el-divider {
  margin: 0;
}
.text-wrapper {
  word-break: break-all;
  word-wrap: break-word;
}
</style>
