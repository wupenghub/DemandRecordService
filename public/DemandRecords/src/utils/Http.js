import axios from 'axios';
import qs from 'qs'; //传给后台的数据为form格式

//上传文件调取的接口(解决上传FormData数据浏览器不显示问题)
export function upLoadFile() {
    return axios.create({
        withCredentials: true,//设置axios跨域
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}

// 创建axios实例
const service = axios.create({
    baseURL: 'http://localhost:5000', // api的base_url
    timeout: 15000, // 请求超时时间
    headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
    // 请求头处理，设置传给后台的参数格式，有form和json格式，这样写是form格式，application/json是json格式

});

// request 拦截器
service.interceptors.request.use((config) => {
    // 在发送请求之前z转换data格式
    if (config.method === 'post') {
        config.data = qs.stringify(config.data);//这一步就是通过qs将传给后台的数据格式设置为form格式
    }
    // 当通过登录接口后，会返回一个请求头数据，以后每个接口前面都要加这个请求头，用来判断是否登录
    if (window.sessionStorage.getItem('tooken')) {
        config.headers['x-auth-token'] = window.sessionStorage.getItem('tooken');
    }
    return config;
}, (error) => {
});

// respone拦截器
service.interceptors.response.use((response) => {
    if (response.headers['x-auth-token']) {
        window.sessionStorage.setItem('tooken', response.headers['x-auth-token']);
    }
    if (response.data.code !== 0) {
        return Promise.reject(response);//response可以通过catch捕获信息
    }
    return response.data;
}, (error) => {
    if (error.message) {
        // 登录超时
        if (error.message === 'Network Error') {
            /* // Dialog.alert({message:'登录超时'})
             router.push('/login');*/
        }
    }
    return Promise.reject(error);
});

export default service;