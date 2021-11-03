<template>
  <div class="arrange">
    <ul v-if="!isNull" class="list-carpper">
      <li v-for="item in list" :key="item.examCode" :ID='item.examCode' @click="pop($event)"
          class="item" :style="{'background': color[Math.floor(Math.random()*4)]}">
        <!--  -->
        <h3>{{ item.name }}</h3>
        <h5>{{ item.address }}</h5>
        <h5>{{ item.date }}</h5>
        <h5>{{ item.startTime }} ~ {{ item.endTime }}</h5>
      </li>
    </ul>

    <div v-if="isNull">
      <el-empty description="暂时没有监考信息"></el-empty>
    </div>
<!--  原计划分天展示,这里是特定的某一天中的没有信息  -->
  </div>
</template>

<script>
import {host} from '../../network';
import axios from 'axios';

export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  }, // 父组件传递给子组件的数据
  data() {
    return {
      isNull: false,
      data: {},
      message: {list: null},
      color: ["#A9E2F3", "#6E6E6E", "#BDBDBD", "#819FF7"]
    }
  },
  created() {
    // this.list = this.message.list;
    if (this.list.length === 0) {
      this.isNull = true;
      console.log("true");
    } else {
      this.isNull = false;
      console.log("false, the list is null");
    }
  },
  methods: {
    pop(e) {
      let examID = e.currentTarget.getAttribute('ID');
      this.$emit("sendParent", examID);
    }
  }
}
</script>


<style scoped>
.list-carpper {
  width: 95%;
  margin: 0 auto;
  color: white;
}

.item {
  background: #A9E2F3;
  width: 100%;
  height: 100px;
  margin-top: 15px;
  border-radius: 14px;
  border: 1px solid #eaeaea;
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
  color: white;
}

.arrange {
  width: 95%;
  margin: 10px auto;
  height: 570px;
  /*background: red;*/
  border-radius: 10px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
</style>
