<template>
  <div class="mine">
    <div class="topWrap">
      <div
        class="topBg"
        :style="'background-image: url(' + mineBg + ');background-position: 0 ' + (-getNavBarHeight()) + 'px'"
      ></div>
      <div class="topBox">
        <div class="top_user flex_sb">
          <div class="top_user_left flex_cc">
            <div class="top_user_left_img">
              <img class="imgAll" src="../../static/img/myBg.png" alt />
            </div>
            <div class="top_user_left_info">
              <div class="top_user_left_info_name">用户名称</div>
              <div class="top_user_left_info_phone">18888888888</div>
            </div>
          </div>

          <div class="top_user_right flex_cc">
            <div class="flex_cc iconWrap" @click="setLink(5)">
              <u-icon name="bell" color="#fff" size="38rpx"></u-icon>
              <u-badge :isDot="true" :absolute="true" bgcolor="#FF4E4E" :offset="[6, 6]"></u-badge>
            </div>
            <div class="flex_cc iconWrap" @click="setLink(6)">
              <u-icon name="setting" color="#fff" size="38rpx"></u-icon>
            </div>
          </div>
        </div>
        <div class="top_nav flex">
          <div class="top_nav_items flex_cc" @click="setLink(1)">
            <div class="top_nav_items_icon">
              <img class="imgAll" src="../../static/img/m1.png" alt />
            </div>
            <div class="top_nav_items_text">我的运单</div>
          </div>
          <div class="top_nav_items flex_cc" @click="setLink(2)">
            <div class="top_nav_items_icon">
              <img class="imgAll" src="../../static/img/m2.png" alt />
            </div>
            <div class="top_nav_items_text">实名认证</div>
          </div>
          <div class="top_nav_items flex_cc" @click="setLink(3)">
            <div class="top_nav_items_icon">
              <img class="imgAll" src="../../static/img/m3.png" alt />
            </div>
            <div class="top_nav_items_text">司机认证</div>
          </div>
          <div class="top_nav_items flex_cc" @click="setLink(4)">
            <div class="top_nav_items_icon">
              <img class="imgAll" src="../../static/img/m4.png" alt />
            </div>
            <div class="top_nav_items_text">我的车辆</div>
          </div>
        </div>
        <div class="cell">
          <div class="cell_tit">更多服务</div>
          <u-cell size="large" title="联系客服" isLink :clickable="false" :titleStyle="{fontSize: '28rpx', color: '#333'}">
            <u-icon slot="icon" size="38rpx" :name="require('@/static/img/m5.png')"></u-icon>
          </u-cell>
          <u-cell size="large" title="服务热线" isLink :clickable="false" :border="false" :titleStyle="{fontSize: '28rpx', color: '#333'}">
            <u-icon slot="icon" size="38rpx" :name="require('@/static/img/m6.png')"></u-icon>
          </u-cell>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { pageMixin } from "@/mixins/index";
export default {
  name: "mine",
  mixins: [pageMixin],
  options: {
    styleIsolation: "shared" // 解除样式隔离
  },
  props: {},
  data() {
    return {};
  },
  computed: {
    mineBg() {
      return this.$store.state.mineBg;
    }
  },
  methods: {
    setLink(type) {
      switch (type) {
        case 1:
          this.$Router.push("/pages/myWaybill/myWaybill");
          break;
        case 2:
          this.$Router.push("/pages/authentication/authentication");
          break;
        case 3:
          this.$Router.push("/pages/driverCertification/driverCertification");
          break;
        case 4:
          this.$Router.push("/pages/myCar/myCar");
          break;
        case 5:
          this.$Router.push("/pages/news/news");
          break;
        case 6:
          this.$Router.push("/pages/setUp/setUp");
          break;
        default:
          break;
      }
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
.mine {
  .topWrap {
    position: relative;

    .topBg {
      width: 100%;
      height: 332rpx;
      background-size: 100% 508rpx;
      background-repeat: no-repeat;
      border-radius: 0rpx 0rpx 40rpx 40rpx;
      overflow: hidden;
      position: absolute;
      left: 0;
      top: 0;
    }

    .topBox {
      position: relative;
      padding: 0 20rpx;
      z-index: 2;

      .top_user {
        padding: 50rpx 0;
        color: #fff;
        font-weight: 500;

        .top_user_left_img {
          width: 124rpx;
          height: 124rpx;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 20rpx;
        }

        .top_user_left_info_name {
          font-size: 36rpx;
          line-height: 50rpx;
        }

        .top_user_left_info_phone {
          font-weight: 500;
          line-height: 34rpx;
          margin-top: 8rpx;
        }

        .iconWrap {
          padding: 10rpx;
          position: relative;
        }
      }

      .top_nav {
        width: 100%;
        background: #ffffff;
        border-radius: 8rpx;
        padding: 8rpx 0 40rpx;

        .top_nav_items {
          flex: 1;
          flex-wrap: wrap;
          position: relative;

          .top_nav_items_icon {
            width: 124rpx;
            height: 124rpx;
          }

          .top_nav_items_text {
            font-size: 24rpx;
            color: #333333;
            line-height: 34rpx;
            margin-top: -12rpx;
            width: 100%;
            text-align: center;
          }
        }

        .top_nav_items::after {
          content: "";
          display: block;
          width: 2rpx;
          height: 112rpx;
          background: #f5f5f5;
          position: absolute;
          right: -1rpx;
          top: 34rpx;
        }

        top_nav_items:last-child::after {
          display: none;
        }
      }

      .cell {
        background: #ffffff;
        border-radius: 8rpx;
        padding: 30rpx 20rpx 0;
        margin-top: 20rpx;

        .cell_tit {
          font-weight: 500;
          font-size: 32rpx;
          color: #333333;
          line-height: 44rpx;
          margin-bottom: 10rpx;
        }

        ::v-deep .u-cell__body {
          padding-left: 0;
          padding-right: 0;
        }

        ::v-deep .u-icon.u-icon--right {
          margin-right: 20rpx;
        }

        ::v-deep .u-cell {
          background-color: #fff !important;
        }
      }
    }
  }
}
</style>