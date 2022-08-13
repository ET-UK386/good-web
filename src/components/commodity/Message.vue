<template>
  <div>商品信息
    <el-table :data="goodspu"  style="width: 100%">
      <el-table-column prop="skuName" label="商品名" width="180"> </el-table-column>
      <el-table-column prop="skuDesc" label="商品描述" width="180"> </el-table-column>
      <el-table-column prop="goodspu.brand" label="品牌商" width="180"> </el-table-column>
      <el-table-column prop="goodspu.status" label="上架状态" width="180"> </el-table-column>
      <el-table-column prop="sortName" label="所属分类" width="180"> </el-table-column>
      <el-table-column prop="colorName" label="颜色" width="180"> </el-table-column>
      <el-table-column prop="price" label="价格" width="180"> </el-table-column>
      <el-table-column prop="stockNumber" label="库存" width="180"> </el-table-column>
      <el-table-column prop="unitsName" label="单位名称" width="180"> </el-table-column>
      <el-table-column prop="manufacturer" label="生产商" width="180"> </el-table-column>
      <el-table-column prop="vendorName" label="供应商" width="180"> </el-table-column>
      <el-table-column prop="userName" label="创建人" width="180"> </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="180"> </el-table-column>
      <el-table-column prop="renewName" label="修改人" width="180"> </el-table-column>
      <el-table-column prop="renewTime" label="修改时间" width="180"> </el-table-column>
    </el-table> 
  </div>
</template>
<script>
export default {
  data() {
    return {
        goodspu:[],
    };
  },
  created() {
    this.axios.get("http://localhost:8088/goodspu/listGoodsku").then((response) => {

      console.log(response)
      if (response.status === 200) {
        this.goodspu = response.data;
        console.log(response.data)
      }
    });
  },
};
</script>