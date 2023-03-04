const db = require('../db/index')
//查看我的收藏处理函数
exports.getcollect = (req, res) => {
    // 定义我的收藏SQL语言
    const sqlGetCollect = `select * from collects where userid = ?`
    // 执行SQL语句
    db.query(sqlGetCollect, req.user.id, (err, results) => {
        // SQL语句执行失败
        if (err) return res.cc(err)
        // 执行SQL语句成功，但是查询到的信息条数不等于1
        if (results.length < 1) return res.cc('查看我的收藏失败!')

        res.send({
            status: 0,
            message: '获取我的收藏成功！',
            data: results
        })

    })
}
//取消我的收藏处理函数
exports.deletecollect = (req, res) => {
    //定义取消收藏SQL语言
    const sqlDeleteCollect = `delete  from collects where carid =? and userid=? `
    db.query(sqlDeleteCollect, [req.query.carid, req.user.id], (err, results) => {
        if (err) return res.cc(err)
        // 执行SQL语句成功，但是查询到的信息条数不等于1
        if (results.affectedRows !== 1) return res.cc('取消收藏失败!')

        // 将信息响应给客户端
        res.send({
            status: 0,
            message: '取消收藏成功！',
            data: results
        })
    })

}
// 汽车收藏处理函数
exports.insertcollect = (req, res) => {
    const collects = req.body
    const userid = req.user.id
    const info = {
        userid: userid,
        carid: collects.carid,
        carname: collects.carname,
        carprice: collects.carprice,
        caroldprice: collects.caroldprice,
        cardesc: collects.cardesc,
        cartag1: collects.cartag1,
        cartag2: collects.cartag2,
        carimg1: collects.carimg1,
        collecttime: collects.collecttime
    }
    // 定义汽车收藏的SQL语言
    const sqlInsertCollect = `insert  into collects set ?`
    db.query(sqlInsertCollect, info, (err, results) => {
        //执行SQL语句失败
        if (err) {
            return res.cc(err)
        }
        //SQL语句执行成功，但影响行为数不为1
        if (results.affectedRows !== 1) {
            return res.cc('收藏车辆失败，请稍后再试')
        }
        //注册成功
        return res.send({
            status: 0,
            message: '收藏车辆成功'
        })

    })
}
// 判断用户是否收藏汽车处理函数
exports.intecollect = (req, res) => {
    // 定义用户是否收藏汽车SQL语句
    const sqlInteCollect = `select * from collects where carid =? and userid = ?`
    db.query(sqlInteCollect, [req.query.carid, req.user.id], (err, results) => {
        // SQL语句执行失败
        if (err) return res.cc(err)
        // 执行SQL语句成功，但是查询到的信息条数不等于1
        if (results.length < 1) return res.cc('用户没有收藏此车!')

        res.send({
            status: 0,
            message: '用户收藏此车！',
            data: results
        })
    })
}

//双表查询
exports.getclt = (req, res) => {
    // 先拿用户的id查收藏表中的汽车id
    const sqlGetClt = `select carid from collects where userid=?`
    db.query(sqlGetClt, req.user.id, (err, results) => {
        // SQL语句执行失败
        if (err) return res.cc(err)
        // 执行SQL语句成功，但是查询到的信息条数不等于1
        if (results.length < 1) return res.cc('查询用户收藏汽车id失败!')

        const carids = results
        let cars = []
        //拿到汽车id之后进行汽车表查询
        const sqlGetCars = `select * from cars where carid = ?`
        for (let i = 0; i < carids.length; i++) {
            db.query(sqlGetCars, carids[i].carid, (err, result) => {
                // SQL语句执行失败
                if (err) return res.cc(err)
                // 执行SQL语句成功，但是查询到的信息条数不等于1
                if (results.length < 1) return res.cc('查询汽车信息失败!')
                // console.log(result[0].carname);
                cars = result[0]
                console.log(cars);
                //!  关键步骤 跳出循环 不然没有返回值
                if (i == carids.length - 1) {
                    res.send({
                        status: 0,
                        message: '查询汽车信息成功！',
                        data: cars
                    })
                }
            })
        }



    })
}
