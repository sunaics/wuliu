<template>
  <div class="setUp pd20">
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
        <u-form-item label="头像" prop="carImg" borderBottom>
          <div class="uploadBox" v-if="isEdit">
            <div class="flex uploadWrap">
              <u-upload
                :fileList="fileList1"
                name="1"
                multiple
                :maxCount="1"
                width="64rpx"
                height="64rpx"
                @afterRead="afterRead"
                @delete="deletePic"
              ></u-upload>
            </div>
          </div>
          <u-icon slot="right" name="arrow-right" v-if="isEdit"></u-icon>
          <div class="imgWrap flex" v-else>
            <u-avatar size="64rpx" ></u-avatar>
          </div>
          
        </u-form-item>
        <template v-if="isEdit">
          <u-form-item label="性别" prop="sex" borderBottom @click="showSex = true">
            <div class="alginRight">{{ userInfo.sex }}</div>
            <u-icon slot="right" name="arrow-right"></u-icon>
          </u-form-item>
          <u-form-item label="生日" prop="birth" borderBottom @click="pickerShow = true">
            <u--input v-model="userInfo.birth" inputAlign="right" border="none" placeholder="请选择生日"></u--input>
            <u-icon slot="right" name="arrow-right"></u-icon>
          </u-form-item>
          <u-form-item label="地区" prop="area" borderBottom @click="showLocal = true">
            <u--input v-model="userInfo.area" inputAlign="right" border="none" placeholder="请选择地区"></u--input>
            <u-icon slot="right" name="arrow-right"></u-icon>
          </u-form-item>
        </template>
        <template v-else>
          <u-form-item label="性别" prop="sex" borderBottom>
            <div class="alginRight">{{ userInfo.sex || '-' }}</div>
          </u-form-item>
          <u-form-item label="生日" prop="birth" borderBottom>
            <div class="alginRight">{{ userInfo.birth || '-' }}</div>
          </u-form-item>
          <u-form-item label="地区" prop="area" borderBottom >
            <div class="alginRight">{{ userInfo.area || '-' }}</div>
          </u-form-item>
        </template>
        <u-form-item label="绑定手机" prop="mobile" borderBottom @click="bindMobile"> 
          <div class="alginRight">{{ userInfo.mobile || '-'}}</div>
          <u-icon slot="right" name="arrow-right"></u-icon>
        </u-form-item>
      </u--form>
    </div>
    <div class="footWrap" :class="{'Iphone': isIphone}">
      <div class="foot pd20">
        <div class="footBtn" v-if="isEdit" @click="submit">保存</div>
        <div class="footBtn" v-else @click="isEdit=true">修改</div>
      </div>
    </div>

    <u-picker
      @cancel="showLocal = false"
      @close="showLocal = false"
      :show="showLocal"
      :columns="addressColumns"
      @confirm="localConfirm"
      title="请选择所在地"
      keyName="name"
      itemHeight="80"
      closeOnClickOverlay
      ref="uPicker"
      @change="changeHandler"
      :defaultIndex="defaultAddress"
      immediateChange
    ></u-picker>

    <u-action-sheet
      :show="showSex"
      :actions="actions"
      title="请选择性别"
      @close="showSex = false"
      @select="sexSelect"
    ></u-action-sheet>
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
import areas from "@/utils/areas.json";
export default {
  components: {},
  mixins: [pageMixin],
  data() {
    return {
      showSex: false,
      userInfo: {
        // 头像
        avatar: "../../static/img/myBg.png",
        // 性别
        sex: "男",
        // 生日
        birth: "",
        // 地区
        area: "",
        // 绑定手机
        mobile: ""
      },
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
      fileList1: [],
      localCode: "", //这个变量看个人需求使用
      showLocal: false, //是否展示弹出层
      addressColumns: [], //数据数组
      defaultAddress: [], //默认选中 (回填时或者初次显示默认选中)
      addressData: areas, //原始数据 (引入的json文件)
      isEdit: false,
      pickerShow: false,
      pickerValue: ""
    };
  },
  computed: {
    isIphone() {
      return this.$store.state.isIphone;
    }
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
    },
    confirmDate(date) {
      console.log(this.pickerValue, date);
      this.pickerValue = date.value;
      this.userInfo.birth = this.formatDate(date.value);
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
    changeHandler(e) {
      //分别表示选中的列 , 该列的第几个,选中的3列的第几个的数组,组件本身
      const { columnIndex, index, indexs, picker = this.$refs.uPicker } = e;
      //如果改变的是第一列
      if (columnIndex === 0) {
        const children1 = this.addressData[index].areas.map(e => {
          return { name: e.name, code: e.code };
        });
        picker.setColumnValues(1, children1);
        //更换 第二列数据
        const children2 = this.addressData[index].areas[indexs[1]].areas.map(
          e => {
            return { name: e.name, code: e.code };
          }
        );
        picker.setColumnValues(2, children2);
        //更换 第三列数据
      }
      if (columnIndex === 1) {
        //如果改变的是第二列
        const children3 = this.addressData[indexs[0]].areas[
          indexs[1]
        ].areas.map(e => {
          return { name: e.name, code: e.code };
        });
        picker.setColumnValues(2, children3);
        //更换 第三列数据
      }
    },
    localConfirm(e) {
      //显而易见 不多赘述
      this.userInfo.area = `${e.value[0].name}-${e.value[1].name}-${e.value[2].name}`;
      this.localCode = `${e.value[0].code}-${e.value[1].code}-${e.value[2].code}`;
      this.showLocal = false;
    },
    //已经知道了 this.local ='省-市-区'初始弹窗时默认选中改值
    backfill(temp) {
      temp = item.area.split("-");
      let index,
        index1,
        index2 = 0;
      let arr,
        arr1,
        arr2 = [];
      //匹配省市区对应每列的第几个
      this.addressData.forEach((item, i) => {
        if (item.name == temp[0]) {
          index = i;
          item.children.forEach((val, ind) => {
            if (val.name == temp[1]) {
              index1 = ind;
              val.children.forEach((e, n) => {
                if (e.name == temp[2]) {
                  index2 = n;
                }
              });
            }
          });
        }
      });
      arr = this.addressData.map(e => {
        return { name: e.name, code: e.code };
      });
      arr1 = this.addressData[index].children.map(e => {
        return { name: e.name, code: e.code };
      });
      arr2 = this.addressData[index].children[index1].children.map(e => {
        return { name: e.name, code: e.code };
      });
      //反推出3列的数组数据
      this.addressColumns = [arr, arr1, arr2];
      // 赋值给 默认初始选中
      this.defaultAddress = [index, index1, index2];
    },
    bindMobile(){
      this.$Router.push('/pages/bindPhone/bindPhone')
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
  onShow() {
    //省的数组
    const provinceData = areas.map(e => {
      return { name: e.name, code: e.code }; //这里可以直接return e.name  这里我是要用到code所以才用对象包起来的 下面的市 区 也一样
    });
    //市的数组
    const cityData = areas.map(e => {
      const arr = [];
      arr.push(
        e.areas.map(c => {
          return { name: c.name, code: c.code };
        })
      );
      return arr;
    });
    //区的数组
    const areaData = areas.map(e => {
      const arr = [];
      arr.push(
        e.areas.map(c =>
          c.areas.map(d => {
            return { name: d.name, code: d.code };
          })
        )
      );
      return arr;
    });
    const arr = [provinceData, cityData[0][0], areaData[0][0][0]];
    this.addressColumns = arr; //将得到的3个数组 的第一个市的所有数据赋值 作为初始数据
  },

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
.setUp {
  .imgWrap{
    justify-content: flex-end;
  }
  .uploadBox {
    text-align: right;
  }
  .uploadWrap {
    position: relative;
    width: 64rpx;
    height: 64rpx;
    display: inline-block;
  }
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
}
</style>