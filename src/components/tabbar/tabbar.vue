<template>
  <div class="tabbar_wrap">
    <div  class="tabbar tabbar_bg flex_cc" :class="{'Iphone': isIphone}"></div>
    <div class="tabbar flex_cc" :class="{'Iphone': isIphone}">
      <div class="tabbar_item" :class="{'active': activeIndex == 1}">
        <div class="tabbar_box flex_cc" @click="tabbarClick(1)">
          <div class="icon_wrap">
            <div class="icon_box">
              <img v-show="activeIndex == 1" src="../../static/img/order1.png" alt />
              <img v-show="activeIndex == 2" src="../../static/img/order2.png" alt />
            </div>
          </div>
          <div class="name">运单</div>
        </div>
      </div>
      <div class="tabbar_item" :class="{'active': activeIndex == 2}">
        <div class="tabbar_box flex_cc" @click="tabbarClick(2)">
          <div class="icon_wrap">
            <div class="icon_box">
              <img v-show="activeIndex == 2" src="../../static/img/my1.png" alt />
              <img v-show="activeIndex == 1" src="../../static/img/my2.png" alt />
            </div>
          </div>
          <div class="name">我的</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabbar",
  props: {
    activeIndex: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {};
  },
  computed: {
    isIphone() {
      return this.$store.state.isIphone;
    }
  },
  methods: {
    tabbarClick(index) {
      if (index === this.activeIndex) return;
      this.$emit("changeIndex", index);
      this.$store.commit("SET_ACTIVEPAGES", index);
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
.tabbar {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 82rpx;
  background-color: #fff;
  padding: 10px 0;
  box-shadow: 0rpx -2rpx 4rpx 0rpx rgba(238, 238, 238, 0.6);
  .tabbar_item {
    flex: 1;
    position: relative;
    .icon_wrap {
      width: 84rpx;
      height: 84rpx;
      border-radius: 50%;
      // background-color: #000;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      margin-top: -50rpx;
    }
    .tabbar_box {
      flex-wrap: wrap;
    }
    img {
      width: 48rpx;
      height: 48rpx;
      vertical-align: top;
    }
    .name {
      width: 100%;
      text-align: center;
      font-size: 22rpx;
      line-height: 32rpx;
      color: #999999;
      margin-top: 2rpx;
    }
  }
  .active {
    .name {
      color: #4e5ff7;
      // margin-top: -2rpx;
    }
    .icon_wrap {
      // width: 84rpx;
      // height: 84rpx;
      // border-radius: 50%;
      // margin-top: -50rpx;
      background-color: #fff;
      // display: flex;
      // justify-content: center;
      align-items: center;
      .icon_box {
        width: 72rpx;
        height: 72rpx;
        background-color: #4e5ff7;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
      }
    }
  }
}
.tabbar_bg{
  position: static;
  background-color: rgba(0, 0, 0, 0);
}
.Iphone {
  padding-bottom: 70rpx;
}
</style>