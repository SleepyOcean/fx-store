<template>
    <view class="full-size goods-manage">
        <view class="VerticalBox full-height">
            <scroll-view class="VerticalNav nav" scroll-y scroll-with-animation>
                <view class="cu-item" :class="index==currentCategory-1 ?'text-green cur':''"
                      v-for="(item,index) in category" :key="index" @tap="categorySelected(index)"
                      :data-id="index">
                    {{item.categoryName}}
                </view>
                <view class="cu-item text-grey text-bold text-lg" style="justify-content: center" @tap="createCategory(0)">+</view>
            </scroll-view>
            <scroll-view class="VerticalMain full-height" scroll-y scroll-with-animation
                         @bindscrolltolower="VerticalMain">
                <view class="padding-tb-xs bg-white text-green text-lg" @click="editCategory(0)">
                    <view class="sub-category-item text-bold">
                        {{category.length>0 ? category[currentCategory-1].categoryName : ''}}
                        <text class="cuIcon-edit text-grey"></text>
                    </view>
                </view>
                <view class="cu-card margin-sm" v-for="(sub, key) in subCategory[currentCategory]" :key="key" @click="editSubCategory(0, sub)">
                    <view class="sub-category-item">
                        {{sub.value}}
                        <text class="cuIcon-edit text-grey"></text>
                    </view>
                </view>
                <view class="cu-card margin-sm">
                    <view class="sub-category-item text-grey" style="justify-content: center" @click="createSubCategory(0)">+</view>
                </view>
            </scroll-view>
            <view class="cu-modal" :class="modalShowing?'show':''">
                <view class="cu-dialog">
                    <view class="cu-bar bg-white text-bold">
                        <view class="content" v-if="modalType===0">创建分类</view>
                        <view class="content" v-if="modalType===1">修改分类 - {{editOrigin}}</view>
                        <view class="content" v-if="modalType===2">创建子分类</view>
                        <view class="content" v-if="modalType===3">修改子分类 - {{editOrigin}}</view>
                    </view>
                    <form class="full-width">
                        <view class="cu-form-group solid-top">
                            <view class="title">商品名称</view>
                            <input v-model="editCategoryName" name="input"></input>
                        </view>
                    </form>
                    <view class="cu-bar bg-white justify-end">
                        <view class="action">
                            <view class="action text-grey margin-right-xl" @tap="modalShowing = false">取消</view>
                            <view class="action text-green" @tap="update">更新</view>
                        </view>
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
                currentCategory: 1,
                category: [],
                subCategory: {},
                modalType: 0,
                editOrigin: '',
                editCategoryName: ''
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
                request.post('/category/goods', {}).then(data => {
                    if (data.status === 200) {
                        this.category = data.resultList;
                        this.subCategory = {};
                        this.category.forEach(c => {
                            this.subCategory[c.categoryCode] = JSON.parse(c.subCategory);
                        })
                    }
                    uni.hideLoading();
                });
            },
            updateCategory(params){
                uni.showLoading({
                    title: '更新中'
                });
                request.post('/category/update', params).then(data => {
                    if (data.status === 200) {
                        this.modalShowing = false;
                        this.requestGoods();
                    }
                    uni.hideLoading();
                })
            },
            categorySelected(index){
                if(index || index === 0){
                    this.currentCategory = index+1;
                }
            },
            update() {
                switch (this.modalType) {
                    case 0: this.createCategory(1); break;
                    case 1: this.editCategory(1); break;
                    case 2: this.createSubCategory(1); break;
                    case 3: this.editSubCategory(1);
                }
            },
            createCategory(confirm){
                if(!confirm){
                    this.modalShowing =  true;
                    this.modalType = 0;
                    this.editCategoryName = '默认分类';
                } else {
                    let params = this.category[0];
                    delete params.categoryId;
                    params.categoryName = this.editCategoryName;
                    params.categoryCode = this.category.length + 1;
                    params.subCategory = '';
                    uni.showLoading({
                        title: '创建中'
                    });
                    request.post('/category/save', params).then(data => {
                        if (data.status === 200) {
                            this.modalShowing = false;
                            this.requestGoods();
                        }
                        uni.hideLoading();
                    })
                }
            },
            editCategory(confirm){
                if(!confirm){
                    this.modalShowing =  true;
                    this.modalType = 1;
                    this.editOrigin = this.category[this.currentCategory-1].categoryName;
                    this.editCategoryName = this.category[this.currentCategory-1].categoryName;
                } else {
                    let params = {
                        categoryId: this.category[this.currentCategory-1].categoryId,
                        categoryName: this.editCategoryName
                    };
                    this.updateCategory(params);
                }
            },
            createSubCategory(confirm){
                if(!confirm){
                    this.modalShowing =  true;
                    this.modalType = 2;
                    this.editCategoryName = '默认子分类';
                } else {
                    let subCategory = {};
                    if(this.category[this.currentCategory-1].subCategory){
                        subCategory = JSON.parse(this.category[this.currentCategory-1].subCategory);
                        subCategory[Object.keys(subCategory).length+1] = {
                            key: Object.keys(subCategory).length+1,
                            value: this.editCategoryName
                        };
                    } else {
                        subCategory = {
                            1: {
                                key: 1,
                                value: this.editCategoryName
                            }
                        };
                    }
                    let params = {
                        categoryId: this.category[this.currentCategory-1].categoryId,
                        subCategory: JSON.stringify(subCategory)
                    };
                    this.updateCategory(params);
                }
            },
            editSubCategory(confirm, data){
                if(!confirm){
                    this.modalShowing =  true;
                    this.modalType = 3;
                    this.editOrigin = data.value;
                    this.editCategoryName = data.value;
                } else {
                    let subCategory = JSON.parse(this.category[this.currentCategory-1].subCategory);
                    Object.values(subCategory).forEach(o => {
                        if(o.value === this.editOrigin){
                            subCategory[o.key].value = this.editCategoryName;
                        }
                    });
                    let params = {
                        categoryId: this.category[this.currentCategory-1].categoryId,
                        subCategory: JSON.stringify(subCategory)
                    };
                    this.updateCategory(params);
                }
            }
        }
    }
</script>

<style lang="scss">
    .sub-category-item {
        width: 100%;
        height: 40px;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
    }
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
