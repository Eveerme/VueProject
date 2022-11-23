<template>
  <div class="wrapper">
    <div class="register-box">
      <div style="margin: 10px 0; text-align: center; font-size: 24px"><b>注 册</b></div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号" prop="adminCount" class="mr-30">
          <el-input type="adminCount" v-model="ruleForm.adminCount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="adminNickname" class="mr-30">
          <el-input type="adminNickname" v-model="ruleForm.adminNickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" class="mr-30">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass" class="mr-30">
          <el-input type="password" v-model="ruleForm.checkPass" show-password autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone" class="mr-30">
          <el-input v-model.number="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button type="warning" @click="resetForm('ruleForm')">重置</el-button>
          <el-button type="info" @click="backToLogin">返回登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('电话不能为空'));
        }
        setTimeout(() => {
          var isPhone = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;//手机号码
          if (isPhone.test(value)) {  //号码格式正确
            callback();
          } else {
            callback(new Error('请输入正确的手机号码'));
          }
        }, 1000);
      };
      var checkAccount = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账号'));
        } else {
          callback();
        }
      };
      var checkNickname = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入昵称'));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          adminCount: '',
          adminNickname: '',
          password: '',
          checkPass: '',
          phone: '' ,
          avatar: ''
        },
        rules: {
          adminCount: [
            { validator: checkAccount, trigger: 'blur'}
          ],
          adminNickname: [
            { validator: checkNickname, trigger: 'blur'}
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          phone: [
            { validator: checkPhone, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.request.post("/admin/register",this.ruleForm).then(res => {
              if (res.status=="200"){
                this.$message.success(res.msg)
                this.$router.push("/login")
              } else {
                this.$message.error(res.msg)
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      backToLogin(){
        this.$router.push("/login")
      }
    }
  }
</script>

<style>
.wrapper {
  height: 100vh;
  background-image: linear-gradient(to bottom right, #FC466B , #3F5EFB);
  overflow: hidden;
}
.register-box {
  margin: 100px auto;
  background-color: #fff;
  width: 500px;
  height: auto;
  padding: 20px;
  border-radius: 10px;
}
</style>
