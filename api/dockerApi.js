import axios from "./axios";

export const dockerClientInfo = (param) => {
    return axios.request({
        url: 'api/docker/ClientInfo',
        method: 'get',
        params: param
    })
}

export const clientNodes = (param) => {
    console.log(param)
    return axios.request({
        url: 'api/docker/clientNodes',
        method: 'get',
        params: param
    })
}

export const clientServices = (param) => {
    console.log(param)
    return axios.request({
        url: 'api/docker/clientServices',
        method: 'get',
        params: param
    })

}

export const serviceTasks = (param) => {
    return axios.request({
        url: 'api/docker/serviceTasks',
        method: 'get',
        params: param
    })
}

export const taskLog = (param) => {
    return axios.request({
        url: 'api/docker/taskLog',
        method: 'get',
        params: param
    })
}

export const editClient = (param) => {
    return axios.request({
        url: 'api/docker/editClient',
        method: 'post',
        data: param,
        // transformRequest: [function (data, headers) {
        //     // 去除post请求默认的Content-Type
        //     headers.post['Content-Type'] = "form-data"
        //     return data
        // }]
    })
}

export const saveService = (param) => {
    return axios.request({
        url: 'api/docker/saveService',
        method: 'post',
        data: param,
        // transformRequest: [function (data, headers) {
        //     // 去除post请求默认的Content-Type
        //     headers.post['Content-Type'] = "form-data"
        //     return data
        // }]
    })
}