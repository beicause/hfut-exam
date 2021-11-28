<template>
    <div>
        <!-- 遮罩层 -->
        <el-dialog :visible.sync="show" title="考试信息" center width="90%">
            <div class="-mt-4">
                <ul>
                    <li class="li_warpper">
                        <span>考试科目：</span>
                        <span class="content">{{ info.name }}</span>
                    </li>
                    <li class="li_warpper">
                        <span>考场分布：</span>
                        <span class="content">{{ info.address }}</span>
                    </li>
                    <li class="li_warpper">
                        <span>考试时间：</span>
                        <span class="content">{{ info.date }}</span>
                    </li>
                    <li class="li_warpper">
                        <span>起始时间：</span>
                        <span class="content">{{ info.startTime }} ~ {{ info.endTime }}</span>
                    </li>
                    <li class="li_warpper">
                        <span>学生人数：</span>
                        <span class="content">{{ info.studentNum }} 人</span>
                    </li>
                    <li class="li_warpper">
                        <span>监考老师：</span>
                        <span
                            class="content"
                            v-for="i in info.teachers"
                            :key="i.workId"
                        >{{ i.name }} &nbsp;</span>
                    </li>
                </ul>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getExamInfo } from "../../common/network";

export default {
    props: {
        examCode: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            info: {},
            show:false
        }
    },
    methods:{
        open(){
            this.show=true
        }
    },
    watch: {
        examCode: {
            handler(v) {
                if (!v) return
                getExamInfo(localStorage.token, v).then(suc => {
                    if (suc.data.code === 0) {
                        this.info = suc.data.data;
                    } else {
                        console.log("fail");
                        this.$notify({
                            title: '',
                            message: suc.data.msg,
                            type: 'error'
                        });
                    }
                })
            }
        }
    }
}

</script>

<style scoped>
.is-top {
    margin-bottom: 0;
}

.el-tabs__item {
    padding: 0 10px;
}

.li_warpper {
    height: 40px;
    line-height: 40px;
}

.li_warpper .content {
    color: #00bfff;
}

.ivu-tabs {
    /* height: 50px; */
    margin-top: 15px;
}

.ivu-tabs:after {
    background: #848484;
}

.not_today {
    width: 10%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: #f2f2f2;
    border-radius: 8px;
}

.not_today span {
    font-size: 15px;
    color: #848484;
    display: block;
    height: 50%;
    margin-top: -6px;
}

.today {
    width: 10%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 8px;
    background: #2e9afe;
}

.today span {
    color: white;
}

.list-crapper {
    width: 100%;
    height: 80px;
    line-height: 80px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.list-item {
    width: 10%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: #f2f2f2;
    border-radius: 8px;
}

.list-item span {
    font-size: 15px;
    color: #848484;
    display: block;
    height: 50%;
    margin-top: -6px;
}

.time {
    display: flex;
    margin-left: 10px;
    margin-top: 15px;
}

h1 {
    font-size: 18px;
    margin: 5px 5px;
    color: #6e6e6e;
}
</style>
