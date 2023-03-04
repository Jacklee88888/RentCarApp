<template>
    <div>
        <!-- 固定头部，后期可用components代替-->
       <top></top>
            
      <!-- 子路由出口 -->
        <router-view />
          <!-- /页面固定底部  后期可用components代替 -->
        <van-tabbar v-model="active"  class="tabbar" >
            <van-tabbar-item name="car" icon="shop-o" :to="{name:'Cars'}" >首页</van-tabbar-item>
            <van-tabbar-item name="orders" icon="passed" :to="{name:'OnOrders'}" >订单</van-tabbar-item>
            <van-tabbar-item name="user" icon="user-o" :to="{name:'User'}">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
import top from '@/components/orders/top.vue'
export default{
    name:'OrdrsHome',
    data(){
        return{
            active: 'orders',
            title:''
        }
    },
    methods:{
        
    },
    components:{
        top
    }
}
</script>

<style scoped>

</style>