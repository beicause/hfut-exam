
<script setup>
import { computed, ref } from '@vue/composition-api';
import store from '../../store';

const props = defineProps({
    invigilateCode: { type: String, required: true }
})

const list = computed(() => store.state.listMyInvigilate)
const checkedList = ref([])
const show = ref(false)
const open = () => show.value = true
defineExpose({ open })

</script>

<template>
    <div>
        <el-dialog title="调换考试" center :visible.sync="show" width="90%">
            <div class="-mt-4">请选择您想换给他的考试以发起请求</div>
            <div>若不选择则直接获取该考试</div>
            <div>您的考试有：</div>
            <div class="min-h-24 flex justify-center">
                <el-checkbox-group v-model="checkedList">
                    <el-checkbox-button
                        class="mt-2"
                        :key="item.invigilateCode"
                        v-for="item in list"
                        :label="item.invigilateCode"
                    >{{ item.name + '/' + item.address + '/' + item.date }}</el-checkbox-button>
                </el-checkbox-group>
            </div>
            <div class="flex items-center">
                <el-button type="primary" class="mt-2 m-auto" @click="confirm">确认</el-button>
            </div>       
        </el-dialog>
    </div>
</template>
<script>
import { exchange } from '../../common/network';

export default {
    methods: {
        confirm() {
            console.log(this.checkedList);
            exchange(localStorage.token, this.invigilateCode, this.checkedList).then(res => {
                if (res.data.code === 0) {
                    this.$notify({
                        title: '', message: '请求成功', type: 'success'
                    })
                }
                else throw Error(res.data.msg)
            }).catch(e => {
                console.log(e);
                this.$notify({
                    title: '',
                    message: '出错了...',
                    type: 'error'
                })
            }).finally(() => {
                this.show = false
                this.checkedList=[]
                store.dispatch('getOthersInvigilate')
                store.dispatch('getMyInvigilate')
            })
        }
    }
}
</script>
