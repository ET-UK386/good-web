<template>
  <div>
    <el-card>
      购物车列表
      <el-form ref="form" :model="goodSku" label-width="80px">
        <el-form-item>
          <div class="searchShop">
            <el-input
              placeholder="请输入您想搜索的商品"
              v-model="goodSku.skuName"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item class="search">
          <el-button type="primary" @click="search()">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="selsChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="商品图片" width="120">
          <el-image
            style="width: 100px; height: 100px"
            :src="imgUrls[0].imagesPath.path"
            :preview-src-list="imgUrls"
          >
          </el-image>
        </el-table-column>
        <el-table-column prop="goodsku.skuName" label="商品名称" width="120">
        </el-table-column>
        <el-table-column prop="goodsku.skuDesc" label="商品详情" width="120">
        </el-table-column>
        <el-table-column prop="color.colorName" label="规格" width="120">
        </el-table-column>
        <el-table-column prop="price.price" label="单价" width="120">
        </el-table-column>
        <el-table-column label="数量">
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.number"
              :min="1"
              :max="scope.row.warehouse.stockNumber"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="总价(元)">
          <template slot-scope="scope">
            ￥<span class="sum">{{
              (scope.row.price.price * scope.row.number).toFixed(2)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button size="mini" type="warning">移入收藏夹</el-button>
            <el-button size="mini" type="danger" @click="multidelete()"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-button
        :disabled="this.sels.length === 0"
        type="danger"
        style="margin-left: 20px"
        @click="multidelete()"
        >删除</el-button
      >
      <div style="margin-top: 20px; margin-left: 1000px; display: inline-block">
        <span
          >已选商品(不含运费):<span style="color: red"
            >￥{{ goodsTotalPrice }}</span
          >元</span
        >
        <el-button type="success" style="margin-left: 20px">结算</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //模糊查询输入框
      goodSku: {
        skuName: "",
      },
      //表格数据
      tableData: [],

      // 上传图片属性
      imgUrls: [],
      // //数量最大值
      // max : warehouse.stockNumber
      sum: [],
      //选中的成员
      sels: [],
    };
  },
  // 计算商品总价
  computed: {
    // 商品总价
    goodsTotalPrice() {
      let total = this.tableData
        .map((row) => row.number * row.price.price)
        .reduce((total, num) => total + num);
      console.log(total);
      return total;
    },
  },
  methods: {
    //模糊查询
    search() {
      this.list();
    },
    //展示表格数据
    list() {
      this.axios
        .post("http://localhost:8088/shopcar/listShopCar", this.goodSku)
        .then((res) => {
          if (res.status == 200) {
            this.tableData = res.data;
            this.imgUrls = res.data;
          }
        })
        .catch((error) => {
          this.$message.info("网络正忙");
          console.log(error);
        });
    },
    //选中
    selsChange(sels) {
      this.sels = sels;
      console.log(this.sels[0]);
    },
    multidelete() {
      this.$confirm("你确定要删除该商品吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        //逻辑删除
        this.axios
          .post("http://localhost:8088/shopcar/deleteShopCar", this.sels)
          .then((res) => {
            if (res.status == 200) {
              if (res.data == 1) {
                this.$message.success("删除成功！");
                this.list();
              } else {
                this.$message.info("删除失败！");
                this.list();
              }
            }
          })
          .catch((error) => {
            this.$message.info("网络正忙");
            console.log(error);
          });
      });
    },
  },
  //创建完成时显示数据
  created() {
    this.list();
  },
};
</script>
<style>
.searchShop .el-input__inner {
  width: 300px;
  height: 40px;
  display: inline-block;
  position: absolute;
  left: 300px;
}
.search .el-button--primary {
  position: absolute;
  left: 610px;
  bottom: -1px;
}
</style>