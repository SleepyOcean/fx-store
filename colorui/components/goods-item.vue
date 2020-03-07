<template>
    <view>
        <view class="cu-bar bg-white solid-bottom goods-item padding-tb-sm" @click="modalShowing = true">
            <view class="gi-img-box">
                <image class="full-size" :src="goods.imgUrl"></image>
            </view>
            <view class="gi-info-box padding-left-sm">
                <view class="full-width">
                    <text>{{goods.goodsName}}</text>
                </view>
                <view class="full-width">
                    <text class="text-grey text-xs">{{goods.goodsDesc}}
                    </text>
                </view>
                <view class="foi-price padding-tb-xs cf">
                    <view class="flex align-end fl">
                        <text class="text-price fl">{{goods.goodsPriceNow}}</text>
                        <text class="text-gray text-xs text-price fl padding-left-xs" style="text-decoration: line-through" v-if="goods.goodsPriceOrigin > goods.goodsPriceNow">{{goods.goodsPriceOrigin}}</text>
                    </view>
                    <text class="text-green text-sm fr">库存：{{goods.storageNum + goods.storageUnit}}</text>
                </view>
            </view>
        </view>
        <view class="cu-modal" :class="modalShowing?'show':''">
            <view class="cu-dialog">
                <view class="cu-bar bg-white">
                    <view class="content">修改商品</view>
                </view>
                <form class="full-width">
                    <view class="cu-form-group solid-top">
                        <view class="title">商品名称</view>
                        <input v-model="goods.goodsName" name="input"></input>
                    </view>
                    <view class="cu-form-group">
                        <view class="title">商品描述</view>
                        <input v-model="goods.goodsDesc" name="input"></input>
                    </view>
                    <view class="cu-form-group">
                        <view class="title">库存数量</view>
                        <input v-model="goods.storageNum" name="input"></input>
                    </view>
                    <view class="cu-form-group">
                        <view class="title">库存单位</view>
                        <input v-model="goods.storageUnit" name="input"></input>
                    </view>
                    <view class="cu-form-group">
                        <view class="title">商品原价</view>
                        <input v-model="goods.goodsPriceOrigin" name="input"></input>
                    </view>
                    <view class="cu-form-group">
                        <view class="title">商品现价</view>
                        <input v-model="goods.goodsPriceNow" name="input"></input>
                    </view>
                    <view class="cu-form-group solid-bottom">
                        <view class="title">商品分类</view>
                        <picker @change="pickerChange($event)" :value="categorySelected" :range="category" range-key="categoryName">
                            <view class="uni-input">{{category[categorySelected].categoryName}}</view>
                        </picker>
                    </view>
                </form>
                <view class="cu-bar bg-white justify-end">
                    <view class="action">
                        <view class="action text-grey margin-right-xl" @tap="modalShowing = false">取消</view>
                        <view class="action text-green" @tap="updateGoods()">更新</view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import request from "../../util/request";
    export default {
        data() {
            return {
                modalShowing: false,
                categorySelected: 0
            }
        },
        props: {
            goods: {
                type: Object
            },
            category: {
                type: Array
            }
        },
        methods: {
            pickerChange: function (e) {
                console.log('picker发送选择改变，携带值为', e.target.value)
                this.categorySelected = e.target.value
            },
            updateGoods() {
                let params = this.goods;
                params.category = parseInt(this.categorySelected) + 1;
                request.post('/goods/update', params).then(data => {
                    this.modalShowing = false;
                    if(data.status === 200) {
                        uni.showToast({
                            title: '更新完成',
                            duration: 2000,
                            icon: 'success'
                        });
                        this.$emit('updateAfter');
                    } else {
                        uni.showToast({
                            title: '更新失败',
                            duration: 2000
                        });
                    }
                });
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
