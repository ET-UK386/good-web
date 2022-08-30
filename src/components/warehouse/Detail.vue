<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="createTime" label="入库审核时间">
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.statusStr }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="warehousingNumber" label="数量"> </el-table-column>
      <el-table-column prop="examineUser.username" label="签收审核人">
      </el-table-column>
      <el-table-column prop="warehousingUser.username" label="入库审核人">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="show(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="仓库记录" :visible.sync="dialogTableVisible">
      <el-table :data="gridData" border style="width: 100%">
        <el-table-column fixed prop="goodsku.skuName" label="商品名称">
        </el-table-column>
        <el-table-column prop="vendor.vendorName" label="供应商">
        </el-table-column>
        <el-table-column prop="number" label="进货数量"> </el-table-column>
        <el-table-column prop="purchasePrice" label="进货单价">
        </el-table-column> </el-table
    ></el-dialog>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tableData: [],
      dialogTableVisible: false,
      /** 详细订单数据*/
      gridData: []
    };
  },
  methods: {
    show(row) {
      let wid = row.id;
      console.log(wid);
      this.dialogTableVisible = true;
      // 查看详情
      this.axios
        .get(
          'http://localhost:8088/warehousing/getDetailedWarehousingByWarehousingId/' +
            wid
        )
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.gridData = res.data.data;
          } else {
            this.$message.error('网络正忙');
          }
        });
    }
  },
  created() {
    // 绑定数据
    axios
      .get('http://localhost:8088/warehousing/findAll')
      .then((res) => {
        let data = res.data;
        if (data.code) {
          this.tableData = data.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
</script>

<style>
#table td {
  width: 150px;
  height: 50px;
  font-size: 16px;
}
#table input {
  border: none;
  outline: none;
  font-size: 16px;
}
.right {
  text-align: right;
  padding-right: 10px;
}
</style>
