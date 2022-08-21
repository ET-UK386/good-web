<template>
  <el-form
    :model="ruleForm"
    status-icon
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="进货商品" prop="goods">
      <el-select v-model="ruleForm.goods" placeholder="请选择">
        <el-option
          v-for="item in ruleForm.goodsOptions"
          :key="item.id"
          :label="item.skuName"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="供应商" prop="vendor">
      <el-select v-model="ruleForm.vendor" placeholder="请选择">
        <el-option
          v-for="item in ruleForm.vendorOptions"
          :key="item.id"
          :label="item.vendorName"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="进货数量" prop="number">
      <el-input
        placeholder="进货数量"
        type="text"
        v-model="ruleForm.number"
        autocomplete="off"
        clearable
        style="width: 400px"
      ></el-input>
    </el-form-item>

    <el-form-item label="进货说明" prop="Desc">
      <el-input
        placeholder="进货说明"
        type="text"
        v-model="ruleForm.Desc"
        autocomplete="off"
        clearable
        style="width: 400px"
      ></el-input>
    </el-form-item>
    <!-- 后续的创建人   创建时间 -->

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from "axios";
export default {
  data() {
    /**  进货商品*/
    // var GoodsVerify = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请输入进货商品"));
    //   } else {
    //     if (this.ruleForm.goods !== "") {
    //       this.$refs.ruleForm.validateField("DescVerify");
    //     }
    //     callback();
    //   }
    // };

    /**进货说明 */
    // var DescVerify = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请输入进货说明"));
    //   } else {
    //     if (this.ruleForm.Desc !== "") {
    //       this.$refs.ruleForm.validateField("DescVerify");
    //     }
    //     callback();
    //   }
    // };

    /** 进货数量 */
    var numberVerify = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入进货数量"));
      } else {
        if (this.ruleForm.number !== "") {
          this.$refs.ruleForm.validateField("numberVerify");
        }
        callback();
      }
    };

    return {
      ruleForm: {
        Desc: "",
        number: "",
        goods: "",
        goodsOptions: [],
        vendor: "",
        vendorOptions: [],
        token: "",
      },

      rules: {
        //   进货商品
        goods: [
          { required: true, message: "请选择进货商品", trigger: "change" },
        ],
        //
        vendor: [
          {
            required: true.valueOf,
            message: "请选择供应商",
            trigger: "change",
          },
        ],
        //   进货说明
        Desc: [
          { required: true.valueOf, message: "请选择供应商", trigger: "blur" },
        ],
        //   进货数量
        number: [
          // 纯数字验证
          { pattern: /^\d+$/, message: "请输入正确进货数量", trigger: "blur" },
          { validator: numberVerify, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    listGoodSku() {
      axios
        .get("http://localhost:8088/listGoodSku")
        .then((res) => {
          let data = res.data;
          if (res.status === 200) {
            for (let index in data) {
              this.ruleForm.goodsOptions.push(data[index]);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    listVendor() {
      axios
        .get("http://localhost:8088/listVendor")
        .then((res) => {
          let data = res.data;
          if (res.status === 200) {
            for (let index in data) {
              this.ruleForm.vendorOptions.push(data[index]);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //获取token
          this.ruleForm.token = sessionStorage.getItem("token");
          // alert("1111111111111111111")
          // console.log(this.ruleForm)
          this.axios
            // .post("http://localhost:8088/addDetailedPurchase", this.ruleForm.token,this.ruleForm.goods,this.ruleForm.number,this.ruleForm.vendor,this.ruleForm.Desc)
            // .post(
            //   "http://127.0.0.1:8088/addDetailedPurchase",
            //   "token = " + this.ruleForm.token,
            //   "goods = " + this.ruleForm.goods,
            //   "number = " + this.ruleForm.number,
            //   "vendor = " + this.ruleForm.vendor,
            //   "Desc = " + this.ruleForm.Desc
            // )
            .get("http://127.0.0.1:8088/addDetailedPurchase", {
              params: {
                token: this.ruleForm.token,
                goods: this.ruleForm.goods,
                number: this.ruleForm.number,
                vendor: this.ruleForm.vendor,
                Desc: this.ruleForm.Desc,
              },
            })
            .then((res) => {
              if (res.status === 200) {
                // this.$alert(this.title ? "申请成功" : "申请失败");
                alert("申请成功");
                this.ruleForm = "";
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  created() {
    this.listGoodSku();
    this.listVendor();
  },
};
</script>