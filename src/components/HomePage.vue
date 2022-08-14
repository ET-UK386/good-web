
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
            <FirstPage></FirstPage>
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
import Nav from './common/Nav.vue';
import FirstPage from './homepage/FirstPage.vue'

export default {
  components: {
    Header,
    Footer,
    Nav,
    Menu,
    FirstPage
  },
};
</script>
<style>
.content {
  width: 98%;
  height: 650px;
  position: absolute;
  top: 80px;
}
.footer {
  width: 98%;
  margin-bottom: 0px;
  bottom: 0px;
}
</style>
