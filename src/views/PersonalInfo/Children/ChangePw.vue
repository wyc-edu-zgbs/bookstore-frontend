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


        <el-form-item label="原密码" prop="password" style="width:70%">
          <el-input v-model="loginForm.oldpassword" prefix-icon="el-icon-lock"  type="password" placeholder="请输入原密码">

          </el-input>

        </el-form-item>

        <el-form-item label="新密码" prop="password" v-if="visible" style="width:70%">
          <el-input v-model="loginForm.password" prefix-icon="el-icon-lock"  type="password" placeholder="密码必须介于6-20个字符之间">
            <i slot="suffix" title="显示密码" @click="changePass" style="cursor:pointer;"
               class="el-icon-view"></i>
          </el-input>
          <el-input v-model="loginForm.password2" prefix-icon="el-icon-lock"  type="password" placeholder="请重复密码">
            <i slot="suffix" title="显示密码" @click="changePass" style="cursor:pointer;"
               class="el-icon-view"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password" v-else style="width:70%">
          <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type="text" placeholder="密码应介于6-20个字符之间" >
            <i slot="suffix" title="隐藏密码" @click="changePass" style="cursor:pointer;"
               class="el-icon-more"></i>
          </el-input>
          <el-input v-model="loginForm.password2" prefix-icon="el-icon-lock" type="text" placeholder="请重复密码" >
            <i slot="suffix" title="隐藏密码" @click="changePass" style="cursor:pointer;"
               class="el-icon-more"></i>
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
    return {
      loginForm: 
      {
        oldpassword:'',
        password: '',
        password2: '',
      },
      visible: true//控制密码可见与否,
      ,
      loginFormRules: {

        password: [
          {
            required: true,
            message: "密码不能为空。",
            trigger: "blur"
          },
          {
            min: 6,
            max: 20,
            message: "密码必须介于6-20个字符之间。",
            trigger: "blur"
          },
          {
            type: "string",
            pattern: /^[a-zA-Z0-9_-]{6,20}$/,
            message: "格式不正确。",
            trigger: "blur"
          }
        ],
        password2: [
          {
            required: true,
            message: "密码不能为空。",
            trigger: "blur"
          },
          {
            min: 6,
            max: 20,
            message: "密码必须介于6-20个字符之间。",
            trigger: "blur"
          },
          {
            type: "string",
            pattern: /^[a-zA-Z0-9_-]{6,20}$/,
            message: "格式不正确。",
            trigger: "blur"
          }
        ],
      }
    }
  },
   methods: {
    changePass() {
        this.visible = !(this.visible);
      }    //判断渲染，true:暗文显示，false:明文显示
      ,
       submitForm() {
      this.$refs.loginFormRef.validate(valid => {
        if (valid) {
          // 指定请求为正式提交表单
          if(this.loginForm.password!==this.loginForm.password2){
            this.$message.error({
            message:"两次输入密码必须相同！",
            type:"error",
            customClass:"c-msg",
            showClose:true,
            })
            return;
          }
          Vue.axios
            .post('', QS.stringify(this.loginForm))
            .then(response => {
              if (response.data.registered) {
                // 注册成功
                this.$router.replace("/greeter");
                this.$message({
                    message: "修改成功",
                    type: "success",
                    customClass: "c-msg",
                    showClose: true
                  }); 
              } else {
                // 注册失败
                  this.$message({
                    message: response.data.info,
                    type: "error",
                    customClass: "c-msg",
                    showClose: true
                  }); 
              }
            })
            .catch(error => {
              this.$message({
                message: error.response.data.info,
                type: "error",
                customClass: "c-msg",
                duration: 0,
                showClose: true
              });
              Promise.reject(error);
            });
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