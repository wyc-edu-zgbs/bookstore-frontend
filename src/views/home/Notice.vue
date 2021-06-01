<template>
  <div>
    <el-card
      class="card"
      shadow="never"
    >
      <div
        slot="header"
        class="head"
      >
        <span>公告</span>
      </div>
      <div
        v-for="note in notes"
        :key="note"
        class="note"
      >
        {{note}}
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notes: ["儿童节礼物季，爆款童书抢购", "618开门红，图书5折封顶"]
    }
  },
}
</script>

<style scoped>
.card {
  border-radius: 5%;
  border-width: 0.25vw;
  border-color: rgba(58, 130, 119, 0.7);
  margin: 0 0 0 2%;
}
.head {
  font-size: 1.2vw;
  font-weight: bold;
  margin: -4% 0;
}
.note {
  font-size: 0.8vh;
  line-height: 3.5vh;
}
</style>