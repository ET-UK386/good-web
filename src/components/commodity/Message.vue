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
      <el-table-column prop="sort.sortName" label="所属分类" width="95">

      </el-table-column>
      <el-table-column prop="color.colorName" label="颜色" width="80">
      </el-table-column>
      <el-table-column prop="price.price" label="价格" width="80">
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
            v-model="goodskus.sort.sortName"
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
        <el-form-item label="生产商" :label-width="formLabelWidth">
          <el-input
            v-model="goodspu.brand"
            readonly="readonly"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 新增 -->
    <el-dialog title="新增商品" :visible.sync="dialogFormVisible">
      <el-form :model="goodsku">
        <el-form-item hidden label="id" :label-width="formLabelWidth">
          <el-input v-model="goodsku.id" readonly="readonly" autocomplete="off">
          </el-input>
        </el-form-item>
        <el-form-item
          label="商品名"
          :label-width="formLabelWidth"

        >
          <el-select v-model="goodsku.spuId" placeholder="请选择商品">
            <el-option
              v-for="item in goodspus"
              :key="item.id"
              :label="item.goodName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="商品名"
          :label-width="formLabelWidth"
          prop="skuName"
        >
          <el-input
            v-model="goodsku.skuName"
            autocomplete="off"
          ></el-input>
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
          prop="colorName"
        >
          <el-select v-model="goodsku.colorId" placeholder="请选择颜色">
            <el-option
              v-for="item in colors"
              :key="item.id"
              :label="item.colorName"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-button plain @click="dialogFormVisible3 = true"
            >其它颜色</el-button
          >
        </el-form-item>
        <el-form-item
          label="所属分类"
          :label-width="formLabelWidth"
          prop="sort.sortName"
        >
          <el-select v-model="goodsku.sortId" placeholder="请选择分类">
            <el-option
              v-for="item in sorts"
              :key="item.id"
              :label="item.sortName"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-button plain @click="dialogFormVisible4 = true"
            >其它分类</el-button
          >
        </el-form-item>
        <el-form-item
          label="单位"
          :label-width="formLabelWidth"
          prop="units.unitsName"
        >
          <el-select v-model="goodsku.companyId" placeholder="请选择单位">
            <el-option
              v-for="item in unitss"
              :key="item.id"
              :label="item.unitsName"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-button plain @click="dialogFormVisible5 = true"
            >其它单位</el-button
          >
        </el-form-item>
        
        <el-form-item
          label="生产商"
          :label-width="formLabelWidth"
          prop="goodspu.brand"
        >
          <el-input
            v-model="goodspu.brand"
            autocomplete="off"
          ></el-input>
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
        <el-form-item
          label="商品名"
          :label-width="formLabelWidth"
          prop="goodName"
        >
          <el-select v-model="goodsku.spuId" placeholder="请输入商品名">
            <el-option
              v-for="item in goodspus"
              :key="item.id"
              :label="item.goodName"
              :value="item.id"
            ></el-option>
          </el-select>
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
          prop="colorName"
        >
          <el-select v-model="goodsku.colorId" placeholder="请选择颜色">
            <el-option
              v-for="item in colors"
              :key="item.id"
              :label="item.colorName"
              :value="item.id"
            ></el-option>
          </el-select>
          
        </el-form-item>
        <el-form-item
          label="所属分类"
          :label-width="formLabelWidth"
          prop="sort.sortName"
        >
          <el-select v-model="goodsku.goodspu.sortId" placeholder="请选择分类">
            <el-option
              v-for="item in sorts"
              :key="item.id"
              :label="item.sortName"
              :value="item.id"
            ></el-option>
          </el-select>

          
        </el-form-item>
        <el-form-item
          label="单位"
          :label-width="formLabelWidth"
          prop="units.unitsName"
        >
          <el-select v-model="goodsku.companyId" placeholder="请选择单位">
            <el-option
              v-for="item in unitss"
              :key="item.id"
              :label="item.unitsName"
              :value="item.id"
            ></el-option>
          </el-select>
          
        </el-form-item>
        
        <el-form-item
          label="生产商"
          :label-width="formLabelWidth"
          prop="goodspu.brand"
        >
          <el-input
            v-model="goodsku.goodspu.brand"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>





    <el-dialog title="修改顔色" :visible.sync="dialogFormVisible3">
      <el-form ref="form" :model="color" label-width="80px">
        <el-form-item label="颜色">
          <el-input v-model="color.colorName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addcolor" >添加</el-button>
          <el-button @click="dialogFormVisible3 = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>


    <el-dialog title="修改分类" :visible.sync="dialogFormVisible4">
      <el-form ref="form" :model="sort" label-width="80px">
        <el-form-item label="分类">
          <el-input v-model="sort.sortName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addsort" >添加</el-button>
          <el-button @click="dialogFormVisible4 = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="修改单位" :visible.sync="dialogFormVisible5">
      <el-form ref="form" :model="units" label-width="80px">
        <el-form-item label="单位">
          <el-input v-model="units.unitsName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addunits">添加</el-button>
          <el-button @click="dialogFormVisible5 = false">取消</el-button>
        </el-form-item>
      </el-form>
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
    return {
      skuName: "",
      sortName: "",
      goodskus: [],
      price: {},
      color: {token:'',},
      sort: {token:'',},
      units: { unitsName: "" ,token:'',},
      goodspu: {},
      token:'',
      // dialogVisible3 = false,
      dialogFormVisible1: false,
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      dialogFormVisible4: false,
      dialogFormVisible5: false,
      goodskuAll: [],
      goodName: [],
      formLabelWidth: "120px",
       goodsku: {
        price:{price:'',},
        goodspu:{brand:'',}
      },
      goodspus:[],
      colors:[],
      sorts:[],
      unitss:[],
      
      rules: {
        skuName: [{ required: true, message: "请输入商品名", trigger: "blur" }],
        skuDesc: [
          { required: true, message: "请输入商品描述", trigger: "blur" },
        ],
        ["price.price"]: [
          { required: true, message: "请输入价格", trigger: "blur" },
        ],
        ["color.colorName"]: [
          { required: true, message: "请输入颜色", trigger: "blur" },
        ],
        ["sort.sortName"]: [
          { required: true, validator: "请输入所属分类", trigger: "blur" },
        ],
        ["units.unitsName"]: [
          { required: true, message: "请输入单位", trigger: "blur" },
        ],
        ["goodspu.status"]: [
          { required: true, message: "请输入上架状态", trigger: "blur" },
        ],
        ["goodspu.brand"]: [
          { required: true, message: "请输入品牌商", trigger: "blur" },
        ],
      },
    };
  },

  methods: {
    //添加
    add() {
      this.dialogFormVisible = true;
      // let token =  sessionStorage.getItem("token",response.data.token);
      this.axios
        .post("http://localhost:8088/goodsku/insertGood", this.goodsku)
        .then((response) => {
          if (response.data.code === 200) {
            this.$alert("添加成功");
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
    addcolor(){
      this.color.token = sessionStorage.getItem("token");
      this.axios.post("http://localhost:8088/goodsku/insertColor",this.color)
      .then((response)=>{
        if(response.data.code === 200){
            this.$alert("添加成功");
            this.dialogFormVisible3 = false;
            this.color={
              colorNmae:'',
            },
            this.list();
        } else {
            this.$message.error(response.data.message);
          }
      })
    },
    addsort(){
      this.sort.token = sessionStorage.getItem("token");
      this.axios.post("http://localhost:8088/goodsku/insertSort",this.sort)
      .then((response)=>{
        if(response.data.code === 200){
            this.$alert("添加成功");
            this.dialogFormVisible3 = false;
            this.sort={
              sortName:'',
            },
            this.list();
        } else {
            this.$message.error(response.data.message);
          }
      })
    },
    addunits(){
      this.units.token = sessionStorage.getItem("token");
      this.axios.post("http://localhost:8088/goodsku/insertUnits",this.units)
      .then((response)=>{
        if(response.data.code === 200){
            this.$alert("添加成功");
            this.dialogFormVisible4 = false;
            this.units={
              unitsName:'',
            },
            this.list();
        } else {
            this.$message.error(response.data.message);
          }
      })
    },
    // 查询商品信息
    // 查询商品信息
    list() {
      this.axios
        .get("http://localhost:8088/goodsku/listGoodsku")
        .then((response) => {
          if (response.status === 200) {
            // console.log(response.data)
            // console.log(response.data[3]);
            this.goodskus = response.data;
          }
        });
    },
    listColor(){
      this.axios.get("http://localhost:8088/goodsku/listColor").then((response)=>{
        let data = response.data;
        if(response.status === 200){
          this.colors = data;
        }
      })
    },
   listSort(){
      this.axios.get("http://localhost:8088/goodsku/listSort").then((response)=>{
        let data = response.data;
        if(response.status === 200){
           this.sorts = data;
        }
      })
    },
    listGoodSpus(){
      this.axios.get("http://localhost:8088/goodsku/listGoodSpus").then((response)=>{
        let data = response.data;
        if(response.status === 200){
          this.goodspus = data; 
        }
      })
    },
    
   listUnits(){
      this.axios.get("http://localhost:8088/goodsku/listUnits").then((response)=>{
        let data = response.data;
        if(response.status === 200){
          this.unitss = data;
        }
      })
    },
    //修改
    edit(row) {
      this.dialogFormVisible2 = true;
      this.goodsku = row
      this.axios.post("http://localhost:8088/goodsku/listByid",this.goodsku)
      .then((response)=>{
        if(response.status === 200){
          console.log(response.data)
          this.goodsku = response.data;
          this.goodsku.price = response.data.price;
          console.log(response.data)
          this.goodsku.goodspu = response.data.goodspu;
          console.log(222)
        }
      })
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
        .post("http://localhost:8088/goodsku/updateGood", this.goodsku)
        .then((response) => {
          if (response.status === 200) {
            this.$alert("修改成功");
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
    this.listGoodSpus();
    this.listColor()
    this.listSort()
    this.listUnits()
  },
};
</script>
<style>
#div {
  margin-left: 300px;
  margin-bottom: 30px;
}
</style>
