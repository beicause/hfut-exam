
<script setup>
import { nextTick, ref } from '@vue/composition-api';
import store from '../../store';

const props = defineProps({
    invigilateCode: { type: String, required: true }
})
const list = ref([])

const checkedList = ref([])
const show = ref(false)
const open = () => {
    // 因为props需要更新，这里nextTick一下
    nextTick(async () => {
        list.value = (await getToConfirmed(props.invigilateCode)).data.data
        console.log(list.value);
        show.value = true
    })
}
defineExpose({ open })

</script>

<template>
    <div>
        <el-dialog title="调换考试" center :visible.sync="show" width="90%">
            <div class="-mt-4">请选择您想换过来的考试：</div>
            <div class="min-h-24 flex-col flex justify-center items-center">
                <div v-for="i in list" :key="i.name">
                    <el-checkbox-group :max="1" v-model="checkedList">
                        <el-checkbox-button
                            class="mt-2"
                            :key="item.exchangeCode"
                            v-for="item in i.exam"
                            :label="item.exchangeCode"
                        >{{ i.name + '/' + item.name + '/' + item.startTime }}</el-checkbox-button>
                    </el-checkbox-group>
                </div>
            </div>
            <div class="flex items-center">
                <el-button type="primary" class="mt-2 m-auto" @click="confirm">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { confirmExchange, getToConfirmed } from '../../common/network';

export default {
    methods: {
        confirm() {
            if (this.checkedList.length !== 1) {
                this.$notify({
                    title:'',message:'请选择一个',type:'error'
                })
                return
            }
            confirmExchange(localStorage.token, this.checkedList[0]).then(res => {
                if (res.data.code === 0) {
                    this.$notify({
                        title: '', message: '调换成功', type: 'success'
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
                this.checkedList = []
                store.dispatch('getOthersInvigilate')
                store.dispatch('getMyInvigilate')
            })
        }
    }
}
</script>
