import Vue from "vue";
import Vuex from "vuex";
import { urlTobase64} from '@/utils/common'
import { memberLogin } from '@/api/user'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        appid: "sys38201703181200c3",
        appkey: "49ebdd03657ca2337c3dfab6dcf1ae69",
        apiUrl: "https://api.zhuliscm.com",
        // 接口验证token
        authorization: uni.getStorageSync("authorization") || '',
        // 存储token
        token: uni.getStorageSync("token"),
        // 存储用户信息
        userInfo: uni.getStorageSync("userInfo") || {name: 'dsfsfs'},
        isIphone: uni.getStorageSync("modelmes") || false,
        activePages: 1,
        mineBg: urlTobase64(require('@/static/img/myBg.png'), 'png')
    },
    mutations: {
        SET_AUTHORIZATION: (state, authorization) => {
            state.authorization = authorization;
            uni.setStorageSync("authorization", authorization);
        },
        // 修改token，并将token存入localStorage
        SET_TOKEN: (state, token) => {
            state.token = token;
            uni.setStorageSync("token", token);
        },
        // 修改userInfo，并将userInfo存入localStorage
        SET_USERINFO: (state, userInfo) => {
            state.userInfo = userInfo;
            uni.setStorageSync("userInfo", userInfo);
        },

        SET_ISIPHONE: (state, isIphone) => {
            state.isIphone = isIphone;
            wx.setStorageSync("modelmes", isIphone);
        },
        SET_ACTIVEPAGES: (state, activePages) => {
            state.activePages = activePages;
        }
    },
    actions: {
        // 获取用户信息
        getUserInfo({ commit }) {
            return new Promise((resolve, reject) => {
                // getUserInfo().then((response) => {
                //     const { data } = response;
                //     commit("SET_USERINFO", data);
                //     resolve(data);
                // }).catch((error) => {
                //     reject(error);
                // });
            });
        },
        memberLogin({ commit }, data){
            console.log("data",data)
            memberLogin(data).then(res => {
                console.log(res)
            })
        }

    },
    modules: {},
});

export default store;