<template>
  <div>
    <el-form ref="biaoqian" :model="user" label-width="80px">

  <el-form-item label="名字">
    <el-input v-model="user.username"></el-input>
  </el-form-item>

  <el-form-item label="密码">
    <el-input v-model="user.password"></el-input>
  </el-form-item>

  <el-form-item label="地址">
    <el-input v-model="user.address"></el-input> 
  </el-form-item>

    <el-form-item label="电话">
    <el-input v-model="user.phone"></el-input> 
  </el-form-item>

   <!-- <el-form-item label="性别" :label-width="formLabelWidth">
      <el-select v-model="books.sex" placeholder="请选择书的类型">
        <el-option label="男"    :value="0" ></el-option>
        <el-option label="女" :value="1"></el-option>
      </el-select>
    </el-form-item> -->

  
  <el-form-item>
    <el-button type="primary" @click="onSubmit">添加</el-button>
   
  </el-form-item>
</el-form>
  </div>
</template>

<script>

export default {
    data(){
        return{

          formLabelWidth:"",
                user:{
                   
                    username:"",
                    password:"",
                    address:"",
                    phone:"",
                    token:""

                },
                role:[]
        }
    }
    ,methods:{
        onSubmit(){
              
        
            this.axios.post("http://localhost:8088/user/addSurveyor",this.user).then((response)=>{
                  if(response.status===200){
                 
                  
                    console.log(response)
                    this.$router.push("/Employee/Inspector")
                  }
            })
        }
    },created(){
         this.user.token=sessionStorage.getItem("token")
    }
}
</script>