<template>
  <el-container>
    <el-header>
      <span id="title">个人资料管理</span>
    </el-header>

    <el-card
      class="main"
      shadow="never"
    >
      <div>
        <el-avatar
          class="bigpic"
          :size="200"
          :src="userInfo.avatar"
          style="margin-right: 20px"
        ></el-avatar>
        <!--
                    <el-button @click.native="changepic()" class="changepic" type="info" plain>
                        <i class="el-icon-edit"></i><span>修改头像</span>
                    </el-button>
                    -->

      </div>
      <div class="message">
        <p>ID: {{userInfo.id}}</p>

        <p>用户名: {{userInfo.username}}</p>

        <p v-if="userInfo.nickname !== null">昵称: {{userInfo.nickname}} <el-link
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
          >马上填写</el-link>您的昵称，让更多的人了解你</p>

        <p v-if="userInfo.gender !== null">性别: {{userInfo.gender == 0 ? '男' : '女'}}
          <el-link
            @click.native="dialog1 = true"
            type="primary"
            icon="el-icon-edit"
            style="margin-bottom: 2.8px"
          ></el-link>
        </p>

        <p v-else>性别: <el-link
            @click.native="dialog1 = true"
            type="primary"
            icon="el-icon-edit"
            style="margin-bottom: 2.8px"
          >马上填写</el-link>您的性别，让更多的人了解你</p>

        <p v-if="userInfo.age !== null">年龄: {{userInfo.age}} <el-link
            @click.native="dialog2 = true"
            type="primary"
            icon="el-icon-edit"
            style="margin-bottom: 2.8px"
          ></el-link>
        </p>
        <p v-else>年龄: <el-link
            @click.native="dialog2 = true"
            type="primary"
            icon="el-icon-edit"
            style="margin-bottom: 2.8px"
          >马上填写</el-link>您的年龄，让更多的人了解你</p>

        <p>电话: {{userInfo.phone}} <el-link
            @click.native="dialog5 = true"
            type="primary"
            icon="el-icon-edit"
            style="margin-bottom: 2.8px"
          ></el-link>
        </p>
        <p v-if="userInfo.qq !== null">QQ: {{userInfo.qq}} <el-link
            @click.native="dialog3 = true"
            type="primary"
            icon="el-icon-edit"
            style="margin-bottom: 2.8px"
          ></el-link>
        </p>
        <p v-else>QQ: <el-link
            @click.native="dialog3 = true"
            type="primary"
            icon="el-icon-edit"
            style="margin-bottom: 2.8px"
          >马上填写</el-link>您的QQ，让更多的人了解你</p>

        <p>邮箱: {{userInfo.email}}</p>
        <p v-if="userInfo.address !== null">地址: {{userInfo.address}} <el-link
            @click.native="dialog4 = true"
            type="primary"
            icon="el-icon-edit"
            style="margin-bottom: 2.8px"
          ></el-link>
        </p>
        <p v-else>地址: <el-link
            @click.native="dialog4 = true"
            type="primary"
            icon="el-icon-edit"
            style="margin-bottom: 2.8px"
          >马上填写</el-link>您的地址，让更多的人了解你</p>
      </div>
    </el-card>

    <el-dialog
      title="提示"
      :visible.sync="dialog1"
      width="30%"
    >
      <div style="margin-bottom: 20px">
        <span>您的性别:</span>
      </div>
      <el-form
        ref="genderFormRef"
        :model="genderForm"
        label-width="0px"
        class="gender_form"
      >
        <el-form-item prop="gender">
          <el-input
            placeholder="gender:"
            v-model="genderForm.gender"
          ></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialog1 = false">取 消</el-button>
        <el-button
          type="primary"
          @click.native="gender()"
        >确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="dialog2"
      width="30%"
    >
      <div style="margin-bottom: 20px">
        <span>您的年龄:</span>
      </div>
      <el-form
        ref="ageFormRef"
        :model="ageForm"
        label-width="0px"
        class="age_form"
      >
        <el-form-item prop="age">
          <el-input
            placeholder="age:"
            v-model="ageForm.age"
          ></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialog2 = false">取 消</el-button>
        <el-button
          type="primary"
          @click.native="age()"
        >确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="dialog3"
      width="30%"
    >
      <div style="margin-bottom: 20px">
        <span>您的QQ:</span>
      </div>
      <el-form
        ref="qqFormRef"
        :model="qqForm"
        label-width="0px"
        class="qq_form"
      >
        <el-form-item prop="qq">
          <el-input
            placeholder="qq:"
            v-model="qqForm.qq"
          ></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialog3 = false">取 消</el-button>
        <el-button
          type="primary"
          @click.native="qq()"
        >确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="dialog4"
      width="30%"
    >
      <div style="margin-bottom: 20px">
        <span>您的地址:</span>
      </div>
      <el-form
        ref="addressFormRef"
        :model="addressForm"
        label-width="0px"
        class="address_form"
      >
        <el-form-item prop="address">
          <el-input
            placeholder="address:"
            v-model="addressForm.address"
          ></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialog4 = false">取 消</el-button>
        <el-button
          type="primary"
          @click.native="address()"
        >确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="dialog5"
      width="30%"
    >
      <div style="margin-bottom: 20px">
        <span>您的电话:</span>
      </div>
      <el-form
        ref="phoneFormRef"
        :model="phoneForm"
        label-width="0px"
        class="phone_form"
      >
        <el-form-item prop="phone">
          <el-input
            placeholder="phone_num:"
            v-model="phoneForm.phone"
          ></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialog5 = false">取 消</el-button>
        <el-button
          type="primary"
          @click.native="phonenum()"
        >确 定</el-button>
      </span>
    </el-dialog>

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
      dialog1: false,
      dialog2: false,
      dialog3: false,
      dialog4: false,
      dialog5: false,
      dialog6: false,
      userInfo:
      {
        "phone": "13312345678",
        "name": "xiaowoniu",
        "nickname": "小蜗牛",
        "gender": "女",
        "age": "38",
        "address": "北京"
      },
      genderForm: {
        gender: ''
      },
      ageForm: {
        age: ''
      },
      qqForm: {
        qq: ''
      },
      addressForm: {
        address: ''
      },
      phoneForm: {
        phone: ''
      },
      nicknameForm: {
        nickname: ''
      }

    }


  },
  /*
  
                  */
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