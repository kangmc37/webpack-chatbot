import axios from 'axios';

export const getData = (msg, key = 'free', appid = 0) => {
    const baseUrl = 'api.php';
    const targetUrl = `${baseUrl}?key=${key}&appid=${appid}&msg=${encodeURIComponent(msg)}`;

    if (window.fetch) {
        // no-cors: 用于跨域请求不带CORS响应头的场景, 响应类型为 “opaque”, 
        // 响应的内容完全不可见，因此需要在 webpack-dev-server 里配置代理进行跨域请求
        return fetch(targetUrl, {mode: "no-cors"}).then(res => res.json());
    } else {
        return axios({
            method: 'get',
            url: targetUrl,
            responseType: 'json'
        }).then(res => {
            return res.data;
        });
    }
}