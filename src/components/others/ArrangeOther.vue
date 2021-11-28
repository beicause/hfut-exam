<template>
  <div>
    <ul v-if="!isNull" class="list-carpper">
      <li
        v-for="item in list"
        :key="item.invigilateCode"
        class="item"
        :style="getColor(item.invigilateCode)"
      >
        <div>
          <h3 :style="getColor(item.invigilateCode)">
            {{ item.exam.name }}
            <span style="color: #FA5858; font-size: 15px">（{{ item.teacher.name }}）</span>
          </h3>
          <h5 :style="getColor(item.invigilateCode)">{{ item.exam.address }}</h5>
          <h5 :style="getColor(item.invigilateCode)">{{ item.exam.date }}</h5>
          <h5
            :style="getColor(item.invigilateCode)"
          >{{ item.exam.startTime }} ~ {{ item.exam.endTime }}</h5>
        </div>

        <div
          style="display:flex;align-items:center;margin-right:10px"
          @click.stop="changeIt(item.invigilateCode, item.examStateEnum)"
        >
          <el-button type="primary" circle>
            <icon style="width: 24px;height: 24px;" icon="tabler:exchange"></icon>
          </el-button>
        </div>
      </li>
    </ul>

    <div v-if="isNull">
      <el-empty description="暂时没有监考信息"></el-empty>
    </div>
      
    <exam-change-dialog ref="dialog" :invigilateCode="clickedInvigilateCode"></exam-change-dialog>
  </div>
</template>

<script>
import store from "@/store"
import { Icon } from "@iconify/vue2"
import MaskExamInfo from "./ExamInfoDialog.vue"
import ExamChange from "./ExamChangeDialog.vue"
import ExamChangeDialog from "./ExamChangeDialog.vue"

export default {
  components: { Icon, MaskExamInfo, ExamChange, ExamChangeDialog },
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  computed: {
    isNull() {
      return this.list.length === 0
    }
  },
  data() {
    return {
      clickedInvigilateCode: '',
    }
  },
  methods: {
    // pop(e) {
    // this.clickedExamCode=e
    // this.$refs.dialog.open()
    // },
    getColor(examCode) {
      const c = store.state.codeColorMap.get(examCode)
      return {
        background: c.bg, color: c.fo
      }
    },
    changeIt(invigilateCode) {
      this.clickedInvigilateCode = invigilateCode
      this.$refs.dialog.open()
      // const token = localStorage.token;
      // const msg = '接受该调换申请吗?'
      // MessageBox.confirm(msg).then(action => {
      //   ( confirmExchange(token, invigilateCode)).then(suc => {
      //     if(suc.data.code!==0)throw Error()
      //     this.$notify({
      //       title: '',
      //       message: '操作成功',
      //       type: 'success'
      //     })
      //     store.dispatch('getOthersInvigilate')
      //   })
      //     .catch(fail => {
      //       console.log(fail);
      //       this.$notify({
      //         title: '',
      //         message: '出错了...',
      //         type: 'error'
      //       });
      //     })
      // }).catch((e) => {
      //   console.log(e);
      // })
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
