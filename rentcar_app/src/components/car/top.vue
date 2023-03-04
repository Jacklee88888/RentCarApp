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
    </div>
</template>
<script>
export default {
    name: 'topcar',
    data() {
        return {
            value:''

        }
    },
    methods: {
        //搜索功能
        onSearch(value) {
            this.$router.push({name:'SearchCars',params:{value:value}})   

        },
        //取消搜索
        onCancel() {
            console.log('取消搜索')
        },
    }
}
</script>

<style scoped>
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