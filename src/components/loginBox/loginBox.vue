<template>
  <div class="loginBox">
    <div class="l_list">
      <u--form labelWidth="130rpx" :model="formData" ref="uForm">
        <u-form-item label="手机号" prop="phone" borderBottom>
          <u--input v-model="formData.phone" inputAlign="left" border="none" placeholder="请输入手机号"></u--input>
        </u-form-item>
        <u-form-item label="验证码" prop="code" borderBottom>
          <div class="flex_ac_sb">
            <u--input v-model="formData.code" inputAlign="left" border="none" placeholder="请输入验证码"></u--input>
            <div style="width: 230rpx;">
              <u-button
                type="primary"
                :plain="true"
                :text="btnText"
                color="#4e5ff7"
                :customStyle="{
                  fontSize: '24rpx'
                }"
                :disabled="btnDisabled"
                @click="getCode"
              ></u-button>
            </div>
          </div>
        </u-form-item>
      </u--form>
    </div>
    <div class="btns">
      <u-button
        v-if="isBind"
        type="primary"
        text="绑定手机"
        size="large"
        :customStyle="{fontSize: '36rpx', marginTop: '60rpx', borderRadius: '10rpx'}"
        color="#4E5FF7"
        @click="bindPhone"
      ></u-button>
      <template v-else>
        <u-button
          type="primary"
          text="立即登录"
          size="large"
          :customStyle="{fontSize: '36rpx', marginTop: '60rpx', borderRadius: '10rpx'}"
          color="#4E5FF7"
          @click="login"
          :loading="loading"
        :loadingText="loadingText"
        ></u-button>
        <u-button
          type="primary"
          text="快捷登录"
          size="large"
          :customStyle="{fontSize: '36rpx', marginTop: '60rpx', borderRadius: '10rpx'}"
          color="#4FC57A"
          @click="quickLogin"
        ></u-button>
      </template>
    </div>
  </div>
</template>

<script>
import { memberLogin, getCode, login } from "@/api/user";
import { getToken } from "@/utils/getToken";
export default {
  name: "login",
  props: {
    isBind: {
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

      codeNum: 120,
      btnText: "获取验证码",
      btnDisabled: false,
      timer: null,
      loading: false,
      loadingText: "登录中...",
    };
  },
  computed: {},
  methods: {
    getCode() {
      if (!this.formData.phone) {
        uni.$u.toast("请输入手机号");
      } else if (!uni.$u.test.mobile(this.formData.phone)) {
        uni.$u.toast("手机号格式不正确");
      } else {
        clearInterval(this.timer);
        this.btnDisabled = true;
        getCode({ mobile: this.formData.phone })
          .then(res => {
            console.log(res);
            this.btnText = `重新获取(${this.codeNum}s)`;
            this.timer = setInterval(() => {
              this.codeNum--;
              if (this.codeNum < 0) {
                this.btnDisabled = false;
                this.btnText = "获取验证码";
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
    bindPhone() {},
    login() {
      this.$emit("memberLogin", 11111);
      if (!this.formData.phone) {
        return uni.$u.toast("请输入手机号");
      } else if (!uni.$u.test.mobile(this.formData.phone)) {
        return uni.$u.toast("手机号格式不正确");
      } else if(!this.btnDisabled){
        return uni.$u.toast("请获取验证码");
      }else if (!this.formData.code) {
        return uni.$u.toast("请输入验证码");
      }
      this.loading = true;
      memberLogin(this.formData).then(res => {
        this.loading = false;
        console.log("res", res);
        this.$emit("memberLogin", res);

      }).catch(err => {
        this.loading = false;
        console.log("err", err);
      });
      // this.$store.dispatch("memberLogin", this.formData).then(res => {
      //   console.log(res);
      //   // if (res) {
      //   //   uni.$emit("login", "登录成功！");
      //   // }
      // });
    },
    quickLogin() {
      uni.getProvider({
        service: "oauth",
        success: function(oauth) {
          console.log(oauth.provider);
          uni.login({
            provider: oauth.provider,
            success: function(loginRes) {
              console.log(loginRes);
              uni.$emit("quickLogin", "登录成功！");
              login({
                code: loginRes.code
              }).then(res => {
                console.log(res);
              })
            }
          });
        }
      });
    }
  },
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {
    getToken().then(res => {
      console.log(res);
    });
  },
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() {},
  // 组件周期函数--监听组件数据更新之后
  updated() {},
  // 组件周期函数--监听组件激活(显示)
  activated() {},
  // 组件周期函数--监听组件停用(隐藏)
  deactivated() {},
  // 组件周期函数--监听组件销毁之前
  beforeDestroy() {}
};
</script>

<style lang="scss" scoped>
</style>