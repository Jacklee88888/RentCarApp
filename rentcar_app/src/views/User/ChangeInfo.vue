<template>
    <div>
        <!-- 头部 -->
        <userHead>修改信息</userHead>
        <!-- 内容 -->
        <van-form @submit="onSubmit">
            <van-field v-model="info.username" name="username" label="用户名:"
                :rules="[{ required: true, message: '请填写用户名' }]" />
                
            <van-field v-model="info.gender" name="gender" label="性别:"
                :rules="[{ required: true, message: '请填写性别' }]" />

            <van-field v-model="info.number" type="number" name="number" label="电话:"
                :rules="[{ required: true, message: '请填写电话' }]" />

            <van-field v-model="info.birthday" type="birthday" name="birthday" label="生日:"
                :rules="[{ required: true, message: '请填写生日' }]" />

            <van-field v-model="info.email" type="email" name="email" label="邮箱:"
                :rules="[{ required: true, message: '请填写邮箱' }]" />

            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">提交</van-button>
            </div>
        </van-form>
    </div>
</template>
<script>

import userHead from '@/components/user/userHead.vue'
import axios from 'axios'
import qs from 'qs';

export default {
    name: 'MyInfo',
    data() {
        return {
            info: {
                username: '',
                gender: '',
                number: '',
                birthday: '',
                email: ''
            },
        }
    },
    methods: {
        //返回按钮
        back() {
            this.$router.go(-1);
        },
        onSubmit(values) {
            const data = qs.stringify({
                username: values.username,
                gender: values.gender,
                number: values.number,
                birthday: values.birthday,
                email: values.email
            })
            const token = sessionStorage.getItem('token')
            axios({
                method: 'POST',
                url: 'http://127.0.0.1:8080/my/userinfo',
                headers: {
                    Authorization: token
                },
                data: data
            }).then(resp => {
                if (resp.data.status == 0) {

                    console.log(resp.data.message);
                    this.$router.replace({ name: 'User' })
                }
                if(resp.data.status == 1){
                    console.log(resp.data.message);
                }
            })
        }
    },
    components: {
        // 引入头部组件
        userHead
    },
    // mounted() {
    //     const token = sessionStorage.getItem('token')
    //     axios({
    //         methods: 'post',
    //         url: 'http://127.0.0.1:8080/my/userinfo',
    //         headers: {
    //             Authorization: token
    //         }
    //     }).then(resp => {
    //         if (resp.data.status == 0) {
    //             this.info.name = resp.data.data.username
    //             this.info.gender = resp.data.data.gender
    //             this.info.number = resp.data.data.number
    //             this.info.birthday = resp.data.data.birthday
    //             this.info.email = resp.data.data.email
    //             console.log(resp.data.message);
    //             this.$router.replace({name:'User'})
    //         }
    //     })
    // }
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