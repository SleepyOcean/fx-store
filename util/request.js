let request = {};
// let host = 'https://store.sleepyocean.cn';
let host = 'https://dev.sleepyocean.cn:9050';
request.post = function (url, params) {
    console.log(`request请求: ${url}, parmas: ${JSON.stringify(params)}`);
    return new Promise((resolve => {
        uni.request({
            url: host + url,
            method: 'POST',
            data: params,
            success: function({data}) {
                resolve(data);
            }
        });
    }));
};

request.get = function (url, params) {
    console.log(`request请求: ${url}, parmas: ${JSON.stringify(params)}`);
    return new Promise((resolve => {
        uni.request({
            url: host + url,
            method: 'GET',
            data: params,
            success: function({data}) {
                resolve(data);
            }
        });
    }));
};
export default request;
