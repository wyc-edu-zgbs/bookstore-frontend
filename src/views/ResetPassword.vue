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
          src="../assets/mylogo.png"
          alt="bread"
          class="img"
        ></div>
      <el-form
        :model="emailform"
        status-icon
        :rules="emailrules"
        ref="emailform"
        label-width="120px"
      >
        <el-form-item
          label="邮箱"
          prop="email"
        >
          <el-input v-model="emailform.email"></el-input>
        </el-form-item>
        <el-form-item class="button-container">
          <el-button
            type="primary"
            round
            @click="send_token"
          >
          发送验证码
          </el-button>
        </el-form-item>
      </el-form>
      <el-form
        :model="form"
        status-icon
        :rules="rules"
        ref="form"
        label-width="120px"
      >
        <el-form-item
          label="验证码"
          prop="token"
          key="token"
        >
          <el-input
            v-model="form.token"
            key="token"
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
            autocomplete="new-password"
            key="pass"
          >
          </el-input>
        </el-form-item>
        <el-form-item
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
          重置
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
        if (this.form.checkPass !== '') {
          this.$refs.form.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.pass) {
        callback(new Error('两次输入密码不匹配!'))
      } else {
        callback()
      }
    }
    return {
      emailform: {
        email: ''
      },
      form: {
        token: '',
        pass: '',
        checkPass: ''
      },
      emailrules: {
        email: [
          { required: true, message: "请输入邮箱" },
          { pattern: /.+@.+/, message: "您输入的邮箱不正确" },
        ]
      },
      rules: {
        token: [
          { required: true, message: "请输入验证码" },
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
          var data = {
            email: this.emailform.email,
            token: this.form.token,
            password: this.form.pass
          }
          this.$http.post("/api/resetpassword", data)
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
    send_token() {
      this.$refs.emailform.validate((valid) => {
        if (valid) {
          var data = {
            email: this.emailform.email,
          }
          this.$http.post("/api/sendreset", data)
            .then((response) => {
              if (response.data.detail) {
                this.$message(response.data.detail)
              }
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
  background-color: rgba(248, 224, 157, 0.5);
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
