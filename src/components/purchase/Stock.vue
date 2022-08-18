<template>
<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">


    <el-form-item label="进货商品" prop="goods">
        <!-- <el-input type="text" v-model="ruleForm.goods" autocomplete="off" clearable style="width:400px"></el-input> -->
        <el-select v-model="value" placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
    </el-form-item>

    <el-form-item label="进货数量" prop="number">
        <el-input type="text" v-model="ruleForm.number" autocomplete="off" clearable style="width:400px"></el-input>
    </el-form-item>

    <el-form-item label="进货说明" prop="Desc">
        <el-input type="text" v-model="ruleForm.Desc" autocomplete="off" clearable style="width:400px"></el-input>
    </el-form-item>
<!-- 后续的创建人   创建时间 -->

  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
</template>

<script>
  export default {
    data() {
         //   进货说明
      var DescVerify = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入进货说明'));
        } else {
          if (this.ruleForm.Desc !== '') {
            this.$refs.ruleForm.validateField('DescVerify');
          }
          callback();
        }
      };
      
        //   进货数量
      var numberVerify = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入进货数量'));
        }else {
          if (this.ruleForm.number !== '') {
            this.$refs.ruleForm.validateField('numberVerify');
          }
          callback();
        }
      };

      return {
        ruleForm: {
            goods:'',
            Desc: '',
            number:'',
            options: [{
                value: '0',
                label: '黄金糕'
            },],
            value: ''
        },

        rules: {
    //   进货说明
          Desc: [
            { validator: DescVerify, trigger: 'blur' }
          ],
    //   进货数量
          number: [
            // 纯数字验证
            { pattern: /^\d+$/, message: '请输入正确进货数量', trigger: 'blur' },
            { validator: numberVerify, trigger: 'blur' },
          ],
        }
      };
    },
    methods: {
        // 提交
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

        // 重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>