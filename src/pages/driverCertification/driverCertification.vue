<template>
  <div class="driverCertification pdlr20">
    <div class="title">驾驶证信息</div>
    <div class="fromWrap">
      <u--form
        labelPosition="left"
        labelWidth="100"
        :model="userInfo"
        :rules="rules"
        ref="uForm"
        :labelStyle="{
          fontSize: '28rpx',
          color: '#666666'
          }"
      >
        <u-form-item label="姓名" prop="name" borderBottom>
          <u--input v-model="userInfo.name" inputAlign="right" border="none" placeholder="请输入姓名"></u--input>
        </u-form-item>
        <u-form-item label="出生日期" prop="birth" borderBottom @click="changeDate(1)">
          <u--input v-model="userInfo.birth" inputAlign="right" border="none" placeholder="请输入出生日期"></u--input>
          <u-icon slot="right" name="arrow-right"></u-icon>
        </u-form-item>
        <u-form-item label="初次领证日期" prop="firstTime" borderBottom @click="changeDate(2)">
          <u--input
            v-model="userInfo.firstTime"
            inputAlign="right"
            border="none"
            placeholder="请输入初次领证日期"
          ></u--input>
          <u-icon slot="right" name="arrow-right"></u-icon>
        </u-form-item>
        <u-form-item label="准驾车型" prop="carType" borderBottom>
          <u--input
            v-model="userInfo.carType"
            inputAlign="right"
            border="none"
            placeholder="请输入准驾车型"
          ></u--input>
          <!-- <u-icon slot="right" name="arrow-right"></u-icon> -->
        </u-form-item>
        <u-form-item label="有效期限" prop="validTime" borderBottom @click="changeDate(3)">
          <u--input
            v-model="userInfo.validTime"
            inputAlign="right"
            border="none"
            placeholder="请输入有效期限"
          ></u--input>
          <u-icon slot="right" name="arrow-right"></u-icon>
        </u-form-item>
        <!-- <u-form-item label="性别" prop="sex" borderBottom @click="showSex = true">
          <div v-if="userInfo.sex">{{userInfo.sex }}</div>
          <div v-else class="placeholder">选择性别</div>
          <u-icon slot="right" name="arrow-right"></u-icon>
        </u-form-item>-->
      </u--form>
      <!-- <u-action-sheet
        :show="showSex"
        :actions="actions"
        title="请选择性别"
        @close="showSex = false"
        @select="sexSelect"
      ></u-action-sheet>-->
    </div>
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
    <div class="footWrap" :class="{'Iphone': isIphone}">
      <div class="foot pd20" >
        <div class="footBtn" @click="submit">确定</div>
      </div>
    </div>

    <u-datetime-picker
      :show="pickerShow"
      v-model="pickerValue"
      mode="date"
      @confirm="confirmDate"
      :formatter="formatter"
      @cancel="pickerShow = false"
    ></u-datetime-picker>
  </div>
</template>

<script>
import { pageMixin } from "@/mixins";
export default {
  components: {},
  mixins: [pageMixin],
  data() {
    return {
      showSex: false,
      userInfo: {
        // 姓名
        name: "",
        // 出生日期
        birth: "",
        //初次领证日期
        firstTime: "",
        // 准驾车型
        carType: "",
        // 有效期限
        validTime: ""
      },
      actions: [
        {
          name: "男",
          value: "1"
        },
        {
          name: "女",
          value: "2"
        }
      ],
      rules: {
        name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "change"
          }
        ],
        birth: [
          {
            required: true,
            message: "请选择出生日期",
            trigger: "change"
          }
        ],
        firstTime: [
          {
            required: true,
            message: "请选择初次领证日期",
            trigger: "change"
          }
        ],
        carType: [
          {
            required: true,
            message: "请输入准驾车型",
            trigger: "change"
          }
        ],
        validTime: [
          {
            required: true,
            message: "请选择有效期限",
            trigger: "change"
          }
        ]
      },
      fileList1: [],
      pickerShow: false,
      pickerValue: "",
      pickerIndex: 0,
      pickerData: {}
    };
  },
  computed: {
    isIphone() {
      return this.$store.state.isIphone;
    },
  },
  methods: {
    submit() {
      this.$refs.uForm
        .validate()
        .then(res => {
          uni.$u.toast("校验通过");
        })
        .catch(errors => {
          uni.$u.toast("校验失败");
        });
    },
    changeDate(index) {
      this.pickerIndex = index;
      this.pickerShow = true;
      if (this.pickerData[index]) {
        this.pickerValue = this.pickerData[index];
      }
    },
    confirmDate(date) {
      console.log(this.pickerValue, date);
      this.pickerData[this.pickerIndex] = date.value;
      this.pickerValue = date.value;
      const dateFormat = this.formatDate(date.value);
      switch (this.pickerIndex) {
        case 1:
          this.userInfo.birth = dateFormat;
          break;
        case 2:
          this.userInfo.firstTime = dateFormat;
          break;
        case 3:
          this.userInfo.validTime = dateFormat;
          break;
      }
      this.pickerShow = false;
    },
    sexSelect(e) {
      console.log(e);
      this.userInfo.sex = e.name;
    },
    removeCodeImg(index) {
      if (index == 1) {
        this.userInfo.codeImg1 = "";
      } else {
        this.userInfo.codeImg2 = "";
      }
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
.driverCertification {
  .placeholder {
    font-size: 28rpx;
    color: rgb(192, 196, 204);
    width: 100%;
    text-align: right;
    padding-right: 6rpx;
  }
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
  .footWrap{
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
    .foot{
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
}
</style>