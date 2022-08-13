<template>
  <div>
  <el-card>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="item in $route.matched" :key="item.name">{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
  </el-card>
  </div>
</template>