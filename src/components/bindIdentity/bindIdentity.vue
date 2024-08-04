<template>
  <div class="bindIdentity" :class="{alertWrap : isAlert}">
    <div class="title" >请选择您的身份</div>
    <div class="list">
      <div class="item flex_ac_sb" :class="{'active': activeIndex == 0}" @click="activeIndex =0">
        <div class="left">
          <div class="name">司机</div>
          <div class="text">注册成为司机，开始运输</div>
        </div>
        <div class="right">
          <img class="imgAll" src="../../static/img/select.png" alt="">
        </div>
      </div>
      <div class="item flex_ac_sb" :class="{'active': activeIndex == 1}"  @click="activeIndex =1">
        <div class="left">
          <div class="name">供应商</div>
          <div class="text">注册成为供应商</div>
        </div>
        <div class="right">
          <img class="imgAll" src="../../static/img/select.png" alt="">
        </div>
      </div>
    </div>
    <div class="tips">注：一个手机号只能注册一个身份</div>
    <u-button
        type="primary"
        text="下一步"
        size="large"
        :customStyle="{fontSize: '36rpx',  boxShadow: '0rpx 8rpx 14rpx 0rpx rgba(0,19,194,0.14)'}"
        color="#4E5FF7"
        @click="bindUserRole"
      ></u-button>
  </div>
</template>

<script>
import { UserSelectRole } from "@/api/user";
export default {
  name: "bindIdentity",
  props: {
    isAlert: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeIndex: 0
    };
  },
  computed: {},
  methods: {
    bindUserRole() {
      UserSelectRole({ 
        type: this.activeIndex,
        phone: this.$store.state.userInfo.phone,
        openid: this.$store.state.userInfo.openid
      }).then(res => {
        console.log('bindUserRole', res);
        uni.$u.toast("绑定成功");
        this.$store.commit("SET_USERINFO", {
          ...this.$store.state.userInfo,
          ...res.data[0],
          // olDID: this.activeIndex === 0 ? res.model.carid :  '',
          // olSID: this.activeIndex === 1 ? res.model.supplyid :  0
             olDID: this.activeIndex === 0 ? 1 :  '',
          olSID: this.activeIndex === 1 ? 1 :  0
        });
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
.bindIdentity {
  &.alertWrap{
    .title{
      margin: 0 0 60rpx;
    }
    .tips{
      margin-bottom: 60rpx !important;
    }
  }
  .title {
    font-weight: 500;
    font-size: 40rpx;
    color: #333333;
    margin: 80rpx 0;
  }
  .list {
    .item {
      width: 100%;
      height: 176rpx;
      background: #f7f8ff;
      border-radius: 8rpx;
      box-sizing: border-box;
      border: 2rpx solid #f7f8ff;
      padding: 42rpx 40rpx 40rpx;
      margin-bottom: 30rpx;
      .name {
        font-weight: 500;
        font-size: 36rpx;
        color: #333333;
        line-height: 50rpx;
      }
      .text {
        font-size: 28rpx;
        color: #999999;
        line-height: 40rpx;
        margin-top: 4rpx;
      }
      .right{
        width: 36rpx;
        height: 36rpx;
        background: #FFFFFF;
        border: 3rpx solid #E8E8E8;
        border-radius: 50%;
        .imgAll{
          display: none;
        }
      }
    }
    .active{
      border-color: #4E5FF7;
      background-color: #fff;
      .right{
        border: none;
        .imgAll{
          display: block;
        }
      }
    }
  }
  .tips{
    font-size: 24rpx;
    color: #666666;
    line-height: 34rpx;
    margin-bottom: 80rpx;
  }
}
</style>