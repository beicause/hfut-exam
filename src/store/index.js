import Vue from "vue"
import Vuex from 'vuex'
import axios from 'axios'
import { host } from '../network'
import { vm } from '../main'
import { Indicator } from 'mint-ui';

Vue.use(Vuex)


const store = new Vuex.Store({
    state: {
        // examCode => { bg: string,fo: string }
        codeColorMap: new Map(),
        listUnfinished: []
    },
    mutations: {
        updateListUnfinished(state, list) {
            state.listUnfinished = list
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
                        console.log('get', list);
                        context.commit('updateListUnfinished', list)
                        localStorage.num = list.length;
                        list.forEach((item, index) => {
                            context.state.codeColorMap.set(item.examCode, colors[index % colors.length])
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

const colors = [{
    'bg': '#fadbd9',
    'fo': '#e54d42'
},
{
    'bg': '#fef4d6',
    'fo': '#fbc208'
},
{
    'bg': '#e8f4d9',
    'fo': '#a9c63f'
},
{
    'bg': '#d2f1f0',
    'fo': '#1cbbb4'
},
{
    'bg': '#ebd4ef',
    'fo': '#9c26b0'
},
{
    'bg': '#ede1d9',
    'fo': '#a5673f'
},
{
    'bg': '#cacaca',
    'fo': '#fefefe'
},
{
    'bg': '#f9d7ea',
    'fo': '#e4399e'
},
{
    'bg': '#fde6d2',
    'fo': '#f37b1d'
},
{
    'bg': '#d7f0db',
    'fo': '#39b54a'
},
{
    'bg': '#cce6ff',
    'fo': '#0081ff'
},
{
    'bg': '#e1d7f0',
    'fo': '#6739b6'
},
{
    'bg': '#e8f5fe',
    'fo': '#85a1c3'
},
{
    'bg': '#e7ebed',
    'fo': '#8799a3'
}
]