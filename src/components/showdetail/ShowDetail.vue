<template>
  <div class="detail-main">
    <div class="left-icon">
      <i class="el-icon-platform-eleme"></i>
      <br />
      <span class="title"> 生活，就是买！</span>
    </div>
    <div class="info">
      <el-card class="info-img">
        <el-carousel indicator-position="outside">
          <el-carousel-item v-for="item in imgs" :key="item">
            <el-image
              style="width: 460px; height: 450px"
              :src="item"
              :preview-src-list="srcList"
            >
            </el-image>
          </el-carousel-item>
        </el-carousel>
      </el-card>
      <!--动态1：购物车商品数量-->
      <el-badge :value="carNumber" class="my-Shopping-Car">
        <el-button
          icon="el-icon-shopping-cart-2"
          type="success"
          @click="toShoppingCar"
          >我的购物车</el-button
        >
      </el-badge>
      <el-card class="info-all">
        <!---动态2：商品描述-->
        <h3>{{ skuTitle }}</h3>
        <div class="tips">
          &nbsp;&nbsp;&nbsp;9月开学季！各品牌大促，抢到就是赚到！
        </div>
        <div class="info-price">
          <!--动态3：商品原价-->
          原价：<span style="text-decoration: line-through">￥90</span>
          <br />
          <br />
          <!--动态4：商品现价-->
          现价：<span style="font-size: 50px; color: red"
            >￥{{ nowPrice }}</span
          >
        </div>
        <!--动态5：规格选择-->
        <div class="goodsku">
          规格：<el-button v-for="item in size" :key="item">
            {{ item }}
          </el-button>
        </div>
        <!--动态6：颜色选择-->
        <div class="goodcolor">
          颜色：
          <el-button v-for="item in color" :key="item" @click="colorChoice(item)">
            {{ item }}
          </el-button>
        </div>
        <div class="count">
          数量：
          <el-input-number
            v-model="num"
            @change="handleChange"
            :min="1"
            :max="10"
            label="描述文字"
          ></el-input-number>
        </div>
        <div class="operator">
          <el-button style="font-size: 18px" type="success" plain
            >立即购买</el-button
          >
          <el-button
            style="font-size: 18px"
            icon="el-icon-shopping-cart-2"
            type="success"
            @click="addToShoppingCar"
            >加入购物车</el-button
          >
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgs: [],
      srcList: [],
      num: 1,
      skuTitle: "",
      nowPrice: "",
      carNumber: "30",
      // skuId: this.$route.params.skuId
      skuid: "18",
      color: [],
      size: ["s", "m", "l", "xl", "xxl", "xxxl"],
      good: {
        skuid:"",
        color: "",
        number: "",
        price:"",
      },
    };
  },

  created() {
    //展示商品信息
    this.axios
      .get("http://localhost:8088/goodsdetail/showdetail/" + this.skuid)
      .then((res) => {
        this.skuTitle = res.data.skuDesc;
        this.nowPrice = res.data.price.price;
      });
    this.axios
      .get("http://localhost:8088/goodsdetail/showImages/" + this.skuid)
      .then((res) => {
        for (var index in res.data) {
          this.imgs.push(res.data[index].imagesPath.path);
          this.srcList.push(res.data[index].imagesPath.path);
        }
      });
    this.axios
      .get("http://localhost:8088/goodsdetail/showColor/" + this.skuid)
      .then((res) => {
        for (var index in res.data) {
          this.color.push(res.data[index].colorName);
        }
      });
    //查询购物车商品数量
    this.axios
      .get("http://localhost:8088/goodsdetail/countShoppingCar")
      .then((res) => {
        this.carNumber = res.data;
      });
  },
  methods: {
    handleChange() {},
    //选择颜色
    colorChoice(item) {
      this.good.color=item;
    },
    //跳转到购物车
    toShoppingCar() {
      this.$router.push("/Shop/ShopCar");
    },
    //添加购物车
    addToShoppingCar() {
      this.good.number=this.num;
      this.good.price=this.nowPrice;
      this.good.skuid=this.skuid;

      this.axios
        .post("http://localhost:8088/goodsdetail/addToShoppingCar",this.good)
        .then((res) => {
          if(res.data==1){
            this.$message("加入购物车成功！");
          }else{
            this.$message("加入购物车失败！")
          }
        });
    },
  },
};
</script>

<style>
.left-icon {
  position: absolute;
  width: 150px;
  height: 115px;
  text-align: center;
  top: 100px;
  left: 300px;
}
.el-icon-platform-eleme {
  font-size: 85px;
  color: #67c23a;
}
.title {
  color: #67c23a;
  font-size: 20px;
  font-weight: bolder;
  top: 0px;
  left: 5px;
}
.info {
  position: absolute;
  border: 1px solid;
  top: 80px;
  right: 15px;
}
.info-img {
  position: absolute;
  width: 500px;
  height: 500px;
  right: 685px;
}
.info-all {
  position: absolute;
  width: 525px;
  right: 150px;
}
.my-Shopping-Car {
  position: fixed;
  right: 50px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-carousel__container {
  position: relative;
  height: 450px;
}
.tips {
  font-size: larger;
  font-weight: 500;
  color: white;
  background: #67c23a;
  margin-left: -20px;
  margin-right: -20px;
}
.info-price {
  font-size: 20px;
  font-weight: 600;
  background: #daf1e0;
  margin-left: -20px;
  margin-right: -20px;
}
.goodsku {
  margin-top: 20px;
  font-size: 19px;
}
.goodcolor {
  margin-top: 20px;
  font-size: 19px;
}
.count {
  margin-top: 20px;
  font-size: 19px;
}
.operator {
  margin-top: 20px;
}
</style>
