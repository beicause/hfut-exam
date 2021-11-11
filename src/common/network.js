import axios from 'axios'

export const host = {
    'ip': 'http://47.97.113.162:8080'
}
export async function getUnfinished(token) {
    return await axios.get(host.ip + "/teacher/unfinished", {
        headers: {
            token
        },
        responseType: 'json',
    })
}

export async function getTeacherInfo(token) {
    return await axios.get(host.ip + "/teacher/info", {
        headers: {
            // 'Authorization': 'JWT ' + token
            // authorization: `Bearer ${token}`,
            token
        },
        responseType: 'json',
    })
}

export async function startExchange(token,invigilateCode) {
    return await axios.get(host.ip + "/exchange/start", {
        headers: {
            token
        },
        params: {
            invigilateCode,
            'msg': ' ',
        },
        responseType: 'json',
    })
}