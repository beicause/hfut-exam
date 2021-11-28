<template>
  <div>
    <div class="instorage-title">
      <router-link to="/myinfo"><i class="el-icon-arrow-left back">&#xe670;</i></router-link>
      <h1>我的申请</h1>
      <a href="#">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
    </div>
    <!-- 所有监考信息的列表 -->
    <ul v-if="list.length" class="course_list">
      <li v-for="item in list" :key="item.invigilateCode" class="course_list_item">
        <div>
          <h3>{{ item.exam.name }} </h3>
          <h5>{{ item.exam.address }}</h5>
          <h5>{{ item.exam.date }}</h5>
          <h5>{{ item.exam.startTime }} ~ {{ item.exam.endTime }}</h5>
        </div>
        <!-- 调课按钮 -->
        <el-button @click="changeIt(item.invigilateCode)" class="but" type="danger" icon="el-icon-error"
                   circle></el-button>
      </li>
    </ul>
    <div v-if="!list.length">
      <el-empty description="暂时没有申请哦"></el-empty>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Qs from 'qs'
import {cancelExchange, host} from '../../common/network'
import {MessageBox} from 'mint-ui';
import {Indicator} from 'mint-ui';

export default {
  data() {
    return {
      list: [],
    }
  },
  created() {
    Indicator.open();
    this.getAllApply();
  },
  methods: {
    // 取消申请
    changeIt(invigilateCode) {
      let token = localStorage.token;
      MessageBox.confirm('取消申请?').then(action => {
        cancelExchange()
          .then(suc => {
            if (suc.data.code === 0) {
              this.$notify({
                title: '',
                message: '取消成功',
                type: 'success'
              });
              // this.$router.replace('/change');
            }
            this.getAllApply()

          })
          .catch(fail => {
            this.$notify({
              title: '',
              message: '出错了...',
              type: 'error'
            });
          })
      });
    },
    // 获取所有的自己的申请
    getAllApply() {
      let token = localStorage.token;
      // 没有完成的监考
      axios.get(host.ip + "/teacher/my", {
        headers: {
          'token': token
        },
        responseType: 'json',
      })
        .then(suc => {
          if (suc.data.code === 0) {
            this.list = suc.data.data;
            Indicator.close();
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
.but {
  width: 50px;
  height: 50px;
  margin-top: 25px;
  margin-right: 15px;
}

.course_list {
  margin-top: 40px;
}

.course_list_item {
  display: flex;
  justify-content: space-between;
  align-content: center;
  height: 100px;
  width: 95%;
  background: #F7BE81;
  margin: 5px auto;
  border-radius: 14px;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.course_list_item h3 {
  font-size: 19px;
  font-weight: bold;
  margin-left: 20px;
  padding-top: 5px;
}

.course_list_item h5 {
  font-size: 14px;
  margin-left: 30px;
  padding-top: 3px;
  color: white;
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
