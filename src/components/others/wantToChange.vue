<template>
    <!-- 别人发过来的所有的欲交换请求 -->
    <div>
        <div class="instorage-title">
            <router-link to="/myinfo"><i class="el-icon-arrow-left back">&#xe670;</i></router-link>
            <h1>待确认调换</h1>
            <a href="#">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
        </div>
        <ul v-if="list.length !== 0" class="course_list">
            <li v-for="item in list" :key="item.exchangeCode" class="course_list_item">
                <div>
                    <h3>{{ item.self.address }} -> {{ item.target.address}} </h3>
                    <h5>{{ item.self.examName }}-> {{ item.target.examName}}</h5>
                    <h5>{{ item.self.date }} -> {{ item.target.date}}</h5>
                    <h5>{{ item.self.startTime }}~{{ item.self.endTime }} -> {{ item.target.startTime }}~{{ item.target.endTime }} </h5>
                </div>
                <div>
                    <el-button @click="edit(item.invigilateCode)" class="but" type="primary" icon="el-icon-refresh" circle></el-button>
                </div>
            </li>
        </ul>
        <div v-if="list.length === 0">
            <el-empty description="暂时没有待确认调换哦"></el-empty>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Qs from 'qs'
import {host} from '../../network'
import { MessageBox } from 'mint-ui';
import { Indicator } from 'mint-ui';

export default {
    data() {
        return {
            list: [],

        }
    },
    created() {
        Indicator.open();
        this.getAllApplyByMe();
    },
    methods:{
        edit() {

        },
        cancel() {

        },
        // 获取所有自己发起的调换请求
        getAllApplyByMe() {
            let token = localStorage.token;
            // 没有完成的监考
            axios.get(host.ip + "/exchange/my-intend", {
                headers: {
                    'token': token
                },
                responseType: 'json',
            })
            .then( suc => {
                if (suc.data.code === 0) {
                    this.list = suc.data.data;
                    // console.log(this.list);
                    Indicator.close();
                } else {
                    this.$notify({
                        title: '',
                        message: '出错了..',
                        type: 'error'
                    });
                }
            })
            .catch( fail => {
                this.$notify({
                    title: '',
                    message: '出错了..',
                    type: 'error'
                });
            })
        },
        // 获取本周的所有待考科目
        getAllCourse() {
            let token = localStorage.token;
            // 没有完成的监考
            axios.get(host.ip + "/teacher/unfinished", {
                headers: {
                    'token': token
                },
                responseType: 'json',
            })
            .then( suc => {
                if (suc.data.code === 0) {
                    this.list = suc.data.data;
                    console.log(this.list);
                    Indicator.close();
                } else {
                    this.$notify({
                        title: '',
                        message: '出错了..',
                        type: 'error'
                    });
                }
            })
            .catch( fail => {
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
.butt {
  width: 100%;
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-content: center;
}
.butt button {
  width: 80px;
  margin-top: 40px;
}
.timeTo {
  height: 40px;
  line-height: 40px;
  display: flex;
  justify-content: space-around;
}
.timeTo span {
  width: 50%;
}
.but {
    width: 40px;
    height: 40px;
    margin-top: 35px;
    margin-right: 15px;
}
.course_list {
    margin-top: 40px;
}
.course_list_item {
    display: flex;
    justify-content: space-between;
    align-content: center;
    height: 118px;
    width: 95%;
    background: #58FAD0;
    margin: 5px auto;
    border-radius: 14px;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
.course_list_item h3{
    font-size: 16px;
    font-weight: bold;
    margin-left: 10px;
    padding-top: 5px;
}
.course_list_item h5{
    font-size: 14px;
    margin-left: 10px;
    padding-top: 3px;
    color: white;
}
/* 标题栏 */
.instorage-title{
    height: 52px;
    line-height: 52px;
    text-align: center;
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-color:lightskyblue;
}
.instorage-title a{
    display: block;
    height: 52px;
    margin-right: 10px;
    text-align: center;
    font-size: 18px;
}
.iconfont{
    font-size: 25px;
}
.back{
    margin-left: 5px;
}
.instorage-title a:active{
    color: #ff6700;
}
.instorage-title h1{
    height: 52px;
    width: 100px;
    line-height: 52px;
    text-align: center;
    color:white;
    font-size: 17px;
}
</style>
