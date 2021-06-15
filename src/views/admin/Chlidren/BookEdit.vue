<template>
  <el-container v-loading="is_loading">
    <el-card class="main" style="width:100%">
      <div>
        <el-upload
          class="avatar-uploader"
          action="/api/upload"
          :show-file-list="false"
          :on-success="handle_cover">
          <img v-if="book.cover" :src="book.cover | media2url" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

      </div >
      <div class="message" style="margin-top=10%">
         <div class="goods-item">
        <span>名称</span>
        <el-input
          type="text"
          placeholder="请输入内容"
          v-model="book.name"
          clearable
          style="width:350px"
        >
        </el-input>
      </div>
      <div class="goods-item">
        <span>ISBN</span>
        <el-input
          type="text"
          placeholder="请输入内容"
          v-model="book.isbn"
          clearable
          style="width:200px"
          :disabled="is_change"
        >
        </el-input>
      </div>
      <div class="goods-item">
        <span>分类</span>
        <el-cascader
          v-model="book.category"
          :options="categories"
          placeholder="请选择"></el-cascader>
      </div>
      <div class="goods-item">
        <span>价格</span>
        <el-input-number
          type="number"
          placeholder="请输入内容"
          v-model="book.price"
          :precision="2"
          :min="0.01"
          controls-position="right"
          clearable
          style="width:200px"
        >
        </el-input-number>
      </div>
      <div class="goods-item">
        <span>原价</span>
        <el-input-number
          type="number"
          placeholder="请输入内容"
          v-model="book.original_price"
          :precision="2"
          :min="0.01"
          controls-position="right"
          clearable
          style="width:200px"
        >
        </el-input-number>
      </div>
            <div class="goods-item">
        <span>作者</span>
        <el-input
          type="text"
          placeholder="请输入内容"
          v-model="book.author"
          clearable
          style="width:200px"
        >
        </el-input>
      </div>
            <div class="goods-item">
        <span>出版社</span>
        <el-input
          type="text"
          placeholder="请输入内容"
          v-model="book.press"
          clearable
          style="width:200px"
        >
        </el-input>
      </div>
      <div class="goods-item">
        <span>出版日期</span>
        <el-input
          type="text"
          v-model="book.date"
          clearable
          style="width:200px"
        >
        </el-input>
      </div>
      <div class="goods-item">
        <span>页数</span>
        <el-input-number
          type="number"
          v-model="book.pages"
          :min="0"
          controls-position="right"
          clearable
          style="width:200px"
        >
        </el-input-number>
      </div>
      <div class="goods-item">
        <span>评分</span>
        <el-input-number
          type="number"
          v-model="book.score"
          :precision="2"
          :max="10"
          :min="0"
          controls-position="right"
          clearable
          style="width:200px"
        >
        </el-input-number>
      </div>
      <div class="goods-item">
        <span>库存</span>
        <el-input-number
          type="number"
          v-model="book.stock"
          :min="0"
          controls-position="right"
          clearable
          style="width:200px"
        >
        </el-input-number>
      </div>
      <div class="goods-item">
        <span>描述</span>
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="book.description"
          clearable
          style="width:450px"
        >
        </el-input>
      </div>
      </div>
                     <div>
       <el-button type='plain' @click="change()" style='margin-right:0px;margin-top:50px;'>
           <span>保存信息
           </span>
       </el-button>
       <el-button type="danger" @click="delete_book" icon="el-icon-delete" v-if="is_change">
         下架
       </el-button>
      </div>
    </el-card>

      </el-container>





</template>
<script>
export default{
    methods:
    {
      update() {
        this.is_loading = true
        this.$http.get("/api/book/" + this.$route.params.id)
          .then((response) => {
            Object.assign(this.book, response.data)
            this.book.category = this.book.category.split(/,/)
            this.key = this.$route.params.id
          })
          .catch((error) => {
            console.log(error)
            this.$notify({
              title: 'Could not reach the API.',
              message: error
            })
          })
          .finally(() => this.is_loading = false)
      },
      handle_cover(response) {
        this.book.cover = response.id
      },
      change() {
        if (!this.book.cover) {
          this.$alert("请上传封面", "书籍封面")
          return
        }
        this.is_loading = true;
        (this.is_change ? this.$http.post : this.$http.put)("/api/book", this.book)
          .then((response) => {
            this.$message("成功")
            this.$router.go()
          })
          .catch((error) => {
            console.log(error)
            this.$notify({
              title: 'Could not reach the API.',
              message: error
            })
          })
          .finally(() => this.is_loading = false)
      },
      delete_book() {
        this.$confirm('确定下架?', '下架书籍', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.submitdel();
        });
      },
      submitdel() {
        this.is_loading = true;
        this.$http.delete("/api/book/" + this.$route.params.id)
          .then((response) => {
            this.$message("成功")
            this.$router.push("/")
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
    },
    mounted() {
      if (this.is_change) {
        this.update()
      }
    },
    data()
    {
        return {
          is_loading: false,
          is_change: Boolean(this.$route.params.id),
          categories: Object
          .entries(require('@/assets/categories.json'))
          .map(
            x=>({
              value: x[0],
              label: x[0],
              children: x[1].map(y=>({value: y, label: y}))
            })),
          category: [],
          book: {
            "name": "",
            "cover": "",
            "author": "",
            "press": "",
            "date": "",
            "stock": "",
            "pages": "",
            "price": "",
            "original_price": "",
            "isbn": "",
            "description": "",
            "score": ""
          },
        }
    }
}
</script>
<style scoped>
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: min-content;
  height: min-content;
}
.avatar-uploader:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
     .goods-item
     {
        padding: 10px;
        background-color:#fff;
        border-bottom: 1px solid #e0e0e0;
        display:flex;
        justify-content:space-between;
        align-items:center;
     }
     /*
          .goods-item
        height 50px
        padding 0 10px
        background-color #fff
        border-bottom: 1px solid #e0e0e0
        display flex
        justify-content space-between
        align-items center
        input
          border 1px solid #ccc
          outline none
          text-align right
          width 200px
          */
          </style>
