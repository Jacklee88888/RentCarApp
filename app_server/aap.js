//创建express服务器实例
const express = require('express')
const app = express()
//?导入 joi 来定义验证规则
const joi = require('joi')
//?导入并配置 cors跨域中间件
const cors = require('cors')
app.use(cors())
//?导入配置文件
const config = require('./config')
//?导入解析客户端传来的token中间件
const expressJWT = require('express-jwt')
//除了api接口的才不要token，自动全局解析token
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))



//?配置解析表单数据的中间件，这个中间件只能解析application/x-www-form-urlencoded格式数据
app.use(express.urlencoded({ extended: false }))

//?注册全局中间件来处理发出错误信息，在路由只在封装res.cc函数
app.use((req, res, next) => {
    res.cc = (err, status = 1) => {
        //status 的默认值为1，表示失败的额情况
        //err 的值 ，可能是一个错误对象，也可能是一个错误的描述字符
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next();
})
//*------------------------------路由区域--------------------
//导入注册用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

//导入个人中心路由模块
const userinfoRouter = require('./router/userinfo')
app.use('/my', userinfoRouter)

//导入评价功能路由模块
const evaluateRouter = require('./router/evaluate')
app.use('/eva', evaluateRouter)

//导入汽车展示功能路由模块
const carRouter = require('./router/car')
app.use('/api', carRouter)

// 导入我的收藏功能路由模块
const collectRouter = require('./router/collect')
app.use('/clt', collectRouter)

//导入订单功能路由模块
const orderRouter = require('./router/order')
app.use('/order', orderRouter)
//*------------------------------路由区域--------------------

//*全局错误级别中间件
app.use((err, req, res, next) => {
    //验证失败导致的错误
    if (err instanceof joi.ValidationError) {
        return res.cc(err)
    }
    //身份认证失败后的错误
    if (err.name === 'UnauthorizedError') {
        res.send({
            status: 1,
            message: '身份认证失败！用戶未登录！！'
        })
    }
    //未知错误
    res.send({
        status: 1,
        message: err.message
    })


})


app.listen(8080, () => {
    console.log('api server running at http://127.0.0.1:8080')
})