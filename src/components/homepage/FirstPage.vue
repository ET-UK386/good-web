<template>
  <div>
    <el-tag class="tag"
      ><span>今日累计采购</span><i class="el-icon-info"></i>
      <div class="report">￥{{ todayBuy }}</div></el-tag
    >
    <el-tag class="tag"
      ><span>今日累计销售</span><i class="el-icon-info"></i>
      <div class="report">￥{{ todaySell }}</div></el-tag
    >
    <el-tag class="tag"
      ><span>今日累计零售</span><i class="el-icon-info"></i>
      <div class="report">￥{{ todayRetail }}</div></el-tag
    >
    <el-tag class="tag"
      ><span>本月累计采购</span><i class="el-icon-info"></i>
      <div class="report">￥{{ tmonthBuy }}</div></el-tag
    >
    <el-tag class="tag"
      ><span>本月累计销售</span><i class="el-icon-info"></i>
      <div class="report">￥{{ tmonthSell }}</div></el-tag
    >
    <el-tag class="tag"
      ><span>本月累计零售</span><i class="el-icon-info"></i>
      <div class="report">￥{{ tmonthRetail }}</div></el-tag
    >
    <div id="myChart1" class="mychart" style="width: 420px;height: 400px;"></div>
    <div id="myChart2" class="mychart" style="width: 420px;height: 400px;"></div>
    <div id="myChart3" class="mychart" style="width: 420px;height: 400px;"></div>
    
  </div>
</template>
<script>
// import * as echarts from 'echarts';
 
export default {
  data() {
    return {
        todayBuy:11111,
        todaySell:11111,
        todayRetail:11111,
        tmonthBuy:11111,
        tmonthSell:11111,
        tmonthRetail:1111,
    };
  },
  mounted() {
    this.drawLine();
    this.drawLine2();
    this.drawLine3();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart1 = this.$echarts.init(document.getElementById("myChart1"));
      // 绘制图表
      myChart1.setOption({
        title: {text:"采购统计"},
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 15, 20],
          },
        ],
      });
    },
    drawLine2() {
      // 基于准备好的dom，初始化echarts实例
      let myChart2 = this.$echarts.init(document.getElementById("myChart2"));
      // 绘制图表
      myChart2.setOption({
        title: { text:"销售统计"},
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      });
    },
    drawLine3() {
      // 基于准备好的dom，初始化echarts实例
      let myChart3 = this.$echarts.init(document.getElementById("myChart3"));
      // 绘制图表
      myChart3.setOption({
        title: {text:"零售统计" },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      });
    },
    
  },
};
</script>
 
<style>
.tag {
  height: 100px;
  width: 200px;
  margin-right: 18px;
}
.tag span {
  display: inline-block;
}
.report {
  margin-top: 10px;
  font-size: 30px;
  text-align: center;
}
.el-icon-info {
  margin-left: 85px;
}
.mychart{
  display: inline-block;
  margin-right: 15px;
  margin-top: 30px;
}


</style>
