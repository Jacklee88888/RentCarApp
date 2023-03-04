<template>
    <div>
        <div>
            <van-row>
                <van-col span="24" class="top">
                    <div class="title">{{titile}}</div>
                    <div class="photo" @click="uploadphoto"><img :src="img" alt="" v-lazy="img"></div>
                    <div class="name">
                        <p>{{name}}</p>
                    </div>
                    <div class="email">
                        <p>{{email}}</p>
                    </div>
                </van-col>
            </van-row>
        </div>

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
    name: 'top',
    data() {
        return {
            titile: '我的',
            img: require('@/assets/user.png'),
            name: '用户名',
            email: '用户邮箱',
            user_pic: [],
            showphoto: false

        }
    },
    methods: {
        uploadphoto() {
            //用户登录才能换头像
            const token = sessionStorage.getItem('token')
            if(token){
                this.showphoto = true 
                console.log('换头像');
            }
           
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
                        this.name = resp.data.data.username
                        this.email = resp.data.data.email
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
.top {
    width: 100%;
    height: 180px;
    /* background-color: #2788dd; */
    background-color: #0E78FF;

    text-align: center;
}

.top>.title {
    font-size: 25px;
    color: #fff;
    margin-top: 5px;
}

.top>.photo {
    width: 79px;
    height: 79px;
    font-size: small;
    color: #fff;
    border-radius: 50%;
    border: 1px solid #fff;
    margin: auto;
    margin-top: 7px;
}

.top>.photo>img {
    width: 79px;
    height: 79px;
    border-radius: 50%;

}

.top>.name {

    font-size: 16px;
    color: #fff;
    margin-top: 5px;
}

.top>.email {

    font-size: 14px;
    color: #fff;
    margin-top: 5px;
}
</style>