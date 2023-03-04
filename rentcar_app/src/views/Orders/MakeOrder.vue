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
            <van-nav-bar class="title" title="提交订单" left-text="返回" left-arrow @click-left="onClickLeft" />
        </van-sticky>
        <!-- 汽车图片 -->
        <van-image width="10rem" height="5rem" fit="cover" :src="carimg" />
        <!-- 订单表单 -->
        <van-form>

            <van-field v-model="username" name="username" label="姓名" placeholder="姓名"
                :rules="[{ required: true, message: '请填写姓名' }]" />
            <van-field v-model="useridcard" name="useridcard" label="身份证" placeholder="身份证"
                :rules="[{ required: true, message: '请填写身份证' }]" />
            <van-field v-model="usernumber" name="usernumber" label="电话号码" placeholder="电话号码"
                :rules="[{ required: true, message: '请填写电话号码' }]" />

            <!-- 租车日期 -->
            <van-cell title="选择日期区间" :value="date" @click="showcalendar = true"
                :rules="[{ required: true, message: '请选择租车时间' }]" />
            <van-calendar v-model="showcalendar" type="range" @confirm="onConfirmCalendar" allow-same-day />

            <!-- 取车地点 -->
            <van-field readonly clickable name="picker" :value="picklocation" label="取车地址" placeholder="点击选择取车地址"
                @click="showpickplace = true" :rules="[{ required: true, message: '请选择取车地点' }]" />
            <van-popup v-model="showpickplace" position="bottom">
                <van-picker show-toolbar :columns="columns" @confirm="onConfirmPicke" @cancel="showpickplace = false" />
            </van-popup>

            <!-- 还车地点 -->
            <van-field readonly clickable name="picker" :value="backlocation" label="还车地址" placeholder="点击选择还车地址"
                @click="showbackplace = true" :rules="[{ required: true, message: '请选择还车地点' }]" />
            <van-popup v-model="showbackplace" position="bottom">
                <van-picker show-toolbar :columns="columns" @confirm="onConfirmBack" @cancel="showbackplace = false" />
            </van-popup>
        </van-form>


        <!-- 提交订单 -->
        <div @click="onSubmit">
            <van-submit-bar :price="ordermoney*100" button-text="提交订单" @click="onSubmit" />
        </div>
    </div>
</template>
<script >
import axios from 'axios';
import qs from 'qs';
import Vue from 'vue';
// 组件调用
import { Dialog } from 'vant';
import { Image as VanImage } from 'vant';
import { Calendar } from 'vant';


Vue.use(Calendar);
Vue.use(VanImage);
Vue.use(Dialog);

export default {
    name: 'MakeOrder',
    data() {
        return {
            carid: 0,//汽车id
            carimg: '',//汽车封面
            carname: '',//汽车名字
            username: '',
            useridcard: '',
            usernumber: '',
            // 日历
            date: '',    //选择的【租车，还车】时间
            showcalendar: false,

            // 取车地址
            picklocation: '', //取车地点
            columns: ['一号店', '二号店', '三号店', '四号店', '五号店'],
            showpickplace: false,

            // 取车地址
            backlocation: '', //取车地点
             columns: ['一号店', '二号店', '三号店', '四号店', '五号店'],
            showbackplace: false,

            carprice: 0,    //租车单价
            ordermoney: 0,   //租车总价
            orderstate: 0,  //订单状态
            evaluatestate: 0, //评价状态
            picktime: '',    //取车时间
            backtime: '',    //还车时间
            ordertime: ''     //订单时间



        }
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },

        // 给后端发送日期格式
        formatDateValue(now) {
            var year = this.dateZero(now.getFullYear()); //取得4位数的年份
            var month = this.dateZero(now.getMonth() + 1); //取得日期中的月份，其中0表示1月，11表示12月
            var date = this.dateZero(now.getDate()); //返回日期月份中的天数（1到31）
            var hour = this.dateZero(now.getHours()); //返回日期中的小时数（0到23）
            var minute = this.dateZero(now.getMinutes()); //返回日期中的分钟数（0到59）
            var second = this.dateZero(now.getSeconds()); //返回日期中的秒数（0到59）
            return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
        },
        // 日期前面加0
        dateZero(time) {
            if (time < 10) {
                time = "" + "0" + time;
            }
            return time;
        },
        // this.formatDateValue(new Date)  这个为当前格式化后的时间戳

        //日历的格式
        formatDate(date) {
            return `${date.getMonth() + 1}月${date.getDate()}号`;
        },
        // 租车时间方法
        onConfirmCalendar(date) {
            let days = 0;//租车的天数
            const [start, end] = date;
            this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`;
            this.picktime = this.formatDate(start);
            this.backtime = this.formatDate(end);
            //如果两个日期是同一个月
            if (start.getMonth() === end.getMonth()) {
                console.log("两个日期是同一个月")
                if (start.getDate() === end.getDate()) {
                    this.ordermoney = this.carprice * 1
                }
                if (start.getDate() !== end.getDate()) {
                    days = (end.getDate() - start.getDate() + 1)
                    console.log(days);
                    this.ordermoney = this.carprice * days
                }
            }
            //如果两个日期不是同一个月
            if (start.getMonth() !== end.getMonth()) {
                console.log("两个日期不是同一个月")
                const month = start.getMonth() + 1
                switch (month) {
                    case 1: {
                        days = (31 - start.getDate() + end.getDate() + 1)
                        this.ordermoney = this.carprice * days
                        break;
                    }
                    case 2: {
                        days = (28 - start.getDate() + end.getDate() + 1)
                        this.ordermoney = this.carprice * days
                        break;
                    }
                    case 3: {
                        days = (31 - start.getDate() + end.getDate() + 1)
                        this.ordermoney = this.carprice * days
                        break;
                    }
                    case 4: {
                        days = (30 - start.getDate() + end.getDate() + 1)
                        this.ordermoney = this.carprice * days
                        break;
                    }
                    case 5: {
                        days = (31 - start.getDate() + end.getDate() + 1)
                        this.ordermoney = this.carprice * days
                        break;
                    }
                    case 6: {
                        days = (30 - start.getDate() + end.getDate() + 1)
                        this.ordermoney = this.carprice * days
                        break;
                    }
                    case 7: {
                        days = (31 - start.getDate() + end.getDate() + 1)
                        this.ordermoney = this.carprice * days
                        break;
                    }
                    case 8: {
                        days = (31 - start.getDate() + end.getDate() + 1)
                        this.ordermoney = this.carprice * days
                        break;
                    }
                    case 9: {
                        days = (30 - start.getDate() + end.getDate() + 1)
                        this.ordermoney = this.carprice * days
                        break;
                    }
                    case 10: {
                        days = (31 - start.getDate() + end.getDate() + 1)
                        this.ordermoney = this.carprice * days
                        break;
                    }
                    case 11: {
                        days = (30 - start.getDate() + end.getDate() + 1)
                        this.ordermoney = this.carprice * days
                        break;
                    }
                    case 12: {
                        days = (31 - start.getDate() + end.getDate() + 1)
                        this.ordermoney = this.carprice * days
                        break;
                    }
                }
            }
            console.log(this.ordermoney);
            this.showcalendar = false;//关闭日历
        },
        //取车地址方法
        onConfirmPicke(value) {
            this.picklocation = value;
            console.log(this.picklocation);
            this.showpickplace = false;
        },
        //还车地址方法
        onConfirmBack(value) {
            this.backlocation = value;
            console.log(this.backlocation);
            this.showbackplace = false;
        },
        // 提交订单
        onSubmit() {
            this.ordertime = this.formatDateValue(new Date)
            const data = qs.stringify({
                carid: this.carid,
                carname: this.carname,
                carimg: this.carimg,
                ordertime: this.ordertime,
                orderstate: this.orderstate,
                ordermoney: this.ordermoney,
                username: this.username,
                useridcard: this.useridcard,
                usernumber: this.usernumber,
                picktime: this.picktime,
                backtime: this.backtime,
                picklocation: this.picklocation,
                backlocation: this.backlocation,
                evaluatestate:0
            })
            // console.log(data)
            const token = sessionStorage.getItem('token')

            axios({
                method: 'POST',
                url: 'http://127.0.0.1:8080/order/makeorders',
                headers: {
                    Authorization: token
                },
                data: data,
            }).then(resp => {
                if (resp.data.status == 0) {
                    console.log(resp.data.message)

                    Dialog.alert({
                        message: '亲！您的订单已生成！',
                    }).then(() => {
                        this.$router.replace({ name: 'OnOrders' })
                        // on close
                    });
                }
                if (resp.data.status == 1) {
                    console.log(resp.data.message)
                }
            })

        },
        inteCar() {
            axios({
                method: 'GET',
                url: 'http://127.0.0.1:8080/api/car/cardetails',
                params: {
                    carid: this.carid
                }
            }).then(resp => {
                if (resp.data.status == 0) {
                    console.log(resp.data.data)
                    this.carprice = resp.data.data.carprice
                    this.carimg = resp.data.data.carimg1
                    this.carname = resp.data.data.carname


                    console.log(resp.data.message)
                }
                if (resp.data.status == 1) {
                    console.log(resp.data.message)
                }
            })
        }
    },

    created() {
        this.carid = this.$route.params.id
        console.log(this.carid);
        this.inteCar()
    }
}
</script>

<style scoped>
.top {
    width: 100%;
    height: 92px;
    /* background-color: #2788dd; */
    background-color: #0E78FF;
    text-align: center;
}

.top>.title {
    font-size: 25px;
    color: #fff;

}

.mySwipe img {
    width: 100%;
    height: 200px;
}
</style>