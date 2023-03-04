const express = require('express')
//创建路由对象
const router = express.Router()
// 导入我的收藏处理函数
const collect_handler = require('../router_handler/collect')

// 我的收藏功能路由
router.get('/getcollect',collect_handler.getcollect)

//取消我的收藏功能
router.get('/deletecollect',collect_handler.deletecollect)

//点击汽车收藏
router.post('/insertcollect',collect_handler.insertcollect)

//判断用户是否收藏汽车
router.get('/intecollect',collect_handler.intecollect)

//查询收藏
router.get('/getclt',collect_handler.getclt)

module.exports = router