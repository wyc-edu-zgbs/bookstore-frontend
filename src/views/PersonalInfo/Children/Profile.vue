<template>
  <el-container v-loading="is_loading">
    <el-header>
      <span id="title">个人资料管理</span>
    </el-header>

    <el-card
      class="main"
      shadow="never"
    >
      <div>
        <el-avatar
          v-if="userInfo.avatar"
          class="bigpic"
          :size="150"
          :src="userInfo.avatar | media2url"
          style="margin-right: 20px"
          fit="contain"
        ></el-avatar>
        <i class="bigpic el-icon-user-solid" v-else></i>
        <!-- TODO -->
        <el-upload
          class="changepic"
          action="/api/upload"
          ref="upload"
          :limit="1"
          :show-file-list="false"
          :on-success="set_avatar"
          :on-error="(error)=> $notify({
            title: 'Could not reach the API.',
            message: error
          })"
          >
          <el-button icon="el-icon-upload" slot="trigger" size="small" type="primary">选择</el-button>
          <div class="el-upload__tip" slot="tip">小于 500kb</div>
        </el-upload>
        <!--
                    <el-button @click.native="changepic()" class="changepic" type="info" plain>
                        <i class="el-icon-edit"></i><span>修改头像</span>
                    </el-button>
                    -->

      </div>
      <div class="message">
        <p>Email: {{userInfo.email}}</p>

        <p v-if="userInfo.nickname">昵称: {{userInfo.nickname}} <el-link
            @click.native="dialog6 = true"
            type="primary"
            icon="el-icon-edit"
            style="margin-bottom: 2.8px"
          ></el-link>
        </p>
        <p v-else>昵称: <el-link
            @click.native="dialog6 = true"
            type="primary"
            icon="el-icon-edit"
            style="margin-bottom: 2.8px"
          >马上填写</el-link></p>
      </div>

    </el-card>

    <el-dialog
      title="提示"
      :visible.sync="dialog6"
      width="30%"
    >
      <div style="margin-bottom: 20px">
        <span>您的昵称:</span>
      </div>
      <el-form
        ref="nicknameFormRef"
        :model="nicknameForm"
        label-width="0px"
        class="nickname_form"
      >
        <el-form-item prop="nickname">
          <el-input
            placeholder="nickname:"
            v-model="nicknameForm.nickname"
          ></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialog6 = false">取 消</el-button>
        <el-button
          type="primary"
          @click.native="nickname()"
        >确 定</el-button>
      </span>
    </el-dialog>

  </el-container>
</template>
<script>
export default {
  data() {
    return {
      is_loading: false,
      dialog6: false,
      userInfo:
      {
        "email": "",
        "nickname": "",
      },
      nicknameForm: {
        nickname: ''
      }
    }
  },
  mounted() {
    this.update()
  },
  methods: {
    update() {
      this.is_loading = true
      this.userInfo = {}
      this.$http.get("/api/user")
        .then((response) => {
          this.userInfo = response.data
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
    nickname() {
      this.is_loading = true
      this.$http.post("/api/user", {nickname: this.nicknameForm.nickname})
        .then((response) => {
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
    set_avatar(response) {
      this.is_loading = true
      this.$http.post("/api/user", {avatar: response.id})
        .then((response) => {
          console.log(response)
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
    }
  }
}
</script>
<style   scoped>
.main {
  position: relative;
  width: 100%;
  height: 56vh;
  padding: 20px 0;
  color: #999;
}
.el-header {
  padding: 2%;
  background-color: rgba(91, 155, 148, 0.3);
}
#title {
  font-weight: bold;
  font-size: 130%;
  color: rgb(58, 130, 119);
}
.bigpic {
  position: absolute;
  left: 100px;
  top: 50px;
}
.changepic {
  position: absolute;
  left: 142px;
  top: 270px;
}
.message {
  position: absolute;
  left: 25vw;
  top: 4vh;
}
</style>
