<template>
    <view class="full-width">
        <view class="full-size padding-tb-xl" v-if="1">
            <view class="nav-list">
                <view hover-class="none" class="nav-li"
                           :class="'bg-'+item.color"
                           :style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]" v-for="(item,index) in elements"
                           :key="index" @click="moduleClick(item)">
                    <view class="nav-title">{{item.title}}</view>
                    <view class="nav-name">{{item.name}}</view>
                    <text :class="'cuIcon-' + item.cuIcon"></text>
                </view>
            </view>
            <view class="full-width text-center padding-sm" v-if="0">
                <text class="text-xs text-grey">———— 到底啦~ ————</text>
            </view>
        </view>
        <view class="full-size flex align-center justify-center" style="height: 600px" v-else>
            <view class="full-width">
                <view class="full-width text-center">
                    <image src="../../static/fx-store-logo.png" style="height: 60px; width: 60px;"></image>
                </view>
                <view class="full-width text-sm text-grey text-center margin-bottom-xs">功能消失了?!</view>
                <view class="full-width text-sm text-grey text-center">问问开发者咋回事</view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                elements: [
                    {
                        title: '同步数据',
                        name: 'sync',
                        color: 'olive',
                        cuIcon: 'refresh'
                    },
                    {
                        title: '订单报表',
                        name: 'statistic',
                        color: 'green',
                        cuIcon: 'rankfill'
                    },
                    {
                        title: '商品管理',
                        name: 'goods',
                        color: 'pink',
                        cuIcon: 'goodsnew'
                    },
                    {
                        title: '分类管理',
                        name: 'category',
                        color: 'cyan',
                        cuIcon: 'cascades'
                    }
                ]
            }
        },
        methods: {
            moduleClick(item){
                uni.navigateTo({
                    url: `../module/module?module=${item.name}&name=${item.title}`
                });
            }
        }
    }
</script>

<style>
	.page {
		height: 100vh;
	}.nav-list {
		 display: flex;
		 flex-wrap: wrap;
		 padding: 0px 40upx 0px;
		 justify-content: space-between;
	 }

	.nav-li {
		padding: 30upx;
		border-radius: 12upx;
		width: 45%;
		margin: 0 2.5% 40upx;
		background-image: url(https://cdn.nlark.com/yuque/0/2019/png/280374/1552996358352-assets/web-upload/cc3b1807-c684-4b83-8f80-80e5b8a6b975.png);
		background-size: cover;
		background-position: center;
		position: relative;
		z-index: 1;
	}

	.nav-li::after {
		content: "";
		position: absolute;
		z-index: -1;
		background-color: inherit;
		width: 100%;
		height: 100%;
		left: 0;
		bottom: -10%;
		border-radius: 10upx;
		opacity: 0.2;
		transform: scale(0.9, 0.9);
	}

	.nav-li.cur {
		color: #fff;
		background: rgb(94, 185, 94);
		box-shadow: 4upx 4upx 6upx rgba(94, 185, 94, 0.4);
	}

	.nav-title {
		font-size: 32upx;
		font-weight: 300;
	}

	.nav-title::first-letter {
		font-size: 40upx;
		margin-right: 4upx;
	}

	.nav-name {
		font-size: 28upx;
		text-transform: Capitalize;
		margin-top: 20upx;
		position: relative;
	}

	.nav-name::before {
		content: "";
		position: absolute;
		display: block;
		width: 40upx;
		height: 6upx;
		background: #fff;
		bottom: 0;
		right: 0;
		opacity: 0.5;
	}

	.nav-name::after {
		content: "";
		position: absolute;
		display: block;
		width: 100upx;
		height: 1px;
		background: #fff;
		bottom: 0;
		right: 40upx;
		opacity: 0.3;
	}

	.nav-name::first-letter {
		font-weight: bold;
		font-size: 36upx;
		margin-right: 1px;
	}

	.nav-li text {
		position: absolute;
		right: 30upx;
		top: 30upx;
		font-size: 52upx;
		width: 60upx;
		height: 60upx;
		text-align: center;
		line-height: 60upx;
	}

	@keyframes show {
		0% {
			transform: translateY(-50px);
		}

		60% {
			transform: translateY(40upx);
		}

		100% {
			transform: translateY(0px);
		}
	}

	@-webkit-keyframes show {
		0% {
			transform: translateY(-50px);
		}

		60% {
			transform: translateY(40upx);
		}

		100% {
			transform: translateY(0px);
		}
	}
</style>
