<template>
  <div>
    <el-form ref="biaoqian" :model="user" label-width="80px">
<!-- 
  <el-form-item label="岗位" >
    <el-input v-model="user.roleId"></el-input>
  </el-form-item> -->

    <el-form-item label="员工类型" :label-width="formLabelWidth">
      <el-select v-model="user.roleId" >
        <el-option label="请选择" value="0"></el-option>
      <el-option v-for="item in role" :key="item.id" :label="item.username" :value="item.id"></el-option>
      </el-select>
    </el-form-item>



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
    <el-button type="primary" @click="onSubmit">修改</el-button>
   
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
                    roleid:"",
                    username:"",
                    password:"",
                    address:"",
                    phone:"",
                    token:""

                },
                role:[]
        }
    },created(){
        //根据id查询
        let id=this.$route.query.id;
        this.axios.get("http://localhost:8088/user/userGetById",{
            params:{
                id
            }
        }).then((response)=>{
          if(response.status===200){
                console.log(response)
                this.user=response.data
                 this.user.token=sessionStorage.getItem("token")
          }
        }),
        this.axios.get("http://localhost:8088/role/listRole").then((response)=>{
          if(response.status===200){
             console.log(response)
                this.role=response.data
          }
        })

    }
    ,methods:{
        onSubmit(){
             
             
            this.axios.post("http://localhost:8088/user/updateUserByid",this.user).then((response)=>{
                  if(response.status===200){
                   if(this.user.roleId==2){
                    this.$router.push("/Employee/Cashier")
                   }
                   else if(this.user.roleId==3){
                      this.$router.push("/Employee/Inspector")
                   }else if(this.user.roleId==4){
                        this.$router.push("/Employee/TallyClerk")
                   }
                  }
            })
        }
    }
}
</script>