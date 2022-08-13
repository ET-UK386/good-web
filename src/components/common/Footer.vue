<template>
    <div>
    <el-card class="footer">
        本网页制作者：{{User}}
    </el-card>
    </div>
</template>
<script>
export default {
    data(){
        return{
            User:"胡浩浩&5人"
        }
    }
}
</script>
<style>
    .footer{
        text-align: center;
        font-size: 18px;
    }
</style>