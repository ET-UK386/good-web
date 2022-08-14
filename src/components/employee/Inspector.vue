<template>
    <div>
     姓名：<el-input v-model="username" placeholder="请输入内容" style=" width: 150px;"></el-input>
     地址:<el-input v-model="address" placeholder="请输入内容" style=" width: 150px;"></el-input>
     电话:<el-input v-model="phone" placeholder="请输入内容" style=" width: 150px;"></el-input>

      
   
       <el-button type="primary" style="margin-left: 20px;" @click="querynove">查询</el-button>
        <el-button type="primary" style="margin-left: 20px;" @click="addnove">添加</el-button>
        <el-table :data="allUser" border  style="width: 100%">
        
    <el-table-column prop="role.username" label="职务" width="100"> </el-table-column>
    <el-table-column prop="username" label="姓名" width="100"> </el-table-column>
    <el-table-column prop="address" label="地址" width="100"> </el-table-column>
    <el-table-column prop="phone" label="电话" width="100"> </el-table-column>
  
    <el-table-column prop="createUserId" label="创建人id" width="100">
      
     
       
    
        </el-table-column>


    
    <el-table-column prop="createTime" label="创建时间" width="100"> </el-table-column>
    <el-table-column prop="userRenewId" label="更新人id" width="100"> </el-table-column>
    <el-table-column prop="renewTime" label="更新时间" width="100"> </el-table-column>
    <el-table-column prop="role.power.canUse" label="权限" width="100"> </el-table-column>
    <el-table-column prop="role.parentId" label="上级" width="100"> </el-table-column>

     <el-table-column  label="操作" width="150"> 
      <template  slot-scope="scope">   <!--绑定他的id，这个是的绑定规则就得这样-->
        <el-button type="primary" icon="el-icon-edit" circle @click="updatenovle(scope.row)"></el-button>
        <el-button type="danger" icon="el-icon-delete" circle  @click="del(scope.row)"></el-button>
        </template>
     </el-table-column>
  

  </el-table>




    </div>
</template>

<script>


export default {
    data(){
        return{
            allUser:[],
            userlist:[],

            username:"",
            address:"",
            phone:""

        }
    },methods:{
        updatenovle(row){
            let id=row.id;
           
            this.$router.push("/updateUse?id="+id)
        
        },
        del(row){
            this.$confirm('确定要开除名为    '+row.username+ '    的员工吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
                 let id=row.id;
            this.axios.get("http://localhost:8088/user/deleteByid",{
               params: {
                    id
                }
            }).then((response)=>{
                if(response.status===200){
                   this.$message({
            type: 'success',
            message: '删除成功!'
          
          })
                   this.list(); 
                }
            })
        })



           

        },
        querynove(){
            this.list()
        },
        addnove(){
            this.$router.push("/addSurveyor")
      
     
        }
            ,
        list(){
              this.axios.get("http://localhost:8088/user/Listsurveyor",{
                
                params:{
                   
                    username:this.username,
                address:this.address,
                phone:this.phone
                }

              }).then((response)=>{
                if(response.status===200){
                    this.allUser=response.data
                    console.log(response)
                }

        })
        },
        user(){
            this.axios.get("http://localhost:8088/user/Listtally").then((response)=>{
                if(response.status===200){
                    this.userlist=response.data
                    console.log(response)
                }

        })
        }
       
    },
    created(){

        this.list();
        this.user();
      
    }
}
</script>
