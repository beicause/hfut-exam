<template>
  <div class="change">
    <!-- //头部 -->
    <PageHeader>调换信息</PageHeader>
    <!-- 所有监考信息的列表 -->
    <ArrangeOther :list="list"></ArrangeOther>
  </div>
</template>

<script>
import tabBar from './tabBar.vue'
import store from '../../store';
import { isLogin } from '../../common/utils';
import PageHeader from './PageHeader.vue';
import ArrangeOther from '../others/ArrangeOther.vue';
export default {
  name: "changeSquare",
  components: {
    tabBar,
    PageHeader,
    ArrangeOther
  },
  data() {
    return {
    }
  },
  created() {
    if (isLogin()) {
      store.dispatch('getOthersInvigilate')
      store.dispatch('getMyInvigilate')
    }
  },
  computed: {
    list() {
      return store.state.listOthersInvigilate
    }
  },
  methods: {
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

.course_list_item {
  display: flex;
  justify-content: space-between;
  align-content: center;
  height: 100px;
  width: 95%;
  background: #f7be81;
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

.title span {
  font-size: 18px;
  color: white;
}
</style>
