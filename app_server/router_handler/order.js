const db = require("../db/index");
// 引入支付宝支付SDK
const alipaySdk = require("../db/alipay");
const AlipayFormData = require("alipay-sdk/lib/form").default;
const axios = require("axios");
// 生成订单处理函数
exports.makeorders = (req, res) => {
  const userid = req.user.id;
  const carid = req.query.carid;
  // const orderstate = req.query.orderstate
  // const ordermoney = req.query.ordermoney
  const ordertime = req.query.ordertime;

  const order = req.body;

  const info = {
    userid: userid,
    carid: order.carid,
    carimg: order.carimg,
    carname: order.carname,
    ordertime: order.ordertime,
    orderstate: order.orderstate,
    ordermoney: order.ordermoney,
    username: order.username,
    useridcard: order.useridcard,
    usernumber: order.usernumber,
    picktime: order.picktime,
    backtime: order.backtime,
    picklocation: order.picklocation,
    backlocation: order.backlocation,
    evaluatestate: order.evaluatestate,
  };
  // 定义生成订单SQL
  const sqlMakeOrders = `insert  into orders set ?`;
  // 执行SQL语句
  db.query(sqlMakeOrders, info, (err, results) => {
    //执行SQL语句失败
    if (err) return res.cc(err);
    //SQL语句执行成功，但影响行为数不为1
    if (results.affectedRows !== 1) {
      return res.cc("生成订单失败");
    }
    return res.send({
      status: 0,
      message: "订单生成成功",
    });
  });
};
//查看正在进行订单功能处理函数
exports.showonorders = (req, res) => {
  // 定义查看订单功能的SQL语句
  const sqlShowOnOrders = `select * from orders where userid=? and orderstate = 0`;
  //执行SQl语句
  db.query(sqlShowOnOrders, req.user.id, (err, results) => {
    // SQL语句执行失败
    if (err) return res.cc(err);
    // 执行SQL语句成功，但是查询到的信息条数不等于1
    if (results.length < 1) return res.cc("查看正在进行订单失败!");

    res.send({
      status: 0,
      message: "查看正在进行订单成功",
      data: results,
    });
  });
};
//查看已完成订单功能处理函数
exports.showfinishorders = (req, res) => {
  // 定义查看正在进行订单功能的SQL语句
  const sqlShowFinishOrders = `select * from orders where userid=? and orderstate = 1`;
  //执行SQl语句
  db.query(sqlShowFinishOrders, req.user.id, (err, results) => {
    // SQL语句执行失败
    if (err) return res.cc(err);
    // 执行SQL语句成功，但是查询到的信息条数不等于1
    if (results.length < 1) return res.cc("查看已完成订单失败!");

    res.send({
      status: 0,
      message: "查看已完成订单成功",
      data: results,
    });
  });
};

//查看订单详情功能处理函数
exports.orderdetail = (req, res) => {
  // 定义查看订单详情的SQL语句
  const sqlOrderDetail = `select * from orders where orderid=?`;
  //执行SQl语句
  db.query(sqlOrderDetail, req.query.orderid, (err, results) => {
    // SQL语句执行失败
    if (err) return res.cc(err);
    // 执行SQL语句成功，但是查询到的信息条数不等于1
    if (results.length < 1) return res.cc("查看订单详情失败!");
    // 响应客户端
    res.send({
      status: 0,
      message: "查看订单详情成功",
      data: results[0], //每个订单是唯一的所以返回results[0]
    });
  });
};
//还车成功处理函数
exports.finishorder = (req, res) => {
  const info = {
    orderstate: req.body.orderstate,
    ordertime: req.body.ordertime,
  };
  const orderid = req.body.orderid;

  const sqlFinishOrder = `update orders set ? where orderid=?`;
  db.query(sqlFinishOrder, [info, orderid], (err, results) => {
    // 执行SQL失败
    if (err) return res.cc(err);
    // 执行 SQL 语句成功，但影响行数不为 1
    if (results.affectedRows !== 1) return res.cc("还车失败！"); //!数据库id不能改
    // 修改用户信息成功
    return res.cc("还车成功！", 0);
  });
};
//完成评价处理函数
exports.finisheva = (req, res) => {
  const sqlFinishEva = `update orders set evaluatestate =? where orderid=?`;
  db.query(
    sqlFinishEva,
    [req.query.evaluatestate, req.query.orderid],
    (err, results) => {
      // 执行SQL失败
      if (err) return res.cc(err);
      // 执行 SQL 语句成功，但影响行数不为 1
      if (results.affectedRows !== 1) return res.cc("评价状态修改失败！");
      // 修改用户信息成功
      return res.cc("评价状态修改成功！", 0);
    }
  );
};

//删除订单处理函数
exports.deleteorder = (req, res) => {
  const sqlDeleteOrder = `delete from orders where orderid =? and userid = ?`;
  db.query(sqlDeleteOrder, [req.query.orderid, req.user.id], (err, results) => {
    // 执行SQL失败
    if (err) return res.cc(err);
    // 执行 SQL 语句成功，但影响行数不为 1
    if (results.affectedRows !== 1) return res.cc("评价删除失败！");
    // 修改用户信息成功
    return res.cc("评价删除成功！", 0);
  });
};

//支付宝支付
exports.payment = (req, res) => {
  //订单号
  let orderid = req.body.orderid;
  // 租车总价
  let price = req.body.price;
  //汽车名称
  let carname = req.body.carname;
  // 开始对接支付宝API
  const formData = new AlipayFormData();
  // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
  formData.setMethod("get");
  // 支付时信息
  formData.addField("bizContent", {
    outTradeNo: orderid, //订单号
    productCode: "FAST_INSTANT_TRADE_PAY", //写死
    totalAmount: price, //租车金额
    subject: carname, //汽车名称
    // body: '商品详情', 商品描述
  });
  //   支付成功或失败跳转的链接
  formData.addField("returnUrl", "http://localhost:8081/#/Pay");
  // 返回promis
  const result = alipaySdk.exec(
    "alipay.trade.page.pay",
    {},
    { formData: formData }
  );
  // 对接支付宝成功，支付宝返回数据（跳转网页的url）
  result.then((resp) => {
    res.send({
      data: {
        code: 200,
        success: true,
        msg: "支付中",
        paymentUrl: resp,
      },
    });
  });
};

// 支付状态
exports.paystate = (req, res) => {
  let out_trade_no = req.body.out_trade_no;
  let trade_no = req.body.trade_no;
  // 开始对接支付宝API
  const formData = new AlipayFormData();
  // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
  formData.setMethod("get");
  // 后端和支付宝做比对
  formData.addField("bizContent", {
    out_trade_no,
    trade_no,
  });
  // 返回promis
  const result = alipaySdk.exec(
    "alipay.trade.query",
    {},
    { formData: formData }
  );
  //   后端请求支付宝,返回url
  result.then((respState) => {
    axios({
      method: "GET",
      url: respState,
    }).then((resp) => {
      // res.send({
      //     code: 200,
      //     success: true,
      //     msg: "支付中",
      //     data: resp,
      // })
      // console.log(resp);
      let responseDate = resp.data.alipay_trade_query_response;
      if (responseDate.code == "10000") {
        console.log('OK');
        switch (responseDate.trade_status) {
          // 买家未付款
          case "WAIT_BUYER_PAY":
            res.send({
              data: {
                code: 0,
                message: "买家未付款",
              },
            });
            break;

          // 交易关闭
          case "TRADE_CLOSED":
            res.send({
              data: {
                code: 1,
                message: "交易关闭",
              },
            });
            break;

          // 交易完成（普通即时到帐状态下）
          case "TRADE_FINISHED":
            res.send({
              data: {
                code: 2,
                message: "交易完成，不可退款",
              },
            });
            break;

          // 交易完成 （高级即时到帐状态下）
          case "TRADE_SUCCESS":
            res.send({
              data: {
                code: 2,
                message: "交易完成",
              },
            });
            break;
        }
      
      } else if (responseDate.code == "40004") {
        res.send({
          data: {
            code: 3,
            message: "交易不存在",
          },
        });
      }
    }).catch((err) => {
      res.send({
        data: {
          code: 500,
          message: '交易失败',
          err
        }
      })
    });
  });
};
