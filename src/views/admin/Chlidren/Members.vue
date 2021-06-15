<template>
  <div>

    <el-main>

      <el-form>
        <el-row>
          <el-col :span="12">
            <el-form-item>
              <el-input placeholder="在此输入" />
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
          prop="name"
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
      tableData: [{
        email: '123456@qq.com',
        name: 'zhangsan',
      },]
    }
  }
}
</script>

<style>
</style>