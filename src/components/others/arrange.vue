<template>
  <div>
    <ul v-if="!isNull" class="list-carpper">
      <li
        v-for="item in list"
        :key="item.examCode"
        @click="pop(item.examCode)"
        class="item"
        :style="getColor(item.examCode)"
      >
        <div>
          <h3 :style="getColor(item.examCode)">
            {{ item.name }}
            <span
              v-if="item.examStateEnum === 'TO_BE_REPLACED'"
              style="color: #FA5858; font-size: 15px"
            >（等待调换中）</span>
          </h3>
          <h5 :style="getColor(item.examCode)">{{ item.address }}</h5>
          <h5 :style="getColor(item.examCode)">{{ item.date }}</h5>
          <h5 :style="getColor(item.examCode)">{{ item.startTime }} ~ {{ item.endTime }}</h5>
        </div>

        <div
          style="display:flex;align-items:center;margin-right:10px"
          @click.stop="changeIt(item.invigilateCode)"
        >
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
        </div>
      </li>
    </ul>

    <div v-if="isNull">
      <el-empty description="暂时没有监考信息"></el-empty>
    </div>
    <!--  原计划分天展示,这里是特定的某一天中的没有信息  -->
  </div>
</template>

<script>
import store from "@/store"
import { MessageBox } from 'mint-ui'

import { startExchange } from '@/common/network'

export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  }, // 父组件传递给子组件的数据
  data() {
    return {
      data: {},
      message: { list: null },
    }
  },
  computed: {
    isNull() {
      return this.list.length === 0
    }
  },
  methods: {
    pop(e) {
      this.$emit("clickItem", e);
    },
    getColor(examCode) {
      const c = store.state.codeColorMap.get(examCode)
      return {
        background: c.bg, color: c.fo
      }
    },
    changeIt(invigilateCode) {
      let token = localStorage.token;
      MessageBox.confirm('确认提出调换申请?').then(action => {
        startExchange(token, invigilateCode).then(suc => {
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
      }).catch((e) => {
        console.log(e);
      })
    }
  }
}
</script>


<style scoped>
.list-carpper {
  width: 95%;
  margin: 0 auto;
  margin-top: 15px;
}

.item {
  background: #a9e2f3;
  width: 100%;
  height: 100px;
  border-radius: 14px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 0 25px #cac6c6;
}

.item h3 {
  font-size: 19px;
  font-weight: bold;
  margin-left: 20px;
  padding-top: 5px;
}

.item h5 {
  font-size: 14px;
  margin-left: 30px;
  padding-top: 2px;
}
</style>
