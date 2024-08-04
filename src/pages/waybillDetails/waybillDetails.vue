<template>
  <div class="waybillDetails pd20">
    <div class="top bg-ba">
      <div class="xian"></div>
      <div class="jian">
        <img class="imgAll" src="../../static/img/jiantou.png" alt />
      </div>
      <div class="labels">
        <div class="label1 label" v-if="details.dbStatus == 1">待运输</div>
        <div class="label2 label" v-if="details.dbStatus == 2">运输中</div>
        <div class="label3 label" v-if="details.dbStatus == 3">已完成</div>
      </div>
      <div class="top_info flex_ac">
        <div class="icon">
          <img class="imgAll" src="../../static/img/fa.png" alt />
        </div>
        <div>
          <div class="name">
            <span class="text">{{ details.dbSLinkName }}</span>
            <span>{{ details.bsSLinkPhone }}</span>
          </div>
          <div class="city">{{ details.dbSAddress }}</div>
        </div>
      </div>
      <div class="top_info flex_ac">
        <div class="icon">
          <img class="imgAll" src="../../static/img/shou.png" alt />
        </div>
        <div>
          <div class="name">
            <span class="text">{{ details.dbELinkName }}</span>
            <span>{{ details.dbELinkPhone }}</span>
          </div>
          <div class="city">{{ details.dbEAddress }}</div>
        </div>
      </div>
    </div>
    <div class="title">货物运输状态</div>
    <div class="bg-ba pdlr20">
      <u--form labelPosition="left" labelWidth="60" :labelStyle="{
          fontSize: '28rpx',
          color: '#666666'
        }">
        <u-form-item label="状态" borderBottom>
          <div class="alginRight radio-group">
            <u-radio-group v-model="radioValue" iconPlacement="left">
              <div class :class="{ 'pitchOn': radioValue === '1' }">
                <u-radio activeColor="#4E5FF7" name="1" label="装车确认" :disabled="details.dbStatus >= 1"></u-radio>
              </div>
              <div class="radioWrap" :class="{ 'pitchOn': radioValue === '2' }" :disabled="details.dbStatus > 2">
                <u-radio activeColor="#4E5FF7" name="2" label="运输中"></u-radio>
              </div>
              <div class="radioWrap" :class="{ 'pitchOn': radioValue === '3' }" :disabled="details.dbStatus >= 3">
                <u-radio activeColor="#4E5FF7" name="3" label="到达"></u-radio>
              </div>
            </u-radio-group>
          </div>
        </u-form-item>
        <u-form-item label="地址" borderBottom>
          <div class="flex_cc">
            <div class="adds">{{ details.dbSAddress }}</div>
            <div class="from_btnWrap">
              <u-button type="primary" color="#4E5FF7" :plain="true" shape="circle" text="默认到达地址"></u-button>
            </div>
          </div>
        </u-form-item>
        <u-form-item label="时间">
          <div class="alginRight">{{ time }}</div>
        </u-form-item>
      </u--form>
    </div>
    <template v-if="details.Addservices && details.Addservices.length">
      <div class="title">增值服务</div>
      <div>
        <u--form labelPosition="left" labelWidth="80" :labelStyle="{
          fontSize: '28rpx',
          color: '#666666'
        }">
          <div class="bg-ba pdlr20" v-for="item in details.Addservices" :key="item.id">
            <u-form-item label="增值服务" borderBottom>
              <div class="alginRight">{{ item.dbpType }}</div>
            </u-form-item>
            <u-form-item label="现场图片">
              <div class="alginRight">
                <Upload :uploadId="item.id" :fileList="item.fileList" :disabled="item.fileList && item.fileList.length">
                </Upload>
                <!-- <u-upload :fileList="item.fileList" name="1" multiple :maxCount="4" width="108rpx" height="108rpx"
                @afterRead="afterRead" @delete="deletePic">
                <div class="code_img">
                  <div>
                    <u-icon name="plus"></u-icon>
                  </div>
                  <div class="text">上传图片</div>
                </div>
              </u-upload> -->
              </div>
            </u-form-item>
          </div>
        </u--form>
      </div>
    </template>
    <div class="btnWrap flex_cc">
      <div class="btn" @click="submit">提交</div>
    </div>
    <div class="title">货物详情</div>
    <div class="bg-ba pdlr20">
      <u--form labelPosition="left" labelWidth="100" :labelStyle="{
          fontSize: '28rpx',
          color: '#666666'
        }">
        <u-form-item label="运单号">
          <div class="alginRight">{{ details.dbNumber }}</div>
        </u-form-item>
        <u-form-item labelWidth="0">
          <div class="table_wrap">
            <div class="table_rows flex table_rows_title">
              <div class="table_item">名称</div>
              <div class="table_item">数量(件)</div>
              <div class="table_item">体积(m³)</div>
              <div class="table_item">重量(kg)</div>
            </div>
            <div class="table_rows flex" v-for="item in details.Goods" :key="item.id">
              <div class="table_item">{{ item.dbgName }}</div>
              <div class="table_item">{{ item.dbgCounts }}</div>
              <div class="table_item">{{ item.dbgVolume }}</div>
              <div class="table_item">{{ item.dbgWeight }}</div>
            </div>
          </div>
        </u-form-item>
        <!-- <u-form-item label="发货时间" borderBottom>
          <div class="alginRight">2022-04-25 09:00:00</div>
        </u-form-item>
        <u-form-item label="预计到达时间">
          <div class="alginRight">2022-04-25 09:00:00</div>
        </u-form-item> -->
      </u--form>
    </div>
    <div class="title">物流详情</div>
    <div class="logistics bg-ba">
      <template v-if="logisticsList.length">
        <div class="log_item flex_sb" v-for="item in logisticsList" :key="item.id">
          <div class="dateWrap">
            <div class="date">{{ item.adddate }}</div>
          </div>
          <div class="center">
            <div class="xian_warp flex_cc xian_warp1">
              <div class="xian"></div>
            </div>
            <div class="dian"></div>
            <div class="xian_warp flex_cc xian_warp2">
              <div class="xian"></div>
            </div>
          </div>
          <div class="textWrap">
            <!-- <div class="type">{{ item.status == 1 ? '已揽收' : item.status == 2 ? '开始运输' : item.status == 3 ? '运输中' :
          item.status == 4 ? '已送达' : '运输中' }}</div> -->
            <div class="type">{{ item.clrStatus }}</div>
            <div class="text">{{ item.clrAddress }}</div>
          </div>
        </div>
      </template>
      <div v-else>
        <u-empty> </u-empty>
      </div>
    </div>
  </div>
</template>

<script>
import { MyDispatchBillDetail, AddDispatchState } from "@/api/order";
import { formatDate, getDateForMonthOffset } from "@/utils/formatDate";
import Upload from "@/components/upload/upload.vue";
export default {
  options: {
    styleIsolation: "shared" // 解除样式隔离
  },
  components: { Upload },
  data() {
    return {
      id: "",
      time: "",
      radioValue: 0,
      details: {
        status: 1
      },
      logisticsList: []
    };
  },
  computed: {

  },
  onLoad(query) {
    uni.getLocation({
      success: res => {
        console.log('getLocation+++++++++++++++++++', res);
      }
    });
    this.id = query.id
    this.MyDispatchBillDetail(query)
    this.nowDate()
  },
  methods: {
    submit() {
      let servicepic = []
      for (var i = 0; i < this.details.Addservices.length; i++) {
        var item = this.details.Addservices[i]
        console.log(item)
        if (item.dbpPicDriverSet && !item.fileList.length) {
          uni.showToast({
            title: '请上传 ' + item.dbpType + ' 现场图片',
            icon: 'none'
          })
          break;
        }else{
          servicepic.push({
            id: item.id,
            pic: item.fileList.join('|')
          })
        }
      }

      var data = {
        id: this.id,
        status: this.radioValue,
        SID: this.$store.state.userInfo.olSID,
        adddate: this.time,
        address: this.details.dbSAddress,
        longitude: "",
        latitude: "",
        servicepic
      }
    },
    // 获取实时时间
    nowDate() {
      setInterval(() => {
        this.time = formatDate(new Date(), "YYYY-MM-DD HH:mm:ss");
      }, 1000);
      this.time = formatDate(new Date(), "YYYY-MM-DD HH:mm:ss");
    },
    MyDispatchBillDetail(query) {
      MyDispatchBillDetail(query).then(res => {
        var data = res.model || {}
        var Addservices = data.Addservices || []
        Addservices.forEach(item => {
          item.fileList = item.dbpPicture ? [item.dbpPicture] : []
        })
        this.logisticsList = data.Transport || []
        this.details = data
      });
    },
    AddDispatchState() {
      // dbNum	varchar	运单号	true	
      // uid	int	用户ID	true	司机或供应商ID
      // state	int	状态	true	
      // address	varchar	位置	true	上报位置
      // pic	varchar	现场图片	true	同一级图片用“|”相隔，每组用“,”相隔

      AddDispatchState({
        dbNum
      }).then(res => {

      });
    },
  },
  watch: {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {
  },
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() { },
  // 页面周期函数--监听页面隐藏
  onHide() { },
  // 页面周期函数--监听页面卸载
  onUnload() { }
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
.waybillDetails {
  .title {
    font-weight: 500;
    font-size: 32rpx;
    color: #333333;
    line-height: 44rpx;
    padding: 30rpx 0 20rpx;
  }

  .bg-ba {
    background: #ffffff;
    border-radius: 8rpx;
    margin-bottom: 20rpx;
  }

  .radioWrap {
    padding-left: 48rpx;
  }

  ::v-deep .u-radio-group {
    justify-content: flex-end;
  }

  ::v-deep .u-radio {
    // margin-left: 48rpx;
  }

  ::v-deep .u-radio__icon-wrap {
    background-color: $uni-bg-color !important;
    position: relative;
  }

  ::v-deep .u-radio__icon-wrap__icon {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .radio-group ::v-deep .u-icon {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 16rpx;
    height: 16rpx;
  }

  // ::v-deep .u-icon__icon{

  // }
  .alginRight .pitchOn ::v-deep .u-icon__icon::before {
    display: block;
    content: "" !important;
    width: 16rpx;
    height: 16rpx;
    background-color: #4e5ff7;
    border: none;
    border-radius: 50%;
    position: absolute;
  }

  //  选中的背景颜色
  ::v-deep .pitchOn>.u-radio>.u-radio__icon-wrap>.u-radio__icon-wrap__icon>.u-icon>.u-icon__icon::before {
    background-color: #4e5ff7;
  }

  .top {
    position: relative;

    .jian {
      width: 28rpx;
      height: 28rpx;
      position: absolute;
      top: 146rpx;
      left: 30rpx;
    }

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

    .xian {
      width: 594rpx;
      height: 1rpx;
      background: #e8e8e8;
      position: absolute;
      right: 20rpx;
      top: 160rpx;
    }

    .top_info {
      padding: 30rpx 14rpx 40rpx;

      .icon {
        width: 58rpx;
        height: 72rpx;
        margin-right: 24rpx;
        padding-top: 20rpx;
      }

      .name {
        font-weight: 500;
        font-size: 32rpx;
        color: #333333;
        line-height: 44rpx;

        .text {
          margin-right: 16rpx;
        }
      }

      .city {
        font-size: 24rpx;
        color: #666666;
        line-height: 34rpx;
        margin-top: 8rpx;
      }
    }
  }

  .from_btnWrap {
    width: 200rpx;
    margin-left: 20rpx;
  }

  .adds {
    width: 320rpx;
    font-size: 28rpx;
    color: #999999;
    line-height: 40rpx;
    text-align: right;
  }

  .code_img {
    position: relative;
    width: 108rpx;
    height: 108rpx;
  }

  .btnWrap {
    width: 100%;

    .btn {
      width: 326rpx;
      height: 84rpx;
      background: #4e5ff7;
      box-shadow: 0rpx 8rpx 14rpx 0rpx rgba(0, 19, 194, 0.14);
      border-radius: 10rpx;
      font-weight: 500;
      font-size: 32rpx;
      color: #ffffff;
      line-height: 84rpx;
      text-align: center;
    }
  }

  .table_wrap {
    width: 100%;
    border-top: 2rpx solid #dfdfdf;
    border-left: 2rpx solid #dfdfdf;

    .table_item {
      flex: 1;
      text-align: center;
      border-bottom: 2rpx solid #dfdfdf;
      border-right: 2rpx solid #dfdfdf;
      box-sizing: border-box;
      padding: 20rpx 10rpx;
      justify-content: center;
      align-items: center;
      display: flex;
      font-size: 28rpx;
      color: #333333;
      line-height: 40rpx;
    }

    .table_rows_title {
      background: #f5f5f5;
    }
  }

  .logistics {
    padding: 30rpx 20rpx;

    .log_item {
      font-size: 24rpx;
      color: #999999;
      line-height: 34rpx;
      padding-bottom: 40rpx;
      position: relative;

      .dateWrap {
        width: 140rpx;
        text-align: right;
        flex-shrink: 0;
        // padding-top: 5rpx;
      }

      .center {
        width: 84rpx;
        position: absolute;
        top: 0;
        left: 140rpx;
        height: 100%;
      }

      .textWrap {
        width: 458rpx;

        .type {
          font-size: 28rpx;
          line-height: 40rpx;
          margin-bottom: 4rpx;
        }
      }

      .center {
        .dian {
          width: 12rpx;
          height: 12rpx;
          background: #D8D8D8;
          position: absolute;
          top: 36rpx;
          left: 50%;
          margin-left: -6rpx;
          border-radius: 50%;
          z-index: 10;
        }

        .xian_warp {
          position: absolute;
          width: 12rpx;
          height: 100%;
          top: 0;
          left: 50%;
          margin-left: -6rpx;
          // background-color: #f00;
          box-sizing: border-box;

          .xian {
            height: 100%;
            border-left: 2rpx dashed #DFDFDF;
          }
        }

        .xian_warp1 {
          height: 36rpx;
          // background-color: #4e5ff7;
        }

        .xian_warp2 {
          padding-top: 48rpx;
          // background-color: #4fc57a;
        }
      }
    }

    .log_item:first-child {
      color: #333333;

      .xian_warp1 {
        display: none
      }
    }

    .log_item:last-child {
      padding-bottom: 0;

      .xian_warp2 {
        display: none
      }
    }
  }
}
</style>