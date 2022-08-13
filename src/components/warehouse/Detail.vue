<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="入库审核时间" width="180">
    </el-table-column>
    <el-table-column prop="name" label="订单编号" width="180">
    </el-table-column>
    <el-table-column prop="name" label="入库商品名称" width="180">
    </el-table-column>
    <el-table-column prop="name" label="入库状态" width="180">
    </el-table-column>
    <el-table-column prop="name" label="数量" width="180"> </el-table-column>
    <el-table-column prop="name" label="签收审核人" width="180">
    </el-table-column>
    <el-table-column prop="name" label="入库审核人" width="180">
    </el-table-column>
    <el-table-column label="查看">
      <el-button>查看</el-button>
    </el-table-column>
  </el-table>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          purchaseId: 1,
          detailedPurchaseId: 1,
          examineUserId: 2,
          examineTime: '2022-08-13T01:20:54.000+00:00',
          warehousingUserId: 3,
          warehousingTime: '2022-08-13T01:20:58.000+00:00',
          warehousingNumber: 30,
          detail: 1,
          purchase: {
            id: 1,
            purchaseDesc: '采购饮料',
            purchaseNumber: 30,
            examineUserId: 1,
            examineTime: '2022-08-12T03:06:11.000+00:00',
            examineOpinion: '',
            status: 2,
            examineUser: null,
            createUserId: null,
            createTime: null,
            userRenewId: null,
            renewTime: null
          },
          detailedPurchase: {
            id: 1,
            purchaseId: 1,
            vendorId: null,
            skuId: 1,
            batch: '00001',
            purchasePrice: 2.5,
            number: 30,
            status: 1,
            createUserId: null,
            createTime: null,
            userRenewId: null,
            renewTime: null
          },
          examineUser: {
            id: 2,
            roleId: 5,
            username: '李四',
            password: '123456',
            address: null,
            phone: null,
            createUserId: null,
            createTime: null,
            userRenewId: null,
            renewTime: null
          },
          warehousingUser: {
            id: 3,
            roleId: 6,
            username: '王五',
            password: '123456',
            address: null,
            phone: null,
            createUserId: null,
            createTime: null,
            userRenewId: null,
            renewTime: null
          },
          createUserId: null,
          createTime: null,
          userRenewId: null,
          renewTime: null
        }
      ]
    };
  },
  created() {
    // 绑定数据
    axios
      .get('http://localhost:8088/warehousing/findAll')
      .then((res) => {
        let data = res.data;
        console.log(data);
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
