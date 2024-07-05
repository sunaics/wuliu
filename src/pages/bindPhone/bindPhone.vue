<template>
  <div class="bindPhone pd20">
    <div class="box pdlr20">
      <div class="tit"></div>
      <div class="wrap">
        <u--form labelWidth="0" :model="userInfo" :rules="rules" ref="uForm">
          <u-form-item prop="phone" borderBottom>
            <div class="flex_ac iptWrap">
              <div class="leftIcon">
                <img class="imgAll" src="../../static/img/phone.png" alt />
              </div>
              <u--input v-model="userInfo.phone" border="none" placeholder="请输入手机号"></u--input>
            </div>
          </u-form-item>
          <u-form-item prop="code" borderBottom>
            <div class="flex_ac iptWrap">
              <div class="leftIcon">
                <img class="imgAll" src="../../static/img/code.png" alt />
              </div>
              <u--input v-model="userInfo.code" border="none" placeholder="请输入验证码"></u--input>
              <div style="width: 176rpx;">
                <u-button type="primary" :plain="true" text="获取验证码" color="#4e5ff7" :customStyle="{
                  fontSize: '24rpx'
                }"></u-button>
              </div>
              
            </div>
          </u-form-item>
        </u--form>
      </div>
    </div>
    <div class="foot " >
        <div class="footBtn" @click="submit">确认换绑</div>
      </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      userInfo: {
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
  methods: {},
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {}
  // 页面处理函数--监听用户下拉动作
  // onPullDownRefresh() { uni.stopPullDownRefresh(); },
  // 页面处理函数--监听用户上拉触底
  // onReachBottom() {},
  // 页面处理函数--监听页面滚动(not-nvue)
  // onPageScroll(event) {},
  // 页面处理函数--用户点击右上角分享
  // onShareAppMessage(options) {},
};
</script>

<style lang="scss" scoped>
.bindPhone {
  .box {
    background-color: #fff;
    border-radius: 8rpx;
  }
  .leftIcon {
    width: 36rpx;
    height: 36rpx;
    margin-right: 18rpx;
  }
  .iptWrap{
    width: 100%;
  }
  .foot {
    margin-top: 60rpx;
    .footBtn {
      width: 100%;
      height: 84rpx;
      background: #4e5ff7;
      box-shadow: 0rpx 8rpx 14rpx 0rpx rgba(0, 19, 194, 0.14);
      border-radius: 10rpx;
      text-align: center;
      font-weight: 500;
      font-size: 32rpx;
      color: #ffffff;
      line-height: 84rpx;
    }
  }
}
</style>