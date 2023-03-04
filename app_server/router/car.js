const express = require('express')
//创建路由对象
const router = express.Router()
// 导入车辆展示功能的处理函数模块
const car_handler = require('../router_handler/car')

//车辆展示路由
router.get('/car/showcars', car_handler.showcars)

//车辆 “轿车”  展示路由
router.get('/car/salooncars', car_handler.salooncars)

//车辆 “SUV”  展示路由
router.get('/car/suvcars', car_handler.suvcars)

//车辆 “跑车”  展示路由
router.get('/car/sportscars', car_handler.sportscars)

//车辆 “电车” 展示路由
router.get('/car/electriccars', car_handler.electriccars)

//车辆详情页面路由
router.get('/car/cardetails', car_handler.cardetails)

//汽车评价
router.get('/car/carevaluate', car_handler.carevaluate)

//汽车模糊查询
router.get('/car/searchcar',car_handler.searchcar)


module.exports = router