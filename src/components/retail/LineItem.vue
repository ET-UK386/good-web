<template>
  <el-card class="box-card" style="height: 80%">
    <div slot="header" class="clearfix">
      <span>订单详情</span>
    </div>
    <div>
      <el-input
        v-model="input"
        style="width: 28%"
        placeholder="请输入批号或标题进行搜索！！！！！暂时没写此功能！！！！！"
      ></el-input
      >&nbsp;<el-button plain>订单搜索</el-button>
      <template>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="goodsku.skuName" label="宝贝名称" />
          <el-table-column prop="price" label="单价" />
          <el-table-column prop="number" label="数量" />
          <el-table-column prop="vendor.vendorName" label="商家" />
          <el-table-column prop="state" label="交易状态" />
          <el-table-column label="交易操作" fixed="right" width="300%">
            <template slot-scope="scope">
              <el-button
                type="primary"
                @click="ViewOrder(scope.row)"
                icon="el-icon-search"
                >查看订单</el-button
              >
              <el-button
                type="primary"
                @click="ConfirmReceipt(scope.row)"
                icon="el-icon-sold-out"
                :disabled="ReceivingButton"
                >确认收货</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      ReceivingButton: false,
    };
  },
  methods: {
    // 页面加载时绑定数据
    bindData() {
      this.axios
        .get("http://127.0.0.1:8088/listSalesDetails")
        .then((res) => {
          let data = res.data;
          if (res.status === 200) {
            this.tableData = data;
            this.tableData.forEach((item) => {
              if (item.state == 0) {
                item.state = "未支付";
              } else if (item.state == 1) {
                item.state = "未收货";
              } else {
                item.state = "已收货";
              }
            });
          }
        })
        .catch((error) => {
          this.$message.info("网络正忙");
          console.log(error);
        });
    },
    ViewOrder(row) {
      console.log(row.id);
    },
    ConfirmReceipt(row) {
      console.log(row.id);
    },
  },
  created() {
    this.bindData();
  },
};
</script>
