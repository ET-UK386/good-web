<template>
  <div id="spu">
    商品spu
    <div id="add">
      <el-button type="success" @click="dialogFormVisible = true"
        >新增</el-button
      >
    </div>
    <el-table :data="goodspus" stripe style="width: 100%">
      <el-table-column prop="goodName" label="商品名"> </el-table-column>
      <el-table-column prop="brand" label="生产商"> </el-table-column>
      <el-table-column prop="sort.sortName" label="商品分类"> </el-table-column>
      <el-table-column prop="user.username" label="创建人"> </el-table-column>
      <el-table-column prop="createTime" label="创建时间"> </el-table-column>
      <el-table-column prop="user.userRenewName" label="修改人">
      </el-table-column>
      <el-table-column prop="renewTime" label="修改时间"> </el-table-column>
    </el-table>

    <el-dialog title="新增商品" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="goodspu" :rules="rules" label-width="80px">
        <el-form-item label="商品名" prop="goodName">
          <el-input v-model="goodspu.goodName"></el-input>
        </el-form-item>
        <el-form-item label="生产商" prop="brand">
          <el-input v-model="goodspu.brand"></el-input>
        </el-form-item>
        <el-form-item label="所属分类" prop="sort.sortName">
          <el-select v-model="goodspu.sort.sortName" placeholder="请选择分类">
            <el-option label="手机" value="手机">手机</el-option>
            <el-option label="电器" value="电器">家电</el-option>
            <el-option label="穿戴" value="穿戴">穿戴</el-option>
            <el-option label="电脑" value="电脑">电脑</el-option>
            <el-option label="电视" value="电视">电视</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上架状态" prop="status">
          <el-select v-model="goodspu.status" placeholder="请选择状态">
            <el-option label="上架" value="0">上架</el-option>
            <el-option label="下架" value="1">下架</el-option>
            <el-option label="售罄" value="2">售罄</el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="add">添加</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  meta:{needLogin:true},
  data() {
    return {
      goodspus: [],
      goodspu: {
        id: '',
        goodName: '',
        brand: '',
        sort: { sortName: '' },
        statusbar: ''
      },
      sort: {
        sortName: ''
      },
      color: {
        colorName: ''
      },
      units: {
        unitsName: ''
      },
      dialogFormVisible: false,
      rules: {
        goodName: [
          { required: true, message: '请输入商品名', trigger: 'blur' }
        ],
        brand: [{ required: true, message: '请输入生厂商', trigger: 'blur' }],
        ['sort.sortName']: [
          { required: true, message: '请输入分类', trigger: 'blur' }
        ],
        status: [{ required: true, message: '请输入上架状态', trigger: 'blur' }]
      }
    };
  },
  methods: {
    list() {
      this.axios
        .get('http://localhost:8088/goodsku/listGoodSpu')
        .then((response) => {
          if (response.status === 200) {
            this.goodspus = response.data;
            console.log(response);
          }
        });
    },
    add() {
      this.dialogFormVisible = true;
      this.axios
        .post('http://localhost:8088/goodsku/insertGoodSpu', this.goodspu)
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
    }
  },
  created() {
    this.list();
  }
};
</script>
<style>
#spu {
  position: relative;
  margin-left: 30px;
}
#add {
  position: relative;
  margin-left: 80px;
  margin-top: -30px;
}
</style>
