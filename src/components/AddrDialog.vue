<template>
  <el-dialog
    title="收货地址"
    :visible.sync="dialogFormVisible"
    width="30%"
    center
  >
    <el-form
      :model="form"
      label-width="25%"
      label-position="right"
    >
      <el-form-item label="收货人：">
        <el-input
          autocomplete="off"
          style="width:70%"
        ></el-input>
      </el-form-item>
      <el-form-item label="电话：">
        <el-input
          v-model="form.tel"
          autocomplete="off"
          style="width:70%"
        ></el-input>
      </el-form-item>
      <el-form-item label="地址：">
        <el-cascader
          v-model="form.adpca"
          :options="pcaOptions"
          :props="addressProps"
          @change="handleChange"
          ref="cascaderAddr"
          placeholder="请选择地址"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="详细地址：">
        <el-input
          v-model="form.detail"
          autocomplete="off"
          style="width:70%"
        ></el-input>
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button
        type="primary"
        @click="dialogFormVisible = false"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
const pca = require('../assets/pca.json')

export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        detail: "",
        tel: "",
        adpca: [],
        isDef: false,
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

  methods: {
    handleChange() {
      const addrNodes = this.$refs['cascaderAddr'].getCheckedNodes()
      this.form.region = (addrNodes[0].pathLabels[1] == "市辖区" || addrNodes[0].pathLabels[1] == "县") ?
        addrNodes[0].pathLabels[0] + addrNodes[0].pathLabels[2] : addrNodes[0].pathLabels.join("")
    },
  },
}
</script>