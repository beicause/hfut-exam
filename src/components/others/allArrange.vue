<template>
  <div>
      <ul v-if="!isNull" class="list-carpper">
          <li v-for="item in list" :key="item.examCode" :ID='item.examCode' @click="pop($event)" class="item" :style="{'background': color}">
              <h3>{{ item.name }}</h3>
              <h5>{{ item.address }}</h5>
              <h5>{{ item.date }}</h5>
              <h5>{{ item.startTime }} ~ {{ item.endTime }}</h5>
          </li>
      </ul>

      <div v-if="isNull">
          <el-empty description="暂时没有监考信息"></el-empty>
      </div>
  </div>
</template>

<script>
export default {
    name: 'allArrange',
    props: {
        list: {
            type: Array,
            default: []
        },
        color: {
            type: String,
            // default: '#BDBDBD'
        }
    },
    data() {
        return {
            isNull: false,
            data :{}
        }
    },
    created() {
        // this.list = this.message.list;
        if ( this.list.length === 0) {
            this.isNull = true;
        } else {
            this.isNull = false;
        }
    },
    methods: {
        pop(e) {
            let examID = e.currentTarget.getAttribute('ID');
            this.$emit("sendparent", examID);
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
.item h3{
    font-size: 19px;
    font-weight: bold;
    margin-left: 20px;
    padding-top: 8px;
}
.item h5{
    font-size: 14px;
    margin-left: 30px;
    padding-top: 2px;
    color: white;
}
.arrange {
    width: 95%;
    margin: 5px auto;
    height: 570px;
    /*background: red;*/
    border-radius: 10px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
</style>
