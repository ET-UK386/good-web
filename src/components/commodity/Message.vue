<template>
  <div>
    商品信息
    <!-- 根据商品名或者分类查询 -->
    <div id="div">
      书名:<el-input
        v-model="skuName"
        placeholder="商品名"
        style="width: 150px; margin-left: 10px; margin-right: 10px"
      ></el-input>
      分类:<el-input
        v-model="sortName"
        placeholder="请输入分类"
        style="width: 150px; margin-left: 10px; margin-right: 10px"
      ></el-input>
      <el-button type="primary" @click="search">查询</el-button>
      <el-button
        type="primary"
        style="margin-left: 30px"
        @click="dialogFormVisible = true"
        >新增</el-button
      >
    </div>

    <!-- 商品信息展示 -->
    <el-table :data="goodskus" stripe style="width: 100%">
      <el-table-column prop="skuName" label="商品名" width="120   ">
      </el-table-column>
      <el-table-column prop="skuDesc" label="商品描述" width="95">
      </el-table-column>
      <el-table-column prop="goodspu.brand" label="品牌商" width="80">
      </el-table-column>
      <el-table-column prop="goodspu.statusStr" label="上架状态" width="80">
      </el-table-column>
      <el-table-column prop="goodspu.sort.sortName" label="所属分类" width="95">
      </el-table-column>
      <el-table-column prop="color.colorName" label="颜色" width="80">
      </el-table-column>
      <el-table-column prop="price.price" label="价格" width="80">
      </el-table-column>
      <el-table-column prop="warehouse.stockNumber" label="库存" width="80">
      </el-table-column>
      <el-table-column prop="user.username" label="创建人" width="80">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="100">
      </el-table-column>
      <el-table-column prop="user.userRenewName" label="修改人" width="95">
      </el-table-column>
      <el-table-column prop="renewTime" label="修改时间" width="100">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-search"
            circle
            @click="serachForAll(scope.row)"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="edit(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="del(scope.row)"
            circle
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-picture"
            @click="upload(scope.row)"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 详细信息显示 -->
    <el-dialog title="详细信息显示" :visible.sync="dialogFormVisible1">
      <el-form :model="goodskus">
        <el-form-item label="商品名" :label-width="formLabelWidth">
          <el-input
            v-model="goodskus.skuName"
            readonly="readonly"
            autocomplete="off"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="商品描述" :label-width="formLabelWidth">
          <el-input
            v-model="goodskus.skuDesc"
            readonly="readonly"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input
            v-model="price.price"
            readonly="readonly"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="颜色" :label-width="formLabelWidth">
          <el-input
            v-model="color.colorName"
            readonly="readonly"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属分类" :label-width="formLabelWidth">
          <el-input
            v-model="sort.sortName"
            readonly="readonly"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="单位" :label-width="formLabelWidth">
          <el-input
            v-model="units.unitsName"
            readonly="readonly"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="上架状态" :label-width="formLabelWidth">
          <el-input
            v-model="goodspu.statusStr"
            readonly="readonly"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="库存" :label-width="formLabelWidth">
          <el-input
            v-model="warehouse.stockNumber"
            readonly="readonly"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="销量" :label-width="formLabelWidth">
          <el-input
            v-model="goodskus.salesVolume"
            readonly="readonly"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌商" :label-width="formLabelWidth">
          <el-input
            v-model="goodspu.brand"
            readonly="readonly"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="生产商" :label-width="formLabelWidth">
          <el-input
            v-model="goodskus.manufacturer"
            readonly="readonly"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="供应商" :label-width="formLabelWidth">
          <el-input
            v-model="vendor.vendorName"
            readonly="readonly"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="供应商电话" :label-width="formLabelWidth">
          <el-input
            v-model="vendor.tel"
            readonly="readonly"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>

      <!--图片展示-->
      <div class="demo-image__preview">
        <el-image
          style="width: 300px; height: 300px"
          :src="imgUrls[0]"
          :preview-src-list="imgUrls"
        >
        </el-image>
      </div>
    </el-dialog>

    <!-- 新增 -->
    <el-dialog title="新增商品" :visible.sync="dialogFormVisible">
      <el-form :model="goodsku" :rules="rules">
        <el-form-item hidden label="id" :label-width="formLabelWidth">
          <el-input v-model="goodsku.id" readonly="readonly" autocomplete="off">
          </el-input>
        </el-form-item>
        <el-form-item
          label="商品名"
          :label-width="formLabelWidth"
          prop="skuName"
        >
          <el-input v-model="goodsku.skuName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="商品描述"
          :label-width="formLabelWidth"
          prop="skuDesc"
        >
          <el-input v-model="goodsku.skuDesc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="价格"
          :label-width="formLabelWidth"
          prop="price.price"
        >
          <el-input v-model="goodsku.price.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="颜色"
          :label-width="formLabelWidth"
          prop="color.colorName"
        >
          <el-select v-model="goodsku.color.colorName" placeholder="请选择颜色">
            <el-option label="远峰蓝" value="远峰蓝">远峰蓝</el-option>
            <el-option label="中国红" value="中国红">中国红</el-option>
            <el-option label="珠玉白" value="珠玉白">珠玉白</el-option>
            <el-option label="土豪金" value="土豪金">土豪金</el-option>
            <el-option label="银色" value="银色">银色</el-option>
            <el-option label="白色" value="白色">白色</el-option>
            <el-option label="黑色" value="黑色">黑色</el-option>
            <el-option label="其他" value="其他">其他</el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="所属分类"
          :label-width="formLabelWidth"
          prop="goodspu.sort.sortName"
        >
          <el-select
            v-model="goodsku.goodspu.sort.sortName"
            placeholder="请选择分类"
          >
            <el-option label="手机" value="手机">手机</el-option>
            <el-option label="电器" value="电器">家电</el-option>
            <el-option label="穿戴" value="穿戴">穿戴</el-option>
            <el-option label="电脑" value="电脑">电脑</el-option>
            <el-option label="电视" value="电视">电视</el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="单位"
          :label-width="formLabelWidth"
          prop="units.unitsName"
        >
          <el-select v-model="goodsku.units.unitsName" placeholder="请选择单位">
            <el-option label="个" value="个">个</el-option>
            <el-option label="件" value="件">件</el-option>
            <el-option label="台" value="台">台</el-option>
            <el-option label="部" value="部">部</el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="上架状态"
          :label-width="formLabelWidth"
          prop="goodspu.status"
        >
          <el-select v-model="goodsku.goodspu.status" placeholder="请选择状态">
            <el-option label="上架" value="0">上架</el-option>
            <el-option label="下架" value="1">下架</el-option>
            <el-option label="售罄" value="2">售罄</el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="库存"
          :label-width="formLabelWidth"
          prop="warehouse.stockNumber"
        >
          <el-input
            v-model="goodsku.warehouse.stockNumber"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="销量"
          :label-width="formLabelWidth"
          prop="salesVolume"
        >
          <el-input v-model="goodsku.salesVolume" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="品牌商"
          :label-width="formLabelWidth"
          prop="goodspu.brand"
        >
          <el-input
            v-model="goodsku.goodspu.brand"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="生产商"
          :label-width="formLabelWidth"
          prop="manufacturer"
        >
          <el-input
            v-model="goodsku.manufacturer"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="供应商"
          :label-width="formLabelWidth"
          prop="vendor.vendorName"
        >
          <el-input
            v-model="goodsku.vendor.vendorName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="供应商电话"
          :label-width="formLabelWidth"
          prop="vendor.tel"
        >
          <el-input v-model="goodsku.vendor.tel" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改 -->
    <el-dialog title="修改商品" :visible.sync="dialogFormVisible2">
      <el-form :model="goodsku">
        <el-form-item hidden label="id" :label-width="formLabelWidth">
          <el-input v-model="goodsku.id" readonly="readonly" autocomplete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="商品名" :label-width="formLabelWidth">
          <el-input v-model="goodsku.skuName" autocomplete="off"> </el-input>
        </el-form-item>
        <el-form-item label="商品描述" :label-width="formLabelWidth">
          <el-input v-model="goodsku.skuDesc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="goodsku.price.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="颜色"
          :label-width="formLabelWidth"
          prop="color.colorName"
        >
          <el-select v-model="goodsku.color.colorName" placeholder="请选择颜色">
            <el-option label="远峰蓝" value="远峰蓝">远峰蓝</el-option>
            <el-option label="中国红" value="中国红">中国红</el-option>
            <el-option label="珠玉白" value="珠玉白">珠玉白</el-option>
            <el-option label="土豪金" value="土豪金">土豪金</el-option>
            <el-option label="银色" value="银色">银色</el-option>
            <el-option label="白色" value="白色">白色</el-option>
            <el-option label="黑色" value="黑色">黑色</el-option>
            <el-option label="其他" value="其他">其他</el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="所属分类"
          :label-width="formLabelWidth"
          prop="goodspu.sort.sortName"
        >
          <el-select
            v-model="goodsku.goodspu.sort.sortName"
            placeholder="请选择分类"
          >
            <el-option label="手机" value="手机">手机</el-option>
            <el-option label="电器" value="电器">电器</el-option>
            <el-option label="穿戴" value="穿戴">穿戴</el-option>
            <el-option label="电脑" value="电脑">电脑</el-option>
            <el-option label="电视" value="电视">电视</el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="单位"
          :label-width="formLabelWidth"
          prop="units.unitsName"
        >
          <el-select v-model="goodsku.units.unitsName" placeholder="请选择单位">
            <el-option label="个" value="个">个</el-option>
            <el-option label="件" value="件">件</el-option>
            <el-option label="台" value="台">台</el-option>
            <el-option label="部" value="部">部</el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="上架状态"
          :label-width="formLabelWidth"
          prop="goodspu.status"
        >
          <el-select
            v-model="goodsku.goodspu.statusStr"
            placeholder="请选择状态"
          >
            <el-option label="上架" value="上架">上架</el-option>
            <el-option label="下架" value="下架">下架</el-option>
            <el-option label="售罄" value="售罄">售罄</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="库存" :label-width="formLabelWidth">
          <el-input
            v-model="warehouse.stockNumber"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="销量" :label-width="formLabelWidth">
          <el-input v-model="goodsku.salesVolume" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="品牌商" :label-width="formLabelWidth">
          <el-input v-model="goodspu.brand" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="生产商" :label-width="formLabelWidth">
          <el-input
            v-model="goodsku.manufacturer"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="供应商" :label-width="formLabelWidth">
          <el-input
            v-model="goodsku.vendor.vendorName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="供应商电话" :label-width="formLabelWidth">
          <el-input v-model="goodsku.vendor.tel" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 上传图片标签-->
    <el-dialog :title="goodName" :visible.sync="dialogVisible3" width="30%">
      <div>
        <span class="add">上传图片</span>
        <input type="file" @change="getFile($event)" />
      </div>
      <div>
        <input type="hidden" :value="goodId" />
      </div>
      <button @click="uploadImg">上传</button>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    var checkphone = (rule, value, callback) => {
      let ragEamil =
        /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/;
      if (!ragEamil.test(value)) {
        return callback(new Error('手机号格式不正确'));
      } else {
        callback();
      }
    };
    return {
      goodskus: [],
      goodskutwo: [],
      price: {},
      color: {},
      sort: {},
      units: {},
      goodspu: {},
      warehouse: {},
      vendor: {},
      dialogFormVisible1: false,
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogVisible3: false,
      goodskuAll: [],
      skuName: '',
      sortName: '',
      formLabelWidth: '120px',
      goodsku: {
        id: '',
        skuName: '',
        skuDesc: '',
        price: { price: '' },
        color: { colorName: '' },
        goodspu: { id: '', brand: '', status: '', sort: { sortName: '' } },
        units: { unitsName: '' },
        warehouse: { stockNumber: '' },
        salesVolume: '',
        manufacturer: '',
        vendor: { vendorName: '', tel: '' }
      },
      // 上传图片属性
      file: {},
      goodId: '',
      goodName: '',
      imgUrls: [],

      rules: {
        skuName: [{ required: true, message: '请输入商品名', trigger: 'blur' }],
        skuDesc: [
          { required: true, message: '请输入商品描述', trigger: 'blur' }
        ],
        ['price.price']: [
          { required: true, message: '请输入价格', trigger: 'blur' }
        ],
        ['color.colorName']: [
          { required: true, message: '请输入颜色', trigger: 'blur' }
        ],
        ['goodspu.sort.sortName']: [
          { required: true, validator: '请输入所属分类', trigger: 'blur' }
        ],
        ['units.unitsName']: [
          { required: true, message: '请输入单位', trigger: 'blur' }
        ],
        ['goodspu.status']: [
          { required: true, message: '请输入上架状态', trigger: 'blur' }
        ],
        ['warehouse.stockNumber']: [
          { required: true, message: '请输入库存', trigger: 'blur' }
        ],
        salesVolume: [
          { required: true, message: '请输入销量', trigger: 'blur' }
        ],
        ['goodspu.brand']: [
          { required: true, message: '请输入品牌商', trigger: 'blur' }
        ],
        manufacturer: [
          { required: true, message: '请输入生产商', trigger: 'blur' }
        ],
        ['vendor.vendorName']: [
          { required: true, message: '请输入供应商', trigger: 'blur' }
        ],
        ['vendor.tel']: [{ validator: checkphone }]
      }
    };
  },

  methods: {
    //修改
    edit(row) {
      this.dialogFormVisible2 = true;
      this.$data.contract = JSON.parse(JSON.stringify(row));
      this.goodsku = this.$data.contract;
      console.log(11111111, this, this.goodsku);
      this.price = this.goodsku.price;
      this.color = this.goodsku.color;
      this.sortName = this.goodsku.sort;
      this.units = this.goodsku.units;
      this.goodspu = this.goodsku.goodspu;
      this.warehouse = this.goodsku.warehouse;
      this.vendor = this.goodsku.vendor;
    },
    //添加
    add() {
      this.dialogFormVisible = true;
      // let token =  sessionStorage.getItem("token",response.data.token);
      this.axios
        .post('http://localhost:8088/goodsku/insertGood', this.goodsku)
        .then((response) => {
          if (response.status === 200) {
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
    // 查询商品信息
    list() {
      this.axios
        .get('http://localhost:8088/goodsku/listGoodsku')
        .then((response) => {
          if (response.status === 200) {
            console.log(response);
            this.goodskus = response.data;
            this.total = response.data.count;
          }
        });
    },
    // 查询商品详细信息
    serachForAll(row) {
      this.dialogFormVisible1 = true;
      this.goodskus = row;
      this.price = this.goodskus.price;
      this.color = this.goodskus.color;
      this.sort = this.goodskus.goodspu.sort;
      this.units = this.goodskus.units;
      this.goodspu = this.goodskus.goodspu;
      this.warehouse = this.goodskus.warehouse;
      this.vendor = this.goodskus.vendor;
      this.imgUrls = [];
      this.axios
        .get('http://localhost:8088/uploadImg/findBySkuId/' + row.id)
        .then((res) => {
          console.log(res.data);
          this.imgUrls = res.data;
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
      switch (this.goodsku.goodspu.statusStr) {
        case '上架':
          this.goodsku.goodspu.status = 0;
          break;
        case '下架':
          this.goodsku.goodspu.status = 1;
          break;
        case '售罄':
          this.goodsku.goodspu.status = 2;
          break;
      }

      this.axios
        .post('http://localhost:8088/goodsku/updateGood', this.goodsku)
        .then((response) => {
          if (response.status === 200) {
            this.dialogFormVisible2 = false;
            console.log(response);
            this.$alert('修改成功');
            this.dialogFormVisible = false;
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
      this.goodName = row.skuName;
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
      formData.append('name', this.goodName);
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
        .error((err) => {
          this.$message.error('网络正忙');
          console.log(err);
        });
    }
  },
  created() {
    this.list();
  }
};
</script>
<style>
#div {
  margin-left: 300px;
  margin-bottom: 30px;
}
</style>
