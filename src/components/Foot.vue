<template>
  <div class="foot">
    <div id="images">
      <span
        v-for="item in images"
        :key="item.id"
      >
        <img
          :src="item.idView"
          class="image"
        >
      </span>
    </div>
    <p>Copyright 2020 - 2021 小型网上书店. All Rights Reserved | 出版物经营许可证 新出发京批字第直666号</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        { id: 0, idView: require('../assets/footer/0.png') },
        { id: 1, idView: require('../assets/footer/1.png') },
        { id: 2, idView: require('../assets/footer/2.png') },
        { id: 3, idView: require('../assets/footer/3.png') },
      ],
    }
  },
}
</script>

<style scoped>
.foot {
  margin: 5% 0;
}
#images {
  padding: 1% 0 1% 20%;
  background: rgb(250, 250, 250);
}
.image {
  padding: 0 5% 0 0;
}
p {
  font-size: 1px;
  color: gray;
  text-align: center;
  margin: 4% 0 6%;
}
</style>