<template>
  <div class="loginBox">
    <div class="l_list">
      <u--form labelWidth="130rpx" :model="formDate" :rules="rules" ref="uForm">
        <u-form-item label="手机号" prop="phone" borderBottom>
          <u--input v-model="formDate.phone" inputAlign="left" border="none" placeholder="请输入手机号"></u--input>
        </u-form-item>
        <u-form-item label="验证码" prop="code" borderBottom>
          <div class="flex_ac_sb">
            <u--input v-model="formDate.code" inputAlign="left" border="none" placeholder="请输入验证码"></u--input>
            <div style="width: 176rpx;">
              <u-button
                type="primary"
                :plain="true"
                text="获取验证码"
                color="#4e5ff7"
                :customStyle="{
                  fontSize: '24rpx'
                }"
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
      formDate: {
        phone: "",
        code: ""
      },
      rules: {
        phone: [
          {
            required: true,
            message: "请输入手机号",
            trigger: ["change", "blur"]
          },
          {
            // 自定义验证函数，见上说明
            validator: (rule, value, callback) => {
              // 上面有说，返回true表示校验通过，返回false表示不通过
              // uni.$u.test.mobile()就是返回true或者false的
              return uni.$u.test.mobile(value);
            },
            message: "手机号码不正确",
            // 触发器可以同时用blur和change
            trigger: ["change", "blur"]
          }
        ],
        code: [
          {
            required: true,
            message: "请输入验证码",
            trigger: ["change", "blur"]
          }
        ]
      }
    };
  },
  computed: {},
  methods: {
    bindPhone() {},
    login() {},
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
            }
          });
        }
      });
    }
  },
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {},
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