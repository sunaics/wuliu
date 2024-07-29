<template>
  <div class="index">
    <Navbar
      :title="activeIndex == 1 ? '运单' : '我的'"
      @getNavBarHeight="getNavbarHeight"
      :isShowBack="false"
      :bgImg="activeIndex == 1 ?  '' : mineBg"
      :titleClor="activeIndex == 1 ? '#333333' : '#ffffff'"
    ></Navbar>
    <Waybill v-show="activeIndex == 1" ref="waybill"></Waybill>
    <Mine v-show="activeIndex == 2"  @changeIndex="changeIndex"></Mine>
    <Tabbar :activeIndex="activeIndex" @changeIndex="changeIndex"></Tabbar>

    <u-overlay :show="overlayShow" @click="show = false">
      <div class="overlayWrap">
        <loginAlert></loginAlert>
      </div>
	</u-overlay>

  </div>
</template>

<script>
import Navbar from "@/components/navbar/navbar.vue";
import Tabbar from "@/components/tabbar/tabbar.vue";
import Mine from "@/components/mine/mine.vue";
import Waybill from "@/components/waybill/waybill.vue";
import loginAlert from "@/components/loginAlert/loginAlert.vue";
import { urlTobase64 } from "@/utils/common";
export default {
  components: {
    Navbar,
    Tabbar,
    Mine,
    Waybill,
    loginAlert
  },
  data() {
    return {
      activeIndex: 1,
      navbarHeight: 0
    };
  },
  computed: {
    mineBg() {
      return this.$store.state.mineBg;
    },
    isIphone() {
      return this.$store.state.isIphone;
    },
    overlayShow() {
      let userInfo = this.$store.state.userInfo || {};
      return !userInfo.phone || ( !userInfo.olSID && !userInfo.olCID) || !userInfo.name;
    }
  },
  methods: {
    urlTobase64,
    changeIndex(index) {
      this.activeIndex = index;
    },
    getNavbarHeight(height) {
      this.navbarHeight = height;
    },
   
  },
  watch: {
    navbarHeight(val) {
      console.log("navbarHeight", val);
    }
  },

  // 页面周期函数--监听页面加载
  onLoad() {
    

    var date = uni.$u.timeFrom('7天前', false );
    console.log('date', date)
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {
    console.log("isIphone", uni.upx2px(162), uni.upx2px(102));
  },
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
  // onPullDownRefresh() { uni.stopPullDownRefresh(); },
  // 页面处理函数--监听用户上拉触底
  onReachBottom() {
    console.log("onReachBottom");
    if (this.activeIndex == 1) {
      this.$refs.waybill.onReachBottoms();
    }
  }
  // 页面处理函数--监听页面滚动(not-nvue)
  // onPageScroll(event) {},
  // 页面处理函数--用户点击右上角分享
  // onShareAppMessage(options) {},
};
</script>

<style lang="scss" scoped>
.overlayWrap{
  width: 335px;
  background: #FFFFFF;
  border-radius: 8px;
  box-sizing: border-box;
  padding: 40rpx 40rpx 60rpx;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
</style>