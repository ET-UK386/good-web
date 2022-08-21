<template>
  <div>
    <el-container>
      <Header />
      <el-container class="content">
        <el-aside>
          <Menu />
        </el-aside>
        <el-container>
          <Nav />
          <el-main>
            <router-view></router-view>
          </el-main>
          <el-footer class="footer">
            <Footer />
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Header from "./common/Header.vue";
import Footer from "./common/Footer.vue";
import Menu from "./common/Menu.vue";
import Nav from "./common/Nav.vue";
export default {
  components: {
    Header,
    Footer,
    Nav,
    Menu,
  },
};
</script>
<style>
.content {
  width: 98%;
  height: 90%;
  position: absolute;
  top: 80px;
}
.footer {
  width: 98%;
  position: relative;
  margin-bottom: -200px;
  bottom: 0px;
  position: relative;
  left: 1%;
}
</style>
