<template>
  <div class="block">
    <el-carousel
      trigger="click"
      height="40vh"
      class="car"
    >
      <el-carousel-item
        v-for="item in images"
        :key="item.id"
      >
        <img
          :src="item.idView"
          class="image"
        >
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
        { id: 0, idView: require('../../assets/homecarImage/0.jpg') },
        { id: 1, idView: require('../../assets/homecarImage/1.jpg') },
        { id: 2, idView: require('../../assets/homecarImage/2.jpg') },
        { id: 3, idView: require('../../assets/homecarImage/3.jpg') },
        { id: 4, idView: require('../../assets/homecarImage/4.jpg') }
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

