<template>
  <div style="font-size: 12px; line-height: 60px; display: flex">

    <div style="flex: 1; font-size: 20px">
      <span :class="collapseBtnClass" style="cursor: pointer" @click="collapse()"></span>
    </div>
    <el-dropdown style="width: 150px; cursor: pointer ; text-align: right" >
      <div style="display: inline-block">
        <img :src="admin.avatar" alt=""
             style="width: 30px; border-radius: 50%; position: relative; top: 10px; right: 5px">
        <span>{{ admin.adminNickname }}</span>
        <i class="el-icon-arrow-down" style="margin-left: 5px"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="handleAdminInfo">
          个人信息
        </el-dropdown-item>
        <el-dropdown-item @click.native="logout">
          退出
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>

import CommonTab from "@/components/CommonTab";

export default {
  name: "Header",
  props:{
    collapseBtnClass: String,
    collapse: Function
  },
  components: {
    CommonTab
  },
  data(){
    return {
      admin: localStorage.getItem("admin") ? JSON.parse(localStorage.getItem("admin")) : {}
    }
  },
  methods: {
    logout(){
      this.$router.push("/login")
      localStorage.removeItem("admin")
      this.$message.success("退出成功")
    },
    handleAdminInfo(){
      this.$router.push("/adminInfo")
    }
  }
}
</script>

<style scoped>

</style>
