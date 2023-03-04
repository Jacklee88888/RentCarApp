<template>
    <div>
        <!-- 头部个人信息 -->
        <top></top>
        <!-- 个人中心功能 -->
        <userContent></userContent>
    </div>
</template>
<script>
import top from '@/components/user/top.vue';
import userContent from '@/components/user/userContent.vue';

export default {
    name: 'User',
    data() {
        return {

        }
    },
    methods: {
    },
    components: {
        // 引入顶部，内容组件
        top, userContent
    }
}
</script>

<style scoped>
p {
    font-size: 15px;
}
</style>