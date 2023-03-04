<template>
    <div>
        <!-- 标题 -->
        <div>
            <van-sticky :offset-top="95.59">
                <van-nav-bar class="title" title="纯电" left-text="返回" left-arrow @click-left="onClickLeft" />
            </van-sticky>
        </div>
        <!-- 轿车内容 -->
        <div class="content">
            <van-row :gutter="5">
                <van-col span="24" v-for="(item,index) in cars" :key="index" class="shopCard"
                    @click="showCarDetails(item)">
                    <van-card :price="item.carprice" :origin-price="item.caroldprice" :desc="item.cardesc"
                        :title="item.carname" :thumb="item.carimg1">
                        <template #tags>
                            <van-tag plain type="danger">{{item.cartag1}}</van-tag>
                            <van-tag plain type="danger">{{item.cartag2}}</van-tag>
                        </template>
                        <template #footer>
                            <van-button size="mini">查看</van-button>
                        </template>
                    </van-card>
                </van-col>
            </van-row>
        </div>

    </div>
</template>
<script>
import axios from 'axios';
import Vue from 'vue';
//懒加载
import { Lazyload } from 'vant';
Vue.use(Lazyload, {
    lazyComponent: true,
});
export default {
    name: 'ElectricCar',
    data() {
        return {
            cars: [],

        }
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        //点击查看汽车详情
        showCarDetails(item) {
            const carid = item.carid  // 拿到点击的车辆图片的车的id
            this.$router.push({ name: 'CarDetails', params: { id: carid } }) // 用路由传参的方式传给汽车详情页面
        },
        // 初始化电车车页面
        inte() {
            axios({
                method: 'GET',
                url: 'http://127.0.0.1:8080/api/car/electriccars',

            }).then(resp => {
                if (resp.data.status == 0) {
                    console.log(resp.data.message);
                    this.cars = resp.data.data;
                }
                if (resp.data.status == 1) {
                    console.log(resp.data.message);
                }
            })
        }

    },
    created() {
        this.inte()
    }
}
</script>

<style scoped>

</style>