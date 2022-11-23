<template>
  <div>
    <div  style="width:14%;height: 130px;border-radius: 100px;display:inline-block;">
      <img
          style="border-radius: 80px"
          :src="admin.avatar"
          class="img">
    </div>
    <br>
    <br>
    <el-card style="width: 1100px ; margin-left: 20px" >
      <el-descriptions title="简介" :column="2" border>
        <template slot="extra">
          <el-button type="primary" size="small" @click="handleEdit">编辑个人信息</el-button>
          <el-dialog
              title="修改个人信息"
              :visible.sync="dialogVisible"
              width="40%"
              :before-close="handleClose">
            <el-form :model="ruleForm" :rules="rules" ref="form" label-width="150px">
              <div class="updateInfo">
                <div class="left">
                  <el-form-item label="头像" prop="avatar">
                    <img style="width:150px;height:110px" :src="ruleForm.avatar"></img>
                  </el-form-item>
                  <el-form-item label="账号" prop="adminCount">
                    <el-input v-model="ruleForm.adminCount"></el-input>
                  </el-form-item>
                  <el-form-item label="昵称" prop="adminNickname">
                    <el-input v-model="ruleForm.adminNickname"></el-input>
                  </el-form-item>
                  <el-form-item label="账号密码" prop="password" >
                    <el-input type="password" v-model="ruleForm.password"></el-input>
                  </el-form-item>
                  <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass"></el-input>
                  </el-form-item>
                  <el-form-item label="手机号码" prop="phone">
                    <el-input v-model="ruleForm.phone"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="handleClose">取 消</el-button>
              <el-button type="primary" @click="handleSumit">提 交</el-button>
            </span>
          </el-dialog>
        </template>
        <el-descriptions-item label="ID" ><p class="message">{{admin.id}}</p></el-descriptions-item>
        <el-descriptions-item label="账号" ><p class="message">{{admin.adminCount}}</p></el-descriptions-item>
        <el-descriptions-item label="昵称" ><p class="message">{{admin.adminNickname}}</p></el-descriptions-item>
        <el-descriptions-item label="手机号码" ><p class="message">{{admin.phone}}</p></el-descriptions-item>
        <el-descriptions-item label="注册日期" ><p class="message">{{admin.createTime}}</p></el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script>

export default {
  name: "AdminInfo",
  data(){
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
      admin: {},
      dialogVisible: false,
      ruleForm: {
        avatar: "",
        adminCount: "",
        adminNickname: "",
        password: "",
        checkPass: "",
        phone: "",
        id: ""
      },
      rules: {
        adminCount: [
          {validator: checkAccount, trigger: 'blur'}
        ],
        adminNickname: [
          {validator: checkNickname, trigger: 'blur'}
        ],
        password: [
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {validator: validatePass2, trigger: 'blur'}
        ],
        phone: [
          {validator: checkPhone, trigger: 'blur'}
        ]
      }
    }
  },
  created() {
    this.admin = JSON.parse(localStorage.getItem("admin"));
    this.request.get("/admin/"+this.admin.id).then(res =>{
      if (res.status=="200"){
        this.admin = res.data
        this.$message.success(res.msg);
      } else {
        this.$message.error(res.msg)
      }
    })
  }
  ,
  methods: {
    handleEdit(){
      this.dialogVisible=true
      this.ruleForm = this.admin
    },
    handleClose(){
      this.dialogVisible = false;
    },
    handleSumit(){
      this.dialogVisible = false
      this.request.post("/admin/save",this.ruleForm).then(res => {
        if (res.status=="200"){
          this.$message.success(res.msg);
          localStorage.removeItem("admin");
          localStorage.setItem("admin",JSON.stringify(res.data)) //  存储用户信息到浏览器
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style scoped>
.img {
  width: 180px;
  height: 180px;
}
.updateInfo {
  height: 350px;
  overflow: auto;
}
.left {
  /* width: 330px; */
  float: left;
}
.message{
  width: 20em;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
</style>
