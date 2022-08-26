<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="createTime" label="日期"> </el-table-column>
      <el-table-column prop="purchaseNumber" label="订单商品条数">
      </el-table-column>
      <el-table-column prop="sumPrice" label="进货总价格"></el-table-column>
      <el-table-column label="审核状态">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.examineStatusStr }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="examineUser.username" label="审核人">
      </el-table-column>
      <el-table-column prop="examineTime" label="审核时间"> </el-table-column>
      <el-table-column prop="examineOpinion" label="审核意见">
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text"
            >查看</el-button
          >
          <el-button type="text" @click="audit(scope.row)">审核</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="详细订单" :visible.sync="dialogTableVisible">
      <el-table :data="gridData" border style="width: 100%">
        <el-table-column fixed prop="goodsku.skuName" label="商品名称">
        </el-table-column>
        <el-table-column prop="vendor.vendorName" label="供应商">
        </el-table-column>
        <el-table-column prop="number" label="进货数量"> </el-table-column>
        <el-table-column prop="purchasePrice" label="进货单价">
        </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog title="流程审核" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="审核状态" :label-width="formLabelWidth">
          <el-select v-model="form.examineStatus" placeholder="请选择审核状态">
            <el-option label="通过" value="1"></el-option>
            <el-option label="不通过" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="意见"
          :label-width="formLabelWidth"
          v-if="form.examineStatus == 2"
        >
          <el-input v-model="form.examineOpinion" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick(row) {
      this.dialogTableVisible = true;
      let purchaseId = row.id;
      this.axios
        .get(
          'http://localhost:8088/purchase/getDetailedPurchaseByPurchaseId/' +
            purchaseId
        )
        .then((res) => {
          if (res.status === 200) {
            this.gridData = res.data.data;
          }
        })
        .catch(() => {
          this.$message.danger('网络正忙');
        });
    },
    audit(row) {
      this.dialogFormVisible = true;
      this.form.id = row.id;
    },
    submit() {
      this.form.token = sessionStorage.getItem('token');
      console.log(this.form);
      this.axios
        .put('http://localhost:8088/purchase/purchaseAudit', this.form)
        .then((res) => {
          if (res.status === 200) {
            if (res.data.code === 200) {
              this.$message.success('审核成功');
              this.dialogFormVisible = false;
              let purchase = res.data.data;
              // 创建入库订单
              this.axios
                .post(
                  'http://localhost:8088/warehousing/createWarehousing',
                  purchase
                )
                .then((res) => {
                  if (res.status === 200) {
                    this.$message.success('入库成功');
                  }
                });
              this.bindList();
            } else if (res.data.code === 404) {
              this.$message.success('审核成功');
              this.dialogFormVisible = false;
              this.bindList();
            }
          } else {
            this.$message.success(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    bindList() {
      this.axios
        .get('http://localhost:8088/purchase/getPurchase')
        .then((res) => {
          let data = res.data;
          if (res.status == 200) {
            this.tableData = data.data;
          }
        });
    }
  },

  data() {
    return {
      tableData: [],
      gridData: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {},
      formLabelWidth: '120px'
    };
  },
  created() {
    this.bindList();
  }
};
</script>
