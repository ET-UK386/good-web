<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="入库时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="detailedPurchase.batch"
        label="订单编号"
        width="180"
      >
      </el-table-column>
      <el-table-column prop="goodsku.skuName" label="商品名称" width="180">
      </el-table-column>
      <el-table-column label="状态" width="180">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.statusStr }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="warehousingNumber" label="数量" width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >审核</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="签收审核" :visible.sync="dialogTableVisible">
      <table id="table" cellspacing="0">
        <tr>
          <td class="right">入库批号</td>
          <td>
            <input
              readonly="readonly"
              type="text"
              v-model="gridData.detailedPurchase.batch"
            />
          </td>
          <td class="right">入库单</td>
          <td colspan="3">
            <input readonly="readonly" type="text" v-model="gridData.id" />
          </td>
        </tr>

        <tr>
          <td class="right">商品名称</td>
          <td>
            <input
              readonly="readonly"
              type="text"
              v-model="gridData.goodsku.skuName"
            />
          </td>
          <td class="right">数量</td>
          <td>
            <input
              class="b endit"
              readonly="readonly"
              type="text"
              v-model="gridData.warehousingNumber"
            />
          </td>
          <td class="right">价格</td>
          <td>
            <input
              class="b endit"
              readonly="readonly"
              type="text"
              v-model="gridData.detailedPurchase.purchasePrice"
            />
          </td>
        </tr>
        <tr>
          <td colspan="6">审核备注</td>
        </tr>
        <tr>
          <td colspan="5" rowspan="2">
            <textarea
              v-model="gridData.signingDetails"
              style="width: 100%; height: 100%"
            ></textarea>
          </td>
          <td></td>
        </tr>
        <tr>
          <td colspan="5" style="text-align: right">
            <button class="btn" @click="endit">操作</button>
            <button class="btn" @click="noSub" style="width: 60px">
              不通过
            </button>
            <button class="btn" @click="sub">通过</button>
          </td>
        </tr>
      </table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  methods: {
    handleEdit(index, row) {
      this.dialogTableVisible = true;
      this.$data.contract = JSON.parse(JSON.stringify(row));
      this.gridData = this.$data.contract;
    },
    // 操作
    endit() {
      let readonly = document.getElementsByClassName('b');
      readonly[0].removeAttribute('readonly');
      readonly[1].removeAttribute('readonly');
      readonly[0].style.border = '1px solid black';
      readonly[1].style.border = '1px solid black';
      this.gridData.status = 2;

      let endit = document.getElementsByClassName('endit');

      console.log(endit);
    },
    // 通过
    sub() {
      if (this.gridData.status != 2) {
        this.gridData.status = 3;
      }
      this.gridData.token = sessionStorage.getItem('token');
      this.axios
        .put(
          'http://localhost:8088/warehousing/checkBeforeStorage',
          this.gridData
        )
        .then((res) => {
          let data = res.data;
          if (data.code === 200) {
            this.dialogTableVisible = false;
            this.$message.success(data.message);
            this.bindData();
          } else {
            this.$message.error(data.message);
          }
        });
    },
    // 不通过
    noSub() {
      this.gridData.status = 1;
      this.gridData.token = sessionStorage.getItem('token');
      this.axios
        .put(
          'http://localhost:8088/warehousing/checkBeforeStorage',
          this.gridData
        )
        .then((res) => {
          let data = res.data;
          if (data.code === 200) {
            this.dialogTableVisible = false;
            this.$message.success(data.message);
            this.bindData();
          }
        });
    },
    bindData() {
      this.axios
        .get('http://localhost:8088/warehousing/checkBeforeStorage')
        .then((res) => {
          let data = res.data;
          if (data.code === 200) {
            this.tableData = data.data;
          } else {
            this.$message.error(data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },

  data() {
    return {
      tableData: [],
      dialogTableVisible: false,
      gridData: {
        id: 1,
        examineTime: '',
        warehousingTime: '',
        warehousingNumber: 0,
        status: 1,
        statusStr: 1,
        detailedPurchase: {
          batch: '',
          purchasePrice: 2.5,
          number: 30
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
  created() {
    this.bindData();
  }
};
</script>

<style>
#Audit {
  width: 80%;
  margin: 0 auto;
}
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
.btn {
  margin-left: 10px;
  width: 50px;
  height: 30px;
}
</style>
