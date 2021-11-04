<template>
  <div>
    <!-- 头部 -->
    <div class="mui-bar mui-bar-nav">
      <h1 class="mui-title">我的监考</h1>
    </div>
    <!-- 日期 与 安排-->
    <el-tabs style="padding-top: 55px;" v-model="activeName" :stretch="true">
      <el-tab-pane label="全部监考" name="allSchedule">

        <arrange @sendParent="getCourseInfo" :list="courseList"></arrange>

      </el-tab-pane>
    </el-tabs>
    <!-- 遮罩层 -->
    <el-dialog :visible.sync="mask" width="90%">
      <div class="demoTwo">
        <ul>
          <li class="li_warpper">
            <span>考试科目：</span>
            <span class="content">{{ data.name }}</span>
          </li>
          <li class="li_warpper">
            <span>考场分布：</span>
            <span class="content">{{ data.address }}</span>
          </li>
          <li class="li_warpper">
            <span>考试时间：</span>
            <span class="content">{{ data.date }}</span>
          </li>
          <li class="li_warpper">
            <span>起始时间：</span>
            <span class="content">{{ data.startTime }} ~ {{ data.endTime }}</span>
          </li>
          <li class="li_warpper">
            <span>学生人数：</span>
            <span class="content">{{ data.studentNum }} 人</span>
          </li>
          <li class="li_warpper">
            <span>监考老师：</span>
            <span class="content" v-for="i in data.teachers" :key="i.workId">{{ i.name }} &nbsp;</span>
          </li>
        </ul>
      </div>
    </el-dialog>

    <!-- 底部导航条 -->
    <tabBar :num="num"></tabBar>
  </div>
</template>

<script>
import arrange from '../others/arrange.vue'
import {host} from "../../network";
import axios from 'axios'
import tabBar from "./tabBar.vue";
import store from '../../store';
import { isLogin } from '../../common/utils';

export default {
  name: "allInvigilationInfo",
  components: {
    arrange,
    tabBar,
  },
  created(){
    if(isLogin())store.dispatch('getUnfinished')
  },
  data() {
    return {
      activeName: 'allSchedule',
      // loadAll: 0,
      mask: false,
      // list: [], //list: [[],[],[],[],[],[],[]],
      data: {},
    }
  },
  computed:{
    courseList() {
      return store.state.listUnfinished
    },
    num(){
      return store.state.listUnfinished.length
    }
  },
  methods: {
    // 判断是星期几
    getTheDay() {
      var weekDay = ["1", "2", "3", "4", "5", "6", "7"];
      var date = new Date();
      // this.activeName = weekDay[date.getDay() - 1];
      //For example: if today is wednesday, then we will get the output 2 and "3"
    },

    // 子组件传值过来
    getCourseInfo(examCode) {
      console.log(examCode);
      axios.get(host.ip + '/teacher/exam', {
        headers: {
          'token': localStorage.token
        },
        params: {
          examCode: examCode
        }
      }).then(suc => {
        if (suc.data.code === 0) {
          this.data = suc.data.data;
          this.mask = true;
        } else {
          console.log("fail");
          this.$notify({
            title: '',
            message: suc.data.msg,
            type: 'error'
          });
        }
      })
    },


    // // 获取每一天的课程
    // getEveryday() {
    //   this.list = [];
    //   console.log(this.list);
    //   for (var i = 0; i < this.courseList.length; i++) {
    //     // let dateArray = this.courseList[i].date.split("-");
    //     // let date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2])
    //     // let day = (Number)(date.getDay());
    //     this.list.push(this.courseList[i]);
    //   }
    //   console.log(this.list);
    //   this.loadAll++;
    // },

    // 获取这一周的所有
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
  color: #00BFFF;
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
  background: #F2F2F2;
  border-radius: 8px;
}

.not_today span {
  font-size: 15px;
  color: #848484;
  display: block;
  height: 50%;
  margin-top: -6px;;
}

.today {
  width: 10%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  border-radius: 8px;
  background: #2E9AFE;
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
  background: #F2F2F2;
  border-radius: 8px;
}

.list-item span {
  font-size: 15px;
  color: #848484;
  display: block;
  height: 50%;
  margin-top: -6px;;
}

.time {
  display: flex;
  margin-left: 10px;
  margin-top: 15px;
}

h1 {
  font-size: 18px;
  margin: 5px 5px;
  color: #6E6E6E;
}

/* .mint-swipe .mint-swipe-item:nth-child(1) {
  background-image: url('../../images/back1.png');
  background-size: 375px 200px ;
}
.mint-swipe .mint-swipe-item:nth-child(2) {
   background-image: url('../../images/back2.png');
  background-size: 375px 200px ;
}
.mint-swipe .mint-swipe-item:nth-child(3) {
   background-image: url('../../images/back3.png');
  background-size: 375px 200px ;
} */
</style>
