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
              v-if="isToBeReplaced(item.examStateEnum)"
              style="color: #FA5858; font-size: 15px"
            >（等待调换中）</span>
          </h3>
          <h5 :style="getColor(item.examCode)">{{ item.address }}</h5>
          <h5 :style="getColor(item.examCode)">{{ item.date }}</h5>
          <h5 :style="getColor(item.examCode)">{{ item.startTime }} ~ {{ item.endTime }}</h5>
        </div>

        <div
          style="display:flex;align-items:center;margin-right:10px"
          @click.stop="changeIt(item.invigilateCode, item.examStateEnum)"
        >
          <el-button
            :style="isToBeReplaced(item.examStateEnum) ? { 'border-color': '#fa5858', 'background-color': '#fa5858' } : {}"
            type="primary"
            circle
          >
            <icon
              style="width: 24px;height: 24px;"
              :icon="isToBeReplaced(item.examStateEnum) ? 'bpmn:end-event-cancel' : 'tabler:exchange'"
            ></icon>
          </el-button>
        </div>
      </li>
    </ul>

    <div v-if="isNull">
      <el-empty description="暂时没有监考信息"></el-empty>
    </div>
    <exam-info-mask ref="dialog" :examCode="clickedExamCode"></exam-info-mask>
  </div>
</template>

<script>
import store from "@/store"
import { MessageBox } from 'mint-ui'
import { Icon } from "@iconify/vue2"
import { startExchange } from '@/common/network'
import { cancelExchange } from "../../common/network"
import ExamInfoMask from "./ExamInfoDialog.vue"

export default {
  components: { Icon, ExamInfoMask },
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      clickedExamCode: ''
    }
  },
  computed: {
    isNull() {
      return this.list.length === 0
    }
  },
  methods: {
    pop(e) {
      this.clickedExamCode = e
      this.$refs.dialog.open()
    },
    getColor(examCode) {
      const c = store.state.codeColorMap.get(examCode)
      return {
        background: c.bg, color: c.fo
      }
    },
    isToBeReplaced(state) {
      return state === 'TO_BE_REPLACED'
    },
    changeIt(invigilateCode, examStateEnum) {
      const token = localStorage.token;
      const msg = this.isToBeReplaced(examStateEnum) ? '确认撤销请求吗？' : '确认提出调换申请吗?'
      MessageBox.confirm(msg).then(action => {
        (
          this.isToBeReplaced(examStateEnum)
            ? cancelExchange(token, invigilateCode) : startExchange(token, invigilateCode)
        ).then(suc => {
          if (suc.data.code !== 0) throw Error()
          this.$notify({
            title: '',
            message: '操作成功',
            type: 'success'
          })
          store.dispatch('getMyInvigilate')
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
  font-size: 20px;
  font-weight: bold;
  margin-left: 20px;
  padding-top: 10px;
  padding-bottom: 4px;
}

h5 {
  font-size: 16px;
  margin-left: 30px;
  padding-top: 4px;
}
</style>
