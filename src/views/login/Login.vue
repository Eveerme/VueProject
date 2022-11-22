<template>
  <div class="wrapper">
    <div class="login-box">
      <h2 class="h2-wh">登录系统</h2>
      <el-form :rules="rules" :model="user" ref="userForm">
        <el-form-item prop="username">
          <el-input size="medium" class="m-10" prefix-icon="el-icon-user" v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input size="medium" class="m-10" prefix-icon="el-icon-lock" show-password v-model="user.password"></el-input>
        </el-form-item>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button type="primary" @click="handleSubmit">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          登录
        </el-button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button type="warning" @click="handleSignUp"> 注册 </el-button>
      </el-form>

    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      user: {
        username: "admin",
        password: "admind"
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    handleSubmit(){
      this.$refs['userForm'].validate((valid) => {
        if (valid) {
          //表单校验合法
          this.request.post("/user/login",this.user).then(res => {
            console.log(res)
            if (res.status=="200"){
              localStorage.setItem("user",JSON.stringify(res.data)) //  存储用户信息到浏览器
              this.$router.push("/")
              this.$message.success(res.msg)
            }else {
              this.$message.error(res.msg)
            }
          })
        } else {
          return false;
        }
      })
    },
    handleSignUp(){

    }
  }

}
</script>

<style>

.wrapper {
  background-image: url(./loginBg.jpg);
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: 0px -50px;
  height: 100vh;
  overflow: hidden;
}

.login-box {

  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, .5);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, .6);
  border-radius: 10px;

}
.h2-wh{
  color: white;
}

.m-10{
  margin: 10px 0;
}

</style>
