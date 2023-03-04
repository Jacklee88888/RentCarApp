<template>
    <!-- 汽车主页 -->
    <div class="car">
        <!-- 用粘性布局固定住-->
        <van-sticky :offset-top="95.59">
            <div class="sticky">
                <!-- 轮播图 -->
                <div class="mySwipe">
                    <van-swipe :autoplay="2000" class="swipes">
                        <van-swipe-item v-for="(item, index) in images" :key="index" @click="showCarDetails(item)">
                            <!-- 图片懒加载 -->
                            <img v-lazy="item.carimg1" />
                        </van-swipe-item>
                    </van-swipe>
                </div>
                <!-- 汽车分类 -->
                <div class="type1">
                    <van-grid :column-num="4" :gutter="10">
                        <van-grid-item text="轿车" class="type" :to="{name:'SaloonCar'}" />
                        <van-grid-item text="SUV" class="type" :to="{name:'SuvCar'}" />
                        <van-grid-item text="跑车" class="type" :to="{name:'SportsCar'}" />
                        <van-grid-item text="纯电" class="type" :to="{name:'ElectricCar'}" />

                    </van-grid>
                </div>
                <!-- 活动广播 -->
                <div>
                    <van-notice-bar scrollable class="notice" left-icon="volume-o" text="               租好车，租快车，租实惠车，就来租车帝！" />
                </div>
            </div>

        </van-sticky>

        <!-- 汽车展示图 -->
        <div class="content">
            <van-row :gutter="5">
                <van-col span="12" v-for="(car,index) in cars" :key="index" class="shopCard"
                    @click="showCarDetails(car)">
                    <van-card :price="car.carprice" :origin-price="car.caroldprice" :desc="car.cardesc"
                        :title="car.carname" :thumb="car.carimg1">
                        <template #tags>
                            <van-tag plain type="danger">{{car.cartag1}}</van-tag>
                            <van-tag plain type="danger">{{car.cartag2}}</van-tag>
                        </template>
                        <template #footer>
                            <van-button size="mini">查看</van-button>
                            <!-- <van-button size="mini" @click="getCollect(item)" v-show="show">收藏</van-button>
                            <van-button size="mini" @click="deleteCollect(item)" v-show="!show">取消收藏</van-button> -->
                        </template>
                    </van-card>
                </van-col>
            </van-row>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
//懒加载
import { Lazyload } from 'vant';
import axios from 'axios';
Vue.use(Lazyload, {
    lazyComponent: true,
});

export default {
    name: 'Cars',
    data() {
        return {
            active: 'car',

            // 轮播图
            images: [],
            type: [
                '轿车',
                'SUV',
                '跑车',
                '全部'
            ],
            // 汽车信息
            cars: [],
        }
    },
    methods: {
        //轮播图跳转汽车详情
        showCarDetails(item) {
            const carid = item.carid  // 拿到点击的车辆图片的车的id
            // console.log(carid); 
            this.$router.push({ name: 'CarDetails', params: { id: carid } }); // 用路由传参的方式传给汽车详情页面
        },
        // 初始化车辆信息
        init() {
            axios({
                method: 'GET',
                url: 'http://127.0.0.1:8080/api/car/showcars'
            }).then(resp => {
                if (resp.data.status == 0) {
                    console.log(resp.data.message);
                    this.cars = resp.data.data;
                    // 用前面两辆车的来做轮播图 
                    this.images[0] = resp.data.data[0];
                    this.images[1] = resp.data.data[1];
                }
                if (resp.data.status == 1) {
                    console.log(resp.data.message);
                }
            })
        }
    },
    // 用于页面
    created() {
        this.init()
    },
    // 用于组件
    mounted() {

    }
}
</script>

<style scoped>
.car {
    background-color: #0E78FF;
}

.sticky {
    background-color: #0E78FF;
}

.mySwipe img {
    width: 100%;
    height: 200px;
}

.type {
    height: 30px
}

.notice {
    margin-top: 5px;
    height: 20px;
}

.content {
    margin-bottom: 50px;

}

.shopCard {
    margin-top: 5px;
}
</style>