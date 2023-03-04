<template>
    <div>
        <!-- 标题 -->
        <van-sticky>
            <van-row>
                <van-col span="24" class="top">
                    <div class="title">租车帝</div>
                </van-col>
            </van-row>
            <!-- 搜索栏 -->
            <div class="head">
                <form action="/">
                    <van-search class="search" v-model="value" show-action placeholder="搜索车辆名字" @search="onSearch"
                        @cancel="onCancel" background="#0E78FF" />
                </form>
            </div>
        </van-sticky>
        <!-- 返回 -->
        <div>
            <van-sticky :offset-top="95.59">
                <van-nav-bar class="title" title="相关汽车" left-text="返回" left-arrow @click-left="onClickLeft" />
            </van-sticky>
        </div>
        <!-- 搜索内容 -->
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
                            <!-- <van-button size="mini">收藏</van-button> -->
                        </template>
                    </van-card>
                </van-col>
            </van-row>
        </div>

    </div>
</template>

<script>
import top from '@/components/car/top.vue'
import axios from 'axios';


export default {
    name: 'SearchCars',

    data() {
        return {
            value: '',
            cars: ''
        }

    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        //点击查看详情
        showCarDetails(item) {
            const carid = item.carid  // 拿到点击的车辆图片的车的id
            // console.log(carid);
            this.$router.push({ name: 'CarDetails', params: { id: carid } }); // 用路由传参的方式传给汽车详情页面
        },
        //搜索功能
        onSearch(value) {
           this.inte(value)

        },
        inte(value){
            const token = sessionStorage.getItem('token');
            axios({
                method: 'GET',
                url: 'http://127.0.0.1:8080/api/car/searchcar',
                headers: {
                    Authorization: token
                },
                params: {
                    value: this.value
                }
            }).then(resp => {
                if (resp.data.status == 0) {
                    console.log(resp.data.message)
                    this.cars = resp.data.data
                }
                if (resp.data.status == 1) {
                    console.log(resp.data.message)
                }
            })
        },
        //取消搜索
        onCancel() {
            console.log('取消搜索')
        },
    },
    components: {
        top,

    },
    //初始化用created()
    created(){
        this.value = this.$route.params.value
        console.log(this.value+1)
        this.inte(this.value)
    },
    //挂載完成,组件上的用mounted()
    mounted() {
        this.value = this.$route.params.value
        console.log(this.value+2)
       
    }

}

</script>

<style>
.top {
    width: 100%;
    height: 40px;
    /* background-color: #2788dd; */
    background-color: #0E78FF;

    text-align: center;
}

.top>.title {
    font-size: 25px;
    color: #fff;
    margin-top: 5px;
}
</style>
