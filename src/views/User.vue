<template>
  <div>

    <div style="padding: 10px">
      <el-input style="width: 200px" placeholder="请输入内容" suffix-icon="el-icon-search" v-model="username"></el-input>
      <!--          <el-input style="width: 200px" placeholder="请输入邮箱" suffix-icon="el-icon-message" class="ml-5"></el-input>-->
      <!--          <el-input style="width: 200px" placeholder="请输入地址" suffix-icon="el-icon-position" class="ml-5"></el-input>-->
      <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
      <el-button type="warning" @click="reset">重置</el-button>
    </div>

    <div>
      <el-button type="primary" class="btw-80 mb-10" @click="handleNewInsertDialog">新增<i class="el-icon-circle-plus el-icon--right"></i></el-button>
      <el-button type="danger" class="mb-10" style="width: 130px" @click="handleBatchDel">批量删除<i class="el-icon-remove el-icon--right"></i></el-button>
      <el-upload action="http://localhost:80/user/import" :show-file-list="false" accept="xlsx" :on-success="handleExcelImportSuccess" style="display: inline-block">
        <el-button type="primary" class="ml-5">导入 <i class="el-icon-bottom"></i></el-button>
      </el-upload>
      <el-button type="primary" class="btw-80 mb-10 ml-5" @click="handleExcelFileExport" >导出<i class="el-icon-upload2 el-icon--right"></i></el-button>
    </div>

    <el-dialog title="新增用户信息" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="newForm" label-width="80px" size="small">
        <el-form-item label="名称" >
          <el-input v-model="newForm.username" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="newForm.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="newForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="newForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="newForm.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveUser">确 定</el-button>
      </div>
    </el-dialog>

    <el-table :data="tableData" border @selection-change="handleSelectionChange">
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column prop="id" label="id" width="80">
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="140">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" width="120">
      </el-table-column>
      <el-table-column prop="email" label="邮箱">
      </el-table-column>
      <el-table-column prop="phone" label="电话">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
      <el-table-column prop="operate" label="操作">
        <template v-slot:="{ row }">
          <el-button type="success" class="btw-80 mb-10" @click="handleEdit(row)">编辑<i class="el-icon-edit"></i></el-button>
          <el-popconfirm
              class="ml-5"
              confirmButtonText='确定'
              cancelButtonText='取消'
              icon="el-icon-info"
              iconColor="red"
              title="确定删除该用户吗？"
              @confirm="handleDel(row.id)">
            <el-button type="danger" class="btw-80 mb-10" slot="reference">删除<i class="el-icon-delete"></i></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <div style="padding: 10px">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[2, 5, 10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalPage">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      tableData: [],
      totalPage: 0,
      currentPage: 1,
      pageSize: 10,
      username: "",
      dialogFormVisible: false,
      newForm: {
        username: "",
        nickname: "",
        email: "",
        phone: "",
        address: ""
      },
      multipleSelection: [],
    }
  },
  created() {
    //请求分页查询数据
    this.load()
  },
  methods:{
    load(){
      this.request.get("/user/page", {
        params:{
          currentPage:this.currentPage,
          pageSize:this.pageSize,
          username:this.username
        }
      }).then(res => {
        console.log(res)
        this.tableData = res.data.records
        this.totalPage = res.data.total
      })
    },
    reset(){
      this.username = ""
      this.load()
    },
    handleNewInsertDialog(){
      this.dialogFormVisible = true
      this.newForm={}
    },
    saveUser(){
      this.request.post("/user/save",this.newForm).then(res => {
        if (res){
          this.$message.success("保存成功")
        }else{
          this.$message.error("保存失败")
        }
        this.dialogFormVisible = false
        this.load()
      })
    },
    handleEdit(row){
      this.newForm = Object.assign({},row)
      this.dialogFormVisible = true
    },
    handleDel(id){
      this.request.delete("/user/delete/"+id).then(res => {
        if (res){
          this.$message.success("删除成功")
        }else{
          this.$message.error("删除失败")
        }
        this.load()
      })
    },
    handleSelectionChange(val){
      this.multipleSelection = val
    },
    handleBatchDel(){
      let ids = this.multipleSelection.map(value => value.id) // [{},{},{}....] => [1,2,3....]
      this.request.delete("/user/delete/batch",{
        data:ids
      }).then(res => {
        if (res){
          this.$message.success("批量删除成功")
        }else{
          this.$message.error("批量删除失败")
        }
        this.load()
      })
    },
    handleSizeChange(pageSize){
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(currentPage){
      this.currentPage = currentPage
      this.load()
    },
    handleExcelImportSuccess(){
      this.$message.success("导入成功")
      this.load()
    },
    handleExcelFileExport(){
      window.open("http://localhost:80/user/export")
    }
  }
}
</script>

<style scoped>

</style>
