<template>
  <div class="news pd20">
    <div class="tit">全部已读</div>
    <div class="list">
      <div class="items pd20" v-for="item in list" :key="item.id">
        <div class="top flex_ac_sb">
          <div class="t_left" :class="item.isRead ? 't_left_read' : ''">运输完成</div>
          <div class="t_right">{{item.date}}</div>
        </div>
        <div class="foot flex_ac_sb">
          <div class="f_left">
            <div>您的运单（运单号：{{item.codeNum}}）</div>
            <div>由{{item.fromCity}}-{{item.toCity}}，已运输完成。</div>
          </div>
          <div class="f_right" v-if="item.isRead">
            <u-badge :isDot="true" type="success" bgColor="#FF4E4E"></u-badge>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      list: [
        {
          id: 1,
          status: 1,
          codeNum: "S2106231431977432",
          fromCity: "上海",
          toCity: "北京",
          date: "2021-06-23 14:31:57",
          isRead: true
        },
        {
          id: 1,
          status: 1,
          codeNum: "S2106231431977432",
          fromCity: "南京",
          toCity: "合肥",
          date: "2021-06-23 14:31:57",
          isRead: false
        }
      ]
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
.tit {
  text-align: right;
  font-size: 28rpx;
  color: #666666;
  line-height: 40rpx;
  margin: 10rpx 0 20rpx;
}
.list {
  .items {
    background: #ffffff;
    border-radius: 16rpx;
    margin-bottom: 20rpx;
    .top {
      margin: 8rpx;
    }
    .t_left {
      font-weight: 500;
      font-size: 32rpx;
      color: #999999;
      line-height: 44rpx;
    }
    .t_left_read{
      color: #333333;
    }
    .t_right {
      font-size: 24rpx;
      color: #999999;
    }
    .f_left {
      font-size: 24rpx;
      color: #666666;
      line-height: 34rpx;
    }
  }
}
</style>