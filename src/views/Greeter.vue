<template>
  <div class="login">
    <el-button
      class="return"
      type="primary"
      icon="el-icon-top-right"
      @click="$router.go(-1)"
    >
      返回
    </el-button>
    <el-card>
      <div class="logo"><img
          src="../assets/bread.png"
          alt="bread"
          class="img"
        ></div>
      <el-form
        :model="form"
        status-icon
        :rules="rules"
        ref="form"
        label-width="120px"
      >
        <el-form-item
          label="邮箱"
          prop="email"
        >
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item
          v-if="register"
          label="昵称"
          prop="nickname"
          key="nick_item"
        >
          <el-input
            v-model="form.nickname"
            key="nickname"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="pass"
          key="pass_item"
        >
          <el-input
            type="password"
            v-model="form.pass"
            :autocomplete="this.register?'new-password':'current-password'"
            key="pass"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          v-if="register"
          label="确认密码"
          prop="checkPass"
        >
          <el-input
            type="password"
            v-model="form.checkPass"
            autocomplete="new-password"
          ></el-input>
        </el-form-item>
        <el-form-item class="button-container">
          <el-button
            type="primary"
            round
            @click="submitForm()"
          >
            <span v-if="this.register">注册</span>
            <span v-else>登录</span>
          </el-button>
          <el-button
            @click="resetForm()"
            type="primary"
            round
          >重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            type="text"
            @click="register = !register"
          >
            <div
              v-if="register"
              class="text-grey"
            >返回登录</div>
            <div
              v-else
              class="text-grey"
            >
              没有账号？点此注册
            </div>
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.register && this.form.checkPass !== '') {
          this.$refs.form.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (!this.register) {
        callback()
      }
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.pass) {
        callback(new Error('两次输入密码不匹配!'))
      } else {
        callback()
      }
    }
    return {
      register: false,
      form: {
        email: '',
        nickname: '',
        pass: '',
        checkPass: ''
      },
      rules: {
        email: [
          { required: true, message: "请输入邮箱" },
          { pattern: /.+@.+/, message: "您输入的邮箱不正确" },
        ],
        pass: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          var data = { email: this.form.email, password: this.form.pass }
          if (this.register) {
            data.username = this.form.nickname
          }
          this.$http.post(
            this.register ? "/api/register" : "/api/login",
            data)
            .then((response) => {
              if (response.data.detail) {
                this.$message(response.data.detail)
              }
              this.$router.push("/")
            })
            .catch(error => {
              this.$alert(
                error.response.data.detail || error.toString(),
                'Authentication Error')
            })
        } else {
          this.$message("invalid input")
          return false
        }
      })
    },
    resetForm() {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style scoped>
.login {
  padding: 0 0 5% 0;
}
.return {
  margin: 0 0 2% 4%;
}
.el-card {
  width: 45%;
  margin: auto;
  padding: 0 7% 0 0;
  background-color: rgba(248, 224, 157, 0.4);
}
.logo {
  position: relative;
  margin: 2% 0 6% 38%;
}
.img {
  width: 70%;
}
.el-form-item {
  padding: 1%;
}
.button-container .el-button {
  margin: 0 10% 0 10%;
  width: 30%;
  min-width: min-content;
}
.el-form-item__label {
  color: rgb(58, 130, 119);
}
</style>
