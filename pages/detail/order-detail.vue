<template>
    <view class="full-size">
        <view class="cu-bar bg-white solid-bottom margin-bottom-sm">
            <view class="action">
                <text class="cuIcon-titles text-green"></text>
                订单状态
            </view>
            <view class="action">
                <text class="lg text-green">{{order.deliveryStatus}}</text>
            </view>
        </view>
        <view class="cu-bar bg-white solid-bottom margin-bottom-sm padding-lr" v-if="order.deliveryStatus === '待配送'">
            <view class="title">配送员</view>
            <picker @change="pickDeliveryMan" :value="pickerSelectedIndex" :range="deliveryMen">
                <view class="picker text-grey">
                    {{pickerSelectedIndex>-1?deliveryMen[pickerSelectedIndex]:'点击选择配送员'}}
                </view>
            </picker>
        </view>
        <view class="cu-bar bg-white solid-bottom margin-bottom-sm" v-else>
            <view class="action">
                <view class="cu-avatar round"
                      style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg)"></view>
                <text class="padding-left-sm text-sm">{{order.deliveryManInfo ? order.deliveryManInfo.split(':')[1] : ''}}</text>
            </view>
            <view class="action">
                <button class="cu-btn line-grey round fr sm">电话小哥</button>
            </view>
        </view>
        <view class="cu-bar bg-white">
            <view class="action">
                <text class="text-grey text-sm">期望配送时间</text>
            </view>
            <view class="action">
                <text class="text-sm text-bold">{{order.expectTime}}</text>
            </view>
        </view>
        <view class="cu-bar bg-white">
            <view class="action">
                <text class="text-grey text-sm">联系人</text>
            </view>
            <view class="action">
                <text class="text-sm text-bold">{{order.contactName}}</text>
            </view>
        </view>
        <view class="cu-bar bg-white">
            <view class="action">
                <text class="text-grey text-sm">联系方式</text>
            </view>
            <view class="action">
                <text class="text-sm text-bold">{{order.contact}}</text>
            </view>
        </view>
        <view class="cu-bar bg-white margin-bottom-sm">
            <view class="action">
                <text class="text-grey text-sm">收货地址</text>
            </view>
            <view class="action">
                <text class="text-sm text-bold">{{order.contactAddress}}</text>
            </view>
        </view>
        <view class="cu-card margin-sm">
            <view class="cu-item padding-lr-sm">
                <view class="cu-bar bg-white solid-bottom goods-item padding-tb-sm" v-if="order.goods"
                      v-for="(goodsItem, index) in order.goods" :key="index">
                    <view class="gi-img-box">
                        <image v-if="goodsItem" class="full-size" :src="goodsItem.imgUrl"></image>
                    </view>
                    <view class="gi-info-box padding-left-sm">
                        <view class="full-width">
                            <text>{{goodsItem.goodsName}}</text>
                        </view>
                        <view class="full-width">
                            <text class="text-grey text-xs">数量:{{goodsItem.amount}}  描述:{{goodsItem.goodsDesc}}
                            </text>
                        </view>
                        <view class="foi-price text-xxl padding-tb-xs">
                            <text class="text-price">31.20</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="cu-bar bg-white">
            <view class="action">
                <text class="text-grey text-sm">订单编号</text>
            </view>
            <view class="action">
                <text class="text-sm text-bold text-ABC">{{order.orderId}}</text>
            </view>
        </view>
        <view class="cu-bar bg-white">
            <view class="action">
                <text class="text-grey text-sm">下单时间</text>
            </view>
            <view class="action">
                <text class="text-sm text-bold">{{order.orderTime}}</text>
            </view>
        </view>
        <view class="cu-bar bg-white margin-bottom-sm">
            <view class="action">
                <text class="text-grey text-sm">期望配送日期</text>
            </view>
            <view class="action">
                <text class="text-sm text-bold">{{order.expectTime}}</text>
            </view>
        </view>
        <view class="cu-bar bg-white">
            <view class="action">
                <text class="text-grey text-sm">商品总额</text>
            </view>
            <view class="action">
                <text class="text-price text-bold">{{order.goodsTotalPrice}}</text>
            </view>
        </view>
        <view class="cu-bar bg-white">
            <view class="action">
                <text class="text-grey text-sm">优惠</text>
            </view>
            <view class="action text-bold">
                - <text class="text-price padding-left-xs">{{order.couponPrice || 0}}</text>
            </view>
        </view>
        <view class="cu-bar bg-white">
            <view class="action">
                <text class="text-grey text-sm">运费</text>
            </view>
            <view class="action text-bold">
                + <text class="text-price padding-left-xs">{{order.deliveryPrice || 0}}</text>
            </view>
        </view>
        <view class="cu-bar bg-white margin-bottom-sm">
            <view class="action">
                <text class="text-grey text-sm">实付款</text>
            </view>
            <view class="action">
                <text class="text-price text-xl text-bold text-red">{{order.totalPrice}}</text>
            </view>
        </view>
        <view class="box margin-tb-lg padding-lr-lg" v-if="order.deliveryStatus === '待配送'">
            <view class="cu-bar btn-group">
                <button class="cu-btn bg-green round">保存</button>
                <button class="cu-btn bg-blue round">提交</button>
            </view>
        </view>
        <view class="full-width text-center padding-sm" v-else>
            <text class="text-xs text-grey">———— 到底啦~ ————</text>
        </view>
    </view>
</template>

<script>
    export default {
        component: {},
        data() {
            return {
                deliveryMen: ['刘备', '关羽', '张飞'],
                pickerSelectedIndex: -1
            }
        },
        props: {
            order: {
                type: Object,
                required: true
            }
        },
        methods: {
            pickDeliveryMan ({detail}) {
                uni.showToast({
                    title: '等待配送员确认 . . . ',
                    duration: 2000,
                    icon: 'none'
                });
                this.pickerSelectedIndex = detail.value;
            },
            getGoods(){
                return this.order.goods ? this.order.goods.split(',') : [];
            }
        }
    }
</script>

<style lang="scss">
    .goods-item {

        .gi-img-box {
            width: 80px;
            height: 80px;;
        }

        .gi-info-box {
            height: 100%;
            width: calc(100% - 80px);

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
