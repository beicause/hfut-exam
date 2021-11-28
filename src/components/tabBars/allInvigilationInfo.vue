<template>
  <div>
    <!-- 头部 -->
    <PageHeader>我的监考</PageHeader>
    <!-- 日期 与 安排-->
    <ArrangeMe :list="courseList"></ArrangeMe>
  </div>
</template>

<script>
import store from '../../store';
import { isLogin } from '../../common/utils';
import PageHeader from './PageHeader.vue';
import ArrangeMe from '../others/ArrangeMe.vue';

export default {
  name: "allInvigilationInfo",
  components: {
    PageHeader,
    ArrangeMe
},
  created() {
    if (isLogin()) store.dispatch('getMyInvigilate')
  },
  computed: {
    courseList() {
      return store.state.listMyInvigilate
    }
  }
}

</script>
