const db = require('../db/index')


//汽车处理函数
exports.showcars = (req, res) => {
    //定义汽车展示的SQL语言
    const sqlShowCars = `select * from cars `
    // 执行SQL语句
    db.query(sqlShowCars, (err, resluts) => {
        // SQL语句执行失败
        if (err) return res.cc(err)
        // 执行SQL语句成功，但查询到的信息条数小于1
        if (resluts.length < 1) return res.cc('汽车展示失败！')
        // 将信息响应给客户端
        res.send({
            status: 0,
            message: '汽车展示成功！',
            data: resluts
        })
    })

}
//轿车展示处理函数
exports.salooncars = (req, res) => {
    // 定义汽车分类别展示SQL语句
    const sqlTypeCars = `select * from cars where cartype = '轿车'`
    db.query(sqlTypeCars, (err, resluts) => {
        // SQL语句执行失败
        if (err) return res.cc(err)
        // 执行SQL语句成功，但查询到的信息条数小于1
        if (resluts.length < 1) return res.cc('轿车展示失败！')
        // 将信息响应给客户端
        res.send({
            status: 0,
            message: '轿车展示成功！',
            data: resluts
        })
    })
}
//SUV展示处理函数
exports.suvcars = (req, res) => {
    // 定义汽车分类别展示SQL语句
    const sqlSuvCars = `select * from cars where cartype = 'SUV'`
    db.query(sqlSuvCars, (err, resluts) => {
        // SQL语句执行失败
        if (err) return res.cc(err)
        // 执行SQL语句成功，但查询到的信息条数小于1
        if (resluts.length < 1) return res.cc('SUV展示失败！')
        // 将信息响应给客户端
        res.send({
            status: 0,
            message: 'SUV展示成功！',
            data: resluts
        })
    })
}

//跑车展示处理函数
exports.sportscars = (req, res) => {
    // 定义汽车分类别展示SQL语句
    const sqlSportsCars = `select * from cars where cartype = '跑车'`
    db.query(sqlSportsCars, (err, resluts) => {
        // SQL语句执行失败
        if (err) return res.cc(err)
        // 执行SQL语句成功，但查询到的信息条数小于1
        if (resluts.length < 1) return res.cc('跑车展示失败！')
        // 将信息响应给客户端
        res.send({
            status: 0,
            message: '跑车展示成功！',
            data: resluts
        })
    })
}
//纯电车车展示处理函数
exports.electriccars = (req, res) => {
    // 定义汽车分类别展示SQL语句
    const sqlElectricCars = `select * from cars where cartype = '电车'`
    db.query(sqlElectricCars, (err, resluts) => {
        // SQL语句执行失败
        if (err) return res.cc(err)
        // 执行SQL语句成功，但查询到的信息条数小于1
        if (resluts.length < 1) return res.cc('电车展示失败！')
        // 将信息响应给客户端
        res.send({
            status: 0,
            message: '电车展示成功！',
            data: resluts
        })
    })
}

//汽车详情页面处理函数
exports.cardetails = (req, res) => {
    const sqlCarDetails = `select * from cars where carid = ?`
    db.query(sqlCarDetails, req.query.carid, (err, resluts) => {
        // SQL语句执行失败
        if (err) return res.cc(err)
        // 执行SQL语句成功，但查询到的信息条数小于1
        if (resluts.length < 1) return res.cc('汽车详情展示失败')
        // 将信息响应给客户端
        res.send({
            status: 0,
            message: '汽车详情展示成功！',
            data: resluts[0]//用对象返回不用数组
        })

    })
}
// 汽车评价处理函数
exports.carevaluate = (req, res) => {
    // 定义查询我的评价SQL语言
    const sqlDetailsEva = `select * from evaluates where carid = ?`
    // 执行SQL语句
    db.query(sqlDetailsEva, req.query.carid, (err, results) => {
        // SQL语句执行失败
        if (err) return res.cc(err)
        // 执行SQL语句成功，但是查询到的信息条数不等于1
        if (results.length < 1) return res.cc('查看车辆评价失败！')

        // 将信息响应给客户端
        res.send({
            status: 0,
            message: '查看车辆评价成功！',
            data: results
        })
    })
}
//汽车模糊查询处理函数
exports.searchcar = (req, res) => {
    const searchText = "'%" + req.query.value + "%'"
    //定义汽车模糊查询SQL语句
    const sqlSearchCar = `select * from cars where carname like ${searchText} 
    or cartype like ${searchText} or cartag1 like ${searchText} or cartag2 like ${searchText} 
    or carbrand like ${searchText} or cardesc like ${searchText} or carspeedbox like ${searchText} `
    db.query(sqlSearchCar, (err, resluts) => {
        // SQL语句执行失败
        if (err) return res.cc(err)
        // 执行SQL语句成功，但查询到的信息条数小于1
        if (resluts.length < 1) return res.cc('汽车搜索失败！')
        // 将信息响应给客户端
        res.send({
            status: 0,
            message: '汽车搜索成功！',
            data: resluts
        })
    })
}