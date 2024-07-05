<template>
  <div class="navbar">
    <div class="navbar_box" :style=" 'height:' + getNavBarHeight() + 'px' "></div>
    <div class="fixed-content" :style=" 'height:' + getNavBarHeight() + 'px;background-image: url('+ bgImg +')' ">
      <!-- 导航栏高度 -->
      <div class="bar-content"  :style="'height:'+ statusBarHeight + 'px;line-height:'+ statusBarHeight + 'px'">
        <div v-if="isShowBack" class="back flex_cc" @click="navigateBack()"  :style="'height:'+ statusBarHeight + 'px;width:'+ statusBarHeight + 'px'">
            <img src="../../static/img/back.png" alt="">
        </div>
        <slot>
          <!-- <image @tap="navigateBack()" class="nav-left" src="/static/img/common/arrow-left.png" mode=""></image> -->
          <div class="nav-title" :style="'color:' + titleClor">{{ title }}</div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import {pageMixin} from '@/mixins/index'
export default {
  name: 'Navbar',
  mixins: [pageMixin],
  props: {
    title: {
      type: String,
      default: ''
    },
    isShowBack: {
      type: Boolean,
      default: true
    },
    bgImg: {
      type: String,
      default: ''
    },
    titleClor: {
      type: String,
      default: '#333333'
    }
  },
  computed: {
    statusBarHeight() {
       // #ifdef MP-WEIXIN
       return uni.getMenuButtonBoundingClientRect().height
      // #endif
      return 44
    }
  },
  methods: {
    geStatusBarHeight() {
      return uni.getMenuButtonBoundingClientRect().height
    },
    // // 获取导航栏高度
    // getNavBarHeight() {
    //   let navbarHeight = 0
    //   // #ifdef MP-WEIXIN
    //   let menuButtonInfo = uni.getMenuButtonBoundingClientRect()	        
    //     navbarHeight =  menuButtonInfo.top + menuButtonInfo.height  + 6
    //   // #endif
    //   // #ifdef APP-PLUS || H5
    //     navbarHeight = 44
    //   // #endif
    //   this.$emit('getNavBarHeight', navbarHeight)
    //   return navbarHeight
    // },
    navigateBack() {
      uni.navigateBack()
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  .fixed-content {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 990;
    background-color: #ffffff;
    background-position: 0 0;
    background-size: 750rpx 508rpx;
    .back{
      position: absolute;
      left: 24rpx;
      top: 0;
      img{
        width: 32rpx;
        height: 32rpx;
      }
    }

    .bar-content {
      position: absolute;
      width: 100%;
      padding: 0 24rpx;
      box-sizing: border-box;
      left: 0;
      // #ifdef MP-WEIXIN
      bottom: 6px;
      // #endif

      // #ifndef MP-WEIXIN
      bottom: 0px;
      // #endif
      .nav-left {
        width: 22px;
        height: 22px;
        position: absolute;
        z-index: 2;
        top: 50%;
        transform: translateY(-50%);
      }

      .nav-title {
        color: #333333;
        font-weight: bold;
        font-size: 32rpx;
        text-align: center;
      }
    }
  }
}
</style>