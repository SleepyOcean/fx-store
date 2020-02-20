<template>
    <view class="full-size">
        <view class="cu-bar bg-white solid-bottom margin-bottom-sm">
            <view class="action">
                <text class="cuIcon-titles text-green"></text> 订单状态
            </view>
            <view class="action">
                <text class="lg text-green cuIcon-roundcheckfill"></text> 已完成
            </view>
        </view>
        <view class="cu-bar bg-white solid-bottom margin-bottom-sm">
            <view class="action">
                <view class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg)"></view>
                <text class="padding-left-sm text-sm">李白</text>
            </view>
            <view class="action">
                <button class="cu-btn line-grey round fr sm">电话小哥</button>
            </view>
        </view>
        <view class="cu-bar bg-white solid-bottom">
            <view class="action">
                <text class="text-grey text-sm">收货时间</text>
            </view>
            <view class="action">
                <text class="text-sm">2020-02-20 14:12:22</text>
            </view>
        </view>
        <view class="cu-bar bg-white solid-bottom margin-bottom-sm">
            <view class="action">
                <text class="text-grey text-sm">收货地址</text>
            </view>
            <view class="action">
                <text class="text-sm">上海市徐汇区众合大厦232号</text>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        component: {

        },
        data() {
            return {
                page: ''
            }
        },
        onLoad(option) {

        },
        methods: {}
    }
</script>

<style>

</style>
