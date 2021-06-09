<template>
  <el-card style="width:80%">
    <div class="logo"><img
         src="../../../assets/bread.png"
         alt="bread"
         class="img"
         ></div>
    <el-container>
      <el-main class="main1">
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="100px" class="login_form" style="margin-left:50px">


          <el-form-item label="原密码" prop="oldpassword" style="width:70%">
            <el-input v-model="loginForm.oldpassword" prefix-icon="el-icon-lock"  type="password" placeholder="请输入原密码">

            </el-input>

          </el-form-item>

          <el-form-item label="新密码" prop="password" style="width:70%">
            <el-input v-model="loginForm.password" prefix-icon="el-icon-lock"  type="password" placeholder="密码必须介于6-20个字符之间">
            </el-input>
          </el-form-item>
          <el-form-item label="重复密码" prop="password2" style="width:70%">
            <el-input v-model="loginForm.password2" prefix-icon="el-icon-lock"  type="password" placeholder="请重复密码">
            </el-input>
          </el-form-item>

          <el-form-item class="btns" >
            <el-button type="primary" @click="submitForm" style="width:300px">提交</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </el-card>
</template>

<script>
import QS from "qs"
import Vue from 'vue';
export default {
  data(){
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.loginForm.password) {
        callback(new Error('两次输入密码不匹配!'))
      } else {
        callback()
      }
    }
    return {
      loginForm: 
      {
        oldpassword:'',
        password: '',
        password2: '',
      },
      loginFormRules: {
        oldpassword: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          },
          {
            min: 6,
            max: 20,
            message: "密码必须介于6-20个字符之间",
            trigger: "blur"
          }
        ],
        password2: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.loginFormRef.validate(valid => {
        if (valid) {
          var data = {
            old_password: this.loginForm.oldpassword,
            new_password: this.loginForm.password
          }
          this.$http.post('/api/user', data)
            .then((response) => {
              if (response.data.detail) {
                this.$message(response.data.detail)
              }
              this.$router.go()
            })
            .catch(error => {
              this.$alert(
                error.response.data.detail || error.toString(),
                'Authentication Error')
            })
        }
        return false;
      });
    },

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
/*
.el-card {
width: 80%;
margin: auto;
padding: 0 7% 0 0;
background-color: rgba(248, 224, 157, 0.4);
}
 */
.logo {
  position: relative;
  margin: 2% 0 6% 38%;
}
.img {
  width: 30%;
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
