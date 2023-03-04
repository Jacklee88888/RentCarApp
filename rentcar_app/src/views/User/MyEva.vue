<template>
    <div>
        <!-- 头部 -->
        <userHead>我的评价</userHead>
        <!-- 内容 -->
        <div v-if="isEva">
            <ul v-for="(item,index) in items" :key="index">
                <li>
                    <van-rate v-model="item.star" :size="18" color="#ffd21e" void-icon="star"
                        style="float:right ;margin-top: 5px;" readonly />
                    <van-button type="primary" size="mini" style="float:left;margin-top: 5px" @click="deleteEva(item)">
                        删除评论</van-button>
                    <van-cell title="评价:" :value="item.evatime" :label="item.content" />
                    <p></p>
                </li>
            </ul>
        </div>
        <!-- 没有数据时呈现的页面 -->
        <div v-if="!isEva">
            <van-empty description="您暂时没有评价哦~" />
        </div>

    </div>
</template>
<script>

import userHead from '@/components/user/userHead.vue'
import axios from 'axios';

export default {
    name: 'MyEva',
    data() {
        return {
            isEva: false,
            // 后端传数组就用数组接收，后端传对象则用对象接收
            items: []

        }
    },
    methods: {
        //返回按钮
        back() {
            this.$router.go(-1);
        },
        // 删除评论
        deleteEva(item) {
            console.log(item.evaid)
            const evaid = item.evaid
            const token = sessionStorage.getItem('token')
            axios({
                method: 'GET',
                url: 'http://127.0.0.1:8080/eva/delevalute',
                params: {
                    evaid:evaid
                },
                headers: {
                    Authorization: token
                }
            }).then(resp => {
                if (resp.data.status == 0) {
                    console.log(resp.data.message);
                    this.inte()
                }
                if (resp.data.status == 1) {
                    console.log(resp.data.message);
                }
            })
        },
        // 初始化页面
        inte() {
            const token = sessionStorage.getItem('token')
            // 判断有没有登录  
            axios({
                method: 'GET',
                url: 'http://127.0.0.1:8080/eva/myevaluate',
                headers: {
                    Authorization: token
                }
            }).then(resp => {
                if (resp.data.status == 0) {
                    this.isEva = true
                    this.items = resp.data.data
                    for( let i =0;i<this.items.length;i++){
                            const time = this.items[i].evatime
                            const d = new Date(time)
                            this.items[i].evatime = d.getFullYear() +'-'+ (d.getMonth() + 1) +'-'+ d.getDate() +' '+ d.getHours() +':'+d.getMinutes() +':'+ d.getSeconds();
                        }
                }
                if (resp.data.status == 1) {
                    console.log(resp.data.message)
                }
            })

        }
    },
    components: {
        // 引入头部组件
        userHead
    },
    created() {
        this.inte()
    },
    mounted(){
       
    }
}
</script>

<style scoped>

</style>