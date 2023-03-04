/**
 *  在这里定义和用户相关的路由处理函数，供/router/user.js 模块进行调用
 */

//?导入数据库操作模块
const db = require('../db/index')
//?导入加密bcryptjs
const bcrypt = require('bcryptjs')
//?导入生成Token字符串的包jsonwebtoken
const jwt = require('jsonwebtoken')
//?导入全局配置包
const config = require('../config')

//注册用户的处理函数
exports.regUser = (req, res) => {

    //*已经用joi校验规则和expressJoi中间件校验了
    /*{
         // 1.对表单中的数据，进行合法性的校验
    if (!userInfo.username) {
        //? 用res.cc() 代替之前的res.send({})
        // return res.send({
        //     status: 1,
        //     message: '用户名不能为空！'
        // })
        return res.cc('用户名不能为空！')
    }
    if (!userInfo.password) {
        // return res.send({
        //     status: 1,
        //     message: '用户密码不能为空'
        // })
        return res.cc('用户密码不能为空')
    }
    }*/

    const userInfo = req.body
    //* 2.定义SQL语句，查询用户名是否被占用
    const sqlSelect = `select * from users where username = ?`
    db.query(sqlSelect, userInfo.username, (err, results) => {
        //执行sql语句失败
        if (err) {
            // return res.send({
            //     status: 1,
            //     message: err.message
            // })
            return res.cc(err)
        }
        //用户名被占用
        if (results.length > 0) {
            // return res.send({
            //     status: 1,
            //     message: '用户名被占用，请更换其他用户名'
            // })
            return res.cc('用户名被占用，请更换其他用户名')
        }

        //* 3.调用 bcrypt.hashSync()对密码进行加密,返回值是加密之后的密码字符串
        userInfo.password = bcrypt.hashSync(userInfo.password, 10)

        //* 4定义插入用户的SQL语句 
        const sqlInsert = `insert into users set ?`
        db.query(sqlInsert, { username: userInfo.username, password: userInfo.password }, (err, results) => {
            //执行SQL语句失败
            if (err) {
                return res.cc(err)
            }
            //SQL语句执行成功，但影响行为数不为1
            if (results.affectedRows !== 1) {
                return res.cc('注册用户失败，请稍后再试')
            }
            //注册成功
            return res.send({
                status: 0,
                message: '注册成功'
            })

        })

    })

}
//登录处理函数
exports.login = (req, res) => {
    //将用户提交的数据存在userInfo里面
    const userInfo = req.body
    // 定义查询用户名SQL语句
    const sqlSelectName = `select * from users where username = ?`
    //执行SQL语句查询用户数据
    db.query(sqlSelectName, userInfo.username, (err, results) => {
        // 执行SQL语句失败
        if (err) return res.cc(err)
        //执行语句成功，但查询不到数据，登录失败
        if (results.length != 1) return res.cc('登录失败1')

        // return console.log(results[0].password)
        //拿着用户输入的密码，和数据库中存储的密码进行对比,数据库的密码已经加密了不能直接比较，只能借助于bcrypt 
        const compareResults = bcrypt.compareSync(userInfo.password, results[0].password)

        //如果比对的结果等于false ，则证明用户输入的密码错误
        if (!compareResults) {
            return res.cc('登录失败！2')
        }

        //TODO：在服务器生成Token的字符串
        //把数据库差到的用户信息用......results[0]暴露出来，然后剔除掉 密码 和 头像
        const user = { ...results[0], password: '', user_pic: '' }
        //对用户信息进行加密，生成Token字符串   用全局配置文件方便后期修改
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
        //调用res.send() 将Token响应给客户端
        res.send({
            status: 0,
            message: '登录成功',
            token: 'Bearer ' + tokenStr //*Bearer 后面有个空格
        })


    })

}
//! express 不允许连续使用2次send