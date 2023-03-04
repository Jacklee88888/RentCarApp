const express = require('express')
const router  = express.Router()

// 导入生成订单处理函数
const order_handler = require('../router_handler/order')

//导入验证数据合法性的zjj
const expressJoi = require('@escook/express-joi')
const { update_order_schema } = require('../schema/user')

//生成订单功能
router.post('/makeorders',expressJoi(update_order_schema),order_handler.makeorders)

//查看正在进行订单功能
router.get('/showonorders',order_handler.showonorders)

//查看已完成订单功能
router.get('/showfinishorders',order_handler.showfinishorders)

//查看正在进行订单详情
router.get('/orderdetail',order_handler.orderdetail)

//还车成功
router.post('/finishorder',order_handler.finishorder)

//评价成功修改订单中的评价状态
router.get('/finisheva',order_handler.finisheva)

// 删除订单
router.get('/deleteorder',order_handler.deleteorder)

//支付宝支付
router.post('/payment',order_handler.payment)

// 支付状态
router.post('/paystate',order_handler.paystate)

module.exports = router