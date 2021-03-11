import axios from 'axios';
import qs from 'qs';
import {api_host} from "@/site.config";

// create an axios instance
const service = axios.create({
    baseURL: api_host,
    // withCredentials: true, // 当跨域请求时发送cookie
    // timeout: 12000 //超时时间
})

// request interceptor
service.interceptors.request.use(
    config => {
        // 请求之前处理
        // config.headers['-Token'] = getToken()
        // if(config.method === 'post') {
        //     config.data = qs.stringify(config.data);
        // }
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    response => {
        const res = response.data

        if (res.status == 200) {
            return res
        } else {
            return Promise.reject(res.msg || res)
        }
    },
    error => {
        console.log('err' + error)
        return Promise.reject(error)
    }
)

const http = (url, arg, method = 'get', ) => {
    let commonParams = {nonce: '1', site: 16}
    let params = {};
    let data = {};
    if (method == 'post') {
        data = arg;
    } else {
        params = arg;
    }
    return new Promise((resolve,reject) => {
        service({
            url: url,
            method: method,
            params: Object.assign({}, params, commonParams),
            data: data,
        }).then(res => {
            if (res.status == 200) {
                resolve(res.data);
            } else {
                reject(res.msg);
            }
        }).catch(err => {
            reject(err);
        })
    })

}

export const http_get = (url, params) => {
    return http(url, params);
}

export const http_post = (url, params) => {
    return http(url, JSON.stringify(params), 'post');
}
