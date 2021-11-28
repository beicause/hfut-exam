<script setup>
import { ref } from "@vue/composition-api";
import { changePwd } from "../../common/network";
import PageHeader from "../tabBars/PageHeader.vue"

const msg = ref('')
const oldPwd = ref('')
const newPwd = ref('')
const confirmPwd = ref('')

</script>

<template>
    <div>
        <PageHeader :canBack="true">修改密码</PageHeader>
        <div class="mt-4 mx-2">
            <div>
                <div>输入旧密码</div>
                <input v-model="oldPwd" type="password" />
            </div>
            <div>
                <div>输入新密码</div>
                <input v-model="newPwd" type="password" />
            </div>
            <div>
                <div>确认新密码</div>
                <input v-model="confirmPwd" style="margin-bottom: 0;" type="password" />
            </div>
            <div style="height: 20px; font-size: 14px;color: red;">{{ msg }}</div>
        </div>

        <div class="flex items-center justify-center">
            <el-button type="primary" @click="confirm">确认</el-button>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        confirm() {
            if (this.newPwd !== this.confirmPwd) {
                this.msg = "两次密码不一致"
                return
            }
            if (!(this.oldPwd && this.newPwd && this.confirmPwd)) {
                this.msg = '请输入完整'
                return
            }
            changePwd(localStorage.token, this.newPwd, this.oldPwd).then(res => {
                if(res.data.code!==0)throw Error(res.data.msg)
                this.$notify({
                    title:'',message:res.data.msg,type:'success'
                })
                this.$router.push('/myInfo')
            }).catch(e=>{
                this.msg=e.message
                console.log(e);
            })
        }
    }
}
</script>