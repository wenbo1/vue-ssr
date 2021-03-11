import queryString from 'qs';

export default function ({ $axios }, inject) {
    // create an axios instance
    const service = $axios.create({
        // baseURL: '/api/', // 所有异步请求都加上/api
        // withCredentials: true, // 当跨域请求时发送cookie
        // timeout: 12000 //超时时间
    })

    // request interceptor
    service.interceptors.request.use(
        config => {
            // 请求之前处理
            // config.headers['-Token'] = getToken()
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

    const http_get = (url, params) => {
        let commonParams = {nonce: '1', site: 16}
        return service.$get(url + '?' + queryString.stringify(Object.assign({}, commonParams, params || {})))
    }

    const http_post = (url, params) => {
        let commonParams = {nonce: '1', site: 16}
        return service.$post(url, Object.assign({}, commonParams, params || {}))
    }

    // Inject to context as $http_get $http_post
    inject('http_get', http_get)
    inject('http_post', http_post)
}
