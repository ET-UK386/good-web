<template>
  <div>
    <el-button type="primary" style="margin-left: 20px" @click="addaddress"
      >添加新地址</el-button
    >
    <el-form ref="biaoqian" :model="user" label-width="80px">
      <el-form-item label="收货地址">
        <el-select v-model="user.roleId">
          <el-option label="北京" value="1"></el-option>
          <el-option label="南京" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名字" style="width: 300px">
        <el-input v-model="user.username"></el-input>
      </el-form-item>
      <el-form-item label="电话" style="width: 300px">
        <el-input v-model="user.phone"></el-input>
      </el-form-item>

      <H1>支付方式</H1>
      <el-form-item label="付款方式">
        <el-radio v-model="user.select" label="1">微信支付</el-radio>
        <el-radio v-model="user.select" label="2">支付宝支付</el-radio>
      </el-form-item>
      <br />
      <H1>请选择快递</H1>
      <el-form-item label="快递选择">
        <el-radio v-model="user.radio" label="1">顺风</el-radio>
        <el-radio v-model="user.radio" label="2">京东</el-radio> </el-form-item
      ><br />
    </el-form>

    <br />
    一共{{ money }}钱

    <br />
    <el-button
      class="add"
      type="primary"
      style="margin-left: 20px"
      @click="addbill"
      >提交订单</el-button
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},

      money: 1111
    };
  },
  methods: {
    addbill() {},
    addaddress() {}
  }
};
</script>
