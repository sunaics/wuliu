<template>
  <div class="myCar pdlr20">
    <div class="title">驾驶证照片</div>
    <div class="codePic flex_sb">
      <div class="code_items">
        <u-upload
          :fileList="fileList1"
          name="1"
          multiple
          :maxCount="1"
          width="480rpx"
          height="316rpx"
          @afterRead="afterRead"
          @delete="deletePic"
        >
          <div class="code_img">
            <img class="img1 imgAll" src="../../static/img/zheng.png" alt />
            <img class="img2" src="../../static/img/code3.png" alt />
          </div>
        </u-upload>
        <div class="text">上传人像面</div>
      </div>
    </div>

    <div class="title">车辆信息</div>
    
    <u-radio-group v-model="defaultValue" v-if="list.length">
      <div class="list">
        <div class="item" v-for="(item, index) in list" :key="item.id">
          <div class="item_top flex_ac">
            <div class="imgWrap">
              <img class="imgAll" :src="item.carImg" alt />
            </div>
            <div class="textWrap">
              <div class="text_name">{{item.carCode}}</div>
              <div class="text_date">道路运输证有效期：{{item.carEndDate}}</div>
            </div>
          </div>
          <div class="item_bottom flex_sb">
            <div class="item_bottom_left flex_cc">
              <u-radio
                activeColor="#4E5FF7"
                size="24rpx"
                :name="item.id"
                label="设为默认车辆"
                labelSize="24rpx"
              ></u-radio>
            </div>
            <div class="item_bottom_right flex_cc">
              <div class="btns flex_cc">
                <u-icon name="edit-pen" color="#999999" size="28rpx"></u-icon>
                <div class="btn_text">编辑</div>
              </div>
              <div class="btns flex_cc" @click="deleteItem(item,index)">
                <u-icon name="trash" color="#999999" size="28rpx"></u-icon>
                <div class="btn_text">删除</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </u-radio-group>
    <div class="empty" v-else>
      <u-empty></u-empty>
    </div>
    
    <div class="footWrap" :class="{'Iphone': isIphone}">
      <div class="foot pd20">
        <div class="footBtn" @click="addCar">添加车辆</div>
      </div>
    </div>
  </div>
</template>

<script>
import { pageMixin } from "@/mixins";
export default {
  components: {},
  // mixins: [pageMixin],
  data() {
    return {
      fileList1: [],
      list: [
        {
          id: 1,
          carCode: "沪A12345",
          carEndDate: "2021-01-01",
          carImg: "../../static/img/myBg.png",
          isDefault: true
        },
        {
          id: 2,
          carCode: "沪A12345",
          carEndDate: "2021-01-01",
          carImg: "../../static/img/myBg.png",
          isDefault: false
        }
      ],
      defaultValue: ""
    };
  },
  computed: {
    isIphone() {
      return this.$store.state.isIphone;
    }
  },
  methods: {
    addCar() {
      this.$Router.push("/pages/addCar/addCar");
    },
    deleteItem(item, index) {
      this.list.splice(index, 1);
    },
    // 删除图片
    deletePic(event) {
      this[`fileList${event.name}`].splice(event.index, 1);
    },
    // 新增图片
    async afterRead(event) {
      // 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
      let lists = [].concat(event.file);
      let fileListLen = this[`fileList${event.name}`].length;
      lists.map(item => {
        this[`fileList${event.name}`].push({
          ...item,
          status: "uploading",
          message: "上传中"
        });
      });
      for (let i = 0; i < lists.length; i++) {
        const result = await this.uploadFilePromise(lists[i].url);
        let item = this[`fileList${event.name}`][fileListLen];
        this[`fileList${event.name}`].splice(
          fileListLen,
          1,
          Object.assign(item, {
            status: "success",
            message: "",
            url: result
          })
        );
        fileListLen++;
      }
    },
    uploadFilePromise(url) {
      return new Promise((resolve, reject) => {
        let a = uni.uploadFile({
          url: "http://192.168.2.21:7001/upload", // 仅为示例，非真实的接口地址
          filePath: url,
          name: "file",
          formData: {
            user: "test"
          },
          success: res => {
            setTimeout(() => {
              resolve(res.data.data);
            }, 1000);
          }
        });
      });
    }
  },
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
.myCar {
  .title {
    font-weight: 500;
    font-size: 32rpx;
    color: #333333;
    line-height: 44rpx;
    padding: 30rpx 0 20rpx;
  }
  .fromWrap {
    background: #ffffff;
    border-radius: 16rpx;
    padding: 0 20rpx;
    margin-bottom: 10rpx;
  }
  .codePic {
    width: 710rpx;
    height: 466rpx;
    background: #ffffff;
    border-radius: 16rpx;
  }
  .footWrap {
    height: 84rpx;
    padding: 30rpx 0;
  }
  .foot {
    position: fixed;
    padding-bottom: 30rpx;
    width: 100%;
    left: 0;
    bottom: 0;
    box-sizing: border-box;
    background-color: #fff;
    .footBtn {
      width: 710rpx;
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
  .Iphone {
    padding-bottom: 70rpx;
    .foot {
      padding-bottom: 70rpx;
    }
  }
  .code_items {
    position: relative;
    width: 480rpx;
    height: 316rpx;
    margin: 40rpx 116rpx 0;
  }
  .code_img {
    position: relative;
    width: 480rpx;
    height: 316rpx;

    .img2 {
      position: absolute;
      top: 128rpx;
      left: 210rpx;
      width: 60rpx;
      height: 60rpx;
    }
  }
  .text {
    font-size: 28rpx;
    color: #666666;
    line-height: 40rpx;
    text-align: center;
    margin-top: 30rpx;
  }
  .list {
    width: 100%;
    .item {
      padding: 20rpx;
      background-color: #fff;
      border-radius: 8rpx;
      margin-bottom: 20rpx;
      .text_name {
        font-weight: 500;
        font-size: 32rpx;
        color: #333333;
        line-height: 44rpx;
      }
      .text_date {
        font-size: 24rpx;
        color: #999999;
        line-height: 34rpx;
        margin-top: 4rpx;
      }
    }
    .item_top {
      .imgWrap {
        width: 100rpx;
        height: 100rpx;
        margin-right: 20rpx;
      }
    }
    .item_bottom {
      padding-top: 20rpx;
      margin-top: 20rpx;
      border-top: 1px solid #e8e8e8;

      color: #999999;
      .btns {
        margin-left: 40rpx;
        font-size: 24rpx;
        .btn_text {
          margin-top: -1px;
        }
      }
    }
  }
  .empty{
    background-color: #fff;
    padding: 50rpx;
  }
}
</style>