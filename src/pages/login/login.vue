<template>
  <div class="login">
    <div class="loginWrap" v-if="loginShow">
      <div class="logo">
        <img class="imgAll" src="../../static/img/logo.png" alt />
      </div>
      <LoginBox :isBind="false" @memberLogin="memberLogin" @quickLogin="quickLogin"></LoginBox>
    </div>
    <BindIdentity v-if="bindShow"></BindIdentity>
    <!-- <InfoBox v-if="infoShow"></InfoBox> -->
  </div>
</template>

<script>
import LoginBox from "@/components/loginBox/loginBox";
import BindIdentity from "@/components/bindIdentity/bindIdentity";
import InfoBox from "@/components/infoBox/infoBox";
export default {
  components: {
    LoginBox,
    BindIdentity,
    InfoBox
  },
  data() {
    return {
      loginShow: true,
      infoShow: false,
      bindShow: false
    };
  },
  onLoad(query) {
    // #ifdef MP-WEIXIN
    uni.hideHomeButton();
    // #endif

    var userInfo = uni.getStorageSync("userInfo");
    if (userInfo) {
      if (!userInfo.olSID || !userInfo.olDID) {
        this.loginShow = false;
        this.bindShow = true;
      }
    }

  },
  onShow() { },
  methods: {
    memberLogin(data) {
      console.log(data);
      this.$store.commit("SET_USERINFO", data);
      if (data.openid && (data.olSID || data.olDID)) {
        uni.showToast({
          title: '登录成功',
          duration: 2000,
          icon: "none"
        });
        uni.reLaunch({
          url: "/pages/index/index"
        });
      } else if (!data.olSID || !data.olDID) {
        this.loginShow = false;
        this.bindShow = true;
      }
    },
    quickLogin() {
      uni.reLaunch({
        url: "/pages/index/index"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  overflow: hidden;
  box-sizing: border-box;
  padding: 0 40rpx;

  .loginWrap {
    padding: 0 20rpx;

    .logo {
      width: 354rpx;
      height: 112rpx;
      margin: 156rpx auto 98rpx;
    }
  }
}
</style>
