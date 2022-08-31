<template>
  <div id="id">
    上架商品
    <!-- 商品信息展示 -->
    <el-table :data="goodskus" stripe style="width: 100%">
      <el-table-column prop="skuName" label="商品名"> </el-table-column>
      <el-table-column prop="skuDesc" label="商品描述"> </el-table-column>
      <el-table-column prop="stockNumber" label="商品库存数量">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="add(scope.row)">上架</el-button>
          <!-- <el-button
            type="primary"
            icon="el-icon-picture"
            @click="upload(scope.row)"
            circle
          ></el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增 -->
    <el-dialog title="上架商品" :visible.sync="dialogFormVisible" >
      <el-form :model="goodsku.skuDesc">
      <el-form-item
          label="商品零售价"
          :label-width="formLabelWidth"
          prop="pricestr"
        >
          <el-input v-model="pricestr" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="商品库存量"
          :label-width="formLabelWidth"
          prop="risenum"
        >
          <el-input v-model="risenum" autocomplete="off"></el-input>
        </el-form-item>
      <!-- <el-input v-model="pricestr" autocomplete="off"> </el-input>
      <el-input v-model="risenum" autocomplete="off"> </el-input> -->
    </el-form>
      <div slot="footer" class="dialog-footer">
           <el-button @click="dialogFormVisible = false">取 消</el-button>
           <el-button type="primary" @click="add1">确 定</el-button>
       </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      skuName: '',
      sortName: '',
      goodskus: [],
      price: {},
      color: { token: '' },
      sort: { token: '' },
      units: { unitsName: '', token: '' },
      goodspu: {},
      token: '',
      dialogFormVisible: false,

      goodskuAll: [],
      goodName: [],
      formLabelWidth: '120px',
      goodsku: {
        price: { price: '' },
        goodspu: { brand: '' }
      },
      goodspus: [],
      colors: [],
      sorts: [],
      unitss: [],

      // 上传图片属性
      file: {},
      goodId: '',
      goodName1: '',
      imgUrls: [],

      pricestr: '',
      risenum: '',
      skuId: '',

      // rules: {
      //   pricestr: [{ required: true, message: '请输入商品零售价', trigger: ['change','blur']}],
      //   risenum: [{ required: true, message: '请输入商品库存', trigger: 'blur' }],
      // }
    };
  },

  methods: {
    //添加
    add(row) {
      console.log(row);
      this.skuId = row.skuId;

      this.dialogFormVisible = true;
      // let token =  sessionStorage.getItem("token",response.data.token);
    },
    //添加
    add1() {
      this.dialogFormVisible = true;
      // let token =  sessionStorage.getItem("token",response.data.token);
      this.axios
        .post('http://localhost:8088/gwc/insertGood', {
          skuId: this.skuId,
          price: this.pricestr,
          stockNumber: this.risenum
        })
        .then((response) => {
          if (response.data.code === 200) {
            this.$alert('添加成功');
            this.dialogFormVisible = false;
            this.list();
          } else {
            this.$message.error(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addcolor() {
      this.color.token = sessionStorage.getItem('token');
      this.axios
        .post('http://localhost:8088/goodsku/insertColor', this.color)
        .then((response) => {
          if (response.data.code === 200) {
            this.$alert('添加成功');
            this.dialogFormVisible3 = false;
            (this.color = {
              colorNmae: ''
            }),
              this.list();
          } else {
            this.$message.error(response.data.message);
          }
        });
    },
    addsort() {
      this.sort.token = sessionStorage.getItem('token');
      this.axios
        .post('http://localhost:8088/goodsku/insertSort', this.sort)
        .then((response) => {
          if (response.data.code === 200) {
            this.$alert('添加成功');
            this.dialogFormVisible3 = false;
            (this.sort = {
              sortName: ''
            }),
              this.list();
          } else {
            this.$message.error(response.data.message);
          }
        });
    },
    addunits() {
      this.units.token = sessionStorage.getItem('token');
      this.axios
        .post('http://localhost:8088/goodsku/insertUnits', this.units)
        .then((response) => {
          if (response.data.code === 200) {
            this.$alert('添加成功');
            this.dialogFormVisible4 = false;
            (this.units = {
              unitsName: ''
            }),
              this.list();
          } else {
            this.$message.error(response.data.message);
          }
        });
    },
    // 查询商品信息
    // 查询商品信息
    list() {
      this.axios.get('http://localhost:8088/gwc/findAll').then((response) => {
        if (response.status === 200) {
          // console.log(response.data)
          // console.log(response.data[3]);
          this.goodskus = response.data.data;
        }
      });
    },
    listColor() {
      this.axios
        .get('http://localhost:8088/goodsku/listColor')
        .then((response) => {
          let data = response.data;
          if (response.status === 200) {
            this.colors = data;
          }
        });
    },
    listSort() {
      this.axios
        .get('http://localhost:8088/goodsku/listSort')
        .then((response) => {
          let data = response.data;
          if (response.status === 200) {
            this.sorts = data;
          }
        });
    },
    listGoodSpus() {
      this.axios
        .get('http://localhost:8088/goodsku/listGoodSpus')
        .then((response) => {
          let data = response.data;
          if (response.status === 200) {
            this.goodspus = data;
          }
        });
    },

    listUnits() {
      this.axios
        .get('http://localhost:8088/goodsku/listUnits')
        .then((response) => {
          let data = response.data;
          if (response.status === 200) {
            this.unitss = data;
          }
        });
    },
    //修改
    edit(row) {
      this.dialogFormVisible2 = true;
      this.goodsku = row;
      this.axios
        .post('http://localhost:8088/goodsku/listByid', this.goodsku)
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data);
            this.goodsku = response.data;
            this.goodsku.price = response.data.price;
            console.log(response.data);
            this.goodsku.goodspu = response.data.goodspu;
            console.log(222);
          }
        });
    },
    // 查询商品详细信息
    serachForAll(row) {
      this.dialogFormVisible1 = true;
      this.goodskus = row;
      this.price = this.goodskus.price;
      this.color = this.goodskus.color;
      this.sort = this.goodskus.sort;
      this.units = this.goodskus.units;
      this.goodspu = this.goodskus.goodspu;
      this.axios
        .get('http://localhost:8088/uploadImg/findBySkuId/' + row.id)
        .then((res) => {
          console.log(res.data);
          if (res.status === 200) {
            this.imgUrls = res.data;
          }
        });
    },
    //根据商品名或分类名查询
    search() {
      this.axios
        .get('http://localhost:8088/goodsku/fingByskuNameorSortName', {
          params: {
            skuName: this.skuName,
            sortName: this.sortName
          }
        })
        .then((response) => {
          if (response.status === 200) {
            this.goodskus = response.data;
            this.total = response.data.totalPage;
          }
        });
    },
    // 修改商品信息
    update() {
      this.axios
        .post('http://localhost:8088/goodsku/updateGood', this.goodsku)
        .then((response) => {
          if (response.status === 200) {
            this.$alert('修改成功');
            this.dialogFormVisible2 = false;
            this.list();
            this.goodsku = {
              id: '',
              skuName: '',
              skuDesc: '',
              price: { price: '' },
              color: { colorName: '' },
              goodspu: {
                id: '',
                brand: '',
                status: '',
                sort: { sortName: '' }
              },
              units: { unitsName: '' },
              warehouse: { stockNumber: '' },
              salesVolume: '',
              manufacturer: '',
              vendor: { vendorName: '', tel: '' }
            };
          } else {
            this.$message.error(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 逻辑删除商品
    del(row) {
      this.$confirm('此操作将永久删除' + row.skuName + ', 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios
          .get('http://localhost:8088/goodsku/del', {
            params: {
              id: row.id
            }
          })
          .then((response) => {
            if (response.status === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.currentPage = 1;
              this.list();
            }
          });
      });
    },
    // 上传图片方法
    upload(row) {
      this.dialogVisible3 = true;
      console.log(row);
      this.goodId = row.id;
      this.goodName1 = row.skuName;
    },
    // 监听所有文件，获取上传文件
    getFile(event) {
      console.log(event.target.files[0]);
      this.file = event.target.files[0];
    },
    // 图片上传表单提交事件
    uploadImg() {
      var formData = new FormData();
      formData.append('file', this.file);
      formData.append('skuId', this.goodId);
      formData.append('name', this.goodName1);
      this.axios({
        url: 'http://localhost:8088/uploadImg/add',
        method: 'post',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((res) => {
          let data = res.data;
          if (data.code === 200) {
            this.$message.success('上传成功');
            this.dialogVisible3 = false;
          } else {
            this.$message.error('上传失败');
          }
        })
        .catch((err) => {
          this.$message.error('网络正忙');
          console.log(err);
        });
    }
  },
  created() {
    this.list();
    this.listGoodSpus();
    this.listColor();
    this.listSort();
    this.listUnits();
  }
};
</script>
<style>
#div {
  margin-left: 300px;
  margin-bottom: 30px;
}
#id{
  position: relative;
  margin-top:20px;
  margin-left: 20px;
}
</style>
