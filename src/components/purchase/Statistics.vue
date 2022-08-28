<template>
  <div>
    <!-- 主体展示-->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="createTime" label="日期" sortable>
      </el-table-column>
      <el-table-column prop="purchaseNumber" label="订单商品条数">
      </el-table-column>
      <el-table-column prop="sumPrice" label="进货总价格"></el-table-column>
      <el-table-column
        prop="examineStatusStr"
        label="状态"
        :filters="[
          { text: '审核完成', value: '审核完成' },
          { text: '审核不通过', value: '审核不通过' }
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="
              scope.row.examineStatusStr === '审核完成' ? 'success' : 'danger'
            "
            disable-transitions
            >{{ scope.row.examineStatusStr }}</el-tag
          >
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
          <el-button type="text" @click="audit(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 主体展示点击查看操作-->
    <el-dialog title="详细订单" :visible.sync="dialogTableVisible">
      <el-table :data="gridData" border style="width: 100%">
        <el-table-column fixed prop="skuNameStr" label="商品名称">
        </el-table-column>
        <el-table-column prop="vendorName" label="供应商"> </el-table-column>
        <el-table-column prop="number" label="进货数量"> </el-table-column>
        <el-table-column prop="purchasePrice" label="进货单价">
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 主体展示点击班级流程-->
    <el-dialog title="修改流程" :visible.sync="dialogTableVisible1">
      <el-button @click="dialogFormVisible1 = true" type="primary"
        >添加商品</el-button
      >
      <el-button @click="submit" type="success">提 交</el-button>
      <el-table :data="gridData" border style="width: 100%">
        <el-table-column fixed prop="skuName" label="商品名称">
        </el-table-column>
        <el-table-column prop="vendorName" label="供应商"> </el-table-column>
        <el-table-column prop="number" label="进货数量"> </el-table-column>
        <el-table-column prop="purchasePrice" label="进货单价">
        </el-table-column>
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
    </el-dialog>

    <!--修改流程中的添加商品-->
    <el-dialog title="添加商品" :visible.sync="dialogFormVisible1">
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
              :label="item.skuName"
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
        <el-button @click="dialogFormVisible1 = false">关 闭</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  methods: {
    /**主体展示查看按钮 */
    handleClick(row) {
      this.dialogTableVisible = true;
      this.show(row);
      console.log(this.gridData);
    },
    /**主体展示修改按钮 */
    audit(row) {
      if (row.examineStatus == 1) {
        this.$alert('订单已完成，不支持修改');
        return;
      }
      this.show(row);
      this.dialogTableVisible1 = true;
      let purchaseId = row.id;
      console.log(purchaseId);
    },
    /**主体展示、状态过滤器 */
    filterTag(value, row) {
      return row.examineStatusStr === value;
    },
    /**修改流程中的删除操作 */
    del(index, row) {
      console.log(index, row);
      this.gridData.splice(index, 1);
    },
    /**修改流程中的提交按钮操作 */
    submit() {
      if (this.gridData.length == 0) {
        this.$alert('请添加商品');
        return;
      }
      console.log(this.gridData);
      this.axios
        .put('http://localhost:8088/purchase/modifyPurchase', {
          list: this.gridData,
          purchaseId: this.purchaseId
        })
        .then((res) => {
          if (res.status === 200) {
            this.$message.success(res.data.message);
            this.tableData = {};
          }
        });
      this.dialogTableVisible1 = false;
    },
    /**修改流程中的添加按钮操作 */
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
          this.gridData.push(this.form);
          this.form = {};
          this.dialogFormVisible1 = false;
        } else {
          console.log('error submit!!');
          return;
        }
      });
    },
    /**绑定主体数据 */
    bindList() {
      this.axios
        .get('http://localhost:8088/purchase/getPurchaseAudi')
        .then((res) => {
          let data = res.data;
          if (res.status == 200) {
            this.tableData = data.data;
          }
        });
    },
    /**根据PurchaseId查找对应详细订单绑定 */
    show(row) {
      this.purchaseId = row.id;
      this.axios
        .get(
          'http://localhost:8088/purchase/getDetailedPurchaseByPurchaseId/' +
            this.purchaseId
        )
        .then((res) => {
          if (res.status === 200) {
            this.gridData = res.data.data;
            for (let i = 0; i < this.gridData.length; i++) {
              this.gridData[i].skuName = this.gridData[i].goodsku.skuName;
              this.gridData[i].skuNameStr = this.gridData[i].goodsku.skuNameStr;
              this.gridData[i].vendorName = this.gridData[i].vendor.vendorName;
            }
            console.log(this.gridData);
          }
        })
        .catch(() => {
          this.$message.danger('网络正忙');
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
    /**自定义表单验证 */
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
      /**主体展示数据 */
      tableData: [],
      /** 详细订单数据*/
      gridData: [],
      /** 详细订单展示标志*/
      dialogTableVisible: false,
      /** 修改流程展示标志*/
      dialogTableVisible1: false,
      /** 添加商品展示标志*/
      dialogFormVisible1: false,
      form: {},
      goodskus: {},
      venders: {},
      formLabelWidth: '120px',
      purchaseId: '',
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
    this.bindList();
    this.bindData();
  }
};
</script>
