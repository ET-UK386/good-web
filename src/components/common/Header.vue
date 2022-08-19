<template>
  <div class="header">
    <el-header>
    <div class="image">
    <img :src="backImg" width="40px" height="40px" />
    <span class="title">商品管理系统</span>
    </div>
      <!-- <div class="title">商品管理系统</div> -->
      <div class="thead">

          <el-dropdown>
          <el-button>
           
            <i class="el-icon-user">{{ username }}</i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logout">个人中心</el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
  </div>
</template>
<script>
import backImg from '../../assets/icon.png';
export default {
  data() {
    return {
      username: "",
      backImg:backImg,
    }; 
  },
  created(){
    this.username =sessionStorage.getItem("username")
  },
  methods: {
    //退出
    logout() {
       this.$confirm('此操作将注销登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        sessionStorage.removeItem("user")  //移除sessionStorage中的值
        this.$router.push('/')
      })
    },
  },
};
</script>
<style>
.header {
  width: 100%;
  height: 100%;
}
.el-header {
  line-height: 60px;
  display: flex;
  justify-content: space-between;
   background-color: #434a50;
}
.title {
  font-weight: 700;
  font-size: 25px;
  position: relative;
  top: -10px;
  left: 15px;
  color: #fff;
}
.image{
  position: relative;
  bottom: -10px;
}
</style>