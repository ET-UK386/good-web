<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="createTime" label="入库审核时间" width="180">
      </el-table-column>
      <el-table-column
        prop="detailedPurchase.batch"
        label="订单编号"
        width="180"
      >
      </el-table-column>
      <el-table-column prop="goodsku.skuName" label="入库商品名称" width="180">
      </el-table-column>

      <el-table-column label="状态" width="180">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.statusStr }}</el-tag>
        </template>
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
    <el-dialog title="仓库记录" :visible.sync="dialogTableVisible">
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
              :value="
                gridData.examineUser == null
                  ? ''
                  : gridData.examineUser.username
              "
            />
          </td>
          <td class="right">审核时间</td>
          <td colspan="3">
            <input
              readonly
              type="text"
              :value="gridData.examineTime == null ? '' : gridData.examineTime"
            />
          </td>
        </tr>
        <tr>
          <td class="right">入库人</td>
          <td>
            <input
              readonly
              type="text"
              :value="
                gridData.warehousingUser == null
                  ? ''
                  : gridData.warehousingUser.username
              "
            />
          </td>
          <td class="right">入库时间</td>
          <td colspan="3">
            <input
              readonly
              type="text"
              :value="
                gridData.warehousingTime == null ? '' : gridData.warehousingTime
              "
            />
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
        examineTime: '',
        warehousingTime: '',
        status: 0,
        statusStr: 0,
        detailedPurchase: {
          batch: '',
          purchasePrice: 0,
          number: 0
        },
        examineUser: {
          username: ''
        },
        warehousingUser: {
          username: ''
        },
        goodsku: {
          skuName: '',
          skuDesc: ''
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
            this.gridData = data.data;
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
