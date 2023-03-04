//导入数据库操作模块
const db = require('../db/index')
const bcrypt = require('bcryptjs')

//获取个人中心的处理函数
exports.getUserInfo = (req, res) => {
    // 定义查询用户信息SQL语句
    // const userInfo = req.query//?这个是给id查别人的信息，是管理员的接口
    const sqlSelectInfo = `select id,username,gender,number,birthday,email,user_pic from users where id = ?`
    //调用db.query()执行SQL语句
    //?此时的user属性是根据 Authorization 属性提供的Token解析成功，express-jwt中间件帮我们挂载上去的,不是表单的body
    db.query(sqlSelectInfo, req.user.id, (err, results) => {
        //1.执行SQL失败语句
        if (err) return res.cc(err)
        //2.执行 SQL 语句成功，但是查询到的数据条数不等于1
        if (results.length !== 1) return res.cc('获取信息失败！')
        // 3.将用户信息响应给客户端
        res.send({
            status: 0,
            message: '获取基本信息成功！',
            data: results[0]
        })
    })
}

//更新个人中心的处理函数
//?提交信息的都要经过表单验证(后端不能相信前端提供的信息所以得验证)
exports.updateUserInfo = (req, res) => {
    //定义更新用户信息的SQL语句
    // const sqlUpdateInfo = `update ev_users set ? where id=?`
    //调用db.query()执行SQL语句
    // db.query(sqlUpdateInfo, [req.body, req.body.id], (err, results) => {
    //     //执行SQL 语句失败
    //     if (err) return res.cc(err)
    //     //执行SQL语句成功，但影响行为数不为1
    //     if (results.affectedRows !== 1) return res.send(results)
    //     //修改用户信息成功
    //     return res.cc('修改用户信息成功', 0)
    // })
    const sqlUpdateInfo = `update users set ? where id=?`
    db.query(sqlUpdateInfo, [req.body, req.user.id], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        // 执行 SQL 语句成功，但影响行数不为 1
        if (results.affectedRows !== 1) return res.cc('修改用户基本信息失败！')//!数据库id不能改
        // 修改用户信息成功
        return res.cc('修改用户基本信息成功！', 0)
    })
}

//重置密码处理函数
exports.updatePassword = (req, res) => {
    // 定义根据id 查询用户是否存在的SQL语句
    const sqlSelectId = `select * from users where id =?`
    // 执行 SQL语句查询用户是否存在
    db.query(sqlSelectId, req.user.id, (err, results) => {
        //执行SQL语句失败
        if (err) return res.cc(err)
        //检查指定id的用户是否存在
        if (results.length !== 1) return res.cc('用户不存在')

        //TODO判断旧密码是否正确
        //使用bcrypt.compareSync(提交的密码，数据库中的密码) 方法验证原密码是否正确
        const compareResults = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if (!compareResults) return res.cc('原密码错误！')
        //TODO 原密码正确之后对新密码进行bcrypt加密后，更新到数据库中 
        // 定义更新用户密码的SQL
        const sqlUpdatePwd = `update users set password=?  where id = ?`

        // 对新密码进行 bcrypt加密
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        // 执行SQL语句，根据id更新用户的密码
        db.query(sqlUpdatePwd, [newPwd, req.user.id], (err, results) => {
            // SQL语句执行失败
            if (err) return res.cc(err)
            // SQL语句执行成功，但是影响行数不等于 1
            if (results.affectedRows !== 1) return res.cc('更新密码失败！')
            // 更新密码成功
            res.cc('更新密码成功！', 0)
        })
    })
}
//更换头像的处理函数
exports.updateAvatar = (req, res) => {
    const sqlUpdatephoto = `update users set user_pic =? where id = ?`
    db.query(sqlUpdatephoto, [req.body.avatar, req.user.id], (err, results) => {
        if (err) return res.send({
            status:'1',
            message:err.message
        })
        if (results.affectedRows !== 1)  return res.send({
            status:'1',
            message:'更换头像失败'
        })
        return res.send({
            status:'0',
            message:'更换头像成功'
        })
    })
}