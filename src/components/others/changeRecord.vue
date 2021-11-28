<template>
    <div class="apply">
        <!-- 这个还没写完 -->
        <div class="instorage-title">
            <router-link to="/myinfo">
                <i class="el-icon-arrow-left back">&#xe670;</i>
            </router-link>
            <h1>调换记录</h1>
            <a href="#">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
        </div>
        <!-- 表单选项 -->
        <allArrange @sendparent="getCourseInfo" :list="list" v-if="loadAll === 1"></allArrange>
        <!-- <arrange :list="list" v-if="loadAll===1"></arrange> -->
    </div>
</template>

<script>
import axios from 'axios'
import { host } from '../../common/network'
import arrange from './ArrangeMe.vue'
import allArrange from './allArrange.vue'

export default {
    components: { arrange, allArrange },
    data() {
        return {
            loadAll: 0,
            list: [],
        }
    },
    created() {
        this.getrecord();
    },
    methods: {
        getCourseInfo() {

        },
        getrecord() {
            let token = localStorage.token;
            axios.get(host.ip + "/teacher/invigilate", {
                headers: {
                    'token': token
                },
                responseType: 'json',
            })
                .then(suc => {
                    if (suc.data.code === 0) {
                        this.list = suc.data.data;
                        this.loadAll++;
                        console.log(this.list);
                    } else {
                        this.$notify({
                            title: '',
                            message: '出错了..',
                            type: 'error'
                        });
                    }
                })
                .catch(fail => {
                    this.$notify({
                        title: '',
                        message: '出错了..',
                        type: 'error'
                    });
                })
        }
    }
}
</script>



<style scoped>
h1 {
    font-size: 17px;
}
/* 标题栏 */
.instorage-title {
    height: 52px;
    line-height: 52px;
    text-align: center;
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-color: lightskyblue;
}
.instorage-title a {
    display: block;
    height: 52px;
    margin-right: 10px;
    text-align: center;
    font-size: 18px;
}
.iconfont {
    font-size: 25px;
}
.back {
    margin-left: 5px;
}
.instorage-title a:active {
    color: #ff6700;
}
.instorage-title h1 {
    height: 52px;
    width: 70px;
    line-height: 52px;
    text-align: center;
    color: white;
}
</style>
