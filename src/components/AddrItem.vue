<template>
  <el-card
    class="addr-card"
    shadow="hover"
    v-loading="is_loading"
  >
    <div class="addr-header">
      <i class="el-icon-user-solid"></i>
      <span class="text-wrapper"> {{form.name}} </span>
      <span v-if="editable">
        <el-button
          v-if="!isDefault"
          type="text"
          class="de-button"
          @click="set_default"
        > 设为默认地址</el-button>
        <el-tag
          v-else
          type="warning"
          style=" margin:-3%;float:right"
        >默认地址</el-tag>
      </span>

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
        @click="remove"
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
      :addr="form"
      @updateaddr="updateaddr($event)"
    ></AddrDialog>

  </el-card>
</template>

<script>

import AddrDialog from "./AddrDialog"
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
      dialogFormVisible: false,
      is_loading: false
    }
  },

  props: {
    editable: {
      default: true
    },
    form: {},
    isDefault: {
      default: false
    }
  },

  components: {
    AddrDialog
  },

  methods: {
    updateaddr(e) {
      this.is_loading = true
      this.$http.post("/api/address", e)
        .then(() => this.$router.go())
        .catch((error) => {
          console.log(error)
          this.$notify({
            title: 'Could not reach the API.',
            message: error.response.data.detail || error.toString()
          })
        })
        .finally(() => this.is_loading = false);
    },
    remove() {
      this.is_loading = true
      this.$http.delete("/api/address/" + this.form.id)
        .then(() => this.$router.go())
        .catch((error) => {
          console.log(error)
          this.$notify({
            title: 'Could not reach the API.',
            message: error.response.data.detail || error.toString()
          })
        })
        .finally(() => this.is_loading = false);
    },
    set_default() {
      this.is_loading = true
      this.$http.post("/api/user", { default_address: this.form.id })
        .then(() => this.$router.go())
        .catch((error) => {
          console.log(error)
          this.$notify({
            title: 'Could not reach the API.',
            message: error.response.data.detail || error.toString()
          })
        })
        .finally(() => this.is_loading = false);
    }
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
  max-height: min-content;
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
  word-break: break-all !important;
  word-wrap: break-word !important;
}
</style>
