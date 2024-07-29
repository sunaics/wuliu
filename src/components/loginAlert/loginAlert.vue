<template>
  <div id="loginAlert">
    <loginBox :isAlert="true" v-if="isBindPhoe"></loginBox>
    <bindIdentity :isAlert="true" v-else-if="isBindUserType"></bindIdentity>
    <infoBox :isAlert="true" v-else-if="isBindInfo"></infoBox>
  </div>
</template>

<script type="text/javascript">
import loginBox from "@/components/loginBox/loginBox.vue";
import bindIdentity from "@/components/bindIdentity/bindIdentity.vue";
import infoBox from "@/components/infoBox/infoBox.vue";
export default {
  name: "loginAlert",
  data() {
    return {};
  },
  computed: {
    isBindPhoe() {
      return !this.$store.state.userInfo.phone;
    },
    isBindUserType() {
      return (
        !this.$store.state.userInfo.olCID && !this.$store.state.userInfo.olSID
      );
    },
    isBindInfo() {
      return !this.$store.state.userInfo.name;
    }
  },
  components: {
    loginBox,
    bindIdentity,
    infoBox
  },
  methods: {},

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
  beforeDestroy() {},
  // 组件周期函数--监听组件销毁之后
  destroyed() {}
};
</script>

<style lang="scss" scoped></style>
