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
        <el-button icon="el-icon-shopping-cart-2" type="success"
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
          原价：<span style="text-decoration: line-through">￥500</span>
          <br />
          <br />
          <!--动态4：商品现价-->
          现价：<span style="font-size: 50px; color: red"
            >￥{{ nowPrice }}</span
          >
        </div>
        <!--动态5：规格选择-->
        <div class="goodsku">
          规格：
          <el-tag type="warning">s</el-tag>
          <el-tag type="warning">m</el-tag>
          <el-tag type="warning">l</el-tag>
          <el-tag type="warning">xl</el-tag>
          <el-tag type="warning">xxl</el-tag>
        </div>
        <!--动态6：颜色选择-->
        <div class="goodcolor">
          颜色：
          <el-tag type="info">黑色</el-tag>
          <el-tag type="info">绿色</el-tag>
          <el-tag type="info">克莱茵兰</el-tag>
          <el-tag type="info">中国红</el-tag>
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
      imgs: [
        'https://gd2.alicdn.com/imgextra/i1/3146548014/O1CN01QwFW9M294SpX7XCr9_!!3146548014.jpg',
        'https://gd3.alicdn.com/imgextra/i3/3146548014/O1CN01U51BLT294SpkO9tdb_!!3146548014.jpg',
        'https://gd2.alicdn.com/imgextra/i2/3146548014/O1CN01F76Q8h294SqKdTypz_!!3146548014.jpg',
        'https://gd3.alicdn.com/imgextra/i3/3146548014/O1CN015hTxY0294SqQ5wnbd_!!3146548014.jpg'
      ],
      srcList: [
        'https://gd2.alicdn.com/imgextra/i1/3146548014/O1CN01QwFW9M294SpX7XCr9_!!3146548014.jpg',
        'https://gd3.alicdn.com/imgextra/i3/3146548014/O1CN01U51BLT294SpkO9tdb_!!3146548014.jpg',
        'https://gd2.alicdn.com/imgextra/i2/3146548014/O1CN01F76Q8h294SqKdTypz_!!3146548014.jpg',
        'https://gd3.alicdn.com/imgextra/i3/3146548014/O1CN015hTxY0294SqQ5wnbd_!!3146548014.jpg'
      ],
      num: 1,
      skuTitle: 'Turned易冧ounng潮牌链条发泡字母圆领卫衣男早秋美式高街长袖T恤',
      nowPrice: '498',
      carNumber: '30',
      skuId: this.$route.params.skuId
    };
  },

  created() {
    //展示商品信息
    this.axios
      .get('http://localhost:8088/goodsdetail/showdetail', this.skuId)
      .then((res) => {
        console.log(res);
      });
  },
  methods: {
    handleChange() {}
  }
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
