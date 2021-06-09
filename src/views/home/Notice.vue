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
      <ul>
        <div
          v-for="note in notes"
          :key="note"
          class="note"
        >

          <li>{{note}}</li>

        </div>
      </ul>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notes: ["夏日撒欢读，爆款童书抢购", "618开门红，图书5折封顶"]
    }
  },
}
</script>

<style scoped>
.card {
  border-radius: 5%;
  border-width: 0.25vw;
  border-color: rgba(58, 130, 119, 0.7);
  margin: 0 4%;
}
.head {
  font-size: 1.2vw;
  font-weight: bold;
  margin: -4% 0;
}
.note {
  font-size: 0.9vw;
  line-height: 3.5vh;
}
ul {
  padding: 0 2px 0 0;
  margin: 0;
}
</style>
