<template>
  <div class="login">
    <div class="loginWrap" v-if="loginShow">
      <div class="logo">
        <img class="imgAll" src="../../static/img/logo.png" alt />
      </div>
      <LoginBox :isBind="false" @login="login"></LoginBox>
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

    console.log(query.redirect);
    console.log(decodeURIComponent(decodeURIComponent(query.redirect)));

    uni.$on("quickLogin", data => {
      console.log(data);
    });
  },
  onShow() {},
  methods: {
    login() {
      console.log(111);
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
