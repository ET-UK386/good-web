<template>
  <el-card class="box-card" style="height: 80%">
    <div slot="header" class="clearfix">
      <span>订单详情</span>
    </div>
    <div>
      <el-input
        v-model="SalesDetails"
        style="width: 28%"
        placeholder="请输入标题进行搜索"
      ></el-input
      >&nbsp;<el-button plain @click="SalesDetailsByName">订单搜索</el-button>
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
                :disabled="scope.row.state == '已收货' ? true : false"
                >{{
                  scope.row.state == "未支付" ? "立即支付" : "立即收货"
                }}</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <!-- dialog -->
    <el-dialog
      title="订单详情"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <span slot="footer" class="dialog-footer">
        <el-table :data="gridData" border style="width: 100%">
          <el-table-column fixed prop="goodsku.skuName" label="宝贝名称"/>
          <el-table-column fixed prop="price" label="单价"/>
          <el-table-column fixed prop="number" label="数量"/>
          <el-table-column fixed prop="vendor.vendorName" label="商家"/>
          <el-table-column fixed prop="state" label="交易状态"/>
        </el-table>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      ReceivingButton: false,
      SalesDetails: "",
      dialogVisible: false,
    };
  },
  methods: {
    //根据名字查询
    SalesDetailsByName() {
      this.axios
        .get("http://localhost:8088/listSalesDetailsByName", {
          params: {
            name: this.SalesDetails,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            this.tableData = res.data;
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
        });
    },

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
    show(row) {
      this.axios
        .get("http://localhost:8088/listSalesDetailsById", {
          params: {
            id: row,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            this.gridData = res.data;
            this.gridData.forEach((item) => {
              if (item.state == 0) {
                item.state = "未支付";
              } else if (item.state == 1) {
                item.state = "未收货";
              } else {
                item.state = "已收货";
              }
            });
          }
        });
    },
    ViewOrder(row) {
      this.dialogVisible = true;
      this.show(row.id);
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
