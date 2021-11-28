<template>
    <nav class="mui-bar mui-bar-tab" style="padding-bottom: 10px;">
        <router-link class="mui-tab-item" to="/allInvigilationInfo">
            <span class="mui-icon el-icon-date">
                <span class="mui-badge">{{ num }}</span>
            </span>
            <span class="mui-tab-label">我的监考</span>
        </router-link>
        <router-link class="mui-tab-item" to="/changeSquare">
            <span class="mui-icon el-icon-refresh"></span>
            <span class="mui-tab-label">调换广场</span>
        </router-link>
        <router-link class="mui-tab-item" to="/myInfo">
            <span class="mui-icon el-icon-user"></span>
            <span class="mui-tab-label">个人信息</span>
        </router-link>
    </nav>
</template>

<script>
export default {
    name: "tabBar",
    props: {
        num: {
            type: Number,
            default: "0"
        }
    }
}
</script>

<style scoped>
</style>
