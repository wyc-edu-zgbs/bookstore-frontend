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
                    <i class="el-icon-edit"></i><span>修改图片</span>
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
          "count": 7,
          "id": "ad727512-bd80-11eb-a8b8-c1e635d27859",
          "name": "寻找《局外人》",
          "cover": "s33658199.jpg",
          "author": "[美]爱丽丝·卡普兰 ",
          "press": "新星出版社 ",
        "subtitle": "加缪与一部文学经典的命运 ",
        "date": "2020-6 ",
        "stock": 5,
        "pages": 360,
          "price": 98.0,
        "description": "\n一部传记作品，主人公是一本书 推理小说一般的文学史 饱含勇气、美德与爱的冒险故事 2016年美国国家图书奖作品 为文学史不朽之作《局外人》作传，再现一部伟大文学经典的生命历程 出版七十八年，作者去世六十年，《局外人》仍稳居法语文学累积销量榜首。这本薄薄的小说被翻译成六十多种语言，仅在法国就卖出上千万册。 《局外人》如何写作、出版，又如何撼动世界，影响一代代读者？本书以《局外人》的生命历程为主线，讲述一个饱含勇气、美德与爱的冒险故事。  寻觅为无数人所倾倒的明星作家——阿尔贝·加缪早年创作踪迹 这部石破天惊的小说发表时，加缪只有二十六岁，一个从阿尔及尔贫民窟中走出的年轻人如何从自身“发现”了这本书？文学的师承、思想的成长、技巧的练习、素材的准备，以及动机的触发，通过详尽书信、笔记和历史资料，呈现“创作”这一神秘活动的有迹可循。 法国出版史上的至暗时刻，文学界的抵抗运动 1942年，巴黎处于纳粹占领之下，法国出版界风雨飘摇，伽利玛如何能在动荡时刻突破重重困难使《局外人》得以出版？哪些富有洞见和行动力的关键人物起了推动作用？ 为全面理解《局外人》提供新的线索 七十八年来，对《局外人》的解读、批评、改编、演绎，从未停止，不变的是，它仍令人困惑不解、坐立难安。本书亦是对《局外人》的文学批评的历史，展现对一部文学经典的理解的代际差异与演变。 当代文学对何谓“好文字”的探索和颠覆 《局外人》那简单和冷漠的语言令人着迷。本书通过详述著名作家、日后成为法国文化部长的安德烈·马尔罗对手稿的修改，著名哲学家和文学家让-保罗·萨特对《局外人》的重要评论，以及《局外人》被首次翻译成英语时的逸闻等，再现当代文学对何谓“好文字”的不断叩问和重新界定。\n爱丽丝·卡普兰（Alice Kaplan），耶鲁大学法语系主任，耶鲁大学“约翰·穆瑟”教授；曾任杜克大学文学及历史教授，为杜克大学法语研究中心创始主任。主要研究领域为二十世纪法国文学、法国文化研究、翻译理论与实践、自传与传记等，她在耶鲁大学开设的本科课程包括讲授加缪、普鲁斯特的文学作品等。 卡普兰15岁时第一次读《局外人》，也是她读的第一部法语小说，她说：“《局外人》是我命中之书。”",
        "rating": " 9.1 "
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