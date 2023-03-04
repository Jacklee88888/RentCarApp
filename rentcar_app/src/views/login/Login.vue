<template>
    <div>
        <!-- 头部 -->
        <van-sticky>
            <van-row>
                <van-col span="24" class="top">
                    <div class="title">租车APP</div>
                </van-col>
            </van-row>
        </van-sticky>
        <!--标题-->
        <van-sticky :offset-top="95.59">
            <van-nav-bar class="title" title="用户登录" left-text="返回" left-arrow @click-left="onClickLeft" />
        </van-sticky>
        <!-- 登录表单 -->
        <van-form @submit="onSubmit">
            <van-field v-model="username" name="username" label="账号" placeholder="账号"
                :rules="[{ required: true, message: '请填写账号' }]" />

            <van-field v-model="password" name="password" label="密码" placeholder="密码" type="password"
                :rules="[{ required: true, message: '请填写密码' }]" />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">登录</van-button>
            </div>
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="onRegister" @click="onRegister">没有账号？去注册</van-button>
            </div>
        </van-form>
        <!-- 遮罩层 -->
        <van-overlay :show="show" @click="show = false">
            <div class="wrapper" @click.stop>

                <div class="block">
                    <p>
                        亲！您已登录，请点击按钮返回哦~
                    </p>
                    <van-button round type="info" @click="onClickLeft" 
                    style="margin-left: 70px;margin-top: 10px">返回</van-button>
                </div>
            </div>
        </van-overlay>
    </div>
</template>
<script>
import axios from 'axios';
import qs from 'qs';
export default {
    name: 'login',
    data() {
        return {

            username: '',
            password: '',

            show: false
        }
    },
    methods: {
        //返回
        onClickLeft() {
            this.$router.go(-1);
        },
        //提交登录
        onSubmit(values) {
            // console.log(values);
            //使用qs.stingify()把用户名和密码转成字符串
            const data = qs.stringify({
                username: values.username,
                password: values.password

            })
            // console.log(data)
            axios({
                method: 'post',
                url: 'http://127.0.0.1:8080/api/login',
                data: data//data就是后端的req.body
            }).then(resp => {
                if (resp.data.status == 0) {
                    sessionStorage.setItem('token', resp.data.token);//token本身是字符串不用JSON.stringify()

                    this.$router.replace({ name: 'User' });
                }
                if (resp.data.status == 1) {
                    console.log(resp.data.message);
                }

            }).catch(err => {
                console.log(err);
            })
        },
        onRegister() {
            this.$router.push({ name: 'Register' });
        }
    },
    mounted() {
        if (sessionStorage.getItem('token')) {
            this.show = true;
        }
    }

}
</script>

<style scoped>
.top {
    width: 100%;
    height: 95.59px;
    /* background-color: #2788dd; */
    background-color: #0E78FF;

    text-align: center;
}

.top>.title {
    font-size: 25px;
    color: #fff;
    margin-top: 5px;
}

.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.block {
    width: 200px;
    height: 120px;
    background-color: #fff;
    font-size: 20px;
}
</style>