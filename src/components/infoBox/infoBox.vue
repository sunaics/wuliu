<template>
  <div class="infoBox">
    <div class="title">完善资料</div>
    <!-- #ifdef MP-WEIXIN -->
    <div class="toux">
      <button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
        <img class="avatar imgAll" :src="avatarUrl ? avatarUrl : defaultAvatar" />
      </button>
      <div class="icon">
        <u-icon name="plus-circle-fill" color="#4E5FF7" size="36rpx"></u-icon>
      </div>
    </div>
    <div class="iptWrap flex_cc">
      <div class="name">昵称</div>
      <input type="nickname" class="weui-input" placeholder="请输入昵称" @change="changeName" />
    </div>
    <u-button
        type="primary"
        text="绑定信息"
        size="large"
        :customStyle="{fontSize: '36rpx',  boxShadow: '0rpx 8rpx 14rpx 0rpx rgba(0,19,194,0.14)'}"
        color="#4E5FF7"
        @click="bindInfo"
      ></u-button>
    <!-- #endif -->
  </div>
</template>

<script>
import {uploadFile} from '@/utils/alioss.js'
export default {
  name: "infoBox",
  props: {},
  data() {
    return {
      defaultAvatar: require("@/static/img/toux.png"),
      avatarUrl: "",
      nickname: ""
    };
  },
  computed: {},
  methods: {
    changeName(e){
      this.nickname = e.detail.value
    },
    onChooseAvatar(e) {
      console.log(e);
      this.avatarUrl = e.detail.avatarUrl
      uploadFile(e.detail.avatarUrl).then(res=>{
          console.log(res.url)//图片路径
        })
    },
    bindInfo(){
      if(!this.avatarUrl){
        return uni.$u.toast('请上传头像')
      }else if(!this.nickname){
        return uni.$u.toast('请输入昵称')
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
.infoBox {
  .title {
    font-weight: 500;
    font-size: 40rpx;
    color: #333333;
    margin: 80rpx 0;
  }
  .toux {
    width: 176rpx;
    height: 176rpx;
    margin: 0 auto 80rpx;
    position: relative;
    .avatar-wrapper {
      width: 176rpx;
      height: 176rpx;
      border-radius: 50%;
      padding: 0;
    }
    .icon {
      position: absolute;
      left: 134rpx;
      bottom: 8rpx;
    }
  }

  .iptWrap {
    width: 100%;
    height: 84rpx;
    background: #ffffff;
    border-radius: 10rpx;
    border: 2rpx solid #eeeeee;
    margin-bottom: 120rpx;
    .name {
      width: 144rpx;
      flex-shrink: 0;
      text-align: center;
    }
    .name,
    .weui-input {
      height: 80rpx;
      line-height: 80rpx;
      font-size: 32rpx;
      color: #333333;
    }
    .weui-input {
      width: 100%;
    }
  }
}
</style>