import axios from 'axios'
import store from '../store'
import { Android } from './utils'

export const host = {
    ip: 'http://47.97.113.162:8080'
}
export async function getMyInvigilate(token) {
    return await axios.post(host.ip + "/teacher/v2/invigilate/", {}, {
        headers: {
            token
        }
    })
    // return await axios.get(host.ip+"/teacher/invigilate",{headers:{token}})
}

export async function getTeacherInfo(token) {
    return await axios.get(host.ip + "/teacher/info", {
        headers: {
            // 'Authorization': 'JWT ' + token
            // authorization: `Bearer ${token}`,
            token
        }
    })
}

export async function getExamInfo(token, examCode) {
    return await axios.get(host.ip + '/teacher/exam', {
        headers: { token },
        params: { examCode }
    })
}

export async function startExchange(token, invigilateCode) {
    return await axios.get(host.ip + "/exchange/start", {
        headers: {
            token
        },
        params: {
            invigilateCode,
            msg: ''
        }
    })
}

export async function cancelExchange(token, invigilateCode) {
    return await axios.get(host.ip + "/exchange/cancel", {
        headers: {
            token
        },
        params: {
            invigilateCode
        }
    })
}

export function logout() {
    localStorage.clear();
    store.commit('updateListMyInvigilate', [])
    Android.deleteAlias()
}

export async function changePwd(token, newPassword, password) {
    return await axios.post(host.ip + '/teacher/password', {},
        {
            headers: { token }, params: { newPassword, password }
        })
}

export async function getOthersInvigilate(token) {
    return await axios.get(host.ip + '/teacher/list', { headers: { token } })
}

export async function exchange(token, otherExam, myExams = []) {
    if (myExams.length === 0) return await axios.get(host.ip + '/exchange/replace', {
        headers: { token }, params: { invigilateCode: otherExam }
    })
    return await axios.get(host.ip + '/exchange/intent', {
        headers: { token }, params: { invigilateCodes: encodeURIComponent(myExams), targetCode: otherExam }
    })
}

export async function getToConfirmed(invigilateCode) {
    return await axios.get(host.ip + '/teacher/list-intend', { params: { invigilateCode } })
}

export async function confirmExchange(token, exchangeCode) {
    return axios.get(host.ip + '/exchange/confirm', {
        headers: { token }, params: { exchangeCode }
    })
}