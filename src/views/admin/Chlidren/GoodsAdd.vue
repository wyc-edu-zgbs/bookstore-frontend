<template>
  <el-container>
    <el-card class="main" style="width:100%">
      <div>
        <el-avatar
          class="bigpic"
          :size="200"
          :src="book.cover | media2url"
          style="margin-right: 20px"
        ></el-avatar>
            <el-button @click.native="changepic()" class="changepic" type="info" plain>
                    <i class="el-icon-edit"></i><span>上传图片</span>
            </el-button>
    

      </div>
      <div class="message">
        <span          clearable
          style="width:350px;height:50px">ID: {{book.id}}</span>

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
    <!--
      <div class="goods-item">
        <span>分类</span>
        <el-select v-model="book.category" placeholder="请选择">
          <el-option
           v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          </el-option>
        </el-select>
      </div>
      -->
      <div class="goods-item">
        <span>价格</span>
        <el-input
          type="number"
          placeholder="请输入内容"
          v-model="book.price"
          clearable
          style="width:100px"
        >
        </el-input>
      </div>
            <div class="goods-item">
        <span>作者</span>
        <el-input
          type="text"
          placeholder="请输入内容"
          v-model="book.author"
          clearable
          style="width:100px"
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
          style="width:100px"
        >
        </el-input>
      </div>
            <div class="goods-item">
        <span>副标题</span>
        <el-input
          type="text"
          placeholder="请输入内容"
          v-model="book.subtitle"
          clearable
          style="width:100px"
        >
        </el-input>
      </div>
      <div class="goods-item">
        <span>库存</span>
        <el-input
          type="number"
          placeholder="请输入库存"
          v-model="book.stock"
          clearable
          style="width:100px"
        >
        </el-input>
      </div>
      <div class="goods-item">
        <span>描述</span>
        <el-input
          type="text"
          placeholder="请输入内容"
          v-model="book.description"
          clearable
          style="width:450px"
        >
        </el-input>
      </div>
      </div>
                     <div>
       <el-button type='plain' @click="saveGoodsInfo()" style='margin-right:0px;margin-top:50px;'>
           <span>保存信息
           </span>
           </el-button>
      </div>
    </el-card>

      </el-container>





</template>
<script>
export default{
    methods:
    {
        saveGoodsInfo()
        {

        }
        ,
         changepic() {
            var that = this;
            this.$http.get('',
                {headers:{token:this.token}}
            ).then(()=>{
                that.$message({
                    message: '修改成功',
                    type: 'success'
                });
                that.reload();
            }).catch(function(error){
                console.log(error);
            })
         }
        
    },
    data()
    {
        return{
        book: 
        {
        
        },
        
        }
    }
}
</script>
<style scoped>
     .goods-item
     {
        height:50px;
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