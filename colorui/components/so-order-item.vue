<template>
    <view class="cu-card">
        <view class="cu-item shadow padding-lr-sm margin-lr-sm margin-top-sm">
            <view @click="jumpToOrderDetail">
                <view class="padding-tb-sm flex-sub cf">
                    <view class="text-sm text-grey fl">
                        <text class="cuIcon-time margin-right-xs"></text>{{order.orderTime}}
                    </view>
                    <view class="text-sm fr">
                        {{getOrderStatus()}}
                    </view>
                </view>
                <view class="fsob-item second-row">
                    <view class="fi-img-box">
                        <image v-for="(goodsItem, index) in order.goods.split(',')" :key="index" class="f-ib-img"
                               v-if="index < 3"
                               :src="goods[goodsItem.split(':')[0]].imgUrl"></image>
                        <i class="full-height el-icon-more"></i>
                    </view>
                    <view class="fi-order-info">
                        <view class="foi-price text-xxl">
                            <text class="text-price text-red">{{order.totalPrice}}</text>
                        </view>
                        <view class="foi-goods-count text-xs">
                            <text class="text-grey">共{{getGoodsCount()}}件</text>
                        </view>
                    </view>
                </view>
                <view class="padding-top flex-sub cf">
                    <view class="fl">
                        <text class="cuIcon-my"></text>
                        <text class="padding-left-xs">{{order.contactName}}</text>
                        <text class="text-sm text-grey padding-left-sm">{{order.contactAddress}}</text>
                        <text class="text-sm text-gray padding-left-sm">{{order.expectTime}}</text>
                    </view>
                </view>
            </view>
            <view class="cf padding-tb-sm" v-if="order.deliveryStatus < 2">
                <button class="cu-btn bg-orange round fr margin-left-xs" v-if="order.deliveryStatus == 0"
                        @click="btClick(-1)">快捷操作
                </button>
                <button class="cu-btn bg-olive round fr margin-left-xs" v-if="order.deliveryStatus == 1"
                        @click="btClick(0)">确认完成
                </button>
                <button class="cu-btn mauve round fr" @click="btClick(1)" v-if="0">删除订单</button>
            </view>
        </view>
        <view class="cu-modal bottom-modal" :class="modalShowing?'show':''">
            <view class="cu-dialog">
                <view class="cu-bar bg-white">
                    <view class="action text-green">确定</view>
                    <view class="action text-grey" @tap="modalShowing = false">取消</view>
                </view>
                <view class="padding-xl cu-form-group">
                    <picker @change="pickerChange" :value="index" :range="picker" @click="modalShowing = false">
                        <view class="text-center text-blue">
                            {{index>-1?picker[index]:'选择配送人'}}
                        </view>
                    </picker>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                modalShowing: false,
				index: -1,
				picker: ['刘备', '关羽', '张飞']
            }
        },
        props: {
            order: {
                type: Object,
                required: true
            },
            goods: {
                type: Object
            }
        },
        methods: {
            jumpToOrderDetail() {
                uni.navigateTo({
                    url: `detail?orderId=${this.order.orderId}`
                });
            },
            btClick(type) {
                if (type === -1) {
                    this.modalShowing = true;
                }
            },
			pickerChange (index) {
            	console.log(index);
			},
            getOrderStatus () {
                switch (this.order.deliveryStatus) {
                    case -1: return '未确认';
                    case 0: return '未配送';
                    case 1: return '配送中 - ' + this.order.deliveryManInfo.split(':')[1];
                    case 2: return '配送完成';
                }
            },
            getGoodsCount () {
                let count = 0;
                this.order.goods.split(',').forEach(good => {
                    count += parseInt(good.split(':')[1]);
                });
                return count;
            }
        }
    }
</script>

<style lang="scss">
    .fsob-item {
        display: flex;
        align-items: center;

        &.first-row {
            justify-content: space-between;
        }

        &.second-row {
            height: 60px;
            justify-content: space-between;
        }

        &.third-row {
            justify-content: flex-end;

            uni-button {
                margin-left: 10px;
            }
        }

        .fi-img-box {
            height: 100%;
            width: calc(100% - 60px);

            .f-ib-img {
                height: 100%;
                width: 60px;
                float: left;
                margin-right: 5px;
            }

            i {
                color: #909399;
                min-width: 60px;
                float: left;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }

        .fi-order-info {
            width: 80px;
            height: 100%;
            display: flex;
            align-items: flex-end;
            justify-content: center;
            flex-direction: column;

            .foi-price {
                font-weight: bold;
                font-size: 14px;
            }

            .foi-goods-count {
                font-size: 12px;
                color: #909399;
            }
        }
    }
</style>
