<template>
    <div>
        <ul>
            <li class="info" v-for="(activ,index) in actives" :key="index" @click="change(index)">
                <p>{{activ}}
                    <van-icon name="arrow" class="right" />
                </p>
                <van-divider></van-divider>
            </li>
        </ul>

    </div>
</template>
<script>
import Vue from 'vue';
import { Dialog } from 'vant';

// 全局注册
Vue.use(Dialog);
export default {
    name: 'userContent',
    data() {
        return {
            actives: [
                '个人信息',
                '我的评价',
                '我的收藏',
                '修改密码',
                '登录',
                '退出登录'
            ]
        }
    },
    methods: {
        change(index) {
            // console.log(index)
            if (index == 0) {
                this.$router.push({ name: 'MyInfo' })
            }
            if (index == 1) {
                this.$router.push({ name: 'MyEva' })
            }
            if (index == 2) {
                this.$router.push({ name: 'MyCollect' })
            }
            if (index == 3) {
                if (!sessionStorage.getItem('token')) {
                    Dialog.alert({
                        message: '用户未登录请点击登录',
                    }).then(() => {
                        this.$router.push({ name: 'Login' })
                        // on close
                    });
                }
                if (sessionStorage.getItem('token')) {
                    this.$router.push({ name: 'ChangePW' })
                }

            }
            if (index == 4) {

                this.$router.push({ name: 'Login' })
            }
            if (index == 5) {
                if (sessionStorage.getItem('token') == null) {
                    console.log('您还没有登录！请登录！')
                }
                if (sessionStorage.getItem('token') !== null) {
                    sessionStorage.removeItem('token')
                    const token = sessionStorage.getItem('token')
                    console.log(token);
                    this.$router.push({ name: 'Cars' })
                }

            }

        }
    }
}

</script>

<style scoped>
ul {
    height: 150px;
    margin-top: 15px;
}

ul .right {
    display: block;
    float: right;
}

ul>li>p {
    font-size: 15px;
    height: 20px;
    line-height: 20px;
    margin-left: 30px;
}
</style>