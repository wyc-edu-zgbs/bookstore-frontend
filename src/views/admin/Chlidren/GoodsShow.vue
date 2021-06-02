<template>
    <el-container style="height: 100%; width: 100%; border: 0px">
        <el-header style="text-align: left; font-size: 20px; display: flex; justify-content: space-between;">
            <span style="color: black;font-size: 30px">所有商品</span>
            <el-button class="emptytrash" type="success" @click.native="goTo('/admin/goodsadd')">
                <i class="el-icon-plus"></i><span>添加商品</span>
            </el-button>

        </el-header>

        <el-main>
        <el-table :data="book" height=666px style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" 
                :header-cell-style="{background:'rgba(58, 130, 119,0.7)',color:'white'}"
                :row-style="{height: '30px'}">
            
            <el-table-column prop="id" label="商品id" @contextmenu.prevent="" width="300px"></el-table-column>
            <el-table-column prop="name" label="商品名称" ></el-table-column>
            <el-table-column prop="stock" label="商品库存" ></el-table-column>   
            <el-table-column prop="price" label="商品价格" ></el-table-column>  

            <el-table-column fixed="right" width="50">

            <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="修改信息" placement="bottom-end">
                  <el-button @click.native="editFile(scope.row.id)" type="text" style="color: #999" size="medium">
                    <i class="el-icon-edit"></i>
                  </el-button>
                </el-tooltip>
            </template>
            </el-table-column>
            <el-table-column fixed="right" width="50">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="删除商品" placement="bottom-end">
                  <el-button @click.native="delFile(scope.row.id)" type="text" style="color: #999" size="medium">
                    <i class="el-icon-delete-solid"></i>
                  </el-button>
                </el-tooltip>
              </template>
            </el-table-column>
            
        </el-table>

        </el-main>

    </el-container>
</template>
<script>
export default {
  data() {
    return {
      key: "",
      book: 
      [{
        "id": "d99a716c-b952-11eb-8bfc-f1ff82be21dd",
        "name": "寻找《局外人》",
        "cover": "s33658199.jpg",
        "author": "[美]爱丽丝·卡普兰 ",
        "press": "新星出版社 ",
        "subtitle": "加缪与一部文学经典的命运 ",
        "date": "2020-6 ",
        "stock": 5,
        "pages": 360,
        "price": 68.00,
        "isbn": "9787513333733 ",
        "description": "\n一部传记作品，主人公是一本书 推理小说一般的文学史 饱含勇气、美德与爱的冒险故事 2016年美国国家图书奖作品 为文学史不朽之作《局外人》作传，再现一部伟大文学经典的生命历程 出版七十八年，作者去世六十年，《局外人》仍稳居法语文学累积销量榜首。这本薄薄的小说被翻译成六十多种语言，仅在法国就卖出上千万册。 《局外人》如何写作、出版，又如何撼动世界，影响一代代读者？本书以《局外人》的生命历程为主线，讲述一个饱含勇气、美德与爱的冒险故事。  寻觅为无数人所倾倒的明星作家——阿尔贝·加缪早年创作踪迹 这部石破天惊的小说发表时，加缪只有二十六岁，一个从阿尔及尔贫民窟中走出的年轻人如何从自身“发现”了这本书？文学的师承、思想的成长、技巧的练习、素材的准备，以及动机的触发，通过详尽书信、笔记和历史资料，呈现“创作”这一神秘活动的有迹可循。 法国出版史上的至暗时刻，文学界的抵抗运动 1942年，巴黎处于纳粹占领之下，法国出版界风雨飘摇，伽利玛如何能在动荡时刻突破重重困难使《局外人》得以出版？哪些富有洞见和行动力的关键人物起了推动作用？ 为全面理解《局外人》提供新的线索 七十八年来，对《局外人》的解读、批评、改编、演绎，从未停止，不变的是，它仍令人困惑不解、坐立难安。本书亦是对《局外人》的文学批评的历史，展现对一部文学经典的理解的代际差异与演变。 当代文学对何谓“好文字”的探索和颠覆 《局外人》那简单和冷漠的语言令人着迷。本书通过详述著名作家、日后成为法国文化部长的安德烈·马尔罗对手稿的修改，著名哲学家和文学家让-保罗·萨特对《局外人》的重要评论，以及《局外人》被首次翻译成英语时的逸闻等，再现当代文学对何谓“好文字”的不断叩问和重新界定。\n爱丽丝·卡普兰（Alice Kaplan），耶鲁大学法语系主任，耶鲁大学“约翰·穆瑟”教授；曾任杜克大学文学及历史教授，为杜克大学法语研究中心创始主任。主要研究领域为二十世纪法国文学、法国文化研究、翻译理论与实践、自传与传记等，她在耶鲁大学开设的本科课程包括讲授加缪、普鲁斯特的文学作品等。 卡普兰15岁时第一次读《局外人》，也是她读的第一部法语小说，她说：“《局外人》是我命中之书。”",
        "rating": " 9.1 "
      }],
      buyNum: 1
    }
  },
  methods:
  {
      editFile(file_id)
      {
          this.$router
          .push({path:"/admin/goodsupdate",query:{q:file_id}})
          .catch(()=>{})
      },
      delFile(file_id)
      {
        this.$confirm('确定此商品彻底删除?', '文档彻底删除', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'success'
        }).then(() => {
            this.id = file_id
            this.submitdel();
        });
    },
     goTo(path) {
        this.$router.replace(path);
      }
  }

}
</script>