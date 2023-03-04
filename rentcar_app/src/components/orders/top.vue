<template>
    <div>
        <van-row>
            <van-col span="24" class="top">
                <div class="title">订单</div>
                
            </van-col>
        </van-row>
    </div>
</template>
<script>
export default {
    name: 'top',
    data() {
        return {
           
            
        }
    }
}
</script>

<style scoped>
.top {
    width: 100%;
    height: 90px;
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