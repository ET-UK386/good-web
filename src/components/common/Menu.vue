<template>
  <el-col :span="20" style="width: 98%">
    <el-menu default-active="3" class="el-menu-vertical-demo" router>
      <el-menu-item index="/HomePage">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>

      <el-submenu v-for="item in menu" :key="item.id" :index="item.path">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{ item.menuName }}</span>
        </template>
        <el-menu-item-group v-for="item2 in item.twoMenu" :key="item2.id">
          <el-menu-item :index="item2.path"
            ><i :class="item2.icon"></i>{{ item2.menuName }}</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-col>
</template>
<script>
export default {
  data() {
    return {
      menu: [],
      powerid: ''
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    list() {
      this.axios.get('http://localhost:8088/menu/listMenu').then((response) => {
        if (response.status == 200) {
          console.log(response);
          if (this.powerid == 1) {
            this.menu = response.data;
          }
        }
      });
    },
    list2() {
      this.axios
        .get('http://localhost:8088/menu/listMenu2')
        .then((response) => {
          if (response.status == 200) {
            console.log(response);
            if (this.powerid == 2) {
              this.menu = response.data;
            }
          }
        });
    },
    list3() {
      this.axios
        .get('http://localhost:8088/menu/listMenu3')
        .then((response) => {
          if (response.status == 200) {
            console.log(response);
            if (this.powerid == 3) {
              this.menu = response.data;
            }
          }
        });
    },
    list4() {
      this.axios
        .get('http://localhost:8088/menu/listMenu4')
        .then((response) => {
          if (response.status == 200) {
            console.log(response);
            if (this.powerid == 4) {
              this.menu = response.data;
            }
          }
        });
    }
  },
  created() {
    let token = sessionStorage.getItem('token');
    this.axios
      .get('http://localhost:8088/user/tokenPowerId', {
        params: {
          token
        }
      })
      .then((response) => {
        if (response.status == 200) {
          this.powerid = response.data.powerid;
        }
      });

    this.list();
    this.list2();
    this.list3();
    this.list4();
  }
};
</script>
