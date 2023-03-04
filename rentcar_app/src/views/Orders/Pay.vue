<template>
  <div>
    <van-row>
      <van-col span="24" class="top">
        <div class="title">支付详情</div>
      </van-col>
    </van-row>
    <h2>支付了</h2>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";

export default {
  name: "Pay",

  data() {
    return {};
  },
  created() {
    this.getState();
  },
  methods: {
    // 给后端发送日期格式
    formatDateValue(now) {
      var year = this.dateZero(now.getFullYear()); //取得4位数的年份
      var month = this.dateZero(now.getMonth() + 1); //取得日期中的月份，其中0表示1月，11表示12月
      var date = this.dateZero(now.getDate()); //返回日期月份中的天数（1到31）
      var hour = this.dateZero(now.getHours()); //返回日期中的小时数（0到23）
      var minute = this.dateZero(now.getMinutes()); //返回日期中的分钟数（0到59）
      var second = this.dateZero(now.getSeconds()); //返回日期中的秒数（0到59）
      return (
        year +
        "-" +
        month +
        "-" +
        date +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second
      );
    },
    // 日期前面加0
    dateZero(time) {
      if (time < 10) {
        time = "" + "0" + time;
      }
      return time;
    },
    // this.formatDateValue(new Date)  这个为当前格式化后的时间戳

    // 获取支付状态
    getState() {
      const token = sessionStorage.getItem("token");
      let data = qs.stringify({
        // 租车订单号
        out_trade_no: this.$route.query.out_trade_no,
        // 交易订单号
        trade_no: this.$route.query.trade_no,
      });
      axios({
        method: "POST",
        url: "http://127.0.0.1:8080/order/paystate",
        headers: {
          Authorization: token,
        },
        data: data,
      }).then((resp) => {
        // 买家未付款
        if (resp.data.data.code == 0) {
          console.log(resp.data.data.message);
        }
        // 交易关闭
        if (resp.data.data.code == 1) {
          console.log(resp.data.data.message);
        }
        // 交易完成
        if (resp.data.data.code == 2) {
          //把订单状态orderstate改为1  同时修改订单时间 请求后端
          const token = sessionStorage.getItem("token");
          const data = qs.stringify({
            orderid: this.$route.query.out_trade_no,
            orderstate: 1,
            ordertime: this.formatDateValue(new Date()),
          });
           axios({
            method: "POST",
            url: "http://127.0.0.1:8080/order/finishorder",
            headers: {
              Authorization: token,
            },
            data: data,
          }).then((resp) => {
            if (resp.data.status == 0) {
              console.log(resp.data.message);
            }
            if (resp.data.status == 1) {
              console.log(resp.data.message);
            }
          });
          // this.$router.replace({ name: "Cars" });
       
          console.log(resp.data.data.message);
        }
        // 交易不存在
        if (resp.data.data.code == 3) {
          console.log(resp.data.data.message);
        }
        // 交易失败
        if (resp.data.data.code == 500) {
          console.log(resp.data.data.message);
          console.log(resp.data.data.err);
        }
      });
    },
  },
};
</script>
<style  scoped>
.top {
  width: 100%;
  height: 90px;
  /* background-color: #2788dd; */
  background-color: #0e78ff;

  text-align: center;
}

.top > .title {
  font-size: 25px;
  color: #fff;
  margin-top: 5px;
}
</style>