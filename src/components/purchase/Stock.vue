<template>
  <div>
    <el-button @click="dialogFormVisible = true" type="primary"
      >添加商品</el-button
    >
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="skuNameStr" label="商品名称">
      </el-table-column>
      <el-table-column prop="vendorName" label="供应商"> </el-table-column>
      <el-table-column prop="number" label="进货数量"> </el-table-column>
      <el-table-column prop="purchasePrice" label="进货单价"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            @click="del(scope.$index, scope.row)"
            type="text"
            size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-button @click="submit" type="success">提 交</el-button>

    <el-dialog title="具体商品" :visible.sync="dialogFormVisible">
      <el-form
        :model="form"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item
          label="进货商品"
          :label-width="formLabelWidth"
          prop="skuId"
        >
          <el-select v-model="form.skuId" placeholder="请选择商品">
            <el-option
              v-for="item in goodskus"
              :key="item.value"
              :label="item.skuNameStr"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="供应商"
          :label-width="formLabelWidth"
          prop="vendorId"
        >
          <el-select v-model="form.vendorId" placeholder="请选择供应商">
            <el-option
              v-for="item in venders"
              :key="item.value"
              :label="item.vendorName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="进货数量"
          :label-width="formLabelWidth"
          prop="number"
        >
          <el-input v-model.number="form.number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="进货单价"
          :label-width="formLabelWidth"
          prop="purchasePrice"
        >
          <el-input v-model="form.purchasePrice" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">关 闭</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  methods: {
    del(index, row) {
      console.log(index, row);
      this.tableData.splice(index, 1);
    },
    add() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          for (let i = 0; i < this.goodskus.length; i++) {
            if (this.goodskus[i].id == this.form.skuId) {
              this.form.skuName = this.goodskus[i].skuName;
              this.form.skuNameStr = this.goodskus[i].skuNameStr;
            }
          }
          for (let i = 0; i < this.venders.length; i++) {
            if (this.venders[i].id == this.form.vendorId) {
              console.log(this.venders[i]);
              this.form.vendorName = this.venders[i].vendorName;
            }
          }
          this.tableData.push(this.form);
          console.log(this.tableData);
          this.form = {};
          this.dialogFormVisible = false;
        } else {
          console.log('error submit!!');
          return;
        }
      });
    },
    submit() {
      if (this.tableData.length == 0) {
        this.$alert('请添加商品');
        return;
      }
      this.axios
        .post('http://localhost:8088/purchase/addPurchase', this.tableData)
        .then((res) => {
          if (res.status === 200) {
            this.$message.success(res.data.message);
            location.reload();
          }
        });
    },
    // 页面加载时绑定数据
    bindData() {
      this.axios
        .get('http://localhost:8088/purchase/getGookSku')
        .then((res) => {
          let data = res.data;
          if (res.status === 200) {
            this.goodskus = data.data;
          }
        })
        .catch((error) => {
          this.$message.info('网络正忙');
          console.log(error);
        });

      this.axios
        .get('http://localhost:8088/purchase/getVendor')
        .then((res) => {
          let data = res.data;
          if (res.status === 200) {
            this.venders = data.data;
          }
        })
        .catch((error) => {
          this.$message.info('网络正忙');
          console.log(error);
        });
    }
  },

  data() {
    var checkNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('数量不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数量'));
        } else {
          if (value <= 0) {
            callback(new Error('请输入正确数量'));
          } else {
            callback();
          }
        }
      }, 100);
    };
    var checkPurchasePrice = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('数量不能为空'));
      }
      setTimeout(() => {
        let t1 = /^\d+(\.\d+)?$/;
        let t2 =
          /(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0)$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/;
        if (!t1.test(value)) {
          callback(new Error('金额不合法'));
        } else {
          if (!t2.test(value)) {
            callback(new Error('请只保留两位小数'));
          } else {
            callback();
          }
        }
      }, 100);
    };
    return {
      // 添加到流程的信息订单
      tableData: [],
      dialogFormVisible: false,
      // 添加的信息
      form: {},
      goodskus: [],
      venders: [],
      formLabelWidth: '120px',
      rules: {
        skuId: [{ required: true, message: '请选择商品', trigger: 'bulr' }],
        vendorId: [
          { required: true, message: '请选择供应商', trigger: 'bulr' }
        ],
        number: [{ validator: checkNumber, trigger: 'blur' }],
        purchasePrice: [{ validator: checkPurchasePrice, trigger: 'blur' }]
      }
    };
  },
  created() {
    this.bindData();
    console.log(this.goodskus);
  }
};
</script>
