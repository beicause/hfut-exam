<template>
    <nav class="mui-bar mui-bar-tab " style="padding-bottom: 10px;">
        <router-link class="mui-tab-item" to="/allInvigilationInfo">
            <span class="mui-icon el-icon-date"><span class="mui-badge">{{ num }}</span></span>
            <span class="mui-tab-label">监考日程</span>
        </router-link>
        <router-link class="mui-tab-item" to="/changeSquare">
            <span class="mui-icon el-icon-refresh"></span>
            <span class="mui-tab-label">监考调换</span>
        </router-link>
        <router-link class="mui-tab-item" to="/myInfo">
            <span class="mui-icon el-icon-user"></span>
            <span class="mui-tab-label">我的</span>
        </router-link>
    </nav>
</template>

<script>
export default {
    name: "tabBar",
    data() {
        return {

        }
    },
    props: {
      num: {
        type: Number,
        default: "0"
      }
    },
    mounted() {

    },
    methods: {

    }
}
</script>

<style scoped>

</style>
