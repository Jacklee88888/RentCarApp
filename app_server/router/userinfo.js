const express = require('express')
//创建路由对象
const router = express.Router()
//导入个人中心的处理函数模块
const userinfo_handler = require('../router_handler/userinfo')
//导入验证数据合法性的zjj
const expressJoi = require('@escook/express-joi')
//导入需要验证的规则对象
const { update_userinfo_schema,update_password_schema,update_avatar_schema } = require('../schema/user')

//*------------------------------路由区域--------------------
//查询用户信息路由用 GEt
router.get('/userinfo',userinfo_handler.getUserInfo)

//更新用户信息路由用 POST (涉及提交表单,需要验证)
router.post('/userinfo',expressJoi(update_userinfo_schema),userinfo_handler.updateUserInfo)

//重置密码的路由  用POST
router.post('/updatepwd',expressJoi(update_password_schema) ,userinfo_handler.updatePassword)

//更换头像路由
router.post('/update/avatar',expressJoi(update_avatar_schema) ,userinfo_handler.updateAvatar)
//*------------------------------路由区域--------------------

module.exports = router