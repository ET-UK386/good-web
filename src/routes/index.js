//专门配置整个项目路由的一块位置
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            component: () => import("@/components/Login"),
            name: "登录"
        },
        {
            path: '/HomePage',
            component: () => import("@/components/HomePage"),
            name: "首页",

        },
        {
            path: '/home',
            component: () => import("@/components/Home"),
            name: "零售",

            children: [
                {
                    path: '/Retail/Outbound',
                    component: () => import("@/components/retail/Outbound"),
                    name: "零售出库"
                },
                {
                    path: '/Retail/Returns',
                    component: () => import("@/components/retail/Returns"),
                    name: "零售退货"
                },
            ]
        },
        {
            path: '/home',
            component: () => import("@/components/Home"),
            name: "采购",
            children: [
                {
                    path: '/Purchase/Detail',
                    component: () => import("@/components/purchase/Detail"),
                    name: "订单明细"
                },
                {
                    path: '/Purchase/Statistics',
                    component: () => import("@/components/purchase/Statistics"),
                    name: "采购统计"
                },
                {
                    path: '/Purchase/Stock',
                    component: () => import("@/components/purchase/Stock"),
                    name: "采购商品"
                }
            ]
        },
        {
            path: '/home',
            component: () => import("@/components/Home"),
            name: "仓库",
            children: [
                {
                    path: '/Warehouse/Detail',
                    component: () => import("@/components/warehouse/Detail"),
                    name: "入库明细"
                },
            ]
        },
        {
            path: '/home',
            component: () => import("@/components/Home"),
            name: "商品管理",
            children: [
                {
                    path: '/Commodity/Message',
                    component: () => import("@/components/commodity/Message"),
                    name: "商品信息"
                },
            ]
        },
        {
            path: '/home',
            component: () => import("@/components/Home"),
            name: "财务",
            children: [
                {
                    path: '/Finance/Income',
                    component: () => import("@/components/finance/Income"),
                    name: "收入"
                },
                {
                    path: '/Finance/Expend',
                    component: () => import("@/components/finance/Expend"),
                    name: "支出"
                },
            ]
        },
        {
            path: '/home',
            component: () => import("@/components/Home"),
            name: "供应商",
            children: [
                {
                    path: '/Supplier/Message',
                    component: () => import("@/components/supplier/Message"),
                    name: "供应商信息"
                },
            ]
        },
        {
            path: '/home',
            component: () => import("@/components/Home"),
            name: "员工管理",
            children: [
                {
                    path: '/Employee/Cashier',
                    component: () => import("@/components/employee/Cashier"),
                    name: "收银员"
                },
                {
                    path: '/Employee/Inspector',
                    component: () => import("@/components/employee/Inspector"),
                    name: "验货员"
                },
                {
                    path: '/Employee/TallyClerk',
                    component: () => import("@/components/employee/TallyClerk"),
                    name: "理货员"
                },
            ]
        },
    ],
})