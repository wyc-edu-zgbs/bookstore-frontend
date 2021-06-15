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
      :rules="rules"
      ref="form"
      status-icon
      label-width="25%"
      label-position="right"
    >
      <el-form-item
        label="收货人："
        prop="name"
      >
        <el-input
          v-model="form.name"
          autocomplete="off"
          style="width:70%"
          maxlength="10"
          placeholder="请输入姓名，限10字以内"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="电话："
        prop="tel"
      >
        <el-input
          v-model="form.tel"
          autocomplete="off"
          style="width:70%"
          maxlength="15"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="地址："
        prop="adpca"
      >
        <el-cascader
          v-model="form.adpca"
          :options="pcaOptions"
          :props="addressProps"
          @change="handleChange"
          ref="cascaderAddr"
          placeholder="请选择地址"
        ></el-cascader>
      </el-form-item>
      <el-form-item
        label="详细地址："
        prop="detail"
      >
        <el-input
          v-model="form.detail"
          autocomplete="off"
          style="width:80%"
          maxlength="20"
          placeholder="请输入地址，限20字以内"
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
        @click="updateaddr"
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
      form: this.deepcopy(this.addr),
      rules: {
        name: [
          { required: true, message: "请输入姓名" },
        ],
        tel: [
          { required: true, message: "请输入电话" },
        ],
        adpca: [
          { required: true, message: "请选择地址" },
        ],
        detail: [
          { required: true, message: "请输入详细地址" },
        ]
      }
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
    updateaddr() {
      console.log("update")
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('updateaddr', this.form)
        } else {
          this.$message("invalid input")
          return false
        }
      })
    },
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
