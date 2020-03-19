import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)
import {Message} from 'element-ui'

const routes = [
  {
    path: "/",
    redirect: "/DeviceManagement",
    name: "home",
    component: () => import("../views/Home.vue"),
    children: [
      {
        path: "/DeviceManagement",
        // redirect: "/DeviceManagement/VideoMonitoringEquipment",

        name: "DeviceManagement",
        component: () => import("../views/pages/DeviceManagement/DeviceManagement.vue"),
        meta:{keepAlive:true,islast:false }
        // children:[
        //   {path:"VideoMonitoringEquipment",name:"VideoMonitoringEquipment",component:()=>import('../views/pages/DeviceManagement/VideoMonitoringEquipment.vue')},
        //   {path:"VehiclePositioningEquipment",name:"VehiclePositioningEquipment",component:()=>import('../views/pages/DeviceManagement/VehiclePositioningEquipment.vue')},
        //   {path:"OilMonitoringEquipment",name:"OilMonitoringEquipment",component:()=>import('../views/pages/DeviceManagement/OilMonitoringEquipment.vue')},

        // ]
      },
      {
        path: "/VehicleManagement",
        name: "VehicleManagement",
        component: () => import("../views/pages/VehicleManagement/VehicleManagement.vue"),
        meta:{keepAlive:true,islast:false }

      },
      {
        path: "/Video",
        name: "Video",
        component: () => import("../views/pages/Video/Video.vue"),
        
        meta:{keepAlive:false,islast:false }

      },
      {
        path: "/VehicleLocalization",
        name: "VehicleLocalization",
        component: () => import("../views/pages/VehicleLocalization/VehicleLocalization.vue"),
        meta:{keepAlive:true,islast:false }

      },
      {
        path: "/OilMonitoring",
        name: "OilMonitoring",
        component: () => import("../views/pages/OilMonitoring/OilMonitoring.vue"),
        meta:{keepAlive:true,islast:false }

      },
      {
        path: "/DataStatistics",
        name: "DataStatistics",
        component: () => import("../views/pages/DataStatistics/DataStatistics.vue"),
        meta:{keepAlive:false,islast:true }
      }
    ]
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/pages/Login.vue")
  },
  {
    path: "*",
    name: "error",
    component: () => import("../components/404/404.vue")
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})
//添加一个路由守卫
router.beforeEach((to,from,next)=>{
  // if (to.path != '/login') {
  //   // 判断是否存在  userData
  //   if (!window.localStorage.getItem('userData')) {
  //     console.log(window.localStorage.getItem('userData'))
  //     Message({
  //       type: 'error',
  //       message: '您还没有登录'
  //     })
  //     router.push('/login')
  //   }
  // }
  next()
})
export default router
