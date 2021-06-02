<template>
  <el-container style="height: 100%; width: 100%; border: 0px">
    <el-header style="text-align: left; font-size: 20px; display: flex; justify-content: space-between;">
      <span style="color: black;font-size: 30px">所有订单</span>
      <el-button
        class="emptytrash"
        @click.native="selectnew()"
        type="primary"
        plain
      >
        <i class="el-icon-plus"></i><span>仅看未完成订单</span>
      </el-button>

    </el-header>

    <el-main>
      <el-table
        :data="order"
        height=666px
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}"
        :header-cell-style="{background:'rgba(58, 130, 119,0.7)',color:'white'}"
        :row-style="{height: '30px'}"
      >
        <el-table-column type="expand">
          <template slot-scope="scope">
            <!--        <el-form label-position="left" inline class="demo-table-expand">
        </el-form>-->
            <el-table
              :data='scope.row.items'
              style="width: 100%"
              :header-cell-style="{background:'rgba(58, 130, 119,0.7)',color:'white'}"
              :row-style="{height: '20px'}"
            >
              <el-table-column
                prop="name"
                label="图书名称"
              >
              </el-table-column>
              <el-table-column
                prop='price'
                label="价格"
              >
              </el-table-column>
              <el-table-column
                prop="count"
                label="数量"
              >
              </el-table-column>
              <el-table-column label='共计'>
                <template slot-scope="scope">
                  {{scope.row.price * scope.row.count | formatPrice}}
                </template>
              </el-table-column>

            </el-table>
          </template>
        </el-table-column>

        <!--
            <el-table-column prop="id" label="订单id" @contextmenu.prevent="" width="300px"></el-table-column>
            -->

        <el-table-column label='预览'>
          <template slot-scope="scope">

            <el-row
              :gutter="20"
              style="margin-top:20px"
            >
              <el-col
                v-for="item in scope.row.items.slice(0,2)"
                :key=item.id
                :span="6"
              >
                <div>
                  <img
                    :src="item.cover | media2url"
                    width="40"
                    height="40"
                  >
                </div>

              </el-col>
              <el-col
                v-if='scope.row.items.length>2'
                :span="6"
              >
                <i
                  class="el-icon-more"
                  style="margin-top:10px;margin-left:10px"
                ></i>
              </el-col>

            </el-row>

            <!--
            <el-image v-for="item in scope.row.items.slice(0,3)" :key=item.cover :src="item.cover" width="40" height="40">
            </el-image>
            -->
          </template>
        </el-table-column>
        <el-table-column
          prop="time"
          label="下单时间"
        ></el-table-column>
        <el-table-column
          prop="state"
          label="订单状态"
        >
          <template slot-scope="scope">
            <span v-if='scope.row.state == 1'>已完成 </span>
            <span v-if='scope.row.state == 2'>未发货 </span>
            <span v-if='scope.row.state == 3'>已取消 </span>
          </template>

        </el-table-column>

        <el-table-column label="订单金额">
          <template slot-scope="scope">

            {{scope.row.items.map(x=>x.count*x.price).reduce((a,b)=>a+b, 0) | formatPrice}}
          </template>
        </el-table-column>
        <!--
            <el-table-column fixed="right" width="50">

            <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="发货" placement="bottom-end">
                  <el-button @click.native="pushorder(scope.row.id)" type="text" style="color: #999" size="medium">
                    <i class="el-icon-sell"></i>
                  </el-button>
                </el-tooltip>
            </template>
            </el-table-column>
            <el-table-column fixed="right" width="50">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="删除" placement="bottom-end">
                  <el-button @click.native="delorder(scope.row.id)" type="text" style="color: #999" size="medium">
                    <i class="el-icon-delete-solid"></i>
                  </el-button>
                </el-tooltip>
              </template>
            </el-table-column>
            -->

      </el-table>

    </el-main>

  </el-container>
</template>
<script>
export default {
  data() {
    return {
      key: "",
      options:
        [
          {
            value: 1,
            label: '已完成',
          },
          {
            value: 2,
            label: '待处理'
          },
          {
            value: 3,
            label: '已取消'
          }

        ],
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
      order:
        [
          {
            "id": "001",
            "user": '00135',
            "time": "2021-05-08 23:55",
            "state": "1",
            items: [
              {
                "count": 7,
                "id": "ad727512-bd80-11eb-a8b8-c1e635d27859",
                "name": "寻找《局外人》",
                "cover": "s33658199.jpg",
                "price": 98.0
              },
              {
                "count": 9,
                "id": "ad727513-bd80-11eb-a8b8-c1e635d27859",
                "name": "不要和你妈争辩",
                "cover": "s33610259.jpg",
                "price": 39.8
              },
              {
                "count": 5,
                "id": "ad727514-bd80-11eb-a8b8-c1e635d27859",
                "name": "鞋带",
                "cover": "s33601424.jpg",
                "price": 45
              },
              {
                "count": 6,
                "id": "ad727515-bd80-11eb-a8b8-c1e635d27859",
                "name": "正常人",
                "cover": "s33684681.jpg",
                "price": 49.8
              },
              {
                "count": 9,
                "id": "ad727516-bd80-11eb-a8b8-c1e635d27859",
                "name": "光明共和国",
                "cover": "s33625558.jpg",
                "price": 46
              },
              {
                "count": 2,
                "id": "ad727517-bd80-11eb-a8b8-c1e635d27859",
                "name": "往复书简：初恋与不伦",
                "cover": "s33668217.jpg",
                "price": 42.0
              }
            ]
          }

        ],
      buyNum: 1
    }
  },
  methods:
  {
    pushorder(order_id) {
      this.$confirm('确定此订单已发货?', '订单已发货', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      }).then(() => {
        this.id = order_id
        this.submitpush();
      });
    },
    delorder(order_id) {
      this.$confirm('确定此订单彻底删除?', '订单彻底删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.id = order_id
        this.submitdel();
      });
    },
    submitdel(order_id) {

    },
    submitpush(order_id) {

    },
    selectnew() {

    },
    goTo(path) {
      this.$router.replace(path);
    }
  }

}
</script>

<style >
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
</style>