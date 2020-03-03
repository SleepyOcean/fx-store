<template>
    <view class="cu-card goods-item">
        <view class="cu-modal" :class="modalShowing?'show':''">
            <view class="cu-dialog">
                <view class="cu-bar bg-white justify-end">
                    <view class="content">修改商品</view>
                </view>
                <view class="padding-xl">
                    Modal 内容。
                </view>
                <view class="cu-bar bg-white justify-end">
                    <view class="action">
                        <button class="cu-btn line-green text-green" @tap="modalShowing = false">取消</button>
                        <button class="cu-btn bg-green margin-left" @tap="saveGoods">保存</button>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                modalShowing: false
            }
        },
        props: {
            goods: {
                type: Object
            },
            category: {
                type: Object
            }
        },
        methods: {
        }
    }
</script>

<style lang="scss">

</style>
