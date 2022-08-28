<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="入库时间">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.statusStr }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="warehousingNumber" label="数量"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >审核</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="商品列表" :visible.sync="dialogTableVisible">
      <el-table :data="gridData" border style="width: 100%">
        <el-table-column fixed prop="goodsku.skuNameStr" label="商品名称">
        </el-table-column>
        <el-table-column prop="vendor.vendorName" label="供应商">
        </el-table-column>
        <el-table-column label="进货数量">
          <template slot-scope="scope">
            <el-input
              :class="'warehousing inp inp' + scope.row.id"
              :id="'inp' + scope.row.id"
              v-model="scope.row.number"
              readonly="readonly"
              placeholder="请输入内容"
              @blur="rule(scope.row.number)"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="purchasePrice" label="进货单价">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="modify(scope.$index, scope.row)" type="text"
              >修改</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-input
        v-model="warehousing.signingDetails"
        placeholder="请输入内容"
      ></el-input>

      <el-select v-model="warehousing.status" placeholder="请选择">
        <el-option
          v-for="item in option"
          :key="item.status"
          :label="item.value"
          :value="item.status"
        >
        </el-option>
      </el-select>

      <el-button type="primary" @click="submit" style="margin-left: 92.3%"
        >提交</el-button
      >
    </el-dialog>
  </div>
</template>

<script>
export default {
  methods: {
    handleEdit(index, row) {
      this.dialogTableVisible = true;
      this.$data.contract = JSON.parse(JSON.stringify(row));
      this.warehousing.id = row.id;
      // 查看详情
      let wid = row.id;
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
    },
    modify(index, row) {
      console.log(index, row);

      // 实现单个输入框展示
      let inp = 'inp' + row.id;
      let inputc = document.getElementsByClassName(inp);
      let inputa = document.getElementsByClassName('inp');
      for (let i = 0; i < inputa.length; i++) {
        inputa[i].classList.add('warehousing');
        let el = inputa[i].childNodes;
        el[1].setAttribute('readonly', 'readonly');
      }
      inputc[0].classList.remove('warehousing');

      let input = inputc[0].childNodes;
      input[1].removeAttribute('readonly');
    },
    submit() {
      this.warehousing.detailedWarehousingList = this.gridData;
      this.warehousing.token = sessionStorage.getItem('token');

      this.axios
        .put(
          'http://localhost:8088/warehousing/inventoryAudit',
          this.warehousing
        )
        .then((res) => {
          if (res.status === 200) {
            this.$message.success('操作成功');
            this.bindData();
            this.dialogTableVisible = false;
            this.warehousing.signingDetails = '';
          }
        });

      console.log(this.warehousing);
    },
    rule(number) {
      if (isNaN(number)) {
        this.$alert('数量不合法');
      }
    },
    bindData() {
      this.axios
        .get('http://localhost:8088/warehousing/inventoryAudit')
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
      dialogFormVisible: false,
      gridData: [],
      formLabelWidth: '120px',
      warehousing: { status: 1 },
      option: [
        { status: 1, value: '通过' },
        { status: -1, value: '不通过' }
      ]
    };
  },
  created() {
    this.bindData();
  }
};
</script>

<style>
.warehousing .el-input__inner {
  border: none;
}
</style>
