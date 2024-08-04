
import { RouterMount, createRouter } from "uni-simple-router";
import store from '@/store'
const ROUTES = [
    {
        path: "/pages/index/index",
        name: "index",
        meta: {
            auth: true
        }
    },
    {
        path: "/pages/login/login",
        name: "login",
        meta: {
            title: "登录",
            auth: false
        }
    },
    {
        path: "/pages/identity/identity",
        name: "identity",
        meta: {
            title: "郴邦物流",
            auth: true
        }
    },
    {
        path: "/pages/waybillDetails/waybillDetails",
        name: "waybillDetails",
        meta: {
            title: "运单详情",
            auth: true
        }
    },
    {
        path: "/pages/myWaybill/myWaybill",
        name: "myWaybill",
        meta: {
            title: "我的运单",
            auth: true
        }
    },
    {
        path: "/pages/authentication/authentication",
        name: "authentication",
        meta: {
            title: "实名认证",
            auth: true
        }
    },
    {
        path: "/pages/driverCertification/driverCertification",
        name: "driverCertification",
        meta: {
            title: "司机认证",
            auth: true
        }
    },
    {
        path: "/pages/myCar/myCar",
        name: "myCar",
        meta: {
            title: "我的车辆",
            auth: true
        }
    },
    {
        path: "/pages/addCar/addCar",
        name: "addCar",
        meta: {
            title: "添加车辆",
            auth: true
        }
    },
    {
        path: "/pages/news/news",
        name: "news",
        meta: {
            title: "消息",
            auth: true
        }
    },
    {
        path: "/pages/setUp/setUp",
        name: "setUp",
        meta: {
            title: "设置",
            auth: true
        }
    },
    {
        path: "/pages/bindPhone/bindPhone",
        name: "bindPhone",
        meta: {
            title: "更换手机号",
            auth: true
        }
    },
    {
        path: "/",
        redirect: "/pages/index/index"
    }
]



const router = createRouter({
    platform: process.env.VUE_APP_PLATFORM, //平台
    routes: [...ROUTES] //路由表
});

//全局路由前置守卫
router.beforeEach((to, from, next) => {
    // 登录验证
    var userInfo = uni.getStorageSync("userInfo");
    console.log('userInfo',userInfo)
    if (to.path !="/pages/login/login" && (!userInfo || !userInfo.openid )  ) {
        let fullPath = encodeURIComponent(to.fullPath);
        // #ifdef MP-WEIXIN
        next('/pages/login/login?redirect=' + fullPath);
        // #endif

        // #ifndef MP-WEIXIN
        next({
            path: '/pages/login/login?redirect=' + fullPath,
            NAVTYPE: 'replace'
        });
        // #endif

    } else {
        next();
    }
    
});

// 全局路由后置守卫
// router.afterEach((to, from) => {
//     console.log("跳转结束");
// });

export { router, RouterMount };

