<template>
  <el-form @submit.native.prevent="goSearch()">

    <el-row>
      <el-col :span="5">
        <div class="logo"><img
            src="../assets/mylogo.png"
            width="55%"
            class="img"
          ></div>
      </el-col>

      <el-col
        :span="9"
        :offset="6"
      >
        <el-form-item>
          <el-input
            placeholder="在此输入"
            v-model="query"
            class="it"
          />
        </el-form-item>
      </el-col>
      <el-col
        :span="3"
        :offset="3"
      >
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="goSearch()"
            :disabled="query.length == 0"
          >
            搜索
          </el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      query: this.text
    }
  },
  props: {
    text: {
      type: String,
      default: ""
    }
  },
  methods: {
    goSearch() {
      if (this.query.length) {
        this.$router
          .push({ path: "/search", query: { q: this.query } })
          .catch(() => { })
      }
    },
  }
}
</script>

<style scoped>
.el-form {
  text-align: center;
  padding: 5% 0;
}

.logo {
  position: absolute;
}

.img {
  margin-top: -17%;
  margin-right: 20%;
}
.el-button {
  height: 45px;
}

.it >>> .el-input__inner {
  height: 45px;
  width: 136%;
  border-color: rgb(58, 130, 119);
  border-width: 2px;
  font-size: 18px;
}
.it >>> .el-input__inner:hover {
  border-color: rgb(58, 130, 119);
}
</style>


