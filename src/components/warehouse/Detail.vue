<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="warehousingTime" label="入库审核时间" width="180">
      </el-table-column>
      <el-table-column
        prop="detailedPurchase.batch"
        label="订单编号"
        width="180"
      >
      </el-table-column>
      <el-table-column prop="goodsku.skuName" label="入库商品名称" width="180">
      </el-table-column>
      <el-table-column prop="statusStr" label="入库状态" width="180">
      </el-table-column>
      <el-table-column prop="warehousingNumber" label="数量" width="180">
      </el-table-column>
      <el-table-column
        prop="examineUser.username"
        label="签收审核人"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="warehousingUser.username"
        label="入库审核人"
        width="180"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="show(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
      <table id="table" cellspacing="0">
        <tr>
          <td class="right">入库批号</td>
          <td>
            <input
              readonly
              type="text"
              :value="gridData.detailedPurchase.batch"
            />
          </td>
          <td class="right">入库单</td>
          <td colspan="3">
            <input readonly type="text" :value="gridData.id" />
          </td>
        </tr>
        <tr>
          <td class="right">审核人</td>
          <td>
            <input
              readonly
              type="text"
              :value="gridData.examineUser.username"
            />
          </td>
          <td class="right">审核时间</td>
          <td colspan="3">
            <input readonly type="text" :value="gridData.examineTime" />
          </td>
        </tr>
        <tr>
          <td class="right">入库人</td>
          <td>
            <input
              readonly
              type="text"
              :value="gridData.warehousingUser.username"
            />
          </td>
          <td class="right">入库时间</td>
          <td colspan="3">
            <input readonly type="text" :value="gridData.warehousingTime" />
          </td>
        </tr>
        <tr>
          <td class="right">商品名称</td>
          <td>
            <input readonly type="text" :value="gridData.goodsku.skuName" />
          </td>
          <td class="right">数量</td>
          <td>
            <input readonly type="text" :value="gridData.warehousingNumber" />
          </td>
          <td class="right">价格</td>
          <td>
            <input
              readonly
              type="text"
              :value="gridData.detailedPurchase.purchasePrice"
            />
          </td>
        </tr>
      </table>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tableData: [],
      dialogTableVisible: false,
      gridData: {
        id: 1,
        examineTime: '2022-08-13T01:20:54.000+00:00',
        warehousingTime: '2022-08-13 01:20:58',
        status: 1,
        statusStr: 1,
        detailedPurchase: {
          batch: '00001',
          purchasePrice: 2.5,
          number: 30
        },
        examineUser: {
          username: '李四'
        },
        warehousingUser: {
          username: '王五'
        },
        goodsku: {
          skuName: '百世可乐',
          skuDesc: '百世可乐'
        }
      }
    };
  },
  methods: {
    show(row) {
      let wid = row.id;
      this.dialogTableVisible = true;
      // 查看详情
      axios
        .get('http://localhost:8088/warehousing/find/' + wid)
        .then((res) => {
          let data = res.data;
          if (data.code) {
            data.data.this.gridData = data.data;
          }
        })
        .catch((error) => {
          console.log(error);
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
