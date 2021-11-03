<template>
  <el-tabs v-model="activeName" :stretch="true" @tab-click="handleClick">
    <el-tab-pane label="周一" name="first">用户管理</el-tab-pane>
    <el-tab-pane label="周二" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="周三" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="周四" name="fourth">定时任务补偿</el-tab-pane>
    <el-tab-pane label="周五" name="five">定时任务补偿</el-tab-pane>
    <el-tab-pane label="周六" name="six">定时任务补偿</el-tab-pane>
    <el-tab-pane label="周日" name="seven">定时任务补偿</el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
    data() {
         return {
             activeName: 'second',
         }
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
          }
    }
}
</script>


<style>
.el-tabs__item {
    padding: 0 10px;
}
</style>
