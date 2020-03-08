<template>
    <view class="full-size goods-manage">
        <view class="VerticalBox full-height">
            <scroll-view class="VerticalNav nav" scroll-y scroll-with-animation>
                <view class="cu-item" :class="index==currentCategory?'text-green cur':''"
                      v-for="(item,index) in category" :key="index" @tap="categorySelect"
                      :data-id="index">
                    {{item.categoryName}}
                </view>
            </scroll-view>
            <scroll-view class="VerticalMain full-height" scroll-y scroll-with-animation
                         @bindscrolltolower="VerticalMain">
                <view class="cu-card margin-sm" v-for="(c, key) in categoryValues" :key="key" v-if="key==currentCategory">
                    <template v-for="(subC, sk) in subCategory[key]">
                        <text class="cuIcon-title text-green margin-top-xl"></text>{{subC.value}}
                        <view class="cu-item padding-lr-sm margin-top-xs margin-bottom">
                            <goods-item v-for="(goodsItem, index) in goods" :key="index"
                                        v-if="goodsItem.category == (key+1) && goodsItem.subCategory == subC.key"
                                        :goods="goodsItem" :category="categoryValues" :subCategory="subCategory"
                                        @updateAfter="updateAfter"></goods-item>
                        </view>
                    </template>
                </view>
            </scroll-view>
        </view>
    </view>
</template>

<script>
    import request from "../../util/request";
    import GoodsItem from "../../colorui/components/goods-item";

    export default {
        components: {
            'goods-item': GoodsItem
        },
        data() {
            return {
                currentModule: {
                    type: '',
                    name: ''
                },
                goods: [],
                category: {},
                categoryValues: [],
                currentCategory: 0,
                subCategory: {},
                load: true,
                page: {
                    start: 1,
                    size: 0
                }
            }
        },
        mounted() {
            this.requestGoods();
        },
        methods: {
            requestGoods() {
                uni.showLoading({
                    title: '查询中'
                });
                let params = {
                    category: parseInt(this.currentCategory) + 1,
                    page: this.page.start,
                    pageSize: this.page.size
                };
                request.get('/goods/get', params).then(data => {
                    if (data.status === 200) {
                        if (!data.resultList) {
                            this.currentCategory++;
                            this.requestGoods();
                            return;
                        }
                        this.goods = data.resultList;
                        this.category = data.extra.category;
                        this.categoryValues = Object.values(this.category);
                        this.subCategory = {};
                        for(let k in this.category){
                            this.subCategory[k] = JSON.parse(this.category[k].subCategory);
                        }
                    }
                    setTimeout(uni.hideLoading, 1000);
                });
            },
            updateAfter() {
                this.requestGoods();
            },
            categorySelect(index) {
                this.currentCategory = index.currentTarget.dataset.id;
                this.requestGoods();
            },
            VerticalMain(e) {
                uni.showLoading({
                    title: '加载中'
                });
                this.page.start++;
                this.requestGoods();
            }
        }
    }
</script>

<style lang="scss">
    .VerticalNav.nav {
        height: 100%;
        background-color: white;
        width: 200upx;
        white-space: initial;
    }

    .VerticalNav.nav .cu-item {
        width: 100%;
        text-align: center;
        background-color: #fff;
        margin: 0;
        border: none;
        height: 50px;
        position: relative;
    }

    .VerticalNav.nav .cu-item.cur {
        background-color: #f1f1f1;
    }

    .VerticalNav.nav .cu-item.cur::after {
        content: "";
        width: 8upx;
        height: 30upx;
        border-radius: 10upx 0 0 10upx;
        position: absolute;
        background-color: currentColor;
        top: 0;
        right: 0upx;
        bottom: 0;
        margin: auto;
    }

    .VerticalBox {
        display: flex;
    }

    .VerticalMain {
        background-color: #f1f1f1;
        flex: 1;
    }
</style>
