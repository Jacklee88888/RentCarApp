<template>
    <div>
        <!-- 头部 -->
        <userHead>个人信息</userHead>
        <!-- 内容 -->
        <div>
            <ul>
                <li class="info">
                    <p>用户名: {{info.username}}</p>
                    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"></van-divider>
                </li>
                <li class="info">
                    <p>性别: {{info.gender}}</p>
                    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"></van-divider>
                </li>
                <li class="info">
                    <p>电话: {{info.number}}</p>
                    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"></van-divider>
                </li>
                <li class="info">
                    <p>生日: {{info.birthday}}</p>
                    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"></van-divider>
                </li>
                <li class="info">
                    <p>邮箱: {{info.email}}</p>

                </li>
            </ul>
        </div>
        <van-button type="info" class="button" @click="setInfo">修改信息</van-button>
        <!-- 上创头像窗口 -->
       

        

    </div>
</template>
<script>
import Vue from 'vue';
import { Uploader } from 'vant';

Vue.use(Uploader);
import userHead from '@/components/user/userHead.vue'
import axios from 'axios'

export default {
    name: 'MyInfo',
    data() {
        return {
            info: {},
            
        }
    },
    methods: {
        //返回按钮
        back() {
            this.$router.go(-1);
        },
        //跳转修改密码
        setInfo() {
            this.$router.push({ name: 'ChangeInfo' })
        },
        // 初始化页面
        inte() {
            const token = sessionStorage.getItem('token')
            axios({
                method: 'get',
                url: 'http://127.0.0.1:8080/my/userinfo',
                headers: {
                    Authorization: token
                }
            }).then(resp => {
                if (resp.data.status == 0) {
                    this.info = resp.data.data
                }
                if (resp.data.status == 1) {
                    console.log(resp.data.message)
                }
            })
        },
       

    },
    components: {
        // 引入头部组件
        userHead
    },
    created() {
        this.inte()

    }
}
</script>

<style scoped>
.info>p {
    font-size: 18px;
}

.info>p>span>.change {
    display: block;
    float: right;
    margin-right: 10px;
}

ul {
    height: 150px;
    margin-top: 15px;
}

ul>li>p {
    font-size: 15px;
    height: 20px;
    line-height: 20px;
    margin-left: 30px;
}

.button {
    width: 100%;
    height: 50px;
    margin-top: 100px;
}
</style>