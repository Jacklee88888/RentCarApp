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
            <van-nav-bar class="title" title="汽车详情" left-text="返回" left-arrow @click-left="onClickLeft" />
        </van-sticky>
        <!-- 轮播图 -->
        <div class="mySwipe">
            <van-swipe>
                <van-swipe-item v-for="(image, index) in images" :key="index" @click="show(index)">
                    <img v-lazy="image" />
                </van-swipe-item>
            </van-swipe>
        </div>
        <!-- 详细信息 -->
        <div class="details">
            <!-- 租车基本信息 -->
            <div>
                <span class="detailstitle">&nbsp{{cars.carname}}的租车基本信息</span>
                <van-divider />
                <ul class="basedetails">
                    <li>
                        <van-row gutter="">
                            <van-col span="12">
                                <img src="@/assets/icons/品牌.png" alt="">
                                <span>&nbsp品牌：</span>
                                <span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp {{cars.carbrand}}</span>
                            </van-col>
                            <van-col span="12">
                                <img src="@/assets/icons/车系.png" alt="">
                                <span>&nbsp车系：</span>
                                <span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp {{cars.carseries}}</span>
                            </van-col>
                        </van-row>
                    </li>
                    <li>
                        <van-row gutter="">
                            <van-col span="12">
                                <img src="@/assets/icons/年款.png" alt="">
                                <span>&nbsp年款：</span>
                                <span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp {{cars.caryear}}</span>
                            </van-col>
                            <van-col span="12">
                                <img src="@/assets/icons/型号.png" alt="">
                                <span>&nbsp型号：</span>
                                <span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp {{cars.carconfig}}</span>
                            </van-col>
                        </van-row>
                    </li>
                </ul>

            </div>
            <!-- 租车配置信息 -->
            <div>
                <span class="detailstitle">&nbsp{{cars.carname}}的租车配置信息</span>
                <van-divider />
                <ul class="configdetails">
                    <li>
                        <van-row gutter="">
                            <van-col span="12">
                                <img src="@/assets/icons/类型.png" alt="">
                                <span>&nbsp类别：</span>
                                <span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp {{cars.cartype}}</span>
                            </van-col>
                            <van-col span="12">
                                <img src="@/assets/icons/排量.png" alt="">
                                <span>&nbsp排量：</span>
                                <span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp {{cars.cardisplacement}}</span>
                            </van-col>
                        </van-row>
                    </li>
                    <li>
                        <van-row gutter="">
                            <van-col span="12">
                                <img src="@/assets/icons/车厢.png" alt="">
                                <span>&nbsp箱数：</span>
                                <span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp {{cars.carbox}}</span>
                            </van-col>
                            <van-col span="12">
                                <img src="@/assets/icons/座位数.png" alt="">
                                <span>&nbsp座位数：</span>
                                <span>&nbsp&nbsp&nbsp&nbsp{{cars.carseating}}</span>
                            </van-col>
                        </van-row>
                    </li>
                    <li>
                        <van-row gutter="">
                            <van-col span="12">
                                <img src="@/assets/icons/变速箱.png" alt="">
                                <span>&nbsp变速箱：</span>
                                <span>&nbsp&nbsp&nbsp&nbsp{{cars.carspeedbox}}</span>
                            </van-col>
                            <van-col span="12">
                                <img src="@/assets/icons/车门数.png" alt="">
                                <span>&nbsp车门数：</span>
                                <span>&nbsp&nbsp&nbsp&nbsp{{cars.cardoor}}</span>
                            </van-col>
                        </van-row>
                    </li>
                    <li>
                        <van-row gutter="">
                            <van-col span="12">
                                <img src="@/assets/icons/燃料类型.png" alt="">
                                <span>&nbsp燃油类型：</span>
                                <span>&nbsp{{cars.caroiltype}}</span>
                            </van-col>
                            <van-col span="12">
                                <img src="@/assets/icons/燃料标号.png" alt="">
                                <span>&nbsp燃料标号：</span>
                                <span>&nbsp{{cars.caroilnumber}}号</span>
                            </van-col>
                        </van-row>
                    </li>
                </ul>

            </div>
            <!-- 租车评价信息 -->
            <span class="detailstitle">&nbsp{{cars.carname}}的租车评价</span>
            <div v-if="isEva" class="Eva">
                <van-divider />
                <ul v-for="(item,index) in items" :key="index">
                    <li>
                        <van-rate v-model="item.star" :size="18" color="#ffd21e" void-icon="star"
                            style="float:right ;margin-top: 5px;" readonly />
                        <!-- <van-button type="primary" size="mini" style="float:left;margin-top: 5px"
                            @click="deleteEva(item)">
                            删除评论</van-button> -->
                        <van-cell title="评价:" :value="item.evatime" :label="item.content" />
                        <p></p>
                    </li>
                </ul>
            </div>
            <!-- 没有数据时呈现的页面 -->
            <div v-if="!isEva" class="empty">
                <van-empty description="该车辆暂时没有评价哦~" />
            </div>
        </div>

        <!-- 提交订单 -->

        <van-goods-action>
            <van-goods-action-icon icon="star" text="收藏" color="#A5A5A5" @click="collect" v-if="clt" />
            <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" @click="uncollect" v-if="!clt" />
            <van-goods-action-button type="danger" text="立即租车" @click="onSubmit" />
        </van-goods-action>
    </div>
</template>
<script>
import Vue from 'vue';
// 组件调用
import { Dialog } from 'vant';
// 全局注册
Vue.use(Dialog);
import { ImagePreview } from 'vant';
import axios from 'axios';
import qs from 'qs'


export default {
    name: 'CarDetails',
    data() {
        return {

            images: [],//轮播图内容
            items: [],//评论内容
            cars: {},//汽车信息
            isEva: false,
            carid: 0,
            clt: 'true'//假如用户没登录或者没事收藏此车则收藏按钮没有颜色
        }
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        //点击图片预览
        show(index) {
            const images = this.images
            ImagePreview({
                images,
                startPosition: index,
                closeable: true,
            });
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

        // 收藏汽车
        collect() {
            // 收藏需要token
            const token = sessionStorage.getItem('token');
            //定义收藏表的汽车数据
            const data = qs.stringify({//向node后端传必须用qs转化成字符串 
                carid: this.cars.carid,
                carname: this.cars.carname,
                carprice: (this.cars.carprice) / 100,
                caroldprice: this.cars.caroldprice,
                cardesc: this.cars.cardesc,
                cartag1: this.cars.cartag1,
                cartag2: this.cars.cartag2,
                carimg1: this.cars.carimg1,
                collecttime: this.formatDateValue(new Date)
            })
            if (!sessionStorage.getItem('token')) {
                Dialog.alert({
                    message: '用户未登录请点击登录',
                }).then(() => {
                    this.$router.push({ name: 'Login' });
                    // on close
                });
            }
            if (sessionStorage.getItem('token')) {
                axios({
                    method: 'POST',
                    url: 'http://127.0.0.1:8080/clt/insertcollect',
                    data: data,
                    headers: {
                        Authorization: token
                    }
                }).then(resp => {
                    if (resp.data.status == 0) {
                        this.clt = !this.clt;
                        console.log(resp.data.message);
                    }
                    if (resp.data.status == 1) {
                        console.log(resp.data.message);
                    }
                })
            }



        },
        // 取消收藏
        uncollect() {
            const token = sessionStorage.getItem('token')
            axios({
                method: 'GET',
                url: 'http://127.0.0.1:8080/clt/deletecollect',
                params: {
                    carid: this.carid
                },
                headers: {
                    'Authorization': token
                }
            }).then(resp => {
                if (resp.data.status == 0) {
                    console.log(resp.data.message);
                    this.clt = !this.clt//取消收藏之后再调用初始化方法
                }
                if (resp.data.status == 1) {

                    console.log(resp.data.message);
                }
            })
        },
        // 前往提交订单 传参 汽车id
        onSubmit() {
            // const token = sessionStorage.getItem('token')
            const carid = this.carid

            if (!sessionStorage.getItem('token')) {
                Dialog.alert({
                    message: '用户未登录请点击登录',
                }).then(() => {
                    this.$router.push({ name: 'Login' })
                    // on close
                });
            }
            if (sessionStorage.getItem('token')) {
                this.$router.push({ name: 'MakeOrder', params: { id: carid } });
                // this.$router.push(`/ordersHome/orderDetails/${carid}`)
            }

        },
        // deleteEva(item) {
        //     console.log(item.evaid);
        //     const evaid = item.evaid;
        //     const token = sessionStorage.getItem('token');
        //     axios({
        //         method: 'GET',
        //         url: 'http://127.0.0.1:8080/eva/delevalute',
        //         params: {
        //             evaid: evaid
        //         },
        //         headers: {
        //             Authorization: token
        //         }
        //     }).then(resp => {
        //         if (resp.data.status == 0) {
        //             console.log(resp.data.message);
        //             this.inteEva()
        //         }
        //         if (resp.data.status == 1) {
        //             console.log(resp.data.message);
        //         }
        //     })
        // },
        //初始化车辆信息页面
        inteDetails() {
            axios({
                method: 'GET',
                url: 'http://127.0.0.1:8080/api/car/cardetails',
                params: {
                    carid: this.carid
                }
            }).then(resp => {
                if (resp.data.status == 0) {
                    this.cars = resp.data.data;
                    this.cars.carprice = (resp.data.data.carprice) * 100;
                    this.images[0] = resp.data.data.carimg1;
                    this.images[1] = resp.data.data.carimg2;
                    this.images[2] = resp.data.data.carimg3;
                    console.log(resp.data.data);
                    console.log(resp.data.message);
                }
                if (resp.data.status == 1) {
                    console.log(resp.data.message);
                }
            })
        },
        // 初始化评价信息
        inteEva() {
            const token = sessionStorage.getItem('token')
            // 判断有没有登录  
            axios({
                method: 'GET',
                url: 'http://127.0.0.1:8080/api/car/carevaluate',
                headers: {
                    Authorization: token
                },
                params: {
                    carid: this.carid
                }
            }).then(resp => {
                if (resp.data.status == 0) {

                    this.isEva = true;
                    this.items = resp.data.data;
                    for( let i =0;i<this.items.length;i++){
                            const time = this.items[i].evatime
                            const d = new Date(time)
                            this.items[i].evatime = d.getFullYear() +'-'+ (d.getMonth() + 1) +'-'+ d.getDate() +' '+ d.getHours() +':'+d.getMinutes() +':'+ d.getSeconds();
                        }

                }
                if (resp.data.status == 1) {
                    console.log(resp.data.message);
                }
            })
        },
        // 初始化收藏信息
        inteCollect() {
            const token = sessionStorage.getItem('token')
            // 判断有没有登录  
            axios({
                method: 'GET',
                url: 'http://127.0.0.1:8080/clt/intecollect',
                headers: {
                    Authorization: token
                },
                params: {
                    carid: this.carid
                }
            }).then(resp => {
                if (resp.data.status == 0) {
                    this.clt = !this.clt;
                }
                if (resp.data.status == 1) {
                    console.log(resp.data.message);
                }
            })
        }
    },
    created() {
        // 点击汽车卡片或者收藏汽车传来得汽车id
        this.carid = this.$route.params.id;
        this.inteDetails();
        this.inteEva();
        this.inteCollect();
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

.detailstitle {
    font-family: "Hiragino Sans GB", "微软雅黑", "华文细黑",
        "STHeiti", "Microsoft YaHei", SimHei, "Helvetica Neue",
        Helvetica, Arial, sans-serif !important;
    text-align: center;
    font-size: 18px;
}

.basedetails>li {
    height: 25px;
    font-size: 15px;
    text-align: left;
    line-height: 25px;
    align-items: center;
    color: #A5A5A5;

}

.configdetails>li {
    height: 25px;
    font-size: 15px;
    text-align: left;
    line-height: 25px;
    color: #A5A5A5;
}

.Eva {
    margin-bottom: 50px;
}

.empty {
    margin-bottom: 50px;
}
</style>