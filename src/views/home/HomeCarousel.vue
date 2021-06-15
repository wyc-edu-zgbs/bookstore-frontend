<template>
  <div class="block">
    <el-carousel
      trigger="click"
      height="40vh"
      class="car"
      :interval="2000"
    >
      <el-carousel-item
        v-for="item in images"
        :key="item.id"
      >
        <router-link :to="item.url ? item.url : '/'">
          <img
            :src="item.idView"
            class="image"
          >
        </router-link>
      </el-carousel-item>
    </el-carousel>
    <el-divider id="divi"></el-divider>
    <img
      src="../../assets/adver.jpg"
      class="ad"
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        {
          id: 0,
          idView: require('../../assets/homecarImage/0.jpg'),
          url: "/book/9787513344456"
        },
        {
          id: 1,
          idView: require('../../assets/homecarImage/1.jpg'),
          url: "/search?q=%E5%88%98%E6%85%88%E6%AC%A3"
        },
        {
          id: 2,
          idView: require('../../assets/homecarImage/2.jpg'),
          url: "/book/9787555911425"
        },
        {
          id: 3,
          idView: require('../../assets/homecarImage/3.jpg'),
          url: "/book/9787515521763"
        },
        {
          id: 4,
          idView: require('../../assets/homecarImage/4.jpg'),
          url: "/book/9787518961481"
        }
      ],
    }
  },
}
</script>

<style scoped>
.image {
  width: 100%;
}
.ad {
  width: 100%;
}
#divi {
  background: rgb(58, 130, 119);
  margin: 4vh 0;
}
</style>

