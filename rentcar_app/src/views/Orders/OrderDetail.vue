<template>
  <div>
    <!-- 标题 -->
    <van-sticky>
      <van-row>
        <van-col span="24" class="top">
          <div class="title">租车帝</div>
        </van-col>
      </van-row>
    </van-sticky>
    <!-- 返回 -->
    <van-sticky :offset-top="95.59">
      <van-nav-bar
        class="title"
        title="订单详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </van-sticky>
    <!-- 汽车图片 -->
    <van-image width="10rem" height="5rem" fit="cover" :src="order.carimg" />
    <!-- 订单表单 -->
    <div>
      <ul>
        <li class="info">
          <p>汽车名字: &nbsp&nbsp&nbsp&nbsp&nbsp{{ order.carname }}</p>
          <van-divider></van-divider>
        </li>
        <li class="info">
          <p>用户姓名: &nbsp&nbsp&nbsp&nbsp&nbsp{{ order.username }}</p>
          <van-divider></van-divider>
        </li>
        <li class="info">
          <p>电话号码: &nbsp&nbsp&nbsp&nbsp&nbsp{{ order.usernumber }}</p>
          <van-divider></van-divider>
        </li>
        <li class="info">
          <p>租车时间: &nbsp&nbsp&nbsp&nbsp&nbsp{{ order.picktime }}</p>
          <van-divider></van-divider>
        </li>
        <li class="info">
          <p>还车时间: &nbsp&nbsp&nbsp&nbsp&nbsp{{ order.backtime }}</p>
          <van-divider></van-divider>
        </li>
        <li class="info">
          <p>取车地点: &nbsp&nbsp&nbsp&nbsp&nbsp{{ order.picklocation }}</p>
          <van-divider></van-divider>
        </li>
        <li class="info">
          <p>还车地点: &nbsp&nbsp&nbsp&nbsp&nbsp{{ order.backlocation }}</p>
        </li>
        <van-divider></van-divider>
        <li class="info" v-if="showState">
          <p>
            定单状态: &nbsp&nbsp&nbsp&nbsp&nbsp
            <span class="state">{{ state0 }}</span>
          </p>
        </li>
        <li class="info" v-if="!showState">
          <p>
            定单状态: &nbsp&nbsp&nbsp&nbsp&nbsp
            <span class="state">{{ state1 }}</span>
          </p>
        </li>
      </ul>
    </div>
    <!-- 支付窗口 -->
    <van-dialog
      v-model="showPay"
      title="支付"
      show-cancel-button
      @confirm="payMoney"
    >
      <van-cell-group>
        <van-field
          v-model="money"
          label="输入租车金额"
          :placeholder="paymoney"
        />
      </van-cell-group>
    </van-dialog>
    <!-- 评价窗口 -->
    <van-dialog
      v-model="showEvaing"
      title="支付"
      show-cancel-button
      @confirm="addEva"
    >
      <van-cell-group>
        <van-field
          v-model="evaContent"
          rows="2"
          autosize
          label="评价"
          type="textarea"
          maxlength="50"
          placeholder="请输入留言"
          show-word-limit
        />
      </van-cell-group>
      <span
        >星级评价:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span
      >
      <van-rate v-model="evaStar" :size="18" color="#ffd21e" void-icon="star" />
    </van-dialog>

    <!-- 提交订单 -->
    <!-- <div @click="backCar" v-if="showState">
      <van-submit-bar
        :price="order.ordermoney * 100"
        button-text="立即还车"
        @click="backCar"
      />
    </div> -->

    <!-- 支付宝支付 -->
        <div @click="alipay" v-if="showState">
            <van-submit-bar :price="order.ordermoney*100" button-text="立即还车" @click="alipay" />
        </div>

    <!-- 评价 -->
    <div @click="evaluate" v-if="showEvalute">
      <van-submit-bar button-text="立即评价" @click="evaluate" />
    </div>
    <div v-if="showEvaluted">
      <van-submit-bar button-text="已经评价" />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";
import Vue from "vue";
// 组件调用
import { Dialog } from "vant";
import { Image as VanImage } from "vant";
import { Calendar } from "vant";

Vue.use(Calendar);
Vue.use(VanImage);
Vue.use(Dialog);

export default {
  name: "OrderDetail",
  data() {
    return {
      paymoney: "",
      showPay: false, //付款窗口
      money: "",

      showEvaing: false, //评价窗口
      evaContent: "",
      evaStar: 0,

      orderid: "",
      order: {},
      showState: true,
      state0: "正在进行",
      state1: "已完成",
      showEvalute: false, //立即评价
      showEvaluted: false, //已经评价
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push({ name: "FinishOrders", params: { name: "b" } });
    },

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
    //立即还车
    backCar() {
      this.showPay = true;
      console.log(typeof (this.order.ordermoney * 100));
    },
    //还车后付款
    payMoney() {
      //付钱金额一样 ，还车成功
      if (this.money == this.order.ordermoney) {
        Dialog.alert({
          title: "支付成功",
          message: "您已成功还车，感谢您的使用！",
        }).then(() => {
          //把订单状态orderstate改为1  同时修改订单时间 请求后端
          const token = sessionStorage.getItem("token");
          const data = qs.stringify({
            orderid: this.order.orderid,
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
          this.$router.replace({ name: "Cars" });
        });
      }
      //付钱金额不一致 ，还车失败
      if (this.money != this.order.ordermoney) {
        Dialog.alert({
          title: "支付失败",
          message: "支付金额与租金不一致，请重新付款！",
        }).then(() => {});
      }
    },
    // 点击评论
    evaluate() {
      this.showEvaing = true; //评价窗口
    },
    // 完成评论按钮
    addEva() {
      const token = sessionStorage.getItem("token");
      const data = qs.stringify({
        orderid: this.orderid,
        carid: this.order.carid,
        content: this.evaContent,
        evatime: this.formatDateValue(new Date()),
        star: this.evaStar,
      });
      console.log(data);
      // 评价请求接口
      axios({
        method: "POST",
        url: "http://127.0.0.1:8080/eva/addevaluate",
        headers: {
          Authorization: token,
        },
        data: data,
      }).then((resp) => {
        if (resp.data.status == 0) {
          console.log(resp.data.message);
          // 评价成功后提示弹窗
          Dialog.alert({
            message: "亲！感谢您的评价！",
          }).then(() => {
            //评价成功之后将订单的评价状态改成1
            console.log("请求接口");
            axios({
              method: "GET",
              url: "http://127.0.0.1:8080/order/finisheva",
              headers: {
                Authorization: token,
              },
              params: {
                orderid: this.orderid,
                evaluatestate: 1,
              },
            }).then((resp) => {
              if (resp.data.status == 0) {
                console.log(resp.data.message);
                //修改评价状态后跳转桌面
                this.$router.replace({ name: "Cars" });
              }
              if (resp.data.status == 1) {
                console.log(resp.data.message);
              }
            });
            // on close
          });
        }
        if (resp.data.status == 1) {
          console.log(resp.data.message);
        }
      });
    },
    //初始化订单详情
    inteOrderDetail() {
      const token = sessionStorage.getItem("token");
      axios({
        method: "GET",
        url: "http://127.0.0.1:8080/order/orderdetail",
        headers: {
          Authorization: token,
        },
        params: {
          orderid: this.orderid,
        },
      }).then((resp) => {
        if (resp.data.status == 0) {
          console.log(resp.data.message);
          this.order = resp.data.data;
          this.paymoney = this.order.ordermoney;
          this.order.ordermoney = parseInt(this.order.ordermoney);
          console.log(this.order.orderstate);
          if (this.order.orderstate == 1) {
            this.showState = false;
            if (this.order.evaluatestate == 0) {
              this.showEvalute = true;
            }
            if (this.order.evaluatestate == 1) {
              this.showEvaluted = true;
            }
          }
        }
        if (resp.data.status == 1) {
          console.log(resp.data.message);
        }
      });
    },
    // 支付宝支付
    alipay() {
      // 商户账号yhyfbh9948@sandbox.com
      // 登录密码111111

      // 买家账号buvern3563@sandbox.com
      // 登录密码111111
      // 支付密码111111
      const data = qs.stringify({
        orderid: this.orderid,
        price: this.order.ordermoney,
        carname: this.order.carname,
      });
      console.log(data);
      const token = sessionStorage.getItem("token");
      axios({
        method: "POST",
        url: "http://127.0.0.1:8080/order/payment",
        headers: {
          Authorization: token,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      }).then((resp) => {
        if (resp.data.data.code == 200) {
          window.location.href = resp.data.data.paymentUrl;
          console.log("支付中");
        }
      });
    },
  },
  created() {
    this.orderid = this.$route.params.id;
    console.log(this.orderid);
    this.inteOrderDetail();
  },
};
</script>

<style scoped>
.top {
  width: 100%;
  height: 92px;
  /* background-color: #2788dd; */
  background-color: #0e78ff;
  text-align: center;
}

.top > .title {
  font-size: 25px;
  color: #fff;
}

.mySwipe img {
  width: 100%;
  height: 200px;
}

.info {
  margin-left: 5px;
}

.info > p {
  font-size: 18px;
}

.state {
  color: red;
}
</style>