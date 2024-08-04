<template>
  <div class="authentication pdlr20">
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
        <u-form-item label="证件类型" borderBottom >
          <div slot="right">身份证</div>
        </u-form-item>
        <u-form-item label="姓名" prop="name" borderBottom >
          <u--input v-model="userInfo.name" inputAlign="right" border="none" placeholder="请输入姓名"></u--input>
        </u-form-item>
        <u-form-item label="性别" prop="sex" borderBottom @click="showSex = true">
          <div v-if="userInfo.sex">{{userInfo.sex }}</div>
          <div v-else class="placeholder">选择性别</div>
          <u-icon slot="right" name="arrow-right"></u-icon>
        </u-form-item>
        <u-form-item label="身份证号" prop="codeNum" >
          <u--input
            v-model="userInfo.codeNum"
            inputAlign="right"
            type="idcard"
            border="none"
            placeholder="请输入身份证号"
          ></u--input>
        </u-form-item>
      </u--form>
      <u-action-sheet
        :show="showSex"
        :actions="actions"
        title="请选择性别"
        @close="showSex = false"
        @select="sexSelect"
      ></u-action-sheet>
    </div>
    <div class="title">身份证照片</div>
    <div class="codePic flex_sb">
      <div class="code_items">
        <u-upload
          :fileList="fileList1"
          name="1"
          multiple
          :maxCount="1"
          width="308rpx"
          height="182rpx"
          @afterRead="afterRead"
		      @delete="deletePic"
        >
        <!-- v-if="!userInfo.codeImg1" -->
          <div class="code_img">
            <img class="img1" src="../../static/img/code1.png" alt />
            <img class="img2" src="../../static/img/code4.png" alt />
            <img class="img3" src="../../static/img/code3.png" alt />
            <div class="text">上传人像面</div>
          </div>
         
        </u-upload>
        <!-- <div class="code_img" v-else>
          <div class="close flex_cc" @click="removeCodeImg(1)">
            <u-icon name="close" color="#fff" size="24rpx"></u-icon>
          </div>
          <img class="imgAll" :src="userInfo.codeImg1" alt />
        </div> -->
      </div>
      <div class="code_items">
        <u-upload
          :fileList="fileList2"
          name="2"
          multiple
          :maxCount="1"
          width="308rpx"
          height="182rpx"
          @afterRead="afterRead"
		      @delete="deletePic"
        >
        <!-- v-if="!userInfo.codeImg1" -->
          <div class="code_img">
            <img class="img1" src="../../static/img/code1.png" alt />
            <img class="img2" src="../../static/img/code2.png" alt />
            <img class="img3" src="../../static/img/code3.png" alt />
            <div class="text">上传国徽面</div>
          </div>
        </u-upload>
      </div>
    </div>
    <div class="footWrap" :class="{'Iphone': isIphone}">
      <div class="foot pd20" >
        <div class="footBtn" @click="submit">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
import { AuthenticationUpdate } from "@/api/user";
export default {
  components: {},
  data() {
    return {
      showSex: false,
      userInfo: {
        name: "",
        sex: "",
        codeNum: "",
        codeImg1: "../../static/img/myBg.png",
        codeImg2: ""
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
        "name": {
          type: "string",
          required: true,
          message: "请填写姓名",
          trigger: ["blur", "change"]
        },
        "sex": {
          type: "string",
          max: 1,
          required: true,
          message: "请选择男或女",
          trigger: ["blur", "change"]
        },
        "codeNum": {
          type: "string",
          required: true,
          message: "请填写身份证号",
          trigger: ["blur", "change"]
        },

      },
      fileList1:[],
      fileList2:[],
    };
  },
  computed: {
    isIphone() {
      return this.$store.state.isIphone;
    },
    
  },
  methods: {
    submit() {
			this.$refs.uForm.validate().then(res => {
				uni.$u.toast('校验通过')
			}).catch(errors => {
				uni.$u.toast('校验失败')
        AuthenticationUpdate()
			})
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
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: 'http://192.168.2.21:7001/upload', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							setTimeout(() => {
								resolve(res.data.data)
							}, 1000)
						}
					});
				})
			},
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
.authentication {
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
  .code_items {
    width: 344rpx;
    height: 218rpx;
    background: #ffffff;
    border-radius: 16rpx;
    box-sizing: border-box;
    padding: 18rpx;
    position: relative;
    .img1 {
      width: 308rpx;
      height: 182rpx;
      position: absolute;
      left: 0;
      top: 0;
    }
    .img2 {
      width: 172rpx;
      height: 108rpx;
      position: absolute;
      left: 68rpx;
      top: 18rpx;
    }
    .img3 {
      width: 60rpx;
      height: 60rpx;
      position: absolute;
      top: 42rpx;
      left: 124rpx;
    }
    .text {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 20rpx;
      font-size: 24rpx;
      color: #666666;
      line-height: 34rpx;
      text-align: center;
    }
    .code_img {
      position: relative;
      width: 308rpx;
      height: 182rpx;
      .close {
        background-color: #ff4e4e;
        width: 50rpx;
        height: 50rpx;
        position: absolute;
        top: 0;
        right: 0;
        opacity: 0.9;
      }
    }
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
}
</style>