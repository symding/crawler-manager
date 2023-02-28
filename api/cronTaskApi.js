
import axios from "./axios";

export const getAllCronTask = (param) => {
    return axios.request({
        url: 'api/crontask/allTask',
        method: 'get',
        data: param
    })
}

export const cronTaskDetail = (param) => {
    return axios.request({
        url: 'api/crontask/taskDetail',
        method: 'get',
        params: param
    })
}

export const operateCronTask = (param) => {
    return axios.request({
        url: 'api/crontask/operateTask',
        method: 'get',
        params: param
    })
}


export const modifyTask = (param) => {
    return axios.request({
        url: 'api/crontask/editTask',
        method: 'post',
        data: param,
        // transformRequest: [function (data, headers) {
        //     // 去除post请求默认的Content-Type
        //     headers.post['Content-Type'] = "form-data"
        //     return data
        // }]
    })
}


