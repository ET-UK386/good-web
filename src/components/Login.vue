<template>

  <div class="login">
    <el-card>
      <h1>后台登录</h1>
      <el-form ref="loginForm" :model="user" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="name">
          <el-input placeholder="请输入用户名" v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input placeholder="请输入密码" v-model="user.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
          <el-button type="primary" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      user: {
       username:"",
       password:""
      },
      rules: {
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },

  methods: {
    onSubmit() {
      this.$refs.loginForm.validate((valid) => {
        if (!valid) {
          this.$message.error("请将信息填写完整");
        } else{
          //提交
          this.axios.post("http://localhost:8088/user/login",this.user).then((response)=>{
           if(response.status == 200   && response.data.flag == "success"){
              sessionStorage.setItem("token",response.data.token);
              sessionStorage.setItem("user",response.data.name);
             

                this.$message.success("登录成功");
                this.$router.push("/HomePage");
           }else{
            this.$message.error(response.data.msg);
           }  
          }).catch((error)=>{
            console.log(error);
          })
          
        }
      });
    },
    onReset() {
      this.$refs.loginForm.resetFields();
    },
  },
  
};
</script>
<style>
.login {
  width: 600px;
  height: 600px;
  margin: 0 auto;
  margin-top: 100px;
  text-align: center;
}
</style>

