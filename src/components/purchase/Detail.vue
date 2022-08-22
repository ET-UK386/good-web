<template>
  <div style="height: 100%">
    <el-table :data="tableData" height="100%" border style="width: 100%">
      <el-table-column prop="id" label="id" width="80px"> </el-table-column>
      <el-table-column prop="purchaseDesc" label="描述" width="100px">
      </el-table-column>
      <el-table-column prop="purchaseNumber" label="购买数量" width="100px">
      </el-table-column>
      <el-table-column prop="examineUser.username" label="审核人" width="100px">
      </el-table-column>
      <el-table-column prop="examineTime" label="审核时间" width="100px">
      </el-table-column>
      <el-table-column prop="examineOpinion" label="审核人意见" width="100px">
      </el-table-column>
      <el-table-column prop="status" label="审核状态" width="100px">
      </el-table-column>
      <el-table-column prop="createUser.username" label="创建人" width="100px">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间"> </el-table-column>
      <el-table-column prop="userRenew.username" label="更新人">
      </el-table-column>
      <el-table-column prop="renewTime" label="更新时间"> </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-search"
            circle
            @click="show(scope.row)"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="edit(scope.row)"
          ></el-button>
          <el-button type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- dialog1 -->
    <el-dialog title="查看" width="80%" :visible.sync="dialogTableVisible1">
      <el-table :data="gridData">
        <el-table-column prop="id" label="id" width="80px" />
        <el-table-column prop="purchase.id" label="进货单号" width="100px" />
        <el-table-column prop="vendor.id" label="经销商编号" width="100px" />
        <el-table-column prop="goodsku.id" label="商品sku号" width="100px" />
        <el-table-column prop="batch" label="批次" width="100px" />
        <el-table-column prop="purchasePrice" label="单价" width="100px" />
        <el-table-column prop="status" label="审核状态" width="100px" />
        <el-table-column
          prop="createUser.username"
          label="创建人"
          width="100px"
        />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column prop="renewUser.username" label="更新人" />
        <el-table-column prop="renewTime" label="更新时间" />
      </el-table>
    </el-dialog>

    <!-- dialog2 -->
    <el-dialog title="审核订单" :visible.sync="dialogFormVisible2">
      <el-form :model="editData">
        <el-form-item label="审核" prop="status" :label-width="formLabelWidth">
          <el-select
            v-model="editData.status"
            placeholder="请选择审核结果"
            style="width: 800px"
          >
            <el-option label="通过" value="2"></el-option>
            <el-option label="不通过" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="问题原因"
          prop="status2"
          :label-width="formLabelWidth"
        >
          <!-- 判断 -->
          <el-select
            :disabled="this.editData.status === '1' ? false : true"
            v-model="editData.status2"
            placeholder="请选择不同意的理由"
            style="width: 775px"
          >
            <el-option label="驳回" value="2"></el-option>
            <el-option label="供应商没货" value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="审核意见" :label-width="formLabelWidth">
          <el-input
            v-model="editData.opinion"
            autocomplete="off"
            style="width: 775px"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      id: "",
      roleId: "",
      token: "",
      dialogTableVisible1: false,
      dialogFormVisible2: false,
      tableData: [],
      gridData: [],
      editData: {
        status: "",
        opinion: "",
        status2: "",
      },
    };
  },

  methods: {
    add() {
      if (this.editData.status === "") {
        alert("请选择状态");
        return;
      } else if (this.editData.opinion === "") {
        alert("请输入审核意见");
        return;
      } else {
        axios
          .get("http://localhost:8088/updatePurchaseById/", {
            params: {
              token: this.token,
              status: this.editData.status,
              opinion: this.editData.opinion,
              id: this.id,
              status2: this.editData.status2,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              alert("审核成功");
              this.dialogFormVisible2 = false;
              this.editData = { status: "", opinion: "", status2: "" };
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    // 审核
    edit(row) {
      this.id = row.id;
      if (this.roleId !== 1) {
        alert("您不是管理员,无权编辑");
        return;
      } else {
        this.dialogFormVisible2 = true;
      }
    },

    // 查看详情
    show(row) {
      let id = row.id;
      this.dialogTableVisible1 = true;
      axios
        .get("http://localhost:8088/listPurchaseDetailedPurchaseById/" + id)
        .then((res) => {
          let data = res.data;
          console.log(data);
          if (res.status === 200) {
            this.gridData = data;
            this.gridData.forEach((item) => {
              if (item.status == 0) {
                item.status = "审核中";
              } else if (item.status == 1) {
                item.status = "审核通过";
              } else if (item.status == 2) {
                item.status = "审核不通过";
              } else if (item.status == 3) {
                item.status = "供应商没货";
              } else if (item.status == 4) {
                item.status = "订单完成";
              }
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //取消添加操作
    noShow() {
      this.dialogTableVisible = false;
    },

    // 绑定数据
    list() {
      this.axios
        .get("http://localhost:8088/showAllStoke")
        .then((res) => {
          let data = res.data;
          if (res.status === 200) {
            this.tableData = data;
            this.tableData.forEach((item) => {
              if (item.status == 0) {
                item.status = "审核中";
              } else if (item.status == 1) {
                item.status = "审核不通过";
              } else if (item.status == 2) {
                item.status = "审核通过";
              }
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //查询id来判断是否能编辑和删除
    tokenPowerId() {
      let token = sessionStorage.getItem("token");
      // alert(token)
      this.axios
        .get("http://localhost:8088/tokenPowerId", {
          params: { token: token },
        })
        .then((res) => {
          this.roleId = res.data.roleId;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.list();
    this.tokenPowerId();
    this.token = sessionStorage.getItem("token");
  },
};
</script>