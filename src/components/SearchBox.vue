<template>
  <el-form @submit.native.prevent="goSearch()">

    <el-row>
      <el-col :span="5">
        <div class="logo"><img
            src="../assets/bread.png"
            alt="bread"
            width="70%"
            class="img"
          ></div>
      </el-col>

      <el-col
        :span="9"
        :offset="7"
      >
        <el-form-item>
          <el-input
            placeholder="Search"
            v-model="query"
          />
        </el-form-item>
      </el-col>
      <el-col :span="3">
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="goSearch()"
            :disabled="query.length == 0"
          >
            Search
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
  margin-top: -20%;
}
</style>
