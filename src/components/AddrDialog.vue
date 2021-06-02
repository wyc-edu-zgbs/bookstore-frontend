<template>
  <el-dialog
    title="收货地址"
    :visible="visible"
    @update:visible="close_dialog()"
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
          v-model="form.name"
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
      <el-button @click="close_dialog">取消</el-button>
      <el-button
        type="primary"
        @click="$emit('updateaddr', form); close_dialog()"
        >
      确定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
const pca = require('../assets/pca.json')

export default {
  data() {
    return {
      pcaOptions: pca,
      addressProps: {
        label: 'name',
        children: 'children',
        value: 'code'
      },
      dialogFormVisible: this.visible,
      form: this.deepcopy(this.addr)
    }
  },
  props: {
    addr: {
    },
    visible: {
      default: false
    }
  },
  watch: {
  },
  methods: {
    close_dialog() {
      this.form = this.deepcopy(this.addr)
      this.$emit("update:visible", false)
    },
    handleChange() {
      const addrNodes = this.$refs['cascaderAddr'].getCheckedNodes()
      this.form.region = (addrNodes[0].pathLabels[1] == "市辖区" || addrNodes[0].pathLabels[1] == "县") ?
        addrNodes[0].pathLabels[0] + addrNodes[0].pathLabels[2] : addrNodes[0].pathLabels.join("")
    },
    deepcopy(x) {
      return JSON.parse(JSON.stringify(x))
    }
  },
}
</script>
