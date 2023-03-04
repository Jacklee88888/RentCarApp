<template>
    <div>
        <!-- 头部 -->
        <userHead>我的收藏</userHead>
        <!-- 内容 -->
        <div v-if="isCollect">
            <ul v-for="(item,index) in collects" :key="index">
                <li>
                    <van-card :price="item.carprice" :origin-price="item.carolprice" :desc="item.cardesc"
                        :title="item.carname" :thumb="item.carimg1">
                        <template #tags>
                            <van-tag plain type="danger">{{item.cartag1}}</van-tag>
                            <van-tag plain type="danger">{{item.cartag2}}</van-tag>
                        </template>
                        <template #footer>
                            <van-button size="mini" @click="showCarDetails(item)">查看</van-button>
                            <van-button size="mini" @click="deleteCollect(item)">取消收藏</van-button>
                        </template>
                    </van-card>
                </li>
            </ul>
        </div>

        <div v-if="!isCollect">
            <van-empty description="您暂时没有评价哦~" />
        </div>

    </div>
</template>
<script>
import userHead from '@/components/user/userHead.vue'
import axios from 'axios';

export default {
    name: 'MyCollect',
    data() {
        return {
            isCollect: false,
            collects: [],
        }
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
        //跳转汽车详情
        showCarDetails(item) {
            const carid = item.carid// 拿到点击的车辆图片的车的id
            // console.log(carid);
            this.$router.push({ name: 'CarDetails', params: { id: carid } })// 用路由传参的方式传给汽车详情页面
        },
        // 取消收藏
        deleteCollect(item) {
            const carid = item.carid;//把汽车表的id该为0  然后更新到汽车表中,
            console.log(item.carid);
            const token = sessionStorage.getItem('token')
            axios({
                method:'GET',
                url:'http://127.0.0.1:8080/clt/deletecollect',
                params:{
                    carid:carid
                },
                headers:{
                    'Authorization': token
                }
            }).then(resp=>{
                if(resp.data.status ==0){
                    this.inte()//删除完再调用初始化方法
                    console.log(resp.data.message);
                }
                if(resp.data.status ==1){
                   
                    console.log(resp.data.message);
                }
            })
        },
        // 初始化页面
        inte() {
            const token = sessionStorage.getItem('token')  // 我的的收藏传参需要用户token
            axios({
                method: 'GET',
                url: 'http://127.0.0.1:8080/clt/getcollect',
                headers: {
                    'Authorization': token
                }
            }).then(resp => {
                if (resp.data.status == 0) {
                    console.log(resp.data.message)
                    console.log(resp.data.data)
                    this.isCollect = true
                    this.collects = resp.data.data
                }
                if (resp.data.status == 1) {

                    console.log(resp.data.message)
                }
            })
        }

    },
    components: {
        userHead
    },
    created() {
        this.inte()
    }
}
</script>

<style scoped>

</style>