<template>
	<view class="content">
		<image class="logo" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-uni65b0d9e/b4282750-d9e5-11ea-9dfb-6da8e309e0d8.jpg"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<button type="default" @click="open">执行云函数</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			open(){
				uniCloud.callFunction({
					name:"git_list",
					// 传递的参数
					data:{
						name:"liming",
						age:18
					},
					// 成功回调
					success(res) {
						console.log(res)
					},
					// 失败回调
					fail(err) {
						console.log(err)
					}
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
