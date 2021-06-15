<template>
  <div v-loading="is_loading">

    <el-main>

      <el-form>
        <el-row>
          <el-col :span="12">
            <el-form-item>
              <el-input v-model="q" placeholder="在此输入" />
            </el-form-item>
          </el-col>
          <el-col
            :span="3"
            :offset="1"
          >
            <el-form-item>
              <el-button
                type="primary"
                icon="el-icon-search"
                @click="update"
              >
                搜索
              </el-button>
            </el-form-item>
          </el-col>
          <el-col
            :span="3"
            :offset="1"
          >
            <el-form-item>
              <el-button
                type="primary"
                plain
                @click="q=''; update()"
              >
                查看全部会员
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-table
        :data="tableData"
        style="width: 100%"
        border
      >
        <el-table-column
          prop="email"
          label="邮箱"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="昵称"
        >
        </el-table-column>
      </el-table>

    </el-main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      is_loading: false,
      q: "",
      tableData: []
    }
  },
  mounted() {
    this.update()
  },
  methods: {
    update() {
      this.is_loading = true
      this.$http.get("/api/users?q=" + this.q)
        .then((response) => {
          this.tableData = response.data
        })
        .catch((error) => {
          console.log(error)
          this.$notify({
            title: 'Could not reach the API.',
            message: error
          })
        })
        .finally(() => this.is_loading = false)
    }
  }
}
</script>

<style>
</style>
