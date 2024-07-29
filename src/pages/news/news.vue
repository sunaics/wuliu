<template>
  <div class="news pd20">
    <u-loading-page :loading="loading"></u-loading-page>
    <div class="tit">全部已读</div>
    <div class="list">
      <div class="items pd20" v-for="(item, index) in list" :key="item.id" @click="item.n_read ? '' :readNotice(item, index)">
        <div class="top flex_ac_sb">
          <div class="t_left" :class="item.isRead ? 't_left_read' : ''">{{item.n_title}}</div>
          <div class="t_right">{{item.adddate}}</div>
        </div>
        <div class="foot flex_ac_sb">
          <div class="f_left">
            <div>{{item.n_context}}</div>
            <!-- <div>您的运单（运单号：{{item.codeNum}}）</div> -->
            <!-- <div>由{{item.fromCity}}-{{item.toCity}}，已运输完成。</div> -->
          </div>
          <div class="f_right" v-if="!item.n_read">
            <u-badge :isDot="true" type="success" bgcolor="#FF4E4E"></u-badge>
          </div>
        </div>
      </div>
    </div>
    <u-loadmore :status="status" />
  </div>
</template>

<script>
import { myNotice, readNotice } from "@/api/user";
export default {
  components: {},
  data() {
    return {
      loading: true,
      list: [],
      pageData: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },
      status: "loadmore" // loadmore, nomore, loading
    };
  },
  computed: {},
  methods: {
    myNotice() {
      myNotice({
        pageIndex: this.pageData.pageIndex,
        pageSize: this.pageData.pageSize,
        auid: this.$store.state.userInfo.auid
      }).then(res => {
        console.log(res);
        this.list = [...this.list, ...res.data];
        // this.pageData.total = res.total;
        this.status = "loadmore";
        this.loading = false;
      });
    },
    readNotice(item, index) {
      readNotice({
        auid: this.$store.state.userInfo.auid,
        id: item.id
      }).then(res => {
        this.list[index].n_read =  true;
      });
    }
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {
    this.myNotice();
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
  // onPullDownRefresh() { uni.stopPullDownRefresh(); },
  // 页面处理函数--监听用户上拉触底
  onReachBottom() {
    if (this.pageData.pageIndex >= this.pageData.total) {
      this.status = "nomore";
    } else {
      this.pageData.pageIndex++;
      this.myNotice();
      this.status = "loading";
    }
  }
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
    .t_left_read {
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