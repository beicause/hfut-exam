<template>
  <div class="apply">
    <div class="instorage-title">
      <router-link to="/myinfo"><i class="el-icon-arrow-left back">&#xe670;</i></router-link>
      <h1>监考记录</h1>
      <a href="#">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
    </div>
    <!-- 表单选项 -->
    <allArrange @sendparent="getCourseInfo" :list="list" :color="'#BDBDBD'" v-if="loadAll===1"></allArrange>
    <!-- <arrange @sendparent="getCourseInfo" :list="list" v-if="loadAll===1"></arrange> -->
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
  </div>
</template>

<script>
import axios from 'axios'
import {host} from '../../network'
import arrange from './arrange.vue'
import allArrange from './allArrange.vue'

export default {
  components: {arrange, allArrange},
  data() {
    return {
      loadAll: 0,
      list: [],
      data: {},
      mask: false,
    }
  },
  created() {
    this.getrecord();
  },
  methods: {
    // 子组件传值过来
    getCourseInfo(examCode) {
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
          this.$notify({
            title: '',
            message: '出错了..',
            type: 'error'
          });
        }
      })
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
.li_warpper {
  height: 40px;
  line-height: 40px;
}

.li_warpper .content {
  color: #00BFFF;
}

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
  background-color: #58ACFA;
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
