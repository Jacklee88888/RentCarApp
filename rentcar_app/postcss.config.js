module.exports = {
    plugins: {
      'postcss-pxtorem': {
        rootValue: 37.5,//设置根元素字体大小
        propList: ['*'],//所有元素可以从px更改到rem的属性
        exclude:/node_modules/i,//排除node_modules目录
        // selectorBlackList:['van-','.my-']//过滤掉vant-开头的元素、.my-开头的类选择器
      },
    },
  };