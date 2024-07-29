<script>

export default {
  onLaunch: function() {
    let _self = this;
    wx.getSystemInfo({
      success: res => {
        if (res.screenHeight - res.safeArea.bottom) {
          this.$store.commit("SET_ISIPHONE", true);
        } else {
          this.$store.commit("SET_ISIPHONE", false);
        }
      }
    });
    
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import "uview-ui/index.scss";

page {
  background-color: #f5f5f5;
}
.imgAll {
  width: 100%;
  height: 100%;
  vertical-align: top;
}

.u-button.u-button--square{
  border-radius: 10rpx !important;
}
.u-upload__button{
  margin: 0 !important;
}
.u-form-item__body__right__content__slot{
  justify-content: flex-end;
}
.u-form-item__body{
  padding: 30rpx 0 !important;
}
.u-form
.uicon-arrow-right{
  color: #999999 !important;
  font-size: 28rpx !important;
}
.u-form-item__body__right__message{
  text-align: right !important;
}
.u-form-item__body__left__content__label{
  font-size: 28rpx !important;
}
.alginRight{
  text-align: right;
}

.pd20{
  padding: 20rpx;
}
.pdlr20{
  padding-left: 20rpx;
  padding-right: 20rpx;
}

.flex {
  display: flex;
}
.flex_cc {
  display: flex;
  justify-content: center;
  align-items: center;
}
.flex_ac_sb{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.flex_sb {
  display: flex;
  justify-content: space-between;
}
.flex_ac {
  display: flex;
  align-items: center;
}
.flex_jc {
  display: flex;
  justify-content: center;
}
</style>
