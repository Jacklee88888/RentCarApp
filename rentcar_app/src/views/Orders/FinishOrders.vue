<template>
    <div>
        <!-- 订单 -->
        <div class="content" v-if="isOrder">
            <van-row :gutter="5">
                <van-col span="24" v-for="(item,index) in orders" :key="index" class="shopCard">
                    <van-card :price="item.ordermoney" :desc="item.ordertime" :title="item.carname" :thumb="item.carimg"
                         style="font-size: 16px;">
                        <template #tags>
                            <van-tag plain type="danger">{{item.picktime}}</van-tag>
                            <van-tag plain type="danger">{{item.backtime}}</van-tag>


                        </template>
                        <template #footer>
                            <van-button size="mini"  @click="checkOrder(item)">查看</van-button>
                            <van-button size="mini" @click="deleteOrder(item)">删除订单</van-button>
                           
                        </template>
                    </van-card>
                </van-col>
            </van-row>
        </div>

        <div v-if="!isOrder">
            <van-empty description="您暂时没有评价哦~" />
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
    name: 'FinishOrder',
    data() {
        return {
            isOrder:false,
            orders: [],

        }
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        // 查看订单，通过路由传订单号过去
        checkOrder(item) {
            const orderid = item.orderid
            // console.log(orderid);
            this.$router.push({ name: 'OrderDetail', params: { id: orderid } })
        },
        deleteOrder(item){
            const token = sessionStorage.getItem('token')
            axios({
                method: 'get',
                url: 'http://127.0.0.1:8080/order/deleteorder',
                headers: {
                    Authorization: token
                },
                params:{
                    orderid: item.orderid
                }
            }).then(resp => {
                if (resp.data.status == 0){
                    console.log(resp.data.message);
                    this.inteOnOrder()
                }
                if (resp.data.status == 1){
                    console.log(resp.data.message);
                }
            })
        },
        //初始化已完成订单页面
        inteOnOrder() {
            const token = sessionStorage.getItem('token')
            axios({
                method: 'get',
                url: 'http://127.0.0.1:8080/order/showfinishorders',
                headers: {
                    Authorization: token
                }
            }).then(resp => {
                if (resp.data.status == 0) {
                    this.isOrder =true
                    this.orders = resp.data.data
                    // 循环把时间格式处理一下
                        for( let i =0;i<this.orders.length;i++){
                            const time = this.orders[i].ordertime
                            const d = new Date(time)
                            this.orders[i].ordertime = d.getFullYear() +'-'+ (d.getMonth() + 1) +'-'+ d.getDate() +' '+ d.getHours() +':'+d.getMinutes() +':'+ d.getSeconds();
                        }
                    console.log(resp.data.message)
                    console.log(resp.data.data) //后端返回的订单数据是个数组
                }
                if (resp.data.status == 1) {
                    console.log(resp.data.message)
                }
            })
        }

    },
    created() {
        this.inteOnOrder()
    }
}
</script>





<style scoped>

</style>