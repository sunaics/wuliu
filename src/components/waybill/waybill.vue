<template>
  <div class="waybill">
    <div class="top_wrap pdlr24">
      <div class="top_box flex_sb">
        <div class="bgWrap">
          <img class="imgAll" src="../../static/img/ibg.png" alt />
        </div>
        <div class="dataWrap">
          <div class="top_tit">运单数据</div>
          <div class="top_numList flex_cc">
            <div class="top_numList_item">
              <div class="top_item_num">12</div>
              <div class="top_item_name">本周运单量</div>
            </div>
            <div class="top_numList_item">
              <div class="top_item_num">36</div>
              <div class="top_item_name">本周运单量</div>
            </div>
            <div class="top_numList_item">
              <div class="top_item_num">125</div>
              <div class="top_item_name">本周运单量</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="search pdlr24">
      <u-search shape="round" bg-color="#F7F7F7"></u-search>
    </div>
    <div class="tabs flex_sb">
      <div style="width: 80%;">
        <u-tabs
          :list="tabList"
          :scrollable="false"
          :current="tabCurrent"
          @change="tabChange"
          height="400"
          :activeStyle="{
          color: '#4E5FF7'
        }"
          lineColor="#4E5FF7"
          lineWidth="30"
        ></u-tabs>
      </div>

      <div class="flex_cc filter_wrap" @click="goFilter">
        <div class="filter_text">筛选</div>
        <div class="filter_icon flex_cc">
          <img class="imgAll" src="../../static/img/filter.png" alt />
        </div>
      </div>
    </div>
    <div class="list">
      <div class="item" v-for="item in list" :key="item.id">
        <div @click="goDetails(item)">
          <div class="labels">
            <div class="label1 label" v-if="item.status == 1">待运输</div>
            <div class="label2 label" v-if="item.status == 2">运输中</div>
            <div class="label3 label" v-if="item.status == 3">已完成</div>
          </div>
          <div class="item_top flex">
            运单号：{{ item.waybillNo }}
            <img
              class="copy"
              @click="copyText(item.waybillNo)"
              src="../../static/img/copy.png"
              alt
            />
          </div>
          <div class="item_city flex_cc">
            <div class="item_user">
              <div class="item_u_city">{{ item.fromCity }}</div>
              <div class="item_u_name">{{ item.fromUser }}</div>
            </div>
            <div class="item_arrow">
              <div class="item_ct">
                <img class="imgAll" v-if="item.status == 1" src="../../static/img/status1.png" alt />
                <img class="imgAll" v-if="item.status == 2" src="../../static/img/status2.png" alt />
                <img class="imgAll" v-if="item.status == 3" src="../../static/img/status3.png" alt />
              </div>
              <div class="item_cb">
                <div class="item_label" v-if="item.status == 1">待运输</div>
                <div class="item_label" v-if="item.status == 2">运输中</div>
                <div class="item_label" v-if="item.status == 3">已完成</div>
              </div>
            </div>
            <div class="item_user">
              <div class="item_u_city">{{ item.toCity }}</div>
              <div class="item_u_name">{{ item.toUser }}</div>
            </div>
          </div>
          <div class="item_text item_text1 flex">
            <div class="item_text_name">增值服务：</div>
            <div>{{ item.serves }}</div>
          </div>
          <div class="item_text item_text2">下单时间：{{ item.orderTime }}</div>
        </div>
        <div class="item_bottom flex_sb">
          <div></div>
          <div class="flex_cc">
            <div class="btn" v-if="item.status == 1">开始运输</div>
            <template v-if="item.status == 2">
              <div class="btn">联系发货人</div>
              <div class="btn">联系收货人</div>
            </template>
            <div class="btn" v-if="item.status == 3">删除</div>
          </div>
        </div>
      </div>
      <u-loadmore
        :status="status"
        :loadingIcon="iconType"
        :loadmoreText="loadText.loadmore"
        :loadingText="loadText.loading"
        font-size="24rpx"
        color="#999"
      />
    </div>
    <orderFilter ref="orderFilter"></orderFilter>
  </div>
</template>

<script>
import orderFilter from "@/components/orderFilter/orderFilter.vue";
export default {
  options: {
    styleIsolation: "shared" // 解除样式隔离
  },
  components: {
    orderFilter
  },
  data() {
    return {
      tabList: [
        {
          name: "全部"
        },
        {
          name: "待运输"
        },
        {
          name: "运输中"
        },
        {
          name: "已完成"
        }
      ],
      tabCurrent: 0,
      list: [
        {
          id: 1,
          status: 1,
          waybillNo: "S2106231431977432",
          fromCity: "北京市",
          fromUser: "张三",
          toCity: "上海市",
          toUser: "李四",
          serves:
            "装车、卸车、吊车、叉车、人工、包装、等待、垫付资金、仓储、入仓",
          orderTime: "2021-06-23 14:31:00"
        },
        {
          id: 2,
          status: 2,
          waybillNo: "S2106231431977433",
          fromCity: "天津市",
          fromUser: "王五",
          toCity: "合肥市",
          toUser: "赵六",
          serves:
            "装车、卸车、吊车、叉车、人工、包装、等待、垫付资金、仓储、入仓",
          orderTime: "2021-06-25 10:30:00"
        },
        {
          id: 3,
          status: 3,
          waybillNo: "S2106231431977435",
          fromCity: "广州市",
          fromUser: "欧阳峰",
          toCity: "深圳市",
          toUser: "杨过",
          serves:
            "装车、卸车、吊车、叉车、人工、包装、等待、垫付资金、仓储、入仓",
          orderTime: "2021-06-27 09:01:00"
        }
      ],
      status: "loadmore", //loadmore / loading / nomore
      iconType: "spinner", //spinner-花朵状图标 circle-圆圈状 semicircle-半圆
      loadText: {
        loadmore: "上拉加载",
        loading: "努力加载中"
      },
      overlayShow: true
    };
  },
  onLoad() {
    // 获取token
    console.log(this.$store.state.token);
  },
  methods: {
    tabChange(item) {
      console.log(item);
      this.tabCurrent = item.index;
    },
    copyText(code) {
      uni.setClipboardData({
        data: code,
        success: function() {
          uni.showToast({
            title: "复制成功",
            icon: "success",
            duration: 2000
          });
        }
      });
    },
    onReachBottoms() {
      if (this.status != "loadmore") return;
      this.status = "loading";
      setTimeout(() => {
        this.status = "nomore";
      }, 2000);
    },
    goFilter() {
      this.$refs.orderFilter.orderFilterShow = true;
    },
    goDetails(item){
      this.$Router.push('/pages/waybillDetails/waybillDetails?id=' + item.id)
    }
  }
};
</script>

<style lang="scss" scoped>
.waybill {
  .pdlr24 {
    padding: 0 24rpx;
  }

  .top_wrap {
    background-color: #fff;
    padding-top: 30rpx;
  }

  .top_box {
    width: 100%;
    height: 252rpx;
    border-radius: 16rpx;
    color: #fff;
    box-sizing: border-box;
    padding: 32rpx 20rpx;
    flex-direction: column;
    flex-wrap: wrap;
    position: relative;

    .bgWrap {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }

    .dataWrap {
      position: relative;
    }

    .top_tit {
      font-size: 32rpx;
      font-weight: 500;
      line-height: 44rpx;
      padding: 0 20rpx;
      margin-bottom: 30rpx;
    }

    .top_numList {
      width: 100%;

      .top_numList_item {
        flex: 1;
        text-align: center;
        position: relative;

        .top_item_num {
          line-height: 72rpx;
          font-size: 56rpx;
          font-weight: 500;
        }

        .top_item_name {
          font-size: 24rpx;
          line-height: 43rpx;
        }
      }

      .top_numList_item:nth-child(2)::after,
      .top_numList_item:nth-child(2)::before {
        content: "";
        display: block;
        width: 2rpx;
        height: 48rpx;
        background: #ffffff;
        opacity: 0.4;
        position: absolute;
        top: 40rpx;
      }

      .top_numList_item:nth-child(2)::after {
        left: 0;
      }

      .top_numList_item:nth-child(2)::before {
        right: 0;
      }
    }
  }

  .search {
    background-color: #fff;
    padding: 28rpx 24rpx 10rpx;

    ::v-deep .u-search__action {
      color: #4e5ff7 !important;
    }
  }

  .tabs {
    background-color: #fff;
    padding: 0 20rpx;

    .filter_wrap {
      height: 44px;
      line-height: 44px;
      font-size: 28rpx;
      color: #666666;

      .filter_icon {
        width: 30rpx;
        height: 30rpx;
        margin-left: 6rpx;
      }
    }

    ::v-deep .u-tabs__wrapper__nav__item__text {
      font-size: 28rpx;
    }

    //
  }

  .list {
    padding: 20rpx 24rpx;

    .item {
      background-color: #fff;
      box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(0, 0, 0, 0.06);
      border-radius: 8rpx;
      padding: 24rpx;
      position: relative;
      margin-bottom: 20rpx;

      .labels {
        width: 104rpx;
        height: 50rpx;
        border-radius: 0rpx 8rpx 0rpx 8rpx;
        overflow: hidden;
        font-weight: 500;
        font-size: 24rpx;
        color: #ffffff;
        line-height: 50rpx;
        text-align: center;
        position: absolute;
        right: 0;
        top: 0;

        .label {
          width: 100%;
          height: 100%;
        }

        .label1 {
          background-color: #4e5ff7;
        }

        .label2 {
          background-color: #4fc57a;
        }

        .label3 {
          background-color: #999999;
        }
      }

      .item_top {
        font-weight: 400;
        font-size: 24rpx;
        color: #333333;
        line-height: 34rpx;

        .copy {
          width: 28rpx;
          height: 28rpx;
          margin-left: 10rpx;
        }
      }

      .item_city {
        text-align: center;
        padding: 32rpx 0;

        .item_user {
          .item_u_city {
            font-weight: 500;
            font-size: 36rpx;
            color: #333333;
            line-height: 50rpx;
          }

          .item_u_name {
            font-size: 24rpx;
            color: #999999;
            line-height: 34rpx;
            margin-top: 4rpx;
          }
        }

        .item_arrow {
          margin: 0 70rpx;
          font-weight: 500;
          font-size: 24rpx;
          color: #333333;
          line-height: 34rpx;
          padding-top: 34rpx;

          .item_ct {
            width: 156rpx;
            height: 10rpx;
            margin-bottom: 10rpx;
          }
        }
      }

      .item_text {
        font-size: 24rpx;
        line-height: 34rpx;
      }

      .item_text1 {
        color: #333333;
        margin-bottom: 8rpx;

        .item_text_name {
          width: 124rpx;
          flex-shrink: 0;
        }
      }

      .item_text2 {
        color: #666666;
      }

      .item_bottom {
        font-size: 24rpx;
        color: #4e5ff7;
        margin-top: 16rpx;

        .btn {
          border-radius: 30rpx;
          border: 2rpx solid #4e5ff7;
          padding: 8rpx 26rpx;
          line-height: 40rpx;
          margin-left: 20rpx;
        }
      }
    }
  }
}
</style>
