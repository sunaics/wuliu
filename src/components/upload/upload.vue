<template>
    <div class="uploadWrap">
        <u-upload :fileList="fileArr" @afterRead="afterRead" @delete="deletePic" name="1" multiple :maxCount="maxCount"
            :disabled="disabled" :accept="accept" :width="width" :height="height"></u-upload>
    </div>
</template>

<script>
import { uploadFile } from '@/utils/alioss.js'
export default {
    options: {
        styleIsolation: "shared" // 解除样式隔离
    },
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        uploadId: String,
        fileList: {
            type: Array,
            default: () => []
        },
        accept: {
            type: String,
            default: 'image'
        },
        maxCount: {
            type: Number,
            default: 4
        },
        width: {
            type: String,
            default: '114rpx'
        },
        height: {
            type: String,
            default: '114rpx'
        }

    },
    data() {
        return {
            fileArr: [],
        }
    },
    mounted() {
        this.fileArr = [...this.fileList]
    },
    methods: {
        // 删除图片
        deletePic(event) {
            this.fileArr.splice(event.index, 1)
        },
        // 新增图片
        async afterRead(event) {
            console.log('event', event);
            // 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
            let lists = [].concat(event.file)
            let fileListLen = this.fileArr.length
            lists.map((item) => {
                this.fileArr.push({
                    ...item,
                    status: 'uploading',
                    message: '上传中'
                })
            })
            for (let i = 0; i < lists.length; i++) {
                const result = await uploadFile(lists[i].url)
                console.log('result', result);
                let item = this.fileArr[fileListLen]
                if (result.status == 200) {
                    this.fileArr.splice(fileListLen, 1, Object.assign(item, {
                        status: 'success',
                        message: '',
                        url: result
                    }))
                    fileListLen++
                } else {
                    uni.showToast({
                        title: "上传失败",
                        icon: 'none'
                    })
                    this.fileArr.splice(fileListLen, 1, Object.assign(item, {
                        status: 'failed',
                        message: '上传失败',
                    }))
                    fileListLen++
                }
                this.$emit('update:fileList', {
                    id: this.uploadId,
                    fileList: this.fileArr
                })
            }
        },
    }

}
</script>
<style scoped lang="scss">
.uploadWrap {
    ::v-deep {
        .u-upload__button,
        .u-upload__wrap__preview:last-child {
            margin-right: 0 !important;
        }
    }
}
</style>
