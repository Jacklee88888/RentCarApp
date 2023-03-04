<template>
    <div>
        <!-- 头部 -->
        <userHead>修改密码</userHead>
        <!-- 内容 -->
        <van-form @submit="onSubmit">
            <van-field v-model="oldPwd" name="oldPwd" label="旧密码" placeholder="旧密码"
                :rules="[{ required: true, message: '请填写旧密码' }]" />

            <van-field v-model="newPwd" name="newPwd" label="新密码" placeholder="新密码"
                :rules="[{ required: true, message: '请填写新密码' }]" />

            <van-field v-model="newPwd1" name="newPwd" label="新密码" placeholder="请再次填写密码"
                :rules="[{ required: true, message: '请再次填写密码' }]" />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">提交</van-button>
            </div>
        </van-form>
    </div>
</template>
<script>
import userHead from '@/components/user/userHead.vue'
import axios from 'axios';
import qs from 'qs';
import Vue from 'vue';
import { Dialog } from 'vant';

// 全局注册
Vue.use(Dialog);

export default {
    name: 'MyInfo',
    data() {
        return {
            oldPwd: '',
            newPwd: '',
            newPwd1: ''
        }
    },
    methods: {
        //返回按钮
        back() {
            this.$router.go(-1);
        },
        //提交修改密码
        onSubmit(values) {
            //要携带token请求
            const token = sessionStorage.getItem('token')

            const data = qs.stringify({
                oldPwd: values.oldPwd,
                newPwd: values.newPwd
            })

            axios({
                method: 'post',
                url: 'http://127.0.0.1:8080/my/updatepwd',
                headers: {
                    Authorization: token
                },
                data: data
            }).then(resp => {
                if (resp.data.status == 0) {
                    console.log(resp.data.message)
                    sessionStorage.removeItem('token')
                    Dialog.alert({
                        message: '密码修改成功请点击登录',
                    }).then(() => {
                        this.$router.replace({ name: 'Login' })
                        // on close
                    });

                }
                if (resp.data.status == 1) {
                    console.log(resp.data.message)
                    Dialog.alert({
                        message: '密码修改失败请重试！',
                    }).then(() => {

                        // on close
                    });
                }

            })
        },
    },
    components: {
        userHead
    }
}   
</script>

<style scoped>

</style>