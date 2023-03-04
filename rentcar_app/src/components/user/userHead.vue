<template>
    <div class="head">
        <!-- 头部 -->
        <van-row>
            <van-col span="1" class="back">
                <van-icon name="arrow-left" class="left" @click="back" />返回
            </van-col>
            <van-col span="24" class="title">
                <p>
                    <slot></slot>
                </p>
                <div class="photo" @click="uploadphoto"><img :src="img" alt="" v-lazy="img"></div>
            </van-col>
        </van-row>

        <van-dialog v-model="showphoto" title="更换头像" show-cancel-button @confirm="chagePhoto">
            <van-uploader v-model="user_pic" multiple />
        </van-dialog>

    </div>
</template>
<script>
import axios from 'axios';
import qs from 'qs';

import Vue from 'vue';
//懒加载
import { Lazyload } from 'vant';
import { Uploader } from 'vant';
import { Dialog } from 'vant';

// 全局注册
Vue.use(Dialog);

Vue.use(Uploader);
Vue.use(Lazyload, {
    lazyComponent: true,
});

export default {
    name: 'MyInfo',
    data() {
        return {
            img: require('@/assets/user.png'),
            user_pic: [],
            showphoto: false
        }
    },
    methods: {
        //返回按钮
        back() {
            this.$router.go(-1);
        },
        uploadphoto() {
            console.log('换头像');
            this.showphoto = true
        },
        chagePhoto() {
            console.log('发请求')
            const token = sessionStorage.getItem('token')
            const data = qs.stringify({
                avatar: this.user_pic[0].content
            })
            axios({
                method: "POST",
                url: 'http://127.0.0.1:8080/my//update/avatar',
                headers: {
                    Authorization: token
                },
                data: data
            }).then(resp => {
                if (resp.data.status == 0) {
                    console.log(resp.data.message)
                    Dialog.alert({
                        message: '头像更换成功！',
                    }).then(() => {
                        this.user_pic=[]
                        this.inte()
                        // on close
                    });

                }
                if (resp.data.status == 1) {
                    console.log(resp.data.message)
                    Dialog.alert({
                        message: '头像更换失败！请使用小于50kb的头像',
                    }).then(() => {
                        this.user_pic=[]    
                        this.inte()
                        // on close
                    });
                }
            })
        },
        inte() {
            const token = sessionStorage.getItem('token')
            if (token) {
                // console.log(typeof(token));
                // console.log('token');
                axios({
                    method: 'get',
                    url: 'http://127.0.0.1:8080/my/userinfo',
                    headers: {
                        Authorization: token
                    }
                }).then(resp => {
                    if (resp.data.status == 0) {
                        this.img = resp.data.data.user_pic

                    }
                })
            }
        }
    },
    mounted() {
       this.inte()

    }
}   
</script>

<style scoped>
.head p {
    font-size: 24px;
}

.back {
    width: 100%;
    height: 25px;
    background-color: #0E78FF;
    line-height: 25px;
    color: #fff;
    font-size: 16px;
}

.title {
    width: 100%;
    height: 145px;
    background-color: #0E78FF;
    text-align: center;
    line-height: 0px;
    color: #fff;
}

.title>.photo {
    width: 98px;
    height: 98px;
    font-size: small;
    color: #fff;
    border-radius: 50%;
    border: 1px solid #fff;
    margin: auto;
    margin-top: 20px;
}

.title>.photo>img {
    width: 98px;
    height: 98px;
    border-radius: 50%;
}
</style>