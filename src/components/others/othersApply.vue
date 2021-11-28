<template>
  <div>
    <!-- 头部 -->
    <div class="instorage-title">
      <router-link to="/myinfo"><i class="el-icon-arrow-left back">&#xe670;</i></router-link>
      <h1>他人申请</h1>
      <a href="#">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
    </div>
    <!-- 遮罩层 -->
    <el-dialog :visible.sync="mask" width="90%">
      <div class="demoTwo">
        <ul>
          <li class="li_warpper">
            <div class="timeTo">
              <span>选择调换时间</span>
              <el-select collapse-tags multiple v-model="value" placeholder="请选择类别">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label">
                </el-option>
              </el-select>
            </div>
          </li>
        </ul>
        <div class="butt">
          <button @click="cancel()" style="background: #FE642E; color: white;">取消</button>
          <button @click="commit()" style="margin-left: 20px; background: #58ACFA; color: white;">提交</button>
        </div>
      </div>
    </el-dialog>
    <!-- 他人监考的列表 -->
    <ul v-if="list.length != 0" class="course_list">
      <li v-for="item in list" :key="item.invigilateCode" class="course_list_item">
        <div>
          <h3>{{ item.exam.name }} </h3>
          <h5 style="color: black; margin-left: 20px;">from {{ item.teacher.college }}{{ item.teacher.name }}</h5>
          <h5>{{ item.exam.address }}</h5>
          <h5>{{ item.exam.date }}</h5>
          <h5>{{ item.exam.startTime }} ~ {{ item.exam.endTime }}</h5>
        </div>
        <!-- 调课按钮 -->
        <div>
          <el-button @click="replace(item.invigilateCode)" class="but" style="margin-right: -10px;" type="warning"
                     icon="el-icon-top" circle></el-button>
          <el-button @click="change(item.invigilateCode)" class="but" type="primary" icon="el-icon-refresh"
                     circle></el-button>
        </div>
      </li>
    </ul>
    <div v-if="list.length === 0">
      <el-empty description="暂时没有申请哦"></el-empty>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Qs from 'qs'
import {host} from '../../common/network'
import {Indicator,MessageBox} from 'mint-ui';

export default {
  data() {
    return {
      list: [],
      mask: false,
      value: [],
      options: [],
      invigilateCode: '', // 用来记录点击的那个监考
    }
  },
  created() {
    this.list = [];
    this.options = [];
    this.value = [];
    this.mask = false;
    this.invigilateCode = '';
    Indicator.open();
    this.getOthersList();
  },
  methods: {
    // 取消
    cancel() {
      this.mask = false;
    },
    // 提交 申请
    commit() {
      if (this.value.length === 0) {
        this.$notify({
          title: '',
          message: "请选择调换时间",
          type: 'warning'
        });
        return;
      }
      var j = 0;
      // 将invigilateCode 选中的时间做成
      var invigilateCodes = []
      for (var i = 0; i < this.options.length; i++) {
        if (this.value[j] === this.options[i].value && j < this.value.length) {
          invigilateCodes.push(this.options[i].invigilateCode);
        }
      }
      console.log(invigilateCodes);
      // 发送同意调换申请
      let token = localStorage.token;
      // invigilateCodes = JSON.stringify(invigilateCodes);
      axios.get(host.ip + "/exchange/intent", {
        headers: {
          'token': token
        },
        params: {
          'invigilateCodes': invigilateCodes,
          'targetCode': this.invigilateCode,
        },
        paramsSerializer: function (params) {
          return Qs.stringify(params, {arrayFormat: 'repeat'})
        },
        responseType: 'json',
      })
        .then(suc => {
          console.log(suc.data);
          if (suc.data.code === 0) {

          } else {
            this.$notify({
              title: '',
              message: suc.data.msg,
              type: 'error'
            });
          }
        })
        .catch(fail => {
          console.log(fail);
          this.$notify({
            title: '',
            message: '出错了...',
            type: 'error'
          });
        })
      this.$router.replace('/myinfo');
    },
    //  顶替他人去监考
    replace(invigilateCode) {
      // 1, 发送请求
      let token = localStorage.token;
      MessageBox.confirm('确认顶替他吗?').then(action => {
        axios.get(host.ip + "/exchange/replace", {
          headers: {
            'token': token
          },
          params: {
            'invigilateCode': invigilateCode,
          },
          responseType: 'json',
        })
          .then(suc => {
            console.log(suc.data);
            if (suc.data.code === 0) {
              this.getOthersList();
            } else {
              this.$notify({
                title: '',
                message: suc.data.msg,
                type: 'error'
              });
            }
          })
          .catch(fail => {
            console.log(fail);
            this.$notify({
              title: '',
              message: '出错了...',
              type: 'error'
            });
          })
      });
    },
    // 交换
    change(invigilateCode) {
      // 1, 发送请求
      let token = localStorage.token;
      MessageBox.confirm('确认和他交换吗?').then(action => {
        this.mask = true;
        this.invigilateCode = invigilateCode;
        console.log(this.invigilateCode);
        this.getDayOfIt();
      });
    },
    // 获取自己这一周的所有监考安排
    getDayOfIt() {
      let token = localStorage.token;
      // 没有完成的监考
      axios.get(host.ip + "/teacher/MyInvigilate", {
        headers: {
          'token': token
        },
        responseType: 'json',
      })
        .then(suc => {
          if (suc.data.code === 0) {
            // 整合时间列表
            this.options = [];
            for (var i = 0; i < suc.data.data.length; i++) {
              var item = {label: '', value: '', invigilateCode: ''};
              item.label = suc.data.data[i].date + " " + suc.data.data[i].startTime + '~' + suc.data.data[i].endTime;
              item.value = suc.data.data[i].date + " " + suc.data.data[i].startTime + '~' + suc.data.data[i].endTime;
              item.invigilateCode = suc.data.data[i].invigilateCode;
              this.options.push(item);
            }
          } else {
            this.$notify({
              title: '',
              message: suc.data.msg,
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
    },
    // 获取他人的申请列表
    getOthersList() {
      let token = localStorage.token;
      axios.get(host.ip + "/teacher/list", {
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
              message: suc.data.msg,
              type: 'error'
            });
          }
        })
        .catch(fail => {
          this.$notify({
            title: '',
            message: '出错了...',
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
  width: 50px;
  height: 50px;
  margin-top: 30px;
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

.course_list_item h3 {
  font-size: 16px;
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

/* 标题栏 */
h1 {
  font-size: 17px;
}

.instorage-title {
  height: 52px;
  line-height: 52px;
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #DBA901;
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
