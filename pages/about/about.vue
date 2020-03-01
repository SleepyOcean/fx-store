<template>
	<view class="full-width">
		<view class="avatar-box full-width main-bg-color">
			<view class="cu-bar margin-bottom-sm padding-top-lg">
				<view class="action">
					<view class="cu-avatar round xl"
						  :style="`background-image:url(${userInfo.avatarUrl})`"></view>
					<text class="padding-left-sm text-lg margin-left-lg" v-if="userInfo.name">{{userInfo.name}}</text>
					<button class="padding-left-sm text-lg margin-left-lg main-bg-color login-button" v-else
							open-type="getUserInfo" @getuserinfo="loginIntoWechat" withCredentials="true">
						点击登录
					</button>
				</view>
			</view>
			<view class="cu-card full-width padding-lg">
				<view class="cu-item shadow-blur info-panel">
					<view class="info-item" v-for="(item, index) in infos" :key="index" :style="'width: calc(100% / '+infos.length+')'">
						<text class="text-xxl text-bold text-red margin-bottom-xs">{{item.num}}</text>
						<text class="text-lg text-black">{{item.name}}</text>
					</view>
				</view>
			</view>
			<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
				<view class="cu-item" :class="menuArrow?'arrow':''">
					<view class="content">
						<text class="cuIcon-circlefill text-grey"></text>
						<text class="text-grey">商品设置</text>
					</view>
				</view>
				<view class="cu-item" :class="menuArrow?'arrow':''">
					<view class="content">
						<image src="/static/logo.png" class="png" mode="aspectFit"></image>
						<text class="text-grey">配送人员</text>
					</view>
				</view>
				<view class="cu-item" :class="menuArrow?'arrow':''">
					<button class="cu-btn content" open-type="contact">
						<text class="cuIcon-btn text-olive"></text>
						<text class="text-grey">品牌故事</text>
					</button>
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
				infos: [
					{
						num: 1642,
						name: '订单数'
					},
					{
						num: 89342,
						name: '营业额'
					}
				],
				userInfo: {
					name: '',
					avatarUrl: '',
					adminId: ''
				}
			}
		},
		mounted() {
			let self = this;
			uni.getStorage({
				key: 'userInfo',
				success: function (res) {
					console.log("获取缓存：" + JSON.stringify(res));
					self.userInfo = res.data;
				},
				fail (info) {
					console.log("获取缓存失败" + JSON.stringify(info));
					self.loginIntoWechat();
				}
			});
		},
		methods: {
			loginIntoWechat () {
				let self = this;
				uni.login({
					success: res => {
						uni.showLoading({
							title: '登陆中'
						});
						// 获取用户信息
						uni.getUserInfo({
							provider: 'weixin',
							success: function(infoRes) {
								let parmas = {
									code: res.code,
									name: infoRes.userInfo.nickName
								};
								request.get('/admin/getByCode',parmas).then(data => {
									uni.hideLoading();
									if(data.stauts === 200){
										self.userInfo.name = infoRes.userInfo.nickName;
										self.userInfo.avatarUrl = infoRes.userInfo.avatarUrl;
										self.userInfo.adminId = data.result.adminId;
										uni.setStorage({
											key: 'userInfo',
											data: self.userInfo
										});
										uni.showToast({
											title: '登录成功',
											duration: 1000
										});
									} else {
										uni.showToast({
											icon: 'none',
											title: '登录失败',
											duration: 1000
										});
									}
								});
							},
							fail: function (info) {
								console.error(info);
								uni.hideLoading();
								uni.showToast({
									title: '登录失败',
									duration: 1000
								});
							}
						});
					}
				});
			}
		}
	}
</script>

<style lang="scss">
.avatar-box {
	height: 200px;
	.login-button::after {
		border: unset;
	}
	.info-panel {
		height: 120px;
		.info-item {
			float: left;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
	}
}
</style>
