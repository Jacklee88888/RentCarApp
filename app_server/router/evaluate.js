const express = require('express')
// 创建路由对象
const router = express.Router()
//导入评价功能的处理函数模块
const evaluate_handler = require('../router_handler/evaluate')

// 用户查看我的评价
router.get('/myevaluate',evaluate_handler.getmyevaluate)

//用户删除我的评论
router.get('/delevalute',evaluate_handler.delmyevaluate)

//用户评价汽车
router.post('/addevaluate',evaluate_handler.addevaluate)

module.exports = router