<template>
  <div class="orderFilter" v-show="orderFilterShow">
    <div class="mask"></div>
    <div class="contant">
      <div class="tit">
        筛选
        <div class="close flex_cc" @click="orderFilterShow = false">
          <u-icon name="close"></u-icon>
        </div>
      </div>
      <div class="timer">
        <div class="t_tit">时间</div>
        <div class="t_box">
          <div class="t_tab flex_sb">
            <div
              class="btn"
              v-for="(item, index) in selectList"
              :key="index"
              :class="item.value == selectActive ? 'btnActive' : ''"
              @click="chanActive(item.value)"
            >{{ item.name }}</div>
          </div>
        </div>
        <div class="iptWrap flex_sb">
          <div class="dates" @click="pickerShow1 = true">
            <text v-if="startDate">{{ startDate }}</text>
            <text class="tips" v-else>起始时间</text>
          </div>
          <div class="xian"></div>
          <div class="dates" @click="pickerShow2 = true">
            <text v-if="endDate">{{ endDate }}</text>
            <text class="tips" v-else>终止时间</text>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom flex_sb" :class="{'Iphone': isIphone}">
      <div class="b_btn" @click="clearSelect">清空筛选</div>
      <div class="b_btn b_btn1" @click="submitData">确定</div>
    </div>
    <u-datetime-picker
      ref="datetimePicker1"
      :show="pickerShow1"
      v-model="date1"
      mode="date"
      :formatter="formatter"
      @cancel="pickerShow1 = false"
      @confirm="confirm1"
    ></u-datetime-picker>
    <u-datetime-picker
      ref="datetimePicker2"
      :show="pickerShow2"
      v-model="date2"
      mode="date"
      :formatter="formatter"
      @cancel="pickerShow2 = false"
      @confirm="confirm2"
    ></u-datetime-picker>
  </div>
</template>

<script>
import { formatDate, getDateForMonthOffset } from "@/utils/formatDate";
export default {
  name: "orderFilter",
  props: {

  },
  data() {
    return {
      orderFilterShow: false,
      selectList: [
        {
          name: "近一个月",
          value: 1
        },
        {
          name: "近三个月",
          value: 2
        },
        {
          name: "近一年",
          value: 3
        }
      ],
      selectActive: 0,
      startDate: "",
      endDate: "",
      pickerValue: "",
      date1: "",
      date2: "",
      pickerShow1: false,
      pickerShow2: false
    };
  },
  computed: {
    isIphone() {
      return this.$store.state.isIphone;
    }
  },
  methods: {
    chanActive(val) {
      this.selectActive = val;
      this.date1 = "";
      this.date2 = "";
      this.startDate = "";
      this.endDate = "";
    },
    changeData() {},
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      }
      if (type === "month") {
        return `${value}月`;
      }
      if (type === "day") {
        return `${value}日`;
      }
      return value;
    },
    changePickerShow() {
      this.pickerShow = true;
    },
    confirm1(date) {
      console.log(date);
      if (this.date2 && date.value > this.date2) {
        uni.showToast({
          title: "起始时间不能大于终止时间",
          icon: "none"
        });
        return;
      }
      this.startDate = formatDate(date.value);
      this.pickerShow1 = false;
    },
    confirm2(date) {
      console.log(date);
      if (this.date1 && this.date1 > date.value) {
        uni.showToast({
          title: "起始时间不能大于终止时间",
          icon: "none"
        });
        return;
      }
      this.endDate = formatDate(date.value);
      this.pickerShow2 = false;
    },
    clearSelect() {
      this.selectActive = 0;
      this.startDate = "";
      this.endDate = "";
      this.date1 = "";
      this.date2 = "";
    },
    submitData() {
      if (this.selectActive == 0 && !this.startDate && !this.endDate) {
        uni.showToast({
          title: "请选择时间",
          icon: "none"
        });
        return;
      } else if ( this.selectActive == 0 && ( !this.startDate || !this.endDate ) ) {
        uni.showToast({
          title: "请完善起止时间",
          icon: "none"
        });
        return;
      }else{
        this.$emit("submitData", {
          selectActive: this.selectActive,
          startDate: this.startDate,
          endDate: this.endDate
        });
      
      }
    }
  },
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {
    // this.$refs.datetimePicker.setFormatter(this.formatter);
  },
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
.orderFilter {
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 991;
  .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    left: 0;
    top: 0;
  }
  .contant {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 910rpx;
    background: #ffffff;
    border-radius: 16rpx 16rpx 0rpx 0rpx;
    .tit {
      text-align: center;
      position: relative;
      font-weight: 500;
      font-size: 32rpx;
      color: #333333;
      line-height: 112rpx;
    }
    .close {
      height: 112rpx;
      width: 112rpx;
      position: absolute;
      right: 0;
      top: 0;
    }
    .timer {
      padding: 0 40rpx;
      .t_tit {
        font-weight: 500;
        font-size: 28rpx;
        color: #333333;
        line-height: 40rpx;
      }
      .t_tab {
        margin: 20rpx 0;
        .btn {
          width: 210rpx;
          height: 60rpx;
          background: #f5f5f5;
          border-radius: 30rpx;
          border: 2rpx solid #f5f5f5;
          box-sizing: border-box;
          text-align: center;
          line-height: 56rpx;
          font-size: 24rpx;
          color: #333333;
        }
        .btnActive {
          background: #e7eaff;
          border: 2rpx solid #4e5ff7;
        }
      }
      .iptWrap {
        .dates {
          width: 314rpx;
          height: 60rpx;
          background: #f5f5f5;
          border-radius: 30rpx;
          font-size: 24rpx;
          line-height: 60rpx;
          text-align: center;
          color: #333333;
          .tips {
            color: #999999;
          }
        }
      }
    }
  }
  .bottom {
    padding: 0 20rpx;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    padding-bottom: 20rpx;
    .b_btn {
      width: 344rpx;
      height: 84rpx;
      background: #ffffff;
      border-radius: 10rpx;
      border: 2rpx solid #4e5ff7;
      box-sizing: border-box;
      text-align: center;
      line-height: 80rpx;
      font-weight: 500;
      font-size: 32rpx;
    }
    .b_btn1 {
      background: #4e5ff7;
      color: #ffffff;
    }
  }
  .Iphone {
    padding-bottom: 70rpx;
  }
}
</style>