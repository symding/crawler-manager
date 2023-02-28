import axios from "./axios";

export const getSpiderSpeed = (param) => {
    return axios.request({
        url: 'api/spider/spiderSpeed',
        method: 'get',
        data: param
    })
}

export const submitDsl = (param) => {
    return axios.request({
        url: 'api/lab/executeDsl',
        method: 'post',
        data: param,
        // transformRequest: [function (data, headers) {
        //     // 去除post请求默认的Content-Type
        //     headers.post['Content-Type'] = "form-data"
        //     return data
        // }]
    })
}