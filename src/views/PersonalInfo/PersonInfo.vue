<template>
    <el-container style="height: 100%;">
        <el-container>  
         <el-aside :width=" '250px'" style="background-color: #EDEEEF;">
            <!--
            <img v-if="userInfo.user_avatar" :src="userInfo.user_avatar" class="navbar-brand-img mx-auto">
            <img v-else src="./images/no_login.jpg" class="navbar-brand-img mx-auto">
            不知道有没有头像 先这么写了-->
            
            <el-menu
            :unique-opened="true" 
             :disabled="disabled"
            >
              <el-menu-item 
              index="1" 
              @click="goTo('/personinfo/profile')">
                <i class="el-icon-document-copy"></i>
                <span slot="title">我的资料</span>
              </el-menu-item>

              <el-submenu 
              index="2">
                <template slot="title">
                  <i class="el-icon-edit"></i>
                  <span>编辑信息</span>
                </template>

                <el-menu-item-group>
                  <el-menu-item index="2-1" @click="goTo('/personinfo/update')">修改基本信息</el-menu-item>
                  <el-menu-item index="2-2" @click="goTo('/personinfo/editpwd')">修改密码</el-menu-item>
                </el-menu-item-group>
              </el-submenu>

            </el-menu>

        </el-aside>
        <el-main>
                <router-view></router-view>
        </el-main>
        </el-container>
    </el-container>
</template>
<script>
export default
{
    methods:
    {
         goTo(path){
        this.$router.replace(path);
      }
    }
}

</script>