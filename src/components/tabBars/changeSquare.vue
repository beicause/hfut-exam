<template>
  <div class="change">
    <!-- //头部 -->
    <div class="title">
      <span>调换信息</span>
    </div>
    <!-- 所有监考信息的列表 -->
    <ul class="course_list">
      <li v-for="item in list" :key="item.examCode" class="course_list_item">
        <div>
          <h3>{{ item.name }} <span v-if="item.examStateEnum === 'TO_BE_REPLACED'"
                                    style="color: #FA5858; font-size: 15px">（等待调换中）</span></h3>
          <h5>{{ item.address }}</h5>
          <h5>{{ item.date }}</h5>
          <h5>{{ item.startTime }} ~ {{ item.endTime }}</h5>
        </div>
        <!-- 调课按钮 -->
        <el-button @click="changeIt(item.invigilateCode)" class="but" type="primary" icon="el-icon-edit"
                   circle></el-button>
      </li>
    </ul>
  </div>
</template>

<script>
import tabBar from './tabBar.vue'
import axios from 'axios'
import {host} from '../../network'
import {MessageBox} from 'mint-ui';
import store from '../../store';
import { isLogin } from '../../common/utils';
export default {
  name: "changeSquare",
  components: {
    tabBar,
  },
  data() {
    return {
    }
  },
  created(){
    if(isLogin())store.dispatch('getUnfinished')
  },
  computed: {
    list(){
      return store.state.listUnfinished
    }
  },
  methods: {
    // 想要进行调换属于是,
    // 这里可以再传一个msg参数，提示其他老师，自己有哪些 可用的时间段
    changeIt(invigilateCode) {
      let token = localStorage.token;
      MessageBox.confirm('确认提出调换申请?').then(action => {
        axios.get(host.ip + "/exchange/start", {
          headers: {
            'token': token
          },
          params: {
            'invigilateCode': invigilateCode,
            'msg': ' ',
          },
          responseType: 'json',
        })
          .then(suc => {
            if (suc.data.code === 0) {
              this.$notify({
                title: '',
                message: '申请成功',
                type: 'success'
              });
              // this.$router.replace('/myInfo/myApply');
            } else if (suc.data.code === -1) {
              this.$notify({
                title: '',
                message: '您已经发起了调度，请勿重复操作',
                type: 'warning'
              });
            } else {
              this.$notify({
                title: '',
                message: '出错了..',
                type: 'error'
              });
            }
            store.dispatch('getUnfinished')
          })
          .catch(fail => {
            console.log(fail);
            this.$notify({
              title: '',
              message: '出错了...',
              type: 'error'
            });
          })
      }).catch((e)=>{
        
      })
    },
    // 获取所有的 监考
    // getAllCourse() {
    //   let token = localStorage.token;
    //   // 没有完成的监考
    //   axios.get(host.ip + "/teacher/unfinished", {
    //     headers: {
    //       'token': token
    //     },
    //     responseType: 'json',
    //   })
    //     .then(suc => {
    //       if (suc.data.code === 0) {
    //         this.list = suc.data.data;
    //         // console.log(this.list);
    //         localStorage.num = this.list.length;
    //         this.num = (Number)(localStorage.num);
    //         Indicator.close();
    //       } else {
    //         this.$notify({
    //           title: '',
    //           message: '出错了..',
    //           type: 'error'
    //         });
    //       }
    //     })
    //     .catch(fail => {
    //       this.$notify({
    //         title: '',
    //         message: '出错了..',
    //         type: 'error'
    //       });
    //     })
    // }
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

.title {
  width: 100%;
  display: flex;
  height: 50px;
  line-height: 50px;
  background: #A9E2F3;
  text-align: center;
  justify-content: center;
  align-content: center;
}

.title span {
  font-size: 18px;
  color: white;
}
</style>
