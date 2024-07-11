var md5 = require('md5');
import store from '@/store'
const timestamp = new Date().getTime()
console.log('CryptoJS.MD5',  md5(store.state.appid + timestamp + store.state.appkey))
let data = {
    appid: store.state.appid,
    appkey: md5(store.state.appid + timestamp + store.state.appkey),
    timespan: timestamp
}
export const getToken = () => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: store.state.apiUrl + "/api/AccessToken",
            data,
            header: {
                "content-type": "application/x-www-form-urlencoded",
            },
            method: "POST",
            success(res) {
                if (res.data.code === 1000) {
                    store.commit("SET_AUTHORIZATION", res.data.data)
                } else {
                    reject(res)
                }
            },
            fail(err) {
                reject(err)
            }
        })
    })
}

