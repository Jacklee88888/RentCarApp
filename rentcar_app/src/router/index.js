import Vue from 'vue'
import VueRouter from 'vue-router'
import CarsHome from '../views/car/CarsHome.vue'
Vue.use(VueRouter)

const routes = [
  //首页路由
  {
    path: '/',
    // name: 'CarsHome',//有子路由时父路由不要名字，路由跳转用默认子路由名字  ||  或者直接用父路由路径
    component: CarsHome,
    children: [
      {
        //汽车首页
        path: '',
        name: 'Cars',
        component: () => import('../views/car/Cars.vue'),
        meta:{isAuth:false,title:'首页'}
      },
      // 轿车页面
      {
        path: 'saloonCar',
        name: 'SaloonCar',
        component: () => import('../views/car/SaloonCar.vue'),
        meta:{isAuth:false,title:'轿车'}
      },
      // suv页面
      {
        path: 'suvCar',
        name: 'SuvCar',
        component: () => import('../views/car/SuvCar.vue'),
        meta:{isAuth:false,title:'SUV'}
      },
      // 跑车页面
      {
        path: 'sportsCar',
        name: 'SportsCar',
        component: () => import('../views/car/SportsCar.vue'),
        meta:{isAuth:false,title:'跑车'}
      },
      // 纯电页面
      {
        path: 'electricCar',
        name: 'ElectricCar',
        component: () => import('../views/car/ElectricCar.vue'),
        meta:{isAuth:false,title:'纯电'}
      }
    ]
  },
  //汽车详情页面
  {
    path: '/carDetails/:id',//路由传参为了包装刷新后参数不掉，得用/:属性名占位
    name: 'CarDetails',
    component: () => import('../views/car/CarDetails.vue'),
    meta:{isAuth:false,title:'汽车详情'}
  },
  // 汽车搜索页面
  {
    path: '/searchCars/:value?',//路由传参为了包装刷新后参数不掉，得用/:属性名占位
    name: 'SearchCars',
    component: () => import('../views/car/SearchCars.vue'),
    meta:{isAuth:false,title:'汽车搜索'}
  },

  //订单页面路由
  {
    path: '/ordersHome',
    // name: 'OrdersHome', 有子路由时父路由不要名字，路由跳转用默认子路由名字
    component: () => import('../views/Orders/OrdersHome.vue'),
    children: [
      {
        path: '',
        // name: 'Orders',
        component: () => import('../views/Orders/Orders.vue'),
        children: [
          {
            path: '',
            name: 'OnOrders',
            component: () => import('../views/Orders/OnOrders.vue'),
            meta:{isAuth:false,title:'正在进行订单'}
          },
          {
            path: 'finishOrders',
            name: 'FinishOrders',
            component: () => import('../views/Orders/FinishOrders.vue'),
            meta:{isAuth:false,title:'已完成订单'}
          },
  
          
        ]
      }
    ]
  },
  // 生成订单
  {
    path: '/ordersHome/makeOrder/:id',
    name: 'MakeOrder',
    component: () => import('../views/Orders/MakeOrder.vue'),
    meta:{isAuth:true,title:'生成订单'}
  },
  //订单详情
  {
    path: '/ordersHome/OrderDetail/:id',
    name: 'OrderDetail',
    component: () => import('../views/Orders/OrderDetail.vue'),
    meta:{isAuth:true,title:'订单详情'}
  },
  //支付完成页面
  {
    path: '/Pay',
    name: 'Pay',
    component: () => import('../views/Orders/Pay.vue'),
    meta:{isAuth:true,title:'支付完成'}
  },
  //我的页面路由
  {
    path: '/userHome',
    // name: 'User',
    component: () => import('../views/User/UserHome.vue'),
    children: [
      {
        path: '',
        name: 'User',
        component: () => import('../views/User/User.vue'),
        meta:{isAuth:false,title:'我的'}
      }
    ]
  },
  // 个人信息
  {
    path: '/userHome/myInfo',
    name: 'MyInfo',
    component: () => import('../views/User/MyInfo.vue'),
    meta:{isAuth:true,title:'个人信息'}
  },
  //修改个人信息
  {
    path: '/userHome/changeInfo',
    name: 'ChangeInfo',
    component: () => import('../views/User/ChangeInfo.vue'),
    meta:{isAuth:true,title:'修改信息'}
  },

  //我的评价
  {
    path: '/userHome/myEva',
    name: 'MyEva',
    component: () => import('../views/User/MyEva.vue'),
    meta:{isAuth:true,title:'我的评价'}
  },
  //我的收藏
  {
    path: '/userHome/myCollect',
    name: 'MyCollect',
    component: () => import('../views/User/MyCollect.vue'),
    meta:{isAuth:true,title:'我的收藏'}
  },
  //修改密码
  {
    path: '/userHome/changePW',
    name: 'ChangePW',
    component: () => import('../views/User/ChangePW.vue'),
    meta:{isAuth:true,title:'修改密码'}
  },
  //登录页面
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Login.vue'),
    meta:{isAuth:false,title:'登录'}
  },
  // 注册页面
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/login/Register.vue'),
    meta:{isAuth:false,title:'注册'}
  }

]

const router = new VueRouter({
  routes
})


//路由守卫
router.beforeEach((to, from, next) => {
  if(to.meta.isAuth) { //要跳转的路由的isAuth是否为true 若为true则要验证token  若为false则不需要验证token
    if(sessionStorage.getItem('token')){
      next()
    }else {
      alert('您还未登录，请先登录')
      
    }
  }else {
    next()
  }
})

//跳转成功后页面的标题 为路由定义标题
router.afterEach((to, from) => {
  document.title = to.meta.title
})



export default router
