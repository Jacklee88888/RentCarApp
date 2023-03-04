const db = require('../db/index')

//查看我的评价处理函数
exports.getmyevaluate = (req, res) => {
    // 定义查询我的评价SQL语言
    const sqlSelectEva = `select * from evaluates where userid = ?`
    // 执行SQL语句
    db.query(sqlSelectEva, req.user.id, (err, results) => {
        // SQL语句执行失败
        if (err) return res.cc(err)
        // 执行SQL语句成功，但是查询到的信息条数不等于1
        if (results.length < 1) return res.cc('查看我的评价失败！')

        // 将信息响应给客户端
        res.send({
            status: 0,
            message: '获取评价信息成功！',
            data: results
        })
    })

}
//删除我的评价处理函数
exports.delmyevaluate = (req, res) => {
    // 定义删除我的评价SQL语言
    const sqlDeleteEva = `delete  from  evaluates  where evaid= ? `
    // 执行SQL语句
    db.query(sqlDeleteEva, req.query.evaid, (err, results) => {
        // SQL语句执行失败
        if (err) return res.cc(err)
        // 执行SQL语句成功，但是查询到的信息条数不等于1
        if (results.affectedRows !== 1) return res.cc('删除我的评价失败！')

        // 将信息响应给客户端
        res.send({
            status: 0,
            message: '删除我的评价成功！',
            data: results
        })
    })
}
//用户评价汽车处理函数
exports.addevaluate = (req, res) => {
    const info = {
        userid: req.user.id,
        orderid:req.body.carid,
        carid: req.body.carid,
        content: req.body.content,
        evatime: req.body.evatime,
        star: req.body.star
    }

    // 定义用户评价汽车的SQL语句
    const sqlAddEvaluate = `insert  into evaluates set ?`
    // 执行SQL语句
    db.query(sqlAddEvaluate, info, (err, results) => {
        // SQL语句执行失败
        if (err) return res.cc(err)
        // 执行SQL语句成功，但是查询到的信息条数不等于1
        if (results.affectedRows !== 1) return res.cc('订单评价失败！')

        // 将信息响应给客户端
        res.send({
            status: 0,
            message: '订单评价成功！',
            data: results
        })
    })

}

