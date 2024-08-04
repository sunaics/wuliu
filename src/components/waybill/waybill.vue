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
              <div class="top_item_num">{{model.totalweek}}</div>
              <div class="top_item_name">本周运单量</div>
            </div>
            <div class="top_numList_item">
              <div class="top_item_num">{{model.totalmonth}}</div>
              <div class="top_item_name">本月运单量</div>
            </div>
            <div class="top_numList_item">
              <div class="top_item_num">{{model.totalyear}}</div>
              <div class="top_item_name">本年运单量</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="search pdlr24">
      <u-search shape="round" bg-color="#F7F7F7"  v-model="searchData.keywords" @search="goSearch" @custom="goSearch"></u-search>
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
      <div class="datas flex_sb">
      <div class="dl">未结束运单：<span>{{model.unfinished}}</span></div>
      <div class="dr">已结束运单：<span>{{model.finished}}</span></div>
    </div>
      <div class="item" v-for="item in list" :key="item.id">
        <div @click="goDetails(item)">
          <div class="labels">
            <div class="label1 label" v-if="item.dbStatus == 1">待运输</div>
            <div class="label2 label" v-if="item.dbStatus == 2">运输中</div>
            <div class="label3 label" v-if="item.dbStatus == 3">已完成</div>
          </div>
          <div class="item_top flex">
            运单号：{{ item.dbNumber }}
            <img
              class="copy"
              @click.stop="copyText(item.dbNumber)"
              src="../../static/img/copy.png"
              alt
            />
          </div>
          <div class="item_city flex_cc">
            <div class="item_user">
              <div class="item_u_city">{{ item.dbSCity }}</div>
              <div class="item_u_name">{{ item.dbSLinkName }}</div>
            </div>
            <div class="item_arrow">
              <div class="item_ct">
                <img class="imgAll" v-if="item.dbStatus == 1" src="../../static/img/status1.png" alt />
                <img class="imgAll" v-if="item.dbStatus == 2" src="../../static/img/status2.png" alt />
                <img class="imgAll" v-if="item.dbStatus == 3" src="../../static/img/status3.png" alt />
              </div>
              <div class="item_cb">
                <div class="item_label" v-if="item.dbStatus == 1">待运输</div>
                <div class="item_label" v-if="item.dbStatus == 2">运输中</div>
                <div class="item_label" v-if="item.dbStatus == 3">已完成</div>
              </div>
            </div>
            <div class="item_user">
              <div class="item_u_city">{{ item.dbECity }}</div>
              <div class="item_u_name">{{ item.dbELinkName }}</div>
            </div>
          </div>
          <div class="item_text item_text1 flex">
            <div class="item_text_name">增值服务：</div>
            <div>{{ item.Addservices }}</div>
          </div>
          <div class="item_text item_text2">下单时间：{{ item.adddate }}</div>
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
    <orderFilter ref="orderFilter" @submitData="submitData"></orderFilter>
  </div>
</template>

<script>
import orderFilter from "@/components/orderFilter/orderFilter.vue";
import { GetMyDispatchList } from "@/api/order.js";
import { formatDate, getDateForMonthOffset } from "@/utils/formatDate";
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
      model:{
        finished: "0",
        totalmonth: "0",
        totalweek: "0",
        totalyear: "4",
        unfinished: "4",
      },
      list: [],
      status: "loadmore", //loadmore / loading / nomore
      iconType: "spinner", //spinner-花朵状图标 circle-圆圈状 semicircle-半圆
      loadText: {
        loadmore: "上拉加载",
        loading: "努力加载中"
      },
      overlayShow: true,
      pageData: {
        pageSize: 3,
        pageNum: 1,
        total: 0
      },
      searchData:{
        keywords: "",
        startDate: "", 
        endDate: ""
      }
    };
  },
  onLoad() {
    // 获取token
    console.log(this.$store.state.token);
  },
  watch:{
    userInfo :{
      handler() {
        if(this.$store.state.userInfo.olSID || this.$store.state.userInfo.olDID) {
          this.GetMyDispatchList();
        }
      },
      deep: true,
      immediate: true
    }
  },
  computed:{
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  created() {
    // this.getDispatchList();
  },
  methods: {
    goSearch() {
      this.list = [];
      this.pageData.pageNum = 1;
      this.GetMyDispatchList();
    },
    submitData(data){
      console.log(data)
      this.searchData.startDate = data.startDate
      this.searchData.endDate = data.endDate
      if(data.selectActive){
        this.searchData.endDate = formatDate(new Date(), "YYYY-MM-DD HH:mm:ss");
        var num = data.selectActive == 2 ? 3 : data.selectActive == 3 ? 12 : 1;
        this.searchData.startDate = getDateForMonthOffset(num);
      }
      this.$refs.orderFilter.orderFilterShow = false;
      this.goSearch()
    },
    GetMyDispatchList(){
      this.status = "loading";
      GetMyDispatchList({
        dbStatus: this.tabCurrent,
        dbSID: this.$store.state.userInfo.olSID,
        dbDID: this.$store.state.userInfo.olDID,
        page: this.pageData.pageNum,
        pagesize: this.pageData.pageSize,
        ...this.searchData
      }).then(res => {
        this.pageData.total = Math.ceil((res.datatotal || 0) / this.pageData.pageSize) ;
        this.list = [...this.list, ...(res.data || [])];
        this.model = res.model
        if(this.pageData.total <= this.pageData.pageNum) {
          this.status = "nomore";
        } else {
          this.status = "loadmore";
        }
        console.log(this.status)
      });
    },
    tabChange(item) {
      this.tabCurrent = item.index;
      this.goSearch()
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
      this.pageData.pageNum++;
      this.GetMyDispatchList();
    },
    goFilter() {
      this.$refs.orderFilter.orderFilterShow = true;
    },
    goDetails(item){
      this.$Router.push('/pages/waybillDetails/waybillDetails?id=' + item.id )
    }
  }
};
</script>

<style lang="scss" scoped>
.waybill {
  .pdlr24 {
    padding: 0 24rpx;
  }
  .datas{
    height: 80rpx;
    background: #E7EAFF;
    border-radius: 8rpx;
    border: 2rpx solid #4E5FF7;
    line-height: 76rpx;
    box-sizing: border-box;
    padding: 0 65rpx;
    font-size: 28rpx;
    color: #4E5FF7;
    margin-bottom: 20rpx;
    span{
      font-weight: 500;
    }
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
