<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="skuNameStr" label="商品名称" width="180">
      </el-table-column>
      <el-table-column prop="createUser.username" label="负责人" width="180">
      </el-table-column>
      <el-table-column prop="createUser.phone" label="联系方式" width="180">
      </el-table-column>
      <el-table-column prop="stockNumber" label="库存数量" width="180">
      </el-table-column>
      <el-table-column prop="warehouseAddress" label="仓库地址">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">
            查看详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="详细列表" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column property="batch" label="批次"></el-table-column>
        <el-table-column
          property="skuNameStr"
          label="商品名称"
        ></el-table-column>
        <el-table-column
          property="detailedWarehousing.vendor.vendorName"
          label="供应商"
        ></el-table-column>
        <el-table-column
          property="warehouseAddress"
          label="地址"
        ></el-table-column>
        <el-table-column property="stockNumber" label="数量"></el-table-column>
        <el-table-column
          property="detailedWarehousing.purchasePrice"
          label="进货单价"
        ></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  methods: {
    handleEdit(row) {
      this.dialogTableVisible = true;
      let skuId = row.skuId;
      this.axios
        .get('http://localhost:8088/warehoue/findBySkuId/' + skuId)
        .then((res) => {
          const data = res.data;
          if (data.code === 200) {
            this.gridData = data.data;
          }
        });
    },
    bindList() {
      this.axios
        .get('http://localhost:8088/warehoue/findAll')
        .then((res) => {
          const data = res.data;
          if (data.code === 200) {
            this.tableData = data.data;
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
      gridData: [
        {
          id: 0,
          detailedPurchaseId: 0,
          stockNumber: 0,
          warehouseAddress: '',
          phone: '',
          skuId: 0,
          createUserId: 0,
          createTime: '',
          userRenewId: null,
          renewTime: null,
          detailedPurchase: {
            id: 0,
            purchaseId: 0,
            vendorId: null,
            skuId: 0,
            batch: '',
            purchasePrice: 0,
            number: 0,
            status: 0,
            createUserId: null,
            createTime: null,
            userRenewId: null,
            renewTime: null,
            purchase: null,
            vendor: {
              name: ''
            },
            goodsku: null,
            createUser: null,
            renewUser: null
          },
          goodsku: {
            id: 1,
            spuId: 1,
            skuName: '',
            skuDesc: '',
            colorId: 0,
            priceId: 0,
            stockId: null,
            salesVolume: 0,
            companyId: null,
            manufacturer: null,
            supplierId: null,
            createUserId: null,
            createTime: null,
            userRenewId: null,
            renewTime: null,
            goodspu: null,
            sort: null,
            user: null,
            color: null,
            price: null,
            warehouse: null,
            units: null,
            vendor: null
          },
          createUser: {
            id: 0,
            roleId: 0,
            username: '',
            password: '',
            address: '',
            phone: '',
            createUserId: 0,
            createTime: '',
            userRenewId: 0,
            renewTime: '',
            con1: null,
            con2: null,
            con3: null,
            token: null,
            role: null
          },
          userRenew: null
        }
      ],
      dialogTableVisible: false
    };
  },
  created() {
    this.bindList();
  }
};
</script>
