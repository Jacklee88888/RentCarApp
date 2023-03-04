<template>
    <div>
        <!--订单页面默认子路由  -->
        <van-tabs v-model="activeName" >
            <van-tab title="正在进行订单" name="a" :to="{name:'OnOrders'}"  change="onOrders"></van-tab>
            <van-tab title="已完成订单" name="b" :to="{name:'FinishOrders'}" change="finishOrders"></van-tab>
        </van-tabs>
        <router-view></router-view>
    </div>
</template>
<script >
import Vue from 'vue';
//懒加载
import { Lazyload } from 'vant';
Vue.use(Lazyload, {
    lazyComponent: true,
});
export default {
    name: 'Ordrs',
    data() {
        return {
            activeName: 'a',
        }
    },
    methods: {
        finishOrders(name,title){
            this.activeName = name
        }
    },
    created(){
        this.activeName = this.$route.params.name
        if(this.$route.path =='/ordersHome/finishOrders'){
            this.activeName = 'b'
        }
   
    }
}
</script>

<style scoped>
h1 {
    font-size: 24px;
}

p {
    font-size: 15px;
}
</style>