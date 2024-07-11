<template>
  <div class="login">
    <div class="loginWrap" v-if="loginShow">
      <div class="logo">
        <img class="imgAll" src="../../static/img/logo.png" alt />
      </div>
      <LoginBox :isBind="false" @memberLogin="memberLogin" @quickLogin="quickLogin"></LoginBox>
    </div>
    <BindIdentity v-if="bindShow"></BindIdentity>
    <InfoBox v-if="infoShow"></InfoBox>
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
    if (!userInfo.openId) {
      this.loginShow = false;
      this.infoShow = true;
    } else if (!userInfo.suplyid || !userInfo.carid) {
      this.loginShow = false;
      this.bindShow = true;
    }
  },
  onShow() {},
  methods: {
    memberLogin(res) {
      console.log(res);
      // this.$store.commit("SET_USERINFO", res);
      if (res.data.openId && (res.data.suplyid || res.data.carid)) {
        uni.$emit("login", "登录成功！");
        this.$Router.replaceAll("/");
      } else if (!res.data.openId) {
        this.loginShow = false;
        this.infoShow = true;
      } else if (!res.data.suplyid || !res.data.carid) {
        this.loginShow = false;
        this.bindShow = true;
      }
    },
    quickLogin() {
      this.$Router.replaceAll("/");
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
