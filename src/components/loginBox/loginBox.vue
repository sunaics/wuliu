<template>
  <div class="loginBox"  :class="{alertWrap : isAlert}">
    <div class="title">登录</div>
    <div class="l_list">
      <u--form labelWidth="55px" :model="formData" ref="uForm">
        <u-form-item label="手机号" prop="phone" borderBottom>
          <u--input v-model="formData.phone" inputAlign="left" border="none" placeholder="请输入手机号"></u--input>
        </u-form-item>
        <u-form-item label="验证码" prop="code" borderBottom>
          <div class="flex_ac_sb">
            <u--input v-model="formData.code" inputAlign="left" border="none" placeholder="请输入验证码"></u--input>
            <div style="width: 230rpx;">
              <u-button type="primary" :plain="true" :text="btnText" color="#4e5ff7" :customStyle="{
        fontSize: '24rpx'
      }" :disabled="btnDisabled" @click="getCode"></u-button>
            </div>
          </div>
        </u-form-item>
      </u--form>
    </div>
    <div class="btns">
      <u-button v-if="isAlert" type="primary" text="绑定手机" size="large"
        :customStyle="{ fontSize: '36rpx', marginTop: '60rpx', borderRadius: '10rpx' }" color="#4E5FF7"
        @click="bindPhone"></u-button>
      <template v-else>
        <u-button type="primary" text="立即登录" size="large"
          :customStyle="{ fontSize: '36rpx', marginTop: '60rpx', borderRadius: '10rpx' }" color="#4E5FF7" @click="login"
          :loading="loading" :loadingText="loadingText"></u-button>
        <u-button type="primary" text="快捷登录" size="large"
          :customStyle="{ fontSize: '36rpx', marginTop: '60rpx', borderRadius: '10rpx' }" color="#4FC57A"
          @click="quickLogin"></u-button>
      </template>
    </div>
  </div>
</template>

<script>
import { memberLogin, getCode, wxLogin, BindWeixin, bindPhone } from "@/api/user";
import { getToken } from "@/utils/getToken";
export default {
  name: "login",
  props: {
    isAlert: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        phone: "13122033991",
        code: ""
      },
      wxCode: "",
      codeNum: 10,
      btnText: "获取验证码",
      btnDisabled: false,
      timer: null,
      loading: false,
      loadingText: "登录中...",
    };
  },
  computed: {

  },
  methods: {
    getCode() {
      if (!this.formData.phone) {
        uni.$u.toast("请输入手机号");
      } else if (!uni.$u.test.mobile(this.formData.phone)) {
        uni.$u.toast("手机号格式不正确");
      } else {
        clearInterval(this.timer);
        this.codeNum = 120;
        this.btnDisabled = true;
        getCode({ mobile: this.formData.phone })
          .then(res => {
            this.btnText = `重新获取(${this.codeNum}s)`;
            this.timer = setInterval(() => {
              this.codeNum--;
              if (this.codeNum < 0) {
                this.btnDisabled = false;
                this.btnText = "获取验证码";
                this.codeNum = 120;
              } else {
                this.btnText = `重新获取(${this.codeNum}s)`;
              }
            }, 1000);
          })
          .catch(err => {
            this.btnDisabled = false;
            this.btnText = "获取验证码";
          });
      }
    },
    bindPhone() {
      if(!this.verification()) return;
      bindPhone({
        phone: this.formData.phone,
        code: this.formData.code,
        openid: this.$store.state.userInfo.openid
      }).then(res => {
        console.log("bindPhone", res);
        this.$store.commit("SET_USERINFO", {
          ...this.$store.state.userInfo,
          phone: this.formData.phone
        });
        // this.$emit("bindPhone");
      }).catch(err => {
        console.log(err);
      });
     },
    //  登录校验封装成函数
    verification(){
      if (!this.formData.phone) {
        uni.$u.toast("请输入手机号");
        return false
      } else if (!uni.$u.test.mobile(this.formData.phone)) {
        uni.$u.toast("手机号格式不正确");
        return false
      } else if (!this.btnDisabled) {
        uni.$u.toast("请获取验证码");
        return false
      } else if (!this.formData.code) {
        uni.$u.toast("请输入验证码");
        return false
      }
      return true
    },
    login() {
      if(!this.verification()) return;
     
      this.loading = true;
      memberLogin(this.formData).then(res => {
        console.log("res", res);
        this.getOpenId(res.data[0])
      }).catch(err => {
        this.loading = false;
        console.log("err", err);
      });
    },
    quickLogin() {
      wxLogin({
        code: this.wxCode
      }).then(res => {
        var data = {
          ...res.model,
          ...res.data[0]
        }
        this.$store.commit("SET_USERINFO", data);
        uni.showToast({
          title: '登录成功',
          duration: 2000
        });
        this.$emit("quickLogin" );
      }).catch(err => {
        console.log(err);
      });
    },
    getOpenId(userInfo) {
      // this.$emit("memberLogin", );
      BindWeixin({
        code: this.wxCode,
        phone: this.formData.phone
      }).then(res => {
        console.log(res);
        this.$emit("memberLogin", {...userInfo, phone: this.formData.phone} );
        this.loading = false;
      }).catch(err => {
        this.loading = false;
        console.log(err);
      });
    },
    getWeiXinCode() {
      uni.login({
        provider: "weixin",
        success: (loginRes)=>{
          this.wxCode = loginRes.code;
        }
      });
    }
  },
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {
    console.log("loginBox11111111111111");
    getToken().then(res => {
      console.log(res);
    });
    this.getWeiXinCode()
  },
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() { },
  // 组件周期函数--监听组件数据更新之后
  updated() { },
  // 组件周期函数--监听组件激活(显示)
  activated() { },
  // 组件周期函数--监听组件停用(隐藏)
  deactivated() { },
  // 组件周期函数--监听组件销毁之前
  beforeDestroy() { }
};
</script>

<style lang="scss" scoped>
.loginBox{
  .title{
    display: none;
  }
  &.alertWrap .title{
    display: block;
    font-size: 40rpx;
    color: #333333;
    line-height: 56rpx;
    text-align: center;
    margin-bottom: 30rpx;
  }
}
</style>