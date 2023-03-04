const joi = require('joi')

/**
 * 
 * string()     值必须是字符串
 * alphanum()  值只能是包含a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * require()   值是必选项 ，不能为undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 *  */

//用户名的验证规则
const username = joi
    .string()
    .min(1)
    .max(10)
    .required()
//密码的验证规则
const password = joi
    .string()
    .pattern(/^[\S]{6,12}$/)
    .required()

//id 的验证规则
const id = joi
    .number()
    .integer()
    .min(1)
    .required()

//昵称的验证规则
const nickname = joi
    .string()
    .required()

//邮箱的验证规则
const email = joi
    .string()
    .email()
    .required()

//生日的验证规则
const birthday = joi
    .string()
    .required()

//电话验证规则
const number = joi
    .string()
    .min(1)
    .required()
//生日的验证规则
const gender = joi
    .string()
    .required()
//旧密码的验证规则   (使用上面定义的password这个检验规则来验证req.body.oldPwd的值)
const oldPwd = password

//新密码的验证规则
// 使用joi.not(joi.ref('oldPwd')).concat(password)校验规则来验证req.body.newPwd的值
// 1.joi.ref('oldPwd') 表示newPwd的值必须和oldPwd的值保持一致
// 2. .concat()用于合并joi.not(joi.ref('oldPwd')) 和  password 这两条验证规则
const newPwd = joi.not(joi.ref('oldPwd')).concat(password)

//头像的验证规则
// dataUri() 指的是如下格式的字符串数据：Base64
// data:image/png;base64,VE9PTUFOWVNFQ1JFVFM=
const avatar = joi.string().dataUri().required()

//订单验证规则
const carid = joi.string().required()
const carname = joi.string().required()
const carimg = joi.string().required()
const orderstate = joi.string().required()
const ordertime = joi.string().required()
const ordermoney = joi.string().required()
const useridcard = joi.string().required()
const usernumber = joi.string().required()
const picktime = joi.string().required()
const backtime = joi.string().required()
const picklocation = joi.string().required()
const backlocation = joi.string().required()
const evaluatestate = joi.string().required()


//注册和登录表单的验证规则对象
exports.reg_login_schema = {
    //表示需要对 req.body 中的数据进行验证
    body: {
        username,
        password
    }
}
//修改用户信息的验证规则对象
exports.update_userinfo_schema = {
    body: {
        username,
        gender,
        number,
        birthday,
        email
    }
}
//修改密码的验证规则对象
exports.update_password_schema = {
    body: {
        oldPwd,
        newPwd
    }
}
//更换头像的验证规则对象
exports.update_avatar_schema = {
    body: {
        avatar
    }
}
//生成订单的验证规则对象
exports.update_order_schema = {
    body: {
        carid,
        carname,
        carimg,
        orderstate,
        ordertime,
        ordermoney,
        username,
        useridcard,
        usernumber,
        picktime,
        backtime,
        picklocation,
        backlocation,
        evaluatestate

    }
}