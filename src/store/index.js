import Vue from "vue"
import Vuex from 'vuex'
import axios from 'axios'
import {host} from '../network'
import {vm} from '../main'
import {Indicator} from 'mint-ui';

Vue.use(Vuex)

const colors= ["#A9E2F3", "#6E6E6E", "#BDBDBD", "#819FF7"]

const store = new Vuex.Store({
    state: {
        codeColorMap: new Map(),
        listUnfinished: []
    },
    mutations:{
        updateListUnfinished(state,list){
            state.listUnfinished=list
        }
    },
    actions: {
        getUnfinished(context) {
            let token = localStorage.token;
            Indicator.open()
            // 没有完成的监考
            axios.get(host.ip + "/teacher/unfinished", {
                headers: {
                    'token': token
                },
                responseType: 'json',
            })
                .then(suc => {
                    if (suc.data.code === 0) {
                        const list = suc.data.data;
                        console.log('get',list);
                        context.commit('updateListUnfinished',list)
                        localStorage.num = list.length;
                        list.forEach((item,index) => {
                            context.state.codeColorMap.set(item.examCode,colors[index%colors.length])
                        });
                    } else {
                        this.$notify({
                            title: '',
                            message: suc.data.msg,
                            type: 'error'
                        });
                    }
                    Indicator.close()
                })
                .catch(fail => {
                    console.log(fail);
                    vm.$notify({
                        title: '',
                        message: '出错了..',
                        type: 'error'
                    });
                })
        }
    }
})

export default store
