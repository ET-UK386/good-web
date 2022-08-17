<template>
  <div style="height: 100%">
    <el-table :data="tableData" height="100%" border style="width: 100%">
      <el-table-column prop="id" label="id" width="80px"> </el-table-column>
      <el-table-column prop="purchaseDesc" label="描述" width="100px">
      </el-table-column>
      <el-table-column prop="purchaseNumber" label="购买数量" width="100px">
      </el-table-column>
      <el-table-column prop="examineUser.username" label="审核人" width="100px">
      </el-table-column>
      <el-table-column prop="examineTime" label="审核时间" width="100px">
      </el-table-column>
      <el-table-column prop="examineOpinion" label="审核人意见" width="100px">
      </el-table-column>
      <el-table-column prop="status" label="审核状态" width="100px">
      </el-table-column>
      <el-table-column prop="createUser.username" label="创建人" width="100px">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间"> </el-table-column>
      <el-table-column prop="userRenew.username" label="更新人">
      </el-table-column>
      <el-table-column prop="renewTime" label="更新时间"> </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-search"
            circle
            @click="show(scope.row)"
          ></el-button>
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- dialog -->
    <el-dialog title="查看" width="80%" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column prop="id" label="id" width="80px"/>
        <el-table-column prop="purchase.id" label="进货单号" width="100px"/>
        <el-table-column prop="vendor.id" label="经销商编号" width="100px"/>
        <el-table-column prop="goodsku.id" label="商品sku号" width="100px"/>
        <el-table-column prop="batch" label="批次" width="100px"/>
        <el-table-column prop="purchasePrice" label="单价" width="100px"/>
        <el-table-column prop="status" label="审核状态" width="100px"/>
        <el-table-column prop="createUser.username" label="创建人" width="100px"/>
        <el-table-column prop="createTime" label="创建时间"/>
        <el-table-column prop="renewUser.username" label="更新人"/>
        <el-table-column prop="renewTime" label="更新时间"/>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      tableData: [],
      gridData: [],
    };
  },
  methods: {
    show(row) {
      let id = row.id;
      this.dialogTableVisible = true;
      // 查看详情
      axios
        .get("http://localhost:8088/listPurchaseDetailedPurchaseById/" + id)
        .then((res) => {
          let data = res.data;
          console.log(data);
          if (res.status === 200) {
            this.gridData = data;
            this.gridData.forEach((item) => {
              if (item.status == 0) {
                item.status = "审核中";
              } else if (item.status == 1) {
                item.status = "审核完成";
              } else if (item.status == 2) {
                item.status = "审核不通过";
              } else if (item.status == 3) {
                item.status = "审核驳回需要修改";
              } else if (item.status == 4) {
                item.status = "订单完成";
              }
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //取消添加操作
    noShow() {
      this.dialogTableVisible = false;
    },

    // 绑定数据
    list() {
      this.axios
        .get("http://localhost:8088/showAllStoke")
        .then((res) => {
          let data = res.data;
          if (res.status === 200) {
            this.tableData = data;
            this.tableData.forEach((item) => {
              if (item.status == 0) {
                item.status = "审核中";
              } else if (item.status == 1) {
                item.status = "审核完成";
              } else if (item.status == 2) {
                item.status = "审核不通过";
              } else if (item.status == 3) {
                item.status = "审核驳回需要修改";
              } else if (item.status == 4) {
                item.status = "订单完成";
              }
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.list();
  },
};
</script>