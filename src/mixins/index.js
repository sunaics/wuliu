import { urlTobase64 } from '@/utils/common'
import { formatDate } from '@/utils/formatDate'
export const  pageMixin={
    data() {
        return {

        }
    },
    methods: {
            // 获取导航栏高度
        getNavBarHeight() {
            let navbarHeight = 0
            // #ifdef MP-WEIXIN
            let menuButtonInfo = uni.getMenuButtonBoundingClientRect()	        
            navbarHeight =  menuButtonInfo.top + menuButtonInfo.height  + 6
            // #endif
            // #ifdef APP-PLUS || H5
            navbarHeight = 44
            // #endif
            this.$emit('getNavBarHeight', navbarHeight)
            return navbarHeight
        },
        urlTobase64,
        formatter(type, value) {
            if (type === 'year') {
                return `${value}年`
            }
            if (type === 'month') {
                return `${value}月`
            }
            if (type === 'day') {
                return `${value}日`
            }
            return value
        },
        formatDate
    },
}
