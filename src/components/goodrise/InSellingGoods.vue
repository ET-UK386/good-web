<template>
  <div class="InSellingGoods">
    <el-row>
      <el-col
        :span="4"
        v-for="(item, index) in this.goods"
        :key="item.prId"
        :offset="index >= 0 ? 2 : 0"
      >
        <el-card :body-style="{ padding: '0px' }">
          <div style="width: 252px; height: 252px">
            <img
              :src="item.ipPath"
              height="252px"
              class="image"
              @click="show(item)"
            />
          </div>
          <div style="padding: 14px" @click="show(item)">
            <span>{{ item.skuSkuName }}</span>
            <span style="float: right; color: red">￥{{ item.pprice }}</span>
            <div class="bottom clearfix">
              <time class="time">{{ item.skuSkuDesc }}</time>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date(),
      goods: []
    };
  },
  methods: {
    show(item) {
      console.log(item);
      let skuId = item.skuId;
      console.log(skuId);
      this.$router.push({
        path: '/ShowDetail/' + skuId,
        params: { skuId: skuId }
      });
    },
    bindData() {
      this.axios
        .get('http://localhost:8088/gwc/findInSellingGoodsAll')
        .then((res) => {
          console.log(res);
          this.goods = res.data.data;
        });
    }
  },
  created() {
    this.bindData();
  }
};
</script>

<style>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}

.InSellingGoods .el-col-offset-2 {
  margin-left: 0px;
  margin-right: 10px;
  margin-bottom: 20px;
}
</style>
